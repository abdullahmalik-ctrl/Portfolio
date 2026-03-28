import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { ProjectDetailView } from './components/ProjectDetailView';
import { SkillDetailView } from './components/SkillDetailView';
import { AllProjectsView } from './components/AllProjectsView';
import { AllSkillsView } from './components/AllSkillsView';
import { LoginView } from './components/LoginView';
import { Dashboard } from './components/Dashboard';
import { Toast } from './components/Toast';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { firebaseAuth, isFirebaseConfigured } from './lib/firebase';
import { resolveUserRole } from './lib/authRole';
import {
  saveMeeting,
  saveTicket,
  subscribeMeetings,
  subscribeTickets,
  updateMeetingStatus,
  updateTicketStatus,
  saveServiceRequest,
  subscribeServiceRequests,
  updateServiceRequestStatus,
} from './lib/firebaseDB';
import {
  DEFAULT_PROFILE,
  DEFAULT_SKILLS,
  DEFAULT_PROJECTS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_EDUCATION,
  DEFAULT_MEETINGS,
  DEFAULT_SUPPORT,
  DEFAULT_SERVICES,
  DEFAULT_SERVICE_REQUESTS,
} from './data/defaults';

function App() {
  const [appUser, setAppUser] = useState(null);
  const [nav, setNav] = useState({ name: 'home', data: null });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  // Data State
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [education, setEducation] = useState(DEFAULT_EDUCATION);
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [meetings, setMeetings] = useState(DEFAULT_MEETINGS);
  const [support, setSupport] = useState(DEFAULT_SUPPORT);
  const [services, setServices] = useState(DEFAULT_SERVICES);
    const [serviceRequests, setServiceRequests] = useState(DEFAULT_SERVICE_REQUESTS);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const role = await resolveUserRole(firebaseUser);
          const displayName =
            firebaseUser.displayName || (role === 'admin' ? 'Admin User' : 'Valued Client');

          setAppUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            role,
            name: displayName,
          });
        } else {
          setAppUser(null);
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to meetings from Firestore
  useEffect(() => {
    if (!isFirebaseConfigured) return () => {};
    
    const unsubscribe = subscribeMeetings((meetingsList) => {
      setMeetings(meetingsList);
    });
    
    return () => unsubscribe();
  }, []);

  // Subscribe to support tickets from Firestore
  useEffect(() => {
    if (!isFirebaseConfigured) return () => {};
    
    const unsubscribe = subscribeTickets((ticketsList) => {
      setSupport(ticketsList);
    });
    
    return () => unsubscribe();
  }, []);

    // Subscribe to service requests from Firestore
    useEffect(() => {
      if (!isFirebaseConfigured) return () => {};
    
      const unsubscribe = subscribeServiceRequests((requestsList) => {
        setServiceRequests(requestsList);
      });
    
      return () => unsubscribe();
    }, []);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const navigate = (name, data = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setNav({ name, data });
    setMobileMenuOpen(false);
  };

  const handleLogin = async (email, password) => {
    if (!isFirebaseConfigured) {
      throw Object.assign(new Error('Auth unavailable'), { code: 'auth/unavailable' });
    }

    const credentials = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const role = await resolveUserRole(credentials.user);

    navigate('dashboard');
    showToast(role === 'admin' ? 'Welcome Admin' : 'Login successful!');
  };

  const handleSignUp = async (name, email, password) => {
    if (!isFirebaseConfigured) {
      throw Object.assign(new Error('Auth unavailable'), { code: 'auth/unavailable' });
    }

    const credentials = await createUserWithEmailAndPassword(firebaseAuth, email, password);

    if (name && name.trim()) {
      await updateProfile(credentials.user, { displayName: name.trim() });
    }

    navigate('dashboard');
    showToast('Account created successfully!');
  };

  const handleForgotPassword = async (email) => {
    if (!isFirebaseConfigured) {
      throw Object.assign(new Error('Auth unavailable'), { code: 'auth/unavailable' });
    }

    await sendPasswordResetEmail(firebaseAuth, email);
    showToast('Password reset email sent. Check your inbox.');
  };

  const handleGoogleLogin = async () => {
    if (!isFirebaseConfigured) {
      throw Object.assign(new Error('Auth unavailable'), { code: 'auth/unavailable' });
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const credentials = await signInWithPopup(firebaseAuth, provider);
    const role = await resolveUserRole(credentials.user);

    navigate('dashboard');
    showToast(role === 'admin' ? 'Welcome Admin' : 'Signed in with Google!');
  };

  const handleLogout = async () => {
    if (isFirebaseConfigured) {
      await signOut(firebaseAuth);
    }
    navigate('home');
    showToast('Logged out');
  };

  const saveData = async (collectionName, data) => {
    if (collectionName === 'profile') setProfile(data);
    if (collectionName === 'skills') setSkills(data.list);
    if (collectionName === 'projects') setProjects(data.list);
    if (collectionName === 'education') setEducation(data.list);
    if (collectionName === 'testimonials') setTestimonials(data.list);
    if (collectionName === 'services') setServices(data.list);
    
    // Meetings and support tickets are persisted to Firestore
    if (collectionName === 'meetings') {
      // Meetings are synced from Firestore automatically
      setMeetings(data.list);
    }
    if (collectionName === 'support') {
      // Support tickets are synced from Firestore automatically
      setSupport(data.list);
    }
    
    showToast(`${collectionName.charAt(0).toUpperCase() + collectionName.slice(1)} updated!`);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  const backgroundStyle = {
    filter: `hue-rotate(${scrollY * 0.1}deg)`,
    transform: `translateY(${scrollY * 0.2}px)`,
  };

  return (
    <div className="min-h-screen bg-[#030014] font-sans text-slate-200 selection:bg-purple-500/30 selection:text-purple-200 relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-[#1a0b2e] to-[#030014]"></div>
        <div className="absolute inset-0 opacity-60 transition-all duration-75" style={backgroundStyle}>
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] animate-blob-spin opacity-50" />
          <div
            className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-500 rounded-full mix-blend-screen filter blur-[80px] animate-blob-spin opacity-50"
            style={{ animationDirection: 'reverse', animationDuration: '25s' }}
          />
          <div
            className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-pink-600 rounded-full mix-blend-screen filter blur-[80px] animate-blob-spin opacity-40"
            style={{ animationDuration: '30s' }}
          />
        </div>
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
        ></div>
      </div>

      {/* Navigation */}
      <Navigation
        profile={profile}
        nav={nav}
        appUser={appUser}
        navigate={navigate}
        onLogout={handleLogout}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content */}
      <main className="relative z-10 min-h-[calc(100vh-100px)]">
        {nav.name === 'home' && (
          <HomeView
            profile={profile}
            skills={skills}
            projects={projects}
            education={education}
            testimonials={testimonials}
            navigate={navigate}
          />
        )}
        {nav.name === 'project' && nav.data && <ProjectDetailView project={nav.data} navigate={navigate} />}
        {nav.name === 'skill' && nav.data && <SkillDetailView skillGroup={nav.data} navigate={navigate} />}
        {nav.name === 'all-projects' && <AllProjectsView projects={projects} navigate={navigate} />}
        {nav.name === 'all-skills' && <AllSkillsView skills={skills} navigate={navigate} />}
        {nav.name === 'login' && (
          <LoginView
            onLogin={handleLogin}
            onSignUp={handleSignUp}
            onForgotPassword={handleForgotPassword}
            onGoogleLogin={handleGoogleLogin}
          />
        )}
        {nav.name === 'dashboard' && appUser && (
          <Dashboard
            user={appUser}
            profile={profile}
            skills={skills}
            projects={projects}
            education={education}
            testimonials={testimonials}
            meetings={meetings}
            support={support}
            services={services}
            saveData={saveData}
            saveMeeting={saveMeeting}
            saveTicket={saveTicket}
            updateMeetingStatus={updateMeetingStatus}
            updateTicketStatus={updateTicketStatus}
              serviceRequests={serviceRequests}
              saveServiceRequest={saveServiceRequest}
              updateServiceRequestStatus={updateServiceRequestStatus}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 relative z-10 mt-20 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </footer>

      {notification && <Toast message={notification} />}
    </div>
  );
}

export default App;

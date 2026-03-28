import React, { useState } from 'react';
import {
  Edit3,
  Trash2,
  Plus,
  LogOut,
  Briefcase,
  GraduationCap,
  MessageSquare,
  AlertCircle,
  Clock,
  ShoppingCart,
  DollarSign,
  User,
  CheckSquare,
  ArrowRight,
} from 'lucide-react';
import { ICON_MAP, getIconComponent } from '../data/iconMap';

export function Dashboard({
  user,
  profile,
  skills,
  projects,
  education,
  testimonials,
  meetings,
  support,
  services,
  saveData,
  saveMeeting,
  saveTicket,
  updateMeetingStatus,
  updateTicketStatus,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedServices, setSelectedServices] = useState([]);
  const [editProfile, setEditProfile] = useState(profile);
  const [editProjects, setEditProjects] = useState(projects);
  const [editEdu, setEditEdu] = useState(education);
  const [editTestimonials, setEditTestimonials] = useState(testimonials);
  const [editServices, setEditServices] = useState(services);
  const [meetingForm, setMeetingForm] = useState({ date: '', time: '', topic: '' });
  const [ticketForm, setTicketForm] = useState({ subject: '', priority: 'Medium', message: '' });

  const isAdmin = user.role === 'admin';

  const handleProfileChange = (e) =>
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  const handleProjectChange = (id, field, value) =>
    setEditProjects(editProjects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  const addProject = () =>
    setEditProjects([
      ...editProjects,
      {
        id: Date.now(),
        title: 'New Project',
        desc: 'Description...',
        challenge: 'Challenge...',
        solution: 'Solution...',
        tags: ['New'],
        image: 'https://via.placeholder.com/600',
      },
    ]);
  const handleEduChange = (id, field, value) =>
    setEditEdu(editEdu.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  const addEdu = () =>
    setEditEdu([
      ...editEdu,
      { id: Date.now(), degree: 'Degree', school: 'School', year: 'Year', desc: 'Description' },
    ]);
  const handleTestimonialChange = (id, field, value) =>
    setEditTestimonials(editTestimonials.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  const addTestimonial = () =>
    setEditTestimonials([
      ...editTestimonials,
      {
        id: Date.now(),
        clientName: 'Client Name',
        company: 'Company',
        avatar: 'https://i.pravatar.cc/150',
        quote: 'Great work!',
        rating: 5,
      },
    ]);
  const handleServiceChange = (id, field, value) =>
    setEditServices(editServices.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  const parseServicePrice = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : 0;
  };
  const addService = () =>
    setEditServices([
      ...editServices,
      {
        id: `svc-${Date.now()}`,
        name: 'New Service',
        price: 100,
        description: 'Service description...',
        features: ['Feature 1', 'Feature 2'],
        icon: 'Box',
      },
    ]);
  const toggleService = (serviceId) =>
    selectedServices.includes(serviceId)
      ? setSelectedServices(selectedServices.filter((id) => id !== serviceId))
      : setSelectedServices([...selectedServices, serviceId]);
  const calculateTotal = () =>
    selectedServices.reduce((acc, id) => {
      const service = services.find((s) => s.id === id);
      return acc + (service ? service.price : 0);
    }, 0);
  const requestMeeting = async () => {
    if (!meetingForm.date || !meetingForm.time) return;
    try {
      await saveMeeting({
        client: user.name,
        date: meetingForm.date,
        time: meetingForm.time,
        topic: meetingForm.topic,
        status: 'Pending',
      });
      setMeetingForm({ date: '', time: '', topic: '' });
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };
  const confirmMeeting = async (id) => {
    try {
      await updateMeetingStatus(id, 'Confirmed');
    } catch (error) {
      console.error('Error confirming meeting:', error);
    }
  };
  const createTicket = async () => {
    if (!ticketForm.subject) return;
    try {
      await saveTicket({
        client: user.name,
        subject: ticketForm.subject,
        priority: ticketForm.priority,
        status: 'Open',
        message: ticketForm.message,
        date: new Date().toISOString().split('T')[0],
      });
      setTicketForm({ subject: '', priority: 'Medium', message: '' });
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };
  const handleUpdateTicketStatus = async (id, newStatus) => {
    try {
      await updateTicketStatus(id, newStatus);
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8 relative">
        <aside className="w-full md:w-80 glass-panel rounded-3xl h-fit md:sticky md:top-24 self-start overflow-hidden flex flex-col transition-all duration-300">
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white">
                <span className="font-bold">{user.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="font-bold text-white">{user.name}</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            {isAdmin
              ? ['overview', 'edit-profile', 'edit-projects', 'edit-edu', 'edit-services', 'edit-testimonials', 'meetings', 'support'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                      activeTab === tab
                        ? 'bg-white/10 text-white shadow-inner'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {tab === 'overview' && <User size={20} />}
                    {tab === 'edit-profile' && <Edit3 size={20} />}
                    {tab === 'edit-projects' && <Briefcase size={20} />}
                    {tab === 'edit-edu' && <GraduationCap size={20} />}
                    {tab === 'edit-services' && <ShoppingCart size={20} />}
                    {tab === 'edit-testimonials' && <MessageSquare size={20} />}
                    {tab === 'meetings' && <Clock size={20} />}
                    {tab === 'support' && <AlertCircle size={20} />}
                    <span className="capitalize">
                      {tab.replace('edit-', '').replace('edu', 'education')}
                    </span>
                  </button>
                ))
              : [
                  <button
                    key="overview"
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                      activeTab === 'overview'
                        ? 'bg-white/10 text-white shadow-inner'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <ShoppingCart size={20} />
                    <span className="capitalize">Services & Pricing</span>
                  </button>,
                  <button
                    key="meetings"
                    onClick={() => setActiveTab('meetings')}
                    className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                      activeTab === 'meetings'
                        ? 'bg-white/10 text-white shadow-inner'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Clock size={20} />
                    <span className="capitalize">My Meetings</span>
                  </button>,
                  <button
                    key="support"
                    onClick={() => setActiveTab('support')}
                    className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                      activeTab === 'support'
                        ? 'bg-white/10 text-white shadow-inner'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <AlertCircle size={20} />
                    <span className="capitalize">Support Tickets</span>
                  </button>,
                ]}
          </nav>
          {!isAdmin && activeTab === 'overview' && (
            <div className="p-6 bg-white/5 border-t border-white/10 backdrop-blur-sm animate-fade-in-up">
              <div className="mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Total Estimated Cost
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">${calculateTotal()}</span>
                  <span className="text-xs text-slate-500 font-medium">USD</span>
                </div>
              </div>
              <button className="w-full glass-panel text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 hover:scale-105 transition-all shadow-lg">
                Request Quote <ArrowRight size={16} />
              </button>
            </div>
          )}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all text-red-400 hover:bg-red-500/10"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <div className="flex-1 animate-fade-in-right min-w-0">
          {/* Overview */}
          {activeTab === 'overview' && !isAdmin && (
            <DashboardGuestOverview
              services={services}
              selectedServices={selectedServices}
              toggleService={toggleService}
              getIconComponent={getIconComponent}
            />
          )}
          {activeTab === 'overview' && isAdmin && (
            <DashboardAdminOverview meetings={meetings} support={support} services={services} />
          )}

          {/* Services */}
          {activeTab === 'edit-services' && isAdmin && (
            <EditServicesTab
              editServices={editServices}
              handleServiceChange={handleServiceChange}
              addService={addService}
              setEditServices={setEditServices}
              saveData={saveData}
              getIconComponent={getIconComponent}
            />
          )}

          {/* Profile */}
          {activeTab === 'edit-profile' && isAdmin && (
            <EditProfileTab editProfile={editProfile} handleProfileChange={handleProfileChange} saveData={saveData} />
          )}

          {/* Projects */}
          {activeTab === 'edit-projects' && isAdmin && (
            <EditProjectsTab
              editProjects={editProjects}
              handleProjectChange={handleProjectChange}
              addProject={addProject}
              setEditProjects={setEditProjects}
              saveData={saveData}
            />
          )}

          {/* Education */}
          {activeTab === 'edit-edu' && isAdmin && (
            <EditEducationTab
              editEdu={editEdu}
              handleEduChange={handleEduChange}
              addEdu={addEdu}
              setEditEdu={setEditEdu}
              saveData={saveData}
            />
          )}

          {/* Testimonials */}
          {activeTab === 'edit-testimonials' && isAdmin && (
            <EditTestimonialsTab
              editTestimonials={editTestimonials}
              handleTestimonialChange={handleTestimonialChange}
              addTestimonial={addTestimonial}
              setEditTestimonials={setEditTestimonials}
              saveData={saveData}
            />
          )}

          {/* Meetings */}
          {activeTab === 'meetings' && (
            <MeetingsTab
              isAdmin={isAdmin}
              meetings={meetings}
              user={user}
              meetingForm={meetingForm}
              setMeetingForm={setMeetingForm}
              requestMeeting={requestMeeting}
              confirmMeeting={confirmMeeting}
            />
          )}

          {/* Support */}
          {activeTab === 'support' && (
            <SupportTab
              isAdmin={isAdmin}
              support={support}
              user={user}
              ticketForm={ticketForm}
              setTicketForm={setTicketForm}
              createTicket={createTicket}
              updateTicketStatus={updateTicketStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardGuestOverview({ services, selectedServices, toggleService, getIconComponent }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-lg shadow-purple-900/20 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Select Your Services</h2>
          <p className="text-purple-100 opacity-80">Choose the packages that fit your needs.</p>
        </div>
        <div className="hidden md:block">
          <DollarSign size={48} className="text-white/20" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => {
          const IconComponent = getIconComponent(service.icon);
          return (
            <label key={service.id} className="cursor-pointer group block">
              <input
                type="checkbox"
                className="hidden service-checkbox"
                checked={selectedServices.includes(service.id)}
                onChange={() => toggleService(service.id)}
              />
              <div
                className={`glass-panel p-6 rounded-3xl h-full border-2 transition-all duration-300 relative overflow-hidden group-hover:border-white/20 ${
                  selectedServices.includes(service.id)
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        selectedServices.includes(service.id)
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      <IconComponent size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white leading-tight">{service.name}</h3>
                  </div>
                  <span
                    className={`font-bold px-3 py-1 rounded-full text-sm ${
                      selectedServices.includes(service.id)
                        ? 'text-purple-300 bg-purple-500/20'
                        : 'text-slate-400 bg-white/5'
                    }`}
                  >
                    ${service.price}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4 pl-[52px]">{service.description}</p>
                <ul className="space-y-2 pl-[52px]">
                  {service.features.slice(0, 2).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckSquare size={12} className="text-green-400 shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function DashboardAdminOverview({ meetings, support, services }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-lg shadow-purple-900/20">
        <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-purple-100 opacity-80">Welcome back to your portfolio management system.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-8 rounded-3xl text-center">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Meetings</p>
          <p className="text-4xl font-extrabold text-white mt-2">
            {meetings.filter((m) => m.status === 'Pending').length}{' '}
            <span className="text-sm font-medium text-slate-400">Pending</span>
          </p>
        </div>
        <div className="glass-panel p-8 rounded-3xl text-center">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Support</p>
          <p className="text-4xl font-extrabold text-white mt-2">
            {support.filter((s) => s.status === 'Open').length}{' '}
            <span className="text-sm font-medium text-slate-400">Open</span>
          </p>
        </div>
        <div className="glass-panel p-8 rounded-3xl text-center">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Services</p>
          <p className="text-4xl font-extrabold text-white mt-2">{services.length}</p>
        </div>
      </div>
    </div>
  );
}

function EditProfileTab({ editProfile, handleProfileChange, saveData }) {
  return (
    <div className="glass-panel rounded-3xl p-10">
      <h2 className="text-2xl font-bold text-white mb-8">Edit Profile</h2>
      <div className="space-y-6">
        <input
          name="name"
          value={editProfile.name}
          onChange={handleProfileChange}
          className="w-full px-5 py-3 rounded-xl bg-black/20 border border-white/10 text-white"
          placeholder="Name"
        />
        <input
          name="title"
          value={editProfile.title}
          onChange={handleProfileChange}
          className="w-full px-5 py-3 rounded-xl bg-black/20 border border-white/10 text-white"
          placeholder="Title"
        />
        <textarea
          name="bio"
          value={editProfile.bio}
          onChange={handleProfileChange}
          rows={5}
          className="w-full px-5 py-3 rounded-xl bg-black/20 border border-white/10 text-white"
          placeholder="Bio"
        />
        <button
          onClick={() => saveData('profile', editProfile)}
          className="glass-panel text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

function EditProjectsTab({
  editProjects,
  handleProjectChange,
  addProject,
  setEditProjects,
  saveData,
}) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center glass-panel p-6 rounded-3xl">
        <h2 className="text-xl font-bold text-white ml-2">Projects</h2>
        <button
          onClick={addProject}
          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-purple-500 transition"
        >
          <Plus size={18} /> Add New
        </button>
      </div>
      <div className="grid gap-8">
        {editProjects.map((p) => (
          <div key={p.id} className="glass-panel p-8 rounded-3xl">
            <div className="space-y-4">
              <input
                value={p.title}
                onChange={(e) => handleProjectChange(p.id, 'title', e.target.value)}
                className="w-full font-bold text-lg px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                placeholder="Title"
              />
              <textarea
                value={p.desc}
                onChange={(e) => handleProjectChange(p.id, 'desc', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                placeholder="Description"
              />
              <div className="grid grid-cols-2 gap-4">
                <textarea
                  value={p.challenge}
                  onChange={(e) => handleProjectChange(p.id, 'challenge', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                  placeholder="Challenge"
                />
                <textarea
                  value={p.solution}
                  onChange={(e) => handleProjectChange(p.id, 'solution', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                  placeholder="Solution"
                />
              </div>
              <button
                onClick={() => setEditProjects(editProjects.filter((prj) => prj.id !== p.id))}
                className="text-red-400 font-bold text-sm flex items-center gap-2"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => saveData('projects', { list: editProjects })}
        className="w-full glass-panel text-white py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition"
      >
        Save All Projects
      </button>
    </div>
  );
}

function EditEducationTab({ editEdu, handleEduChange, addEdu, setEditEdu, saveData }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center glass-panel p-6 rounded-3xl">
        <h2 className="text-xl font-bold text-white ml-2">Education</h2>
        <button
          onClick={addEdu}
          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-purple-500 transition"
        >
          <Plus size={18} /> Add New
        </button>
      </div>
      <div className="grid gap-8">
        {editEdu.map((e) => (
          <div key={e.id} className="glass-panel p-8 rounded-3xl relative">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                value={e.degree}
                onChange={(ev) => handleEduChange(e.id, 'degree', ev.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                placeholder="Degree"
              />
              <input
                value={e.school}
                onChange={(ev) => handleEduChange(e.id, 'school', ev.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                placeholder="School"
              />
            </div>
            <textarea
              value={e.desc}
              onChange={(ev) => handleEduChange(e.id, 'desc', ev.target.value)}
              rows={2}
              className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white mb-4"
              placeholder="Description"
            />
            <button
              onClick={() => setEditEdu(editEdu.filter((item) => item.id !== e.id))}
              className="text-red-400 font-bold text-sm flex items-center gap-2"
            >
              <Trash2 size={16} /> Remove
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => saveData('education', { list: editEdu })}
        className="w-full glass-panel text-white py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition"
      >
        Save All Education
      </button>
    </div>
  );
}

function EditTestimonialsTab({
  editTestimonials,
  handleTestimonialChange,
  addTestimonial,
  setEditTestimonials,
  saveData,
}) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center glass-panel p-6 rounded-3xl">
        <h2 className="text-xl font-bold text-white ml-2">Client Reviews</h2>
        <button
          onClick={addTestimonial}
          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-purple-500 transition"
        >
          <Plus size={18} /> Add New
        </button>
      </div>
      <div className="grid gap-8">
        {editTestimonials.map((t) => (
          <div key={t.id} className="glass-panel p-8 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                value={t.clientName}
                onChange={(e) => handleTestimonialChange(t.id, 'clientName', e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                placeholder="Client Name"
              />
              <input
                value={t.company}
                onChange={(e) => handleTestimonialChange(t.id, 'company', e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                placeholder="Company"
              />
            </div>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <input
                value={t.avatar}
                onChange={(e) => handleTestimonialChange(t.id, 'avatar', e.target.value)}
                className="md:col-span-3 w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                placeholder="Avatar URL"
              />
              <input
                type="number"
                min="1"
                max="5"
                value={t.rating}
                onChange={(e) => handleTestimonialChange(t.id, 'rating', parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                placeholder="Rating (1-5)"
              />
            </div>
            <textarea
              value={t.quote}
              onChange={(e) => handleTestimonialChange(t.id, 'quote', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white mb-4"
              placeholder="Review Quote"
            />
            <button
              onClick={() => setEditTestimonials(editTestimonials.filter((item) => item.id !== t.id))}
              className="text-red-400 font-bold text-sm flex items-center gap-2"
            >
              <Trash2 size={16} /> Remove
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => saveData('testimonials', { list: editTestimonials })}
        className="w-full glass-panel text-white py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition"
      >
        Save All Reviews
      </button>
    </div>
  );
}

function EditServicesTab({
  editServices,
  handleServiceChange,
  addService,
  setEditServices,
  saveData,
  getIconComponent,
}) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center glass-panel p-6 rounded-3xl">
        <h2 className="text-xl font-bold text-white ml-2">Manage Services</h2>
        <button
          onClick={addService}
          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-purple-500 transition"
        >
          <Plus size={18} /> Add New
        </button>
      </div>
      <div className="grid gap-8">
        {editServices.map((s) => {
          const IconComponent = getIconComponent(s.icon);
          return (
            <div key={s.id} className="glass-panel p-8 rounded-3xl">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  value={s.name}
                  onChange={(e) => handleServiceChange(s.id, 'name', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                  placeholder="Service Name"
                />
                <div className="relative">
                  <span className="absolute left-4 top-2 text-slate-500">$</span>
                  <input
                    type="number"
                    value={s.price}
                    onChange={(e) => handleServiceChange(s.id, 'price', parseServicePrice(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                    placeholder="Price"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="md:col-span-2">
                  <textarea
                    value={s.description}
                    onChange={(e) => handleServiceChange(s.id, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                    placeholder="Description"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-slate-500 font-bold uppercase">Icon</label>
                  <select
                    value={s.icon}
                    onChange={(e) => handleServiceChange(s.id, 'icon', e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
                  >
                    {Object.keys(ICON_MAP).map((iconName) => (
                      <option key={iconName} value={iconName}>
                        {iconName}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2 text-sm text-purple-300">
                    <IconComponent size={16} /> <span>Preview</span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-xs text-slate-500 font-bold uppercase block mb-2">
                  Features (Comma separated)
                </label>
                <input
                  value={s.features.join(', ')}
                  onChange={(e) =>
                    handleServiceChange(
                      s.id,
                      'features',
                      e.target.value.split(',').map((f) => f.trim())
                    )
                  }
                  className="w-full px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white"
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>
              <button
                onClick={() => setEditServices(editServices.filter((item) => item.id !== s.id))}
                className="text-red-400 font-bold text-sm flex items-center gap-2"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => saveData('services', { list: editServices })}
        className="w-full glass-panel text-white py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition"
      >
        Save All Services
      </button>
    </div>
  );
}

function MeetingsTab({
  isAdmin,
  meetings,
  user,
  meetingForm,
  setMeetingForm,
  requestMeeting,
  confirmMeeting,
}) {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-8 rounded-3xl flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Meeting Scheduler</h2>
          <p className="text-slate-400 text-sm mt-1">Book a time to discuss your project.</p>
        </div>
        <Clock size={32} className="text-purple-400" />
      </div>
      {!isAdmin && (
        <div className="glass-panel p-8 rounded-3xl">
          <h3 className="font-bold text-white mb-4">Book New Session</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input
              type="date"
              value={meetingForm.date}
              onChange={(e) => setMeetingForm({ ...meetingForm, date: e.target.value })}
              className="px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white"
            />
            <input
              type="time"
              value={meetingForm.time}
              onChange={(e) => setMeetingForm({ ...meetingForm, time: e.target.value })}
              className="px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white"
            />
            <input
              type="text"
              placeholder="Topic"
              value={meetingForm.topic}
              onChange={(e) => setMeetingForm({ ...meetingForm, topic: e.target.value })}
              className="px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white"
            />
          </div>
          <button
            onClick={requestMeeting}
            className="w-full glass-panel text-white py-3 rounded-xl font-bold hover:bg-white/10 transition"
          >
            Request Meeting
          </button>
        </div>
      )}
      <div className="glass-panel p-8 rounded-3xl">
        <h3 className="font-bold text-white mb-6">{isAdmin ? 'All Meetings' : 'Your Upcoming Meetings'}</h3>
        <div className="space-y-4">
          {meetings
            .filter((m) => isAdmin || m.client === user.name)
            .map((m) => (
              <div key={m.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                    {m.date.split('-')[2]}
                  </div>
                  <div>
                    <p className="font-bold text-white">{m.topic}</p>
                    <p className="text-xs text-slate-400">
                      {m.date} at {m.time} • {isAdmin ? m.client : 'You'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      m.status === 'Confirmed'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {m.status}
                  </span>
                  {isAdmin && m.status === 'Pending' && (
                    <button
                      onClick={() => confirmMeeting(m.id)}
                      className="p-2 bg-white/10 rounded-lg hover:bg-green-500/20 text-green-400 transition"
                    >
                      <CheckSquare size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          {meetings.filter((m) => isAdmin || m.client === user.name).length === 0 && (
            <p className="text-slate-500 text-center py-4">No scheduled meetings.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SupportTab({ isAdmin, support, user, ticketForm, setTicketForm, createTicket, updateTicketStatus }) {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-8 rounded-3xl flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Support Center</h2>
          <p className="text-slate-400 text-sm mt-1">Track bugs and feature requests.</p>
        </div>
        <AlertCircle size={32} className="text-pink-400" />
      </div>
      {!isAdmin && (
        <div className="glass-panel p-8 rounded-3xl">
          <h3 className="font-bold text-white mb-4">Open New Ticket</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Subject"
              value={ticketForm.subject}
              onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
              className="px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white"
            />
            <select
              value={ticketForm.priority}
              onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
              className="px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <button
            onClick={createTicket}
            className="w-full glass-panel text-white py-3 rounded-xl font-bold hover:bg-white/10 transition"
          >
            Submit Ticket
          </button>
        </div>
      )}
      <div className="glass-panel p-8 rounded-3xl">
        <div className="grid gap-4">
          {support
            .filter((t) => isAdmin || t.client === user.name)
            .map((t) => (
              <div
                key={t.id}
                className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-white text-lg">{t.subject}</h4>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${
                        t.priority === 'High'
                          ? 'border-red-500/50 text-red-400 bg-red-500/10'
                          : 'border-slate-500/50 text-slate-400 bg-slate-500/10'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    Opened on {t.date} • {isAdmin ? t.client : 'You'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {isAdmin ? (
                    <select
                      value={t.status}
                      onChange={(e) => handleUpdateTicketStatus(t.id, e.target.value)}
                      className="bg-black/40 text-white text-sm px-3 py-2 rounded-lg border border-white/10 outline-none"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  ) : (
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${
                        t.status === 'Resolved'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {t.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          {support.filter((t) => isAdmin || t.client === user.name).length === 0 && (
            <p className="text-slate-500 text-center py-4">No support tickets found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

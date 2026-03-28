import {
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { firebaseDB, isFirebaseConfigured } from './firebase';

/**
 * Save a new meeting to Firestore
 */
export const saveMeeting = async (meeting) => {
  if (!isFirebaseConfigured) return;
  
  const meetingId = `meeting-${Date.now()}`;
  try {
    await setDoc(doc(firebaseDB, 'meetings', meetingId), {
      ...meeting,
      id: meetingId,
      createdAt: new Date().toISOString(),
    });
    return meetingId;
  } catch (error) {
    console.error('Error saving meeting:', error);
    throw error;
  }
};

/**
 * Save a new support ticket to Firestore
 */
export const saveTicket = async (ticket) => {
  if (!isFirebaseConfigured) return;
  
  const ticketId = `ticket-${Date.now()}`;
  try {
    await setDoc(doc(firebaseDB, 'support', ticketId), {
      ...ticket,
      id: ticketId,
      createdAt: new Date().toISOString(),
    });
    return ticketId;
  } catch (error) {
    console.error('Error saving ticket:', error);
    throw error;
  }
};

/**
 * Subscribe to meetings changes in real-time
 */
export const subscribeMeetings = (callback) => {
  if (!isFirebaseConfigured) return () => {};
  
  const q = query(collection(firebaseDB, 'meetings'), orderBy('createdAt', 'desc'));
  
  try {
    return onSnapshot(q, (querySnapshot) => {
      const meetings = [];
      querySnapshot.forEach((doc) => {
        meetings.push(doc.data());
      });
      callback(meetings);
    });
  } catch (error) {
    console.error('Error subscribing to meetings:', error);
    return () => {};
  }
};

/**
 * Subscribe to support tickets changes in real-time
 */
export const subscribeTickets = (callback) => {
  if (!isFirebaseConfigured) return () => {};
  
  const q = query(collection(firebaseDB, 'support'), orderBy('createdAt', 'desc'));
  
  try {
    return onSnapshot(q, (querySnapshot) => {
      const tickets = [];
      querySnapshot.forEach((doc) => {
        tickets.push(doc.data());
      });
      callback(tickets);
    });
  } catch (error) {
    console.error('Error subscribing to tickets:', error);
    return () => {};
  }
};

/**
 * Update meeting status
 */
export const updateMeetingStatus = async (meetingId, status) => {
  if (!isFirebaseConfigured) return;
  
  try {
    await updateDoc(doc(firebaseDB, 'meetings', meetingId), { status });
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw error;
  }
};

/**
 * Update ticket status
 */
export const updateTicketStatus = async (ticketId, status) => {
  if (!isFirebaseConfigured) return;
  
  try {
    await updateDoc(doc(firebaseDB, 'support', ticketId), { status });
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw error;
  }
};

/**
 * Delete a meeting
 */
export const deleteMeeting = async (meetingId) => {
  if (!isFirebaseConfigured) return;
  
  try {
    await deleteDoc(doc(firebaseDB, 'meetings', meetingId));
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw error;
  }
};

/**
 * Delete a support ticket
 */
export const deleteTicket = async (ticketId) => {
  if (!isFirebaseConfigured) return;
  
  try {
    await deleteDoc(doc(firebaseDB, 'support', ticketId));
  } catch (error) {
    console.error('Error deleting ticket:', error);
    throw error;
  }
  };

  /**
   * Save a new service request/quote to Firestore
   */
  export const saveServiceRequest = async (request) => {
    if (!isFirebaseConfigured) return;
  
    const requestId = `request-${Date.now()}`;
    try {
      await setDoc(doc(firebaseDB, 'serviceRequests', requestId), {
        ...request,
        id: requestId,
        createdAt: new Date().toISOString(),
      });
      return requestId;
    } catch (error) {
      console.error('Error saving service request:', error);
      throw error;
    }
  };

  /**
   * Subscribe to service requests changes in real-time
   */
  export const subscribeServiceRequests = (callback) => {
    if (!isFirebaseConfigured) return () => {};
  
    const q = query(collection(firebaseDB, 'serviceRequests'), orderBy('createdAt', 'desc'));
  
    try {
      return onSnapshot(q, (querySnapshot) => {
        const requests = [];
        querySnapshot.forEach((doc) => {
          requests.push(doc.data());
        });
        callback(requests);
      });
    } catch (error) {
      console.error('Error subscribing to service requests:', error);
      return () => {};
    }
  };

  /**
   * Update service request status
   */
  export const updateServiceRequestStatus = async (requestId, status) => {
    if (!isFirebaseConfigured) return;
  
    try {
      await updateDoc(doc(firebaseDB, 'serviceRequests', requestId), { status });
    } catch (error) {
      console.error('Error updating service request:', error);
      throw error;
    }
  };

  /**
   * Delete a service request
   */
  export const deleteServiceRequest = async (requestId) => {
    if (!isFirebaseConfigured) return;
  
    try {
      await deleteDoc(doc(firebaseDB, 'serviceRequests', requestId));
    } catch (error) {
      console.error('Error deleting service request:', error);
      throw error;
    }
};

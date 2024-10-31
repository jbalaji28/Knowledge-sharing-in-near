// utils/fetchExperts.js
import { db } from '../firebase'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods

// Function to fetch experts from Firestore
export const fetchExperts = async () => {
  const expertsCollection = collection(db, 'experts'); // 'experts' is the name of your collection
  const expertsSnapshot = await getDocs(expertsCollection);
  const expertsList = expertsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return expertsList; // Return the list of experts
};

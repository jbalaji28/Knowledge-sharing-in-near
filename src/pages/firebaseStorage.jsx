import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Initialize Firebase Storage
const storage = getStorage();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let profilePictureUrl = '';
    if (profilePicture) {
      // Create a unique filename using the current timestamp
      const uniqueFileName = `${Date.now()}_${profilePicture.name}`;
      // Create a reference to 'profilePictures/<uniqueFilename>'
      const profilePicRef = ref(storage, `profilePictures/${uniqueFileName}`);
      
      // Upload the file
      await uploadBytes(profilePicRef, profilePicture);
      
      // Get the download URL
      profilePictureUrl = await getDownloadURL(profilePicRef);
    }

    // Add a new document with a generated ID
    await addDoc(collection(db, 'applications'), {
      name,
      email,
      specialization,
      bio,
      profilePicture: profilePictureUrl, // Store the image URL
    });
    // Clear the form after submission
    setName('');
    setEmail('');
    setSpecialization('');
    setBio('');
    setProfilePicture(null);
    alert('Application submitted successfully!');
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Failed to submit application. Please try again.');
  }
};

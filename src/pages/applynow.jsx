import React, { useState } from 'react';
import { Container, Form, Button, Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { db } from '../firebase'; // Ensure this path is correct
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Initialize Firebase Storage
const storage = getStorage();

// Styled components
const ApplyNowContainer = styled(Container)`
  min-height: 100vh;
  background-color: #f0f4f8; // Light gray background
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333; // Dark text color
`;

const StyledNavbar = styled(Navbar)`
  background-color: #003366; // Navy blue
  padding: 1rem;
`;

const StyledFooter = styled.footer`
  background-color: #003366; // Navy blue
  color: white;
  text-align: center;
  padding: 20px;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const StyledButton = styled(Button)`
  background-color: #0056b3; // Button color
  border: none;

  &:hover {
    background-color: #004494; // Darker shade on hover
  }
`;

const ApplyNowPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let profilePictureUrl = '';
      if (profilePicture) {
        const profilePicRef = ref(storage, `profilePictures/${profilePicture.name}`);
        await uploadBytes(profilePicRef, profilePicture);
        profilePictureUrl = await getDownloadURL(profilePicRef);
      }

      await addDoc(collection(db, 'applications'), {
        name,
        email,
        specialization,
        bio,
        profilePicture: profilePictureUrl,
      });

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

  return (
    <>
      <StyledNavbar expand="lg">
        <Container>
          <Navbar.Brand href="#home" style={{ color: 'white' }}>YourBrand</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#apply" style={{ color: 'white' }}>Apply Now</Nav.Link>
              <Nav.Link href="#about" style={{ color: 'white' }}>About Us</Nav.Link>
              <Nav.Link href="#contact" style={{ color: 'white' }}>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
      
      <ApplyNowContainer>
        <h2 className="text-5xl font-bold mb-4">Apply Now</h2>
        <Form className="w-50" onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ backgroundColor: '#ffffff', color: '#333' }} // White input field
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: '#ffffff', color: '#333' }} // White input field
            />
          </Form.Group>

          <Form.Group controlId="formSpecialization">
            <Form.Label>Specialization</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your area of expertise"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              style={{ backgroundColor: '#ffffff', color: '#333' }} // White input field
            />
          </Form.Group>

          <Form.Group controlId="formBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ backgroundColor: '#ffffff', color: '#333' }} // White input field
            />
          </Form.Group>

          <Form.Group controlId="formProfilePicture">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              style={{ backgroundColor: '#ffffff', color: '#333' }} // White input field
            />
          </Form.Group>

          <Form.Group controlId="formSubmit">
            <StyledButton type="submit">
              Submit
            </StyledButton>
          </Form.Group>
        </Form>
      </ApplyNowContainer>

      <StyledFooter>
        <p>© 2024 YourBrand. All rights reserved.</p>
        <p>Follow us on social media!</p>
        {/* Add social media icons or links here */}
      </StyledFooter>
    </>
  );
};

export default ApplyNowPage;

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Container = styled.div`
  min-height: 100vh;
  background-color: #101010; /* Dark background */
  color: white;
  font-family: Arial, sans-serif;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(to bottom, #1e1e1e, #000);
  padding: 40px;
`;

const BenefitsSection = styled.section`
  padding: 80px 20px;
  background-color: #1e1e1e; /* Slightly lighter dark */
  text-align: center;
`;

const ExpertListSection = styled.section`
  padding: 80px 20px;
  background-color: #101010; /* Dark background */
  text-align: center;
`;

const Footer = styled.footer`
  background-color: #1e1e1e; /* Footer background */
  color: gray;
  padding: 40px 20px;
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  height: 300px;
`;

const CardWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.offset * -100}%);
`;

const ExpertCard = styled(Card)`
  background-color: #333;
  margin: 0 10px;
  border-radius: 12px;
  position: relative;
  min-width: 300px; /* Set a fixed width for cards */
`;

const ExpertDetails = styled.div`
  padding: 10px;
  text-align: left;
  color: #fff; /* Text color for details */
`;

const expertData = [
  // Add your expert data here
  {
    id: 1,
    name: 'Rajesh Kumar',
    specialization: 'Web Development',
    image: 'https://static.toiimg.com/thumb/msid-77782375,imgsize-96757,width-400,resizemode-4/77782375.jpg',
    rating: 4.5,
    field: 'IT',
    tokenCharge: '20 tokens',
    languages: 'Hindi, English',
  },
  {
    id: 2,
    name: 'Sita Sharma',
    specialization: 'Data Science',
    image: 'https://images.jdmagicbox.com/comp/amritsar/e2/0183px183.x183.131224112033.k8e2/catalogue/dr-sita-sharma-ranjit-avenue-amritsar-gynaecologist-obstetrician-doctors-ql0hhr.jpg',
    rating: 4.8,
    field: 'Analytics',
    tokenCharge: '30 tokens',
    languages: 'Hindi, English',
  },
    {
      id: 3,
      name: 'Anil Verma',
      specialization: 'Digital Marketing',
      image: 'data:image/jpeg;base64,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',
      rating: 4.7,
      field: 'Marketing',
      tokenCharge: '25 tokens',
      languages: 'Hindi, English',
    },
    {
      id: 4,
      name: 'Priya Gupta',
      specialization: 'Graphic Design',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1aKZxsLPBqMr41m_8rcu5ypO8YUGuLHvNlg&s',
      rating: 4.6,
      field: 'Design',
      tokenCharge: '15 tokens',
      languages: 'Hindi, English',
    },
    {
      id: 5,
      name: 'Vikram Mehta',
      specialization: 'Financial Analysis',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-r-VPxb8wTx2Dqb_D8cnZ6zSZyGyJi3k9FA&s',
      rating: 4.9,
      field: 'Finance',
      tokenCharge: '40 tokens',
      languages: 'Hindi, English',
    },
    {
      id: 6,
      name: 'Sneha Reddy',
      specialization: 'Content Writing',
      image: '/path/to/image6.jpg',
      rating: 4.4,
      field: 'Writing',
      tokenCharge: '10 tokens',
      languages: 'Hindi, English',
    },
    {
      id: 7,
      name: 'Rahul Singh',
      specialization: 'Project Management',
      image: '/path/to/image7.jpg',
      rating: 4.7,
      field: 'Management',
      tokenCharge: '35 tokens',
      languages: 'Hindi, English',
    },
    {
      id: 8,
      name: 'Aisha Khan',
      specialization: 'Mobile App Development',
      image: '/path/to/image8.jpg',
      rating: 4.6,
      field: 'IT',
      tokenCharge: '25 tokens',
      languages: 'Hindi, English',
    },
    {
      id: 9,
      name: 'Arjun Desai',
      specialization: 'Cybersecurity',
      image: '/path/to/image9.jpg',
      rating: 4.8,
      field: 'IT',
      tokenCharge: '50 tokens',
      languages: 'Hindi, English',
    },
    {
      id: 10,
      name: 'Neha Bansal',
      specialization: 'UX/UI Design',
      image: '/path/to/image10.jpg',
      rating: 4.5,
      field: 'Design',
      tokenCharge: '30 tokens',
      languages: 'Hindi, English',
    },
    {
      id: 11,
      name: 'Karan Patel',
      specialization: 'Artificial Intelligence',
      image: '/path/to/image11.jpg',
      rating: 4.9,
      field: 'AI',
      tokenCharge: '40 tokens',
      languages: 'Hindi, English',
    },
    {
      id: 12,
      name: 'Deepika Sinha',
      specialization: 'Social Media Marketing',
      image: '/path/to/image12.jpg',
      rating: 4.6,
      field: 'Marketing',
      tokenCharge: '20 tokens',
      languages: 'Hindi, English',
    },
    {
      id: 13,
      name: 'Suresh Jha',
      specialization: 'Network Engineering',
      image: '/path/to/image13.jpg',
      rating: 4.7,
      field: 'Networking',
      tokenCharge: '35 tokens',
      languages: 'Hindi, English',
    },
    {
      id: 14,
      name: 'Kavita Nair',
      specialization: 'Cloud Computing',
      image: '/path/to/image14.jpg',
      rating: 4.8,
      field: 'Cloud',
      tokenCharge: '45 tokens',
      languages: 'Hindi, English',
    },
    {
      id: 15,
      name: 'Manoj Yadav',
      specialization: 'E-commerce Strategy',
      image: '/path/to/image15.jpg',
      rating: 4.5,
      field: 'Business',
      tokenCharge: '30 tokens',
      languages: 'Hindi, English',
    },
  ];
  
  // Add more experts as needed

export default function BecomeExpert() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 < expertData.length ? prevIndex + 3 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 >= 0 ? prevIndex - 3 : expertData.length - 3
    );
  };

  return (
    <Container>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">Local Expert Connect</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/explore" className="nav-link">Explore Experts</Link>
              </li>
              <li className="nav-item">
                <Link href="/how-it-works" className="nav-link">How It Works</Link>
              </li>
              <li className="nav-item">
                <Link href="/login" className="nav-link">Sign Up/Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <HeroSection>
        <h2 className="text-5xl font-bold mb-6">Join Our Knowledge Sharing Platform</h2>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Share your expertise and connect with those who seek your knowledge.
        </p>
        <Button variant="contained" color="primary" className="mb-6" as={Link} href="/applynow">
          Apply Now
        </Button>
      </HeroSection>

      <BenefitsSection>
        <h3 className="text-4xl font-bold mb-12">Benefits of Becoming an Expert</h3>
        <ul className="list-disc text-left max-w-2xl mx-auto">
          <li className="mb-4">Connect with a broader audience.</li>
          <li className="mb-4">Flexible schedule for consultations.</li>
          <li className="mb-4">Gain recognition in your field.</li>
          <li className="mb-4">Earn additional income.</li>
        </ul>
      </BenefitsSection>

      <ExpertListSection>
        <h3 className="text-4xl font-bold mb-12">Meet Our Experts</h3>
        <CardContainer>
          <CardWrapper offset={currentIndex}>
            {expertData.map((expert, index) => (
              <ExpertCard key={expert.id} style={{ opacity: index >= currentIndex && index < currentIndex + 3 ? 1 : 0.5 }}>
                <Image
                  src={expert.image} // Assuming expert.image contains the image URL
                  alt={expert.name}
                  width={300}
                  height={200}
                  className="rounded-top"
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {expert.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                    {expert.specialization}
                  </Typography>
                  <ExpertDetails>
                    <p>Rating: {expert.rating} ⭐</p>
                    <p>Field: {expert.field}</p>
                    <p>Token Charge: {expert.tokenCharge}</p>
                    <p>Languages: {expert.languages}</p>
                  </ExpertDetails>
                </CardContent>
              </ExpertCard>
            ))}
          </CardWrapper>
        </CardContainer>
        <Button variant="outlined" color="primary" onClick={handlePrev} style={{ marginRight: '20px' }}>Previous</Button>
        <Button variant="outlined" color="primary" onClick={handleNext}>Next</Button>
      </ExpertListSection>

      <Footer>
        <p className="text-gray-500">© 2024 Local Expert Connect. All rights reserved.</p>
      </Footer>
    </Container>
  );
}

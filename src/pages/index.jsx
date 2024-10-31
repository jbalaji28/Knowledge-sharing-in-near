import Image from 'next/image';
import Link from 'next/link';
import SwipeableViews from 'react-swipeable-views';
import { Card, CardContent, Typography, IconButton, Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #121212;
  color: #f0f0f0;
  font-family: 'Roboto', sans-serif;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background: rgba(18, 18, 18, 0.9);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(to bottom, #333, #121212);
  padding: 60px;
`;

const CoreFeaturesSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 100px 20px;
  background-color: #1e1e1e;
`;

const AvailableExpertsSection = styled.section`
  padding: 100px 20px;
  background-color: #121212;
  text-align: center;
`;

const Footer = styled.footer`
  background-color: #121212;
  color: #aaa;
  padding: 40px 20px;
  text-align: center;
`;

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [showExperts, setShowExperts] = useState(false);
  const [experts, setExperts] = useState([]);

  const cards = [
    {
      icon: 'https://images.moneycontrol.com/static-mcnews/2023/03/Digital-India-770x433.jpg',
      title: 'Find Local Experts',
      description: 'Connect with professionals near you.',
      link: '/explore', // Link to Explore page
    },
    {
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEw2XdxO_BvJnYygjwlhoGZH3c47U8YBcunqDLAvUW10ccnJX8fewC169zLOUUgVnfHPI&usqp=CAU',
      title: 'One-Time Consultation Tokens',
      description: 'Book short sessions for quick advice.',
      link: '/token',
    },
    {
      icon: 'https://img.lovepik.com/free-png/20211214/lovepik-network-security-lock-png-image_401593002_wh1200.png',
      title: 'Secure & Transparent',
      description: 'Reputation scores and escrow protection.',
      link: '/security',
    },
  ];

  const fetchExperts = async () => {
    const expertsCollection = collection(db, 'experts');
    const expertSnapshot = await getDocs(expertsCollection);
    const expertList = expertSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setExperts(expertList);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % cards.length);
    }, 10000); 

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => setActiveStep((prev) => (prev + 1) % cards.length);
  const handleBack = () => setActiveStep((prev) => (prev - 1 + cards.length) % cards.length);

  const toggleExperts = () => {
    setShowExperts(!showExperts);
    if (!showExperts) fetchExperts();
  };

  return (
    <Container>
      <Header>
        <h1 className="text-2xl font-bold text-white">Local Expert Connect</h1>
        <nav className="space-x-8 text-gray-300">
          <Link href="/">Home</Link>
          <Link href="/explore">Explore Experts</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/login" className="text-white font-semibold">Sign Up/Login</Link>
          <Link href="/become-expert" className="text-white font-semibold">Become an Expert</Link>
        </nav>
      </Header>

      <HeroSection>
        <h2 className="text-5xl font-bold mb-6">Get Trusted Advice from Local Experts</h2>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Connect with local professionals for one-on-one guidance on topics that matter to you.
        </p>
        <input
          type="text"
          placeholder="Search experts (e.g., business, health)"
          className="px-5 py-3 rounded bg-gray-800 text-white placeholder-gray-500 w-80 mb-6"
        />
        <div className="space-x-6">
        <Link href="/explore">
            <button className="bg-white text-black font-semibold py-3 px-8 rounded shadow-lg">Explore Experts</button>
          </Link>
          <Link href="/become-expert">
            <button className="bg-gray-700 text-white font-semibold py-3 px-8 rounded shadow-lg">Become an Expert</button>
          </Link>
        </div>
      </HeroSection>

      <CoreFeaturesSection>
        <h3 className="text-4xl font-bold mb-12">Why Choose Us</h3>
        <div className="relative w-full max-w-3xl mx-auto">
          <SwipeableViews index={activeStep} enableMouseEvents>
            {cards.map((card, index) => (
              <Link href={card.link} key={index} passHref>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#333',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    maxWidth: '400px',
                    margin: '0 auto',
                    transition: 'transform 0.6s ease-in-out',
                    transform: `translateX(${activeStep === index ? 0 : '-100%'})`,
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={card.icon}
                    alt={card.title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      borderBottom: '1px solid #444',
                    }}
                  />
                  <CardContent sx={{ padding: '16px', textAlign: 'center' }}>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </SwipeableViews>
          <IconButton
            onClick={handleBack}
            sx={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
            }}
          >
            <ArrowBack sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
            }}
          >
            <ArrowForward sx={{ fontSize: 30 }} />
          </IconButton>
        </div>
      </CoreFeaturesSection>

      <AvailableExpertsSection>
        <Button variant="contained" color="primary" onClick={toggleExperts} className="mb-6">
          {showExperts ? 'Hide Available Experts' : 'Show Available Experts'}
        </Button>
        {showExperts && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <Card key={expert.id} sx={{ backgroundColor: '#333', padding: '16px', borderRadius: '12px' }}>
                <Image
                  src={expert.image}
                  alt={expert.name}
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {expert.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                    {expert.field} | {expert.languages.join(', ')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                    Rating: {expert.rating} | Token Charge: {expert.tokenCharge}
                  </Typography>
                </CardContent>
                <Link href={`/expert/${expert.id}`} passHref>
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': { backgroundColor: '#444' },
                      marginTop: '12px',
                    }}
                  >
                    View Profile
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </AvailableExpertsSection>

      <Footer>
        <p>&copy; {new Date().getFullYear()} Local Expert Connect. All rights reserved.</p>
        <p>Connecting you to trusted professionals for local advice and support.</p>
      </Footer>
    </Container>
  );
}

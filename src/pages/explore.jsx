import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, Typography, Button } from '@mui/material';
import styled from 'styled-components';

// Styled Components
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

const ExpertsSection = styled.section`
  padding: 100px 20px;
  background-color: #1e1e1e;
  text-align: center;
`;

const Footer = styled.footer`
  background-color: #121212;
  color: #aaa;
  padding: 40px 20px;
  text-align: center;
`;

const expertData = [
  {
    id: 1,
    name: 'Dr. Aditi Sharma',
    field: 'Health & Wellness',
    languages: ['English', 'Hindi'],
    rating: 4.8,
    tokenCharge: '5 Tokens',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJNVPl4DuWdbw-zUC5AKFCPIM0CDau1Agw7A&s', // Replace with your image path
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    field: 'Business Consulting',
    languages: ['English', 'Marathi'],
    rating: 4.5,
    tokenCharge: '3 Tokens',
    image: 'data:image/jpeg;base64,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', // Replace with your image path
  },
  // Add more expert data as needed
];

export default function Explore() {
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

      <ExpertsSection>
        <h2 className="text-4xl font-bold mb-8">Explore Our Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertData.map((expert) => (
            <Card key={expert.id} sx={{ backgroundColor: '#333', borderRadius: '12px' }}>
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
                  Field: {expert.field} | Languages: {expert.languages.join(', ')}
                </Typography>
                <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                  Rating: {expert.rating} | Token Charge: {expert.tokenCharge}
                </Typography>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </ExpertsSection>

      <Footer>
        <p>&copy; {new Date().getFullYear()} Local Expert Connect. All rights reserved.</p>
        <p>Connecting you to trusted professionals for local advice and support.</p>
      </Footer>
    </Container>
  );
}

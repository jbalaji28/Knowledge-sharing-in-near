// _app.js
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css'; // Ensure this is pointing to your global styles
// _app.js
import 'bootstrap/dist/css/bootstrap.min.css';


// Create a custom MUI theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

const MyApp = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} /> {/* This renders the current page */}
        </ThemeProvider>
    );
};

export default MyApp;

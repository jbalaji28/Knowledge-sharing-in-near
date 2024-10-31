// src/components/Login.js
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Ensure this import is correct
import { auth } from '../config/FirebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import styles from './Login.module.css';

const Login = () => {
    const [error, setError] = useState('');
    const router = useRouter(); // Initialize the router

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // Redirect only if not already on the home page
            if (router.pathname !== '/home') {
                router.push('/home'); // Redirect to home page after successful login
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.logoContainer}>
                <img
                    src="https://www.iec.ch/system/files/inline-images/E-WEB-Goal-01.png"
                    alt="Zero Poverty Logo"
                    className={styles.logo}
                />
            </div>
            <h2>Welcome to Zero Poverty</h2>
            <p className={styles.description}>
                Join us in our mission to eradicate poverty through sustainable initiatives and community empowerment.
            </p>
            <button className={styles.googleButton} onClick={handleGoogleSignIn}>
                Sign in with Google
            </button>
            {error && <p className={styles.error}>{error}</p>}
            <footer className={styles.footer}>
                <p>&copy; 2024 Zero Poverty Initiative</p>
            </footer>
        </div>
    );
};

export default Login;

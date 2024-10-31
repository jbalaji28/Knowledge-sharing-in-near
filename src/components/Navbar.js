// src/components/Navbar.js
import React from 'react';
import styles from './Navbar.module.css'; // Create this CSS file for styling

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h1>Zero Poverty</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

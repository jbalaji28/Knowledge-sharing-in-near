// src/components/Sidebar.js
import React from 'react';
import styles from './Sidebar.module.css'; // Create this CSS file for styling

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h2>Navigation</h2>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/projects">Our Projects</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;

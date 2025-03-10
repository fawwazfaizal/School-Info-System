import React from 'react';
import { Link } from 'react-router-dom';
import 'primeicons/primeicons.css';
import '../styles/App.css'; // Importing styles from App.css

const Navbar = () => {
  const handleSearch = (event) => {
    // Handle search logic here
    console.log('Search Query:', event.target.value);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">
            <i className="pi pi-home" style={{ marginRight: '8px' }}></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/students">
            <i className="pi pi-users" style={{ marginRight: '8px' }}></i> Students
          </Link>
        </li>
        <li>
          <Link to="/teachers">
            <i className="pi pi-user" style={{ marginRight: '8px' }}></i> Teachers
          </Link>
        </li>
        <li>
          <Link to="/courses">
            <i className="pi pi-book" style={{ marginRight: '8px' }}></i> Courses
          </Link>
        </li>
        <li>
          <Link to="/grades">
            <i className="pi pi-graduation-cap" style={{ marginRight: '8px' }}></i> Grades
          </Link>
        </li>
      </ul>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="search-input"
        />
        <i className="pi pi-search search-icon"></i>
      </div>
    </nav>
  );
};

export default Navbar;

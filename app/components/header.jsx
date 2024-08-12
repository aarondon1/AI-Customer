
import { useState } from 'react';
import './styles/Navbar.css';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar">
      <div className="logo">AI SUPPORTER</div>
      <a href="#" className="toggle-button" onClick={handleToggle}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </a>
      <div className={`nav-content ${isActive ? 'active' : ''}`}>
        <ul>
          <li><a href="#">STATS</a></li>
          <li><a href="#">DEMO</a></li>
          <li><a href="#">HIRE US</a></li>
          <li><a href="#">CONTACT US</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


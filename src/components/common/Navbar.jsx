import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaChartLine, FaFire, FaStream } from 'react-icons/fa';

const NavItem = ({ icon: Icon, children, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      style={{
        padding: '10px 15px',
        borderRadius: '5px',
        fontWeight: '500',
        backgroundColor: isActive ? '#3182ce' : 'transparent',
        color: isActive ? '#fff' : '#4a5568',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s',
      }}
      activeStyle={{
        backgroundColor: '#2b6cb0',
        color: '#fff',
      }}
    >
      <Icon style={{ marginRight: '8px' }} />
      {children}
    </NavLink>
  );
};

const Navbar = () => {
  return (
    <nav
      style={{
        position: 'sticky',
        top: '0',
        zIndex: '1000',
        backgroundColor: '#fff',
        padding: '10px 20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '60px',
        }}
      >
        <div
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#3182ce',
          }}
        >
          Social Media Analytics
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <NavItem icon={FaStream} to="/feed">
            Feed
          </NavItem>
          <NavItem icon={FaChartLine} to="/top-users">
            Top Users
          </NavItem>
          <NavItem icon={FaFire} to="/trending-posts">
            Trending
          </NavItem>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
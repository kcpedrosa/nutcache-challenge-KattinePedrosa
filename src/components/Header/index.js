
import { useContext } from 'react';
import './header.css';
import avatar from '../../assets/avatar.png';

import {AuthContext} from '../../contexts/auth';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiBarChart2, FiSettings } from "react-icons/fi";
//npm install react-icons, install that to use some nice icons
//search in google react-icons
/**
 * FiHome is the name of the icon etc
 */

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div>
        <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Avatar Cover" />
      </div>

      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        Employee List
      </Link>
      <Link to="/customers">
        <FiUser color="#FFF" size={24} />
        Save Employee Initial Data 
      </Link>
      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />        
        Configurations/Your Panel
      </Link>
    </div>
  );
 }
 //FiHome is rendered with white color with size 24
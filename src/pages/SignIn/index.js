
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png'
import './signIn.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    /**prev def prevents the page from F5 */
    signIn(email, password);
  }

  return (
  <div className="container-center">
    <div className="login">
      <div className="logo-area" >
        <img src={logo} alt="Chamados Logo"/>
      </div>

      <form onSubmit={handleSubmit}>
        <h1>Enter</h1>
        <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)}  />
        <button type="submit">{loadingAuth ? 'Processing...' : 'Enter'}</button>
      </form>

      <Link to="/register">Create an account</Link>
    </div>
  </div>
  );
 }
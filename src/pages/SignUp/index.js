
import { useState, useContext} from 'react';
import { AuthContext } from '../../contexts/auth';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png'

export default function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth} = useContext(AuthContext)

  function handleSubmit(e){
    e.preventDefault();
    signUp(email, password, nome);  
    // console.log(String(loadingAuth));
  }

  return (
  <div className="container-center">
    <div className="login">
      <div className="logo-area" >
        <img src={logo} alt="Chamados Logo"/>
      </div>

      <form onSubmit={handleSubmit}>
        <h1>Create an account</h1>
        <input type="text" placeholder="Your name" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)}  />
        <button type="submit">{loadingAuth ? 'Accessing...' : 'Sign up'}</button>
      </form>

      <Link to="/">Already have an account? Enter</Link>
    </div>
  </div>
  );
 }
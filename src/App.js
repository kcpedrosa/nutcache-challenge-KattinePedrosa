
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './contexts/auth';
import { BrowserRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';

export default function App() {
  return (
   <AuthProvider>
     <BrowserRouter>
      <ToastContainer autoClose={5000} />
      <Routes/>
     </BrowserRouter>
   </AuthProvider>
 );
}
//3000 is 3 seconds of toast
import { useState } from 'react';
import './customers.css';

import firebase from '../../services/firebaseConnection';
import {toast} from 'react-toastify';
import { FiUser } from "react-icons/fi"
import Header from '../../components/Header';
import Title from '../../components/Title';

export default function Customers() {
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [genero, setGenero] = useState('');


  async function handleAdd(e){
    e.preventDefault();

    if(nomeFantasia && cnpj && endereco !== '' && genero !== ''){
      await firebase.firestore().collection('customers')
      .add({
        nomeFantasia: nomeFantasia,
        cnpj: cnpj,
        endereco: endereco,
        genero: genero,
      })
      .then(()=>{
        setNomeFantasia('');
        setCnpj('');
        setEndereco('');
        setGenero('');
//after saving we will clean the txt
        toast.info('Employee data saved with success!!');
      })
      .catch((error)=>{
        console.log('AN ERROR OCCURRED: ' + error);
        toast.error('Ops, an error occurred!');
      })
    }else{
      toast.error('Please fill all the fields !!')
    }

  }

 return (
   <div>
     <Header/>
     <div className="content">
      <Title name="Employees">
        <FiUser size={25} />
      </Title>

      <div className="container">
      
        <form className="form-profile customers" onSubmit={handleAdd}>
          
          <label>Name</label>
          <input placeholder="Name of the person here..." type="text" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)}  />
          
          <label>CPF</label>
          <input placeholder="Enter CPF (only numbers)" type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)}  />
          
          
          <button type="submit">Save Data</button>
        </form>

      </div>

    </div>
   </div>
 );
}
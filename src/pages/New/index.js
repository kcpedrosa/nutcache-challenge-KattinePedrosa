
import { useState, useEffect, useContext } from 'react';
import './new.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FiPlus, FiPlusCircle } from "react-icons/fi";

export default function New() {
  const { id } = useParams();
  const history = useHistory();

  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);
  //loadCust as true means it will open the page loading the data
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [assunto, setAssunto] = useState('Mobile');
  const [status, setStatus] = useState('Active');
  const [complemento, setComplemento] = useState('');
  const [birthday, setBirthday] = useState('');
  const [genero, setGenero] = useState(''); 
  const [email, setEmail] = useState('');

  const [idCustomer, setIdCustomer] = useState(false);


  const { user } = useContext(AuthContext);

  

  useEffect(()=>{

    async function loadCustomers(){
      await firebase.firestore().collection('customers')
      .get()
      .then((snapshot)=>{
        let lista = [];
  
        snapshot.forEach((doc)=>{
          lista.push({
            id: doc.id,
            nomeFantasia: doc.data().nomeFantasia,
          })
        })
        
        if(lista.length === 0){
          console.log('No data!!!') //No data found, no employees 
          setCustomers([ {id:'1', nomeFantasia: 'Some Data...'}  ]);
          setLoadCustomers(false);
          return;
        }

        // console.log(lista);
        setCustomers(lista);
        setLoadCustomers(false);

        if(id){
          loadId(lista);
        }

  
      })
      .catch(()=>{
        console.log('DEU ALGUM ERRO!');
        setLoadCustomers(false);
        setCustomers([ {id:'1', nomeFantasia: ''}  ]);
      })
    }

    loadCustomers();


    return () => {
      // console.log('COMPONENTE DESMONTADO')
    };

  }, []);


  async function loadId(lista){
    await firebase.firestore().collection('chamados').doc(id)
    .get()
    .then((snapshot)=>{

      setAssunto(snapshot.data().assunto);
      setStatus(snapshot.data().status);
      setComplemento(snapshot.data().complemento);
      setBirthday(snapshot.data().birthday);
      setGenero(snapshot.data().genero);
      setEmail(snapshot.data().email);
  
      let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
      console.log(index);
      setCustomerSelected(index);
      setIdCustomer(true);

     })
     .catch((err)=>{
       console.log('Error in the ID that was sent', err)
       setIdCustomer(false);
     })
  }

//call when person is selected
  function handheChangeCustomers(e){
    console.log('Person Index Id', e.target.value);
    console.log('Person selected', customers[e.target.value]);
    setCustomerSelected(e.target.value)
  }
//called when team is changed
  function handleChangeSelect(e){
    setAssunto(e.target.value); // console.log(e.target.value);
  }

 //called when status change [active etc]
  function handleOptionChange(e){
    setStatus(e.target.value);
    //console.log(e.target.value);//to check if it is catching
  }

 //for the birthday
 /*
  function handleChangeInput(e){
    console.log('Recorded Birthday');
    setStatus(e.target.value);
  }
*/

  async function handleRegister(e){
    e.preventDefault();
    // console.log(customers[customerSelected].nomeFantasia);  pegando nome do cliente selecionado
    if(idCustomer){
      await firebase.firestore().collection('chamados')
      .doc(id)
      .update({
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        birthday:birthday,
        email:email,
        genero:genero,
        userId: user.uid
      })
      .then(()=>{
        toast.success('Date successfully edited!');
        setCustomerSelected(0);
        setComplemento('');
        history.push('/dashboard')
      })
      .catch((err)=>{
        toast.error('Ops, something went wrong.');
        console.log(err);
      })

      return;
    }
    await firebase.firestore().collection('chamados')
    .add({
      created: new Date(),
      cliente: customers[customerSelected].nomeFantasia,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      status: status,
      birthday: birthday,
      email:email,
      genero:genero,
      complemento: complemento,
      userId: user.uid
    })
    .then(()=>{
      toast.success('Data registered with success!');
      setCustomerSelected(0);
      setComplemento('')
    })
    .catch((err)=>{
      toast.error('Ops something gone wrong, try again.');
      console.log(err);
    })
  }


 return (
   <div>
      <Header/>

      <div className="content">
        <Title name="New Employee">
          <FiPlusCircle size={25} />
        </Title>

      <div className="container">
      
        <form className="form-profile" onSubmit={handleRegister}>
          
          <label>Employee Name</label>
        {/* conditional render
        if loadCustomers is T then render bellow */}
          {loadCustomers ? (
            <input type="text" 
            disabled={true} 
            value="Loading database..." />
          ) : (
            <select value={customerSelected} 
            onChange={handheChangeCustomers}>
            {customers.map((item, index)=>{
              return(
                <option key={item.id} 
                value={index}>
                  {item.nomeFantasia}
                </option>
              )
            })}           
            </select>
          )}

          <label>Team</label>
          <select value={assunto} onChange={handleChangeSelect}>
              <option value="Mobile">Mobile</option>
              <option value="Front End">Front End</option>
              <option value="Back End">Back End</option>             
          </select>

          
          <label >Birthday:</label>
          <textarea 
          className="year"
          type="text" 
          placeholder="day/month/year, example: 01/01/2001"
          value={birthday}
          onChange={ (e) => setBirthday(e.target.value) }
          />

          <label>E-mail</label>
          <input className="e-mail"  
          placeholder="E-mail" 
          type="text" value={email} 
          onChange={(e) => setEmail(e.target.value)}  />

          <label>Gender</label>{/* just to show inline CSS */}
          <input style={{ height: 50 }}  
          placeholder="Gender, like Male, Female or others..." 
          type="text" value={genero} onChange={(e) => setGenero(e.target.value)}  />



          <label>Status</label>
          <div className="status">
            <input 
            type="radio" 
            name="status" 
            value="Active" 
            checked={status === 'Active'} 
            onChange={handleOptionChange}
            />
            <span>Active</span>
            <input
            type="radio" 
            name="status" 
            value="Licensed" 
            checked={status === 'Licensed'} 
            onChange={handleOptionChange}
            />
            <span>Licensed</span>

            <input 
            type="radio" 
            name="status" 
            value="Retired" 
            checked={status === 'Retired'} 
            onChange={handleOptionChange} 
            />
            <span>Retired</span>
          </div>

          <label>Additional info</label>
          <textarea 
          type="text" 
          placeholder="Write here more information. (optional)"
          value={complemento}
          onChange={ (e) => setComplemento(e.target.value) }
          />
          
          <button type="submit">Register</button>
        </form>

      </div>

      </div>

   </div>
 );
}
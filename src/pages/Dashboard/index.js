
import { useContext, useEffect, useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns'
//just above is a wonderful lib for date/time treatment

import {AuthContext} from '../../contexts/auth'
import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';

import { FiDelete, FiPlus, FiMessageSquare, FiSearch,  FiEdit2 } from "react-icons/fi";

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [chamados, setChamados] = useState([]);
  const [lastDocs, setLastDocs] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();
  
  useEffect(()=>{

    loadChamados();

    return () => {
      // console.log('COMPONENTE DESMONTADO')
    };

  }, []);

  //see what is listRef in line 15
  async function loadChamados(){
    await listRef.limit(5)
    .get()
    .then((snapshot)=>{  
      updateState(snapshot)
    })
    .catch((err)=>{
      console.log('SOMETHING WENT WRONG! ', err);
      setLoadingMore(false);
    })

    setLoading(false);
  }

  async function updateState(snapshot){
    const isCollectionEmpty = snapshot.size === 0;
    if(!isCollectionEmpty){
      let lista = [];
  
      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          genero: doc.data().genero,
          email: doc.data().email,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy' ),
          status: doc.data().status,
          complemento: doc.data().complemento
        }) 
      })

      const lastDoc = snapshot.docs[snapshot.docs.length -1]; // catching last doc
      // console.log(lastDoc);
      setChamados(chamados => [...chamados, ...lista]);
      setLastDocs(lastDoc);

    }else{
      setIsEmpty(true);
    }
  
    setLoadingMore(false);
  
   }


   async function handleMore(){
    setLoadingMore(true);
    await listRef.startAfter(lastDocs).limit(5).get()
    .then((snapshot)=>{
      updateState(snapshot);
    })
   }

  function togglePostModal(item){
    setShowPostModal(!showPostModal); //trocando true e false...
    setDetail(item);
  }

  async function onDelete(id){
    console.log("I want to delete you!"+id);
    if(window.confirm("Are you sure that you want to delete?")){
      await firebase.firestore().collection('chamados').doc(id)
      .delete()
      .then(()=>{
        console.log("Deleted successfully.")
      })
      .catch(()=>{
        console.log("Something gone wrong.")
      })
      window.location.reload()
    }
    
  }

  if(loading){
    return(
      <div>
         <Header/>
         <div className="content">
          <Title name="Data">
            <FiMessageSquare size={25} />
          </Title>

          <div className="container dashboard">
            <span>Searching for data...</span>
          </div>

        </div>
      </div>
    )
  }
  
  return (
    <div>
      <Header/>

      <div className="content">
        <Title name="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>


      {chamados.length === 0 ? (
        <div className="container dashboard">
          <span>No employee was registered yet...</span>

          <Link to="/new" className="new">
            <FiPlus size={25} color="#FFF" />
            New Employee
          </Link>
        </div>
      ) : (
        <>
        <Link to="/new" className="new">
          <FiPlus size={25} color="#FFF" />
          New Employee
        </Link>        

        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Team</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Status</th>
              <th scope="col">When he/she started</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
          {chamados.map((item, index) => {
                return(
                  <tr key={index}>
                    <td data-label="Employee">{item.cliente}</td>
                    <td data-label="Assunto">{item.assunto}</td>
                    <td data-label="Email">{item.email}</td>
                    <td data-label="Gender">{item.genero}</td>
                    <td data-label="Status">
                      <span className="badge" style={{ backgroundColor:item.status === 'Active' ? '#5CB85C' : '#999' }}>{item.status}</span>
                    </td>
                    <td data-label="Cadastrado">{item.createdFormated}</td>
                    <td data-label="#">
                      <button onClick={() => togglePostModal(item)} className="action" style={{ backgroundColor:'#3583F6'}}>
                        <FiSearch color="#fff" size={17} />
                      </button>
                      <button onClick={() => onDelete(item.id)} className="action" style={{ backgroundColor:'#FA5858'}}>
                        <FiDelete color="#fff" size={17} />
                      </button>
                      <Link to={`/new/${item.id}`}  className="action" style={{ backgroundColor:'#F6A935'}}>
                        <FiEdit2 color="#fff" size={17} />
                      </Link>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table> 

        {loadingMore && <h3 style={{textAlign:'center', marginTop: 15}}>Searching for data...</h3>}
        {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Search more</button>} 
       
        </>
      )}      
    
      </div>

      {showPostModal && (
      <Modal
      conteudo={detail}
      close={togglePostModal}
      />
      )}

    </div>
  );
 }





//  useEffect(()=>{
//   async function loadChamados(){
//     await listRef.limit(5)
//     .get()
//     .then((snapshot)=>{
//       let lista = [];

//       snapshot.forEach((doc)=>{
//         lista.push({
//           id: doc.id,
//           assunto: doc.data().assunto,
//           cliente: doc.data().cliente,
//           clienteId: doc.data().clienteId,
//           created: doc.data().created,
//           createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy' ),
//           status: doc.data().status,
//           complemento: doc.data().complemento
//         })
//         //Converter TimeStamp para Data > doc.data().created.toDate()        
//         // console.log( format(doc.data().created.toDate(), 'dd/MM/yyyy' ) ); 
      
//       })
      
//       // console.log(lista);
//       setChamados(lista);
//       setLoading(false);

//     })
//     .catch((err)=>{
//       console.log('DEU ALGUM ERRO! ', err);
//       setLoading(false);
//     })
//   }

//   loadChamados();


//   return () => {
//     // console.log('COMPONENTE DESMONTADO')
//   };

// }, []);
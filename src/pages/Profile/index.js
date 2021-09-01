import {useState, useContext} from 'react';
import './profile.css';
import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import {AuthContext} from '../../contexts/auth';
import { FiSettings, FiUpload } from "react-icons/fi";

import avatar from '../../assets/avatar.png';

export default function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
 
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  async function handleFile(e){

    if(e.target.files[0]){
      //if he really chose a pic...
      const image = e.target.files[0];
      
      if(image.type === 'image/png' || image.type === 'image/jpeg'){
        console.log(e.target.files[0])
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(e.target.files[0]))
      }else{
        alert('Upload PNG or JPG picture (PNG/JPG are formats of image).');
        setAvatarUrl(null);
        setImageAvatar(null);
        return null;
      }

    }
  }

  //uploading pic to firebase storage
  async function handleUpload(){
    const currentUid = user.uid;

    const uploadTasks = await firebase.storage()
    .ref(`images/${currentUid}/${imageAvatar.name}`)
    .put(imageAvatar)
    .then(async () => {
      console.log('FOTO ENVIADA COM SUCESSO!')

      await firebase.storage().ref(`images/${currentUid}`)
      .child(imageAvatar.name).getDownloadURL()
      .then(async (url)=>{
        let urlFoto = url;

        await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
          avatarUrl: urlFoto,
          nome: nome
        })
        .then(()=>{

          let data = {
            ...user,
            avatarUrl: urlFoto,
            nome: nome
          }
          setUser(data);
          storageUser(data);

        })

      })
    })
  

  }

  async function handleSave(e){
    e.preventDefault();
    // console.log(imageAvatar.name);

    if(imageAvatar === null && nome !== ''){
      await firebase.firestore().collection('users')
      .doc(user.uid)
      .update({
        nome: nome
      })
      .then(()=>{

        let data = {
          ...user,
          nome: nome
        }
        setUser(data);
        storageUser(data);
      })
    }
    else if(nome !== '' && imageAvatar !== null){
      handleUpload();
    }

  }


  function handleSignOut(){
    signOut();
  }

 return (
   <div>
    <Header/>

    <div className="content">
      <Title name="Profile">
        <FiSettings size={25} />
      </Title>

      <div className="container">
      
      <form className="form-profile" onSubmit={handleSave}>
        
        <label className="label-avatar">
        
        <span><FiUpload color="#fff" size={25} /></span>
       
        <input type="file" onChange={handleFile}  accept="image/*" /><br/>
          {avatarUrl === null ? 
          <img src={avatar} width="250" height="250" alt="Avatar Profile"/>
          :
          <img src={avatarUrl} width="250" height="250" alt="Avatar Profile"/>
          }
         </label>

        <label>Name</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}  />
        
        <label>E-mail</label>
        <input type="text"  value={email} disabled={true} />
        <button type="submit">Save</button>
      </form>
      </div>

      <div className="container" style={{marginTop: 10}}>
        <button className="logout-btn" onClick={handleSignOut}>
          Logoff
        </button>
      </div>  


    </div>
   </div>
 );
}
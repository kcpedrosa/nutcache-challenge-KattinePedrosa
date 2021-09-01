import { useState, createContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({});
/**this auth.js will aid us with authentication 
 * duties */
function AuthProvider({children}){
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    function loadStorage(){
        const storageUser = localStorage.getItem('@user')
/**if [ there is smtng in that storageUser ?]
 * if yes, proceeds  as bellow
 */
        if(storageUser){
            setUser(JSON.parse(storageUser));
            setLoading(false);
        }

        setLoading(false);
    }
    
    loadStorage();
 }, []);


  //Register user
  async function signUp(email, password, name){
    setLoadingAuth(true);

    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async (value)=>{
        let uid = value.user.uid;

        await firebase.firestore().collection('users')
        .doc(uid).set({
            nome: name,
            avatarUrl: null,
        })
        .then( () => {
            let data = {
                uid: uid,
                nome: name,
                email: value.user.email,
                avatarUrl: null,
            };
            
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);      
            toast.success('Welcome to the platform!')          
        })

    })
    .catch((error)=> {
        console.log(error);
        toast.error('Ops, something has gone wrong! Maybe you wrote something wrong!')
        setLoadingAuth(false);
    });
  }

  //Function to log user in
  async function signIn(email, password){
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid = value.user.uid;
            console.log(uid);

        //Buscar o nome e avatar do usuario logado
        const userProfile = await firebase.firestore().collection('users')
        .doc(uid).get();

        console.log(userProfile.data().nome)


        let data = {
            uid: uid,
            nome: userProfile.data().nome,
            avatarUrl: userProfile.data().avatarUrl,
            email: value.user.email,
        };


        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success('Hey, welcome back!!')
        //you must run npm install react-tostify to use toasts
        //toast is a interesting green greeting    
        })
        .catch((error)=> {
            console.log(error);
            toast.error('Ops! Something has gone wrong! Maybe you made a mistake while writing!')
            setLoadingAuth(false);
        });
    }  

/**function to save item in storage */
  function storageUser(data){
      localStorage.setItem('@user', JSON.stringify(data));
  } 


  async function signOut(){
    await firebase.auth().signOut();
    localStorage.removeItem('@user');
    setUser(null);
  }
 
  return(
    <AuthContext.Provider 
    value={{ 
      signed: !!user,
      user, 
      loadingAuth, 
      signUp, 
      signIn, 
      signOut, 
      loading,
      setUser,
      storageUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
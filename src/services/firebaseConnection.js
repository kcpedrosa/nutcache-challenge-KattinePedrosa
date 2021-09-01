import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

  //Configurações do seu projeto
  let firebaseConfig = {
    apiKey: "AIzaSyAFbYoQjJojN_cddsqik9-tJUzucWOSBY0",
    authDomain: "sistema-ab291.firebaseapp.com",
    projectId: "sistema-ab291",
    storageBucket: "sistema-ab291.appspot.com",
    messagingSenderId: "856326652441",
    appId: "1:856326652441:web:f93b35e1609db8c57b2088",
    measurementId: "G-H2J0Y1K4QR"
  };
  /** bellow are the credentials
   * that is for general tests
   * rogue one
   * nutcache bellow
   * firebaseConfig = {
  apiKey: "AIzaSyAFbYoQjJojN_cddsqik9-tJUzucWOSBY0",
  authDomain: "sistema-ab291.firebaseapp.com",
  projectId: "sistema-ab291",
  storageBucket: "sistema-ab291.appspot.com",
  messagingSenderId: "856326652441",
  appId: "1:856326652441:web:f93b35e1609db8c57b2088",
  measurementId: "G-H2J0Y1K4QR"
};
   * firebaseConfig = {
  apiKey: "AIzaSyASnM0F4Q2CabTh6EfrtNidJh2gqIBcZzY",
  authDomain: "sistema-bacc6.firebaseapp.com",
  projectId: "sistema-bacc6",
  storageBucket: "sistema-bacc6.appspot.com",
  messagingSenderId: "957600227094",
  appId: "1:957600227094:web:e177503497865188733a37",
  measurementId: "G-EQD7XVD7VN"

  firebaseConfig = {
    apiKey: "AIzaSyBDrT-tStpHnm5_Je3z2FBF1YwI3NhMYss",
    authDomain: "temp-ae24c.firebaseapp.com",
    databaseURL: "https://temp-ae24c.firebaseio.com",
    projectId: "temp-ae24c",
    storageBucket: "temp-ae24c.appspot.com",
    messagingSenderId: "371259611310",
    appId: "1:371259611310:web:35f9131545efcf0a4b753f",
    measurementId: "G-PK0KY176Y1"
};
   */

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;

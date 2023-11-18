// data.js
const firebaseConfig = {
    apiKey: "AIzaSyCQqjrIMoebRsvMwgRZz8w9es-1sr0odac",
    authDomain: "auditoria-d2d8e.firebaseapp.com",
    databaseURL: "https://auditoria-d2d8e-default-rtdb.firebaseio.com",
    projectId: "auditoria-d2d8e",
    storageBucket: "auditoria-d2d8e.appspot.com",
    messagingSenderId: "441370100897",
    appId: "1:441370100897:web:0cadd08efc2656afe29ce0",
    measurementId: "G-RHQKEGXGPT",
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const database = firebaseApp.database();
  
  export { database };
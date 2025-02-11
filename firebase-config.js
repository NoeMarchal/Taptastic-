const firebaseConfig = {
    apiKey: "AIzaSyDu7d8994S6dkJVZKvg95y8u3mmfkoTsgM",
    authDomain: "clickers-e7910.firebaseapp.com",
    projectId: "clickers-e7910",
    storageBucket: "clickers-e7910.firebasestorage.app",
    messagingSenderId: "632937859285",
    appId: "1:632937859285:web:86cd51dcfc434a34acfa5c",
    measurementId: "G-6HWX6VCJVJ"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth();
  const db = firebase.firestore();
  
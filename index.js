 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-analytics.js";
 import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

 const firebaseConfig = {
     apiKey: "AIzaSyBwNF_OzxRHegxs4empNNNVodo_4fprNr8",
     authDomain: "fir-tut-30602.firebaseapp.com",
     projectId: "fir-tut-30602",
     storageBucket: "fir-tut-30602.appspot.com",
     messagingSenderId: "423356542054",
     appId: "1:423356542054:web:cd6b4e985cee95e8b291a7",
     measurementId: "G-JJRBL73YK5"
 };


 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

 const db = getDatabase();
 let name = document.getElementById('name');
 let age = document.getElementById('age');
 let usn = document.getElementById('usn');

 //buttons
 let submit = document.getElementById('submit');
 let getVal = document.getElementById('get');
 let Update = document.getElementById('update');
 let Remove = document.getElementById('remove');



 //insert val into db
 function insertData() {
     set(ref(db, "Students/" + usn.value), {
             Name: name.value,
             Age: age.value,
             USN: usn.value
         })
         .then(() => {
             alert("Data stored successfully ");
         })
         .catch((err) => {
             alert("Unsuccessfull ");
         })
 }
 //getting val from db
 function getData() {
     const dbref = ref(db);
     get(child(dbref, "Students/" + usn.value))
         .then((snapshot) => {
             if (snapshot.exists()) {
                 name.value = snapshot.val().Name;
                 age.value = snapshot.val().Age;
             } else
                 alert("couldnt found");

         })

     .catch((error) => {
         alert("Error" + error);
     })
 }
 //update the value
 function UpdateData() {
     update(ref(db, "Students/" + usn.value), {
             Name: name.value,
             Age: age.value,

         })
         .then(() => {
             alert("Data updated successfully ");
         })
         .catch((err) => {
             alert("Unsuccessfull " + err);
         })
 }
 //remove the data from db
 function removeData() {
     remove(ref(db, "Students/" + usn.value))
         .then(() => {
             alert("Data updated successfully ");
         })
         .catch((err) => {
             alert("Unsuccessfull " + err);
         })
 }

 submit.addEventListener('click', insertData);

 getVal.addEventListener('click', getData);
 Update.addEventListener('click', UpdateData);
 Remove.addEventListener('click', removeData);
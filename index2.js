import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-analytics.js";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

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

const db = getFirestore();

//getting all the fields
let name = document.getElementById('name');
let age = document.getElementById('age');
let usn = document.getElementById('usn');

//buttons
let send = document.getElementById('submit');
let getData = document.getElementById('get');
let Update = document.getElementById('update');
let Remove = document.getElementById('remove');


//functions for all the CRUD operations 
async function sendData() {
    let ref = doc(db, "Student", usn.value); //collection for two parameter , doc for 3 parameter
    const docref = await setDoc( //addDoc for two parametr ,setDoc for 3 parameter
            ref, {
                Name: name.value,
                Age: age.value,
                USN: usn.value
            }
        )
        .then(() => {
            alert("added data into db");
        })
        .catch((err) => {
            alert(err);
        })
}
//get data
async function GetData() {
    let ref = doc(db, "Student", usn.value);
    const docsnap = await getDoc(ref);
    if (docsnap.exists()) {
        name.value = docsnap.data().Name;
        age.value = docsnap.data().Age;
    } else {
        alert("No such document")
    }
}
//update the field
async function updateField() {
    let ref = doc(db, "Student", usn.value);
    await updateDoc(
            ref, {
                Name: name.value,
                Age: age.value
            }
        )
        .then(() => {
            alert("Field is updated successfully");
        })
        .catch((err) => {
            alert(err);
        })
}
//delete the field 
async function DeleteData() {
    let ref = doc(db, "Student", usn.value);
    const docsnap = await getDoc(ref);
    if (!docsnap.exists()) {
        alert("Invalid usn or the field is not in db");
        return;
    } else {
        await deleteDoc(ref)
            .then(() => {
                alert("Successfully deleted");
            })
            .catch((err) => {
                alert("Error " + err);
            })
    }

}


//adding event listener

send.addEventListener('click', sendData);
getData.addEventListener('click', GetData);
Update.addEventListener('click', updateField);
Remove.addEventListener('click', DeleteData);
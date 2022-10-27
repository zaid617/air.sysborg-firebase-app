import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, onSnapshot, query , orderBy ,deleteDoc, doc} from "firebase/firestore";
import Input from "./components/inputSection/Input";
import Navbar from "./components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyDIQaWAhZPkRZDj1hCZ6Y6OuyXWQ_elN9Y",
  authDomain: "first-data-base-f5140.firebaseapp.com",
  projectId: "first-data-base-f5140",
  storageBucket: "first-data-base-f5140.appspot.com",
  messagingSenderId: "882461136193",
  appId: "1:882461136193:web:30064d89d69f4c093dbdc0",
  measurementId: "G-BHLQVYTTTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default function App() {

  let [text, setText] = useState("");
  let [textArr, setTextArr] = useState([]);
  let [classID, setClassID] = useState("")
  const [Ip, setIP] = useState('');

  useEffect(() => {
    
    let unsubscribe = null;

      //creating function to load ip address from the API
      const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data);
        setIP(res.data.IPv4)
      }

    getData();

    if (!classID) {
      return
    }
    const realTimeData = async () => {

     const q = query(collection(db, classID), orderBy("date","desc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const assignments = [];
        querySnapshot.forEach((doc) => {
          assignments.push({id: doc.id, ...doc.data()});
        });
        console.log("Assignment ", assignments);
        setTextArr(assignments)
      });
    }
      
      realTimeData()

      return () => {
        unsubscribe()
      }

      
      
      
      
    }, [])
    
    const ip = Ip

  const submitHandler = async (e) => {

    e.preventDefault();


    // firebase demo function for getting data from firebase not real time

    if (!text) {
      return
    }

    else {
      if (!classID) {
      
        document.getElementById("error").style.display = "block"
        document.getElementById("classBtn").style.backgroundColor = "red"
        document.getElementById("classBtn").innerHTML = "&#10799;"
        setTimeout(() => {
          document.getElementById("error").style.display = "none"
          document.getElementById("classBtn").style.backgroundColor = "#6601eb"
        document.getElementById("classBtn").innerHTML = "&#10003;"
        }, 1500);

        return;
      }
      else{
      try {
        const docRef = await addDoc(collection(db, classID), {
          assignment: text,
          date: new Date().getTime(),
          ip:ip,
          delete : "delete"
        });
        console.log("Document written with ID: ", docRef.id);
        setText("");
      } catch (e) {
        console.error("Error adding document: ",);

      }
    }
  }


  }

  const deleteHandler = (e) => {

    e.preventDefault()

    let secID = prompt("Enter Admin Password")

    if (secID === "delete312") {
      console.log("delete all");
      textArr.map(async()=>{
        await deleteDoc(doc(db, classID , "delete"));
      })
      
    }
    else {
      window.alert("Incorrect Password!")
    }

  }


  const deleteItem = async (textId ,ip) => {
    if(ip===Ip){
      console.log("item deleted");
    await deleteDoc(doc(db, classID , textId));
    }
    else{
      alert("you can not delete others text")
    }
  }


  const idSub = (e) => {
    e.preventDefault();

    if (!classID) {
      
      document.getElementById("error").style.display = "block"
      document.getElementById("classBtn").style.backgroundColor = "red"
      document.getElementById("classBtn").innerHTML = "&#10799;"
      setTimeout(() => {
        document.getElementById("error").style.display = "none"
        document.getElementById("classBtn").style.backgroundColor = "#6601eb"
      document.getElementById("classBtn").innerHTML = "&#10003;"
      }, 1500);

      return
    }

    else {
      const realTimeData = async () => {

        const q = query(collection(db, classID), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const assignments = [];
          querySnapshot.forEach((doc) => {
            assignments.push({id: doc.id, ...doc.data()});
          });
          console.log("Assignment ", assignments);
          setTextArr(assignments)
        });

      }

      realTimeData();
    }

  }




  return (
    <>
      <div>
        <Navbar />
        <Input 
        submitHandler={submitHandler}
        ip={ip}
        deleteHandler={deleteHandler} 
        idSub={idSub} 
        setClassID={setClassID} 
        classID={classID} 
        text={text} 
        setText={setText} 
        textArr={textArr} 
        setTextArr={setTextArr} 
        deleteItem={deleteItem}
        />

      </div>

    </>
  )
}

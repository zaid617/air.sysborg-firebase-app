import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import Input from "./components/inputSection/Input";
import Navbar from "./components/navbar/Navbar";
import { useEffect, useState } from "react";

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
  let [classID, setClassID] = useState("Class ID")

 

  useEffect(() => {

    let unsubscribe = null;

    const realTimeData = async () => {

      const q = query(collection(db, classID));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
        const assignments = [];
        querySnapshot.forEach((doc) => {
          assignments.push(doc.data());
        });
        console.log("Assignment ", assignments);
        setTextArr(assignments)
      });

    }

    realTimeData();

    return ()=> {
      unsubscribe()
    }

  }, [])


  const submitHandler = async (e) => {

    e.preventDefault();


    // firebase demo function for getting data from firebase not real time

   if(!text){
     return
   }

   else{

    try {
      const docRef = await addDoc(collection(db, classID), {
        assignment: text,
        date: new Date().getTime(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ",);

    }
   }


  }

  const deleteHandler =  (e) => {

    e.preventDefault();

    console.log("delete all");

  }


  const deleteItem = () => {
    console.log("item deleted");
  }


  const idSub = (e)=>{
    e.preventDefault();

    if(!classID){
      return
    }

    else{
      const realTimeData = async () => {

        const q = query(collection(db, classID));
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const assignments = [];
          querySnapshot.forEach((doc) => {
            assignments.push(doc.data());
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
        <Input submitHandler={submitHandler} deleteHandler={deleteHandler} idSub={idSub} setClassID={setClassID} classID={classID} text={text} setText={setText} textArr={textArr} setTextArr={setTextArr} />

      </div>

    </>
  )
}

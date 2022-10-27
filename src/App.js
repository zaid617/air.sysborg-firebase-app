import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import Input from "./components/inputSection/Input";
import Navbar from "./components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { async } from "@firebase/util";

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
  const[Unsubscribe, setUnsubscribe] = useState(()=>{return null})

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  getData();
  const ip = Ip

  useEffect(() => {

    let unsubscribe = null;
    if (!classID) {
      return
    }
    const realTimeData = async () => {

      const q = query(collection(db, classID), orderBy("date", "desc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const assignments = [];
        querySnapshot.forEach((doc) => {
          assignments.push({ id: doc.id, ...doc.data() });
        });
        setTextArr(assignments)
      });
    }

    realTimeData()
    setUnsubscribe(unsubscribe())

    return () => {
      unsubscribe()
    }





  }, [])


  const submitHandler = async (e) => {

    e.preventDefault();
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
      else {
        try {
          const docRef = await addDoc(collection(db, classID), {
            assignment: text,
            date: new Date().getTime(),
            ip: ip,
          });
          setText("");
        } catch (e) {
          console.error("Error adding document: ",);

        }
      }
    }


  }

  const deleteHandler = async(e) => {

    e.preventDefault()

    let secID = prompt("Enter Admin Password")

    if (secID === "delete312") {
        textArr.map(async(elem) => {
          await deleteDoc(doc(db, classID, elem.id));
        })

      }
      else {
        window.alert("Incorrect Password!")
        return;
      }

      return ()=>{
        Unsubscribe()
      }

  }


  const deleteItem = async (textId, ip) => {
    if (ip === Ip) {
      console.log("item deleted");
      await deleteDoc(doc(db, classID, textId));
    }
    else {
      alert("You Can't Delete Others Text !")
    }
  }


  const idSub = (e) => {
    e.preventDefault();
    let unsubscribe = null

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
         unsubscribe = onSnapshot(q, (querySnapshot) => {
          const assignments = [];
          querySnapshot.forEach((doc) => {
            assignments.push({ id: doc.id, ...doc.data() });
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

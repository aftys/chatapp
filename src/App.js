import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect,signInWithPopup } from "firebase/auth";
import { useState, useEffect, useRef } from 'react';
import { query, collection, orderBy, onSnapshot, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore';
import { GoogleButton } from 'react-google-button';
import {motion} from 'framer-motion';
import './App.css'
 


const firebaseConfig = {
    apiKey: "AIzaSyBbnEPPzuI7D2cSIwz5tOpLSfXZqIeLtko",
    authDomain: "chatapp-33f19.firebaseapp.com",
    projectId: "chatapp-33f19",
    storageBucket: "chatapp-33f19.appspot.com",
    messagingSenderId: "460901479094",
    appId: "1:460901479094:web:5ee76f30eb6a1826d62c17",
    measurementId: "G-XKHG8FDPBV"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

const style = {
    wrapper: `flex justify-center`,
    form: `h-10hv fixed bottom-0 bg-gray-800 w-full  flex items-center text-white text-l`,
    input: `block w-full h-full text-white bg-gray-900 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-gray-800`,
    button: `w-[20%] text-center h-full bg-green-500`,
    main: `flex flex-col p-[10px]`,
    appContainer: `max-w-[728px] mx-auto text-center`,
    sectionContainer: `flex flex-col h-[90vh] bg-gray-100 mt-10 shadow-xl border relative`,
    button2: `bg-gray-200 px-4 py-2 hover:bg-gray-100`,
    message: `flex items-center content-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
    name: `absolute mt-[-4rem] text-gray-600 text-xs`,
    sent: `flex-row-reverse text-white bg-blue-500 self-end`,
    received: `bg-[#e5e5ea] text-black`,
    nav: `bg-gray-800 z-10 w-[728px] top-0 fixed h-20 flex justify-between items-center p-4`,
    heading: `text-white text-3xl`,
    img:"w-10 h-10 rounded-full m-1.5"
}

const googleSignIn  = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

const SignIn = () => {
    return (
        <div className={style.wrapper}>
            <GoogleButton onClick={googleSignIn} />
        </div>
    )
}


const SendMessage = () => {
    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault()
        if (input === '') {
            alert('Please enter a valid message')
            return
        }
        const { uid, displayName,photoURL } = auth.currentUser
        await addDoc(collection(db, 'messages'), {
            text: input,
            name: displayName,
            uid,photoURL,
            timestamp: serverTimestamp()
        })
        
        
        setInput('');
        
    }

    return (
        <form onSubmit={sendMessage} >
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type='text'
                placeholder='Message'
            />
            <button  type='submit'>
                Send
            </button>
        </form>
    );
};



const Navbar = () => {
    const [user] = useAuthState(auth)
    console.log(user)
    return (
        <div className={style.nav}>
            <h1 className={style.heading}>Chat App</h1>
            {user ? <LogOut /> : <SignIn />}

        </div>
    );
};


const Message = ({ message,scroll }) => {
  const { text, uid, photoURL } = message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  useEffect(()=>{scroll.current.scrollIntoView({ behavior: 'smooth' })},[])
  return (
    <div
    
    className={`message ${messageClass}`}>
      <img src={photoURL || 'anonymos.jpeg'} />
      <motion.p initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      default: {
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01]
      },
      scale: {
        type: "spring",
        damping: 5,
        stiffness: 100,
        restDelta: 0.001
      }
    }}>{text}</motion.p>
    </div>
  )
};



const LogOut = () => {
    const signOut = () => {
        signOut(auth)
    }

    return (
        <button onClick={() => auth.signOut()} className={style.button2}>
            Logout
        </button>
    )
}



const Chat = () => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });
        scroll.current.scrollIntoView({ behavior: 'smooth' })
        return () => unsubscribe();
    }, []);

    return (
        <>
            <main className={style.main}>
                {messages &&
                    messages.map((message) => (
                        <Message key={message.id} message={message} scroll={scroll} />
                    ))}
            {/* Send Message Compoenent */}
                <span ref={scroll} class="mb-[100px]"></span>
            </main>
            <SendMessage />
            
        </>
    );
};


function App() {
    const [user] = useAuthState(auth);
    console.log(user)
    return (
        <div className={style.appContainer}>
            <section className='{style.sectionContainer}'>
                <Navbar />
                {user ? <Chat /> : null}
            </section>
        </div>
    );
}

export default App;

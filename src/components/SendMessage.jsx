import React,{ useState }  from 'react';
import {  collection, addDoc, serverTimestamp, } from 'firebase/firestore';
import {auth,db} from './'

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


export default SendMessage
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { query, collection, orderBy, onSnapshot, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore';
import {Message,SendMessage,db} from '.'



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
            <main className="flex flex-col p-[10px]">
                {messages &&
                    messages.map((message) => (
                        <Message key={message.id} message={message} scroll={scroll} />
                    ))}
                <span ref={scroll} class="mb-[100px]"></span>
            </main>
            <SendMessage />
            
        </>
    );
};

export default Chat
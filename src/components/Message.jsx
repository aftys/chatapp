import React,{useEffect} from 'react';
import {motion} from 'framer-motion';
import {auth,db} from './'

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


  export default Message
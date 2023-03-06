import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth,LogOut,SignIn} from '.'


const Navbar = () => {
    const [user] = useAuthState(auth)
    console.log(user)
    return (
        <div className="bg-gray-800 z-10 w-[728px] top-0 fixed h-20 flex justify-between items-center p-4">
            <h1 className="text-white text-3xl">Chat App</h1>
            {user ? <LogOut /> : <SignIn />}

        </div>
    );
};


export default Navbar;
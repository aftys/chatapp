import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css'
import{Navbar,Chat,auth} from './components'

function App() {
    const [user] = useAuthState(auth);
    console.log(user)
    return (
        <div className="max-w-[728px] mx-auto text-center">
            <section className="flex flex-col h-[90vh] bg-gray-100 mt-10 shadow-xl border relative">
                <Navbar />
                {user ? <Chat /> : null}
            </section>
        </div>
    );
}

export default App;
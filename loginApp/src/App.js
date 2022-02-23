import React,{useState} from 'react';
import './App.css';
export default function App({ history }) {
    var name="Rajashree"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handler = () => {
        history.push('/home');
    }
    return (
        <div className="loginSection">
            <div>
                <div className="header">Login</div>
                <div>Username</div>
                <input value={email} className='input' onChange={(e)=>setEmail(e.target.value)} />
                <div >Password</div>
                <input value={password} className='input' onChange={(e)=>setPassword(e.target.value)} className='input' />
                <div>
                    <button onClick={handler}>Login</button>
                </div>
            </div>
        </div>
    );
}
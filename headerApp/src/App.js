import React, { useState, useEffect } from 'react';
import './App.css';
import { GlobalStore } from 'redux-micro-frontend';

export default function App({ history }) {
   
    const [global, setGlobal] = useState(0);
    const [active, setActive] = useState('');

	const globalStore = GlobalStore.Get(false);
    useEffect(()=>{
        setTimeout(() => {
            globalStore.Subscribe("CounterApp", updateState)
		}, 0);
    },[])
	
	const updateState=(globalState) =>{
		if(globalState){
         setGlobal(globalState.global);
		 
		}
	 }
  
    const mfLoad=(url)=>{
        setActive(url);
        history.push(`/${url}`);
    }

    const handler = () => {
        history.push('/loginApp');
   }
  const getClassName=(name)=>{
   return active === name ? active : '';
  }
return (
    <div className="headerSection">
        <h1 style={{color:'red'}}>Header MF</h1>
        <div className="tab">
                <button className={`tablinks ${getClassName('home')}`} onClick={e=>mfLoad('home')}>Home</button>
                <button className={`tablinks ${getClassName('counterApp')}`} onClick={e=>mfLoad('counterApp')}>Counter App</button>
                <button className={`tablinks ${getClassName('todo')}`} onClick={e=>mfLoad('todo')}>Todo App</button>
                <button className={`tablinks ${getClassName('logoutApp')}`} onClick={handler}>Logout</button>
        </div>
        <div className='globalCounter'>
            <div>Global Count in header Mf {global}</div>
            
        </div>
    </div>
    
    );
}
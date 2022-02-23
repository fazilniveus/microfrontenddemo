import React ,{useState,useEffect}from 'react';
import { Counter } from './counter';
import { GlobalStore } from 'redux-micro-frontend';
import { CounterReducer } from './store/counterReducer';
import { IncrementLocalCounter, DecrementLocalCounter } from './store/local.actions';
import { IncrementGlobalCounter, DecrementGlobalCounter } from './store/global.actions';

  export function AppCounter() {
    const [local, setLocal] = useState(0);
    const [global, setGlobal] = useState(0);
    const [todo, setTodo] = useState(0);
    
    const globalStore = GlobalStore.Get(false);
    globalStore.CreateStore("CounterApp", CounterReducer, []);
    globalStore.RegisterGlobalActions("CounterApp", ["*"]);
    useEffect(()=>{
        getGlobalStore();
        try {
            globalStore.SubscribeToGlobalState("CounterApp", updateState)
        } catch (error) {
            
        }
    },[])
  
    // Get all state
    const getGlobalStore =()=>{
        const globalState = globalStore.GetGlobalState("*");
        updateState(globalState);
    }

    const incrementLocalCounter=()=> {
        globalStore.DispatchAction("CounterApp", IncrementLocalCounter());
    }

    const decrementLocalCounter=() =>{
        globalStore.DispatchAction("CounterApp", DecrementLocalCounter());
    }

   const incrementGlobalCounter=()=> {
        globalStore.DispatchAction("CounterApp", IncrementGlobalCounter());
    }

    const decrementGlobalCounter=() =>{
        globalStore.DispatchAction("CounterApp", DecrementGlobalCounter());
    }

   const updateState=(globalState) =>{
       if(globalState){
        setLocal(globalState.CounterApp.local);
        setGlobal(globalState.CounterApp.global);
        setTodo(globalState.CounterApp.todo);
       }
    }
	return (
        <div>
            <hr></hr>
            <h1 style={{color:'red'}}>Counter MF</h1>
            <Counter count={global} header="Global Counter" increment={incrementGlobalCounter} decrement={decrementGlobalCounter}></Counter>
            <Counter count={local} header="Local Counter" increment={incrementLocalCounter} decrement={decrementLocalCounter}></Counter>
            <h2>
                 Todo Counter
            </h2>
            <span>{todo}</span>
        </div>
	);
};
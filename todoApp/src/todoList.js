import React ,{useState,useEffect}from 'react';
import { Todo } from './todo';
import { createStore } from 'redux';
import { AddTodo as AddTodoComponent } from './addTodo';
import { TodoReducer } from './store/todoReducer';
import { GlobalStore } from 'redux-micro-frontend';
import { AddTodo, RemoveTodo } from './store/todo.actions';


export function TodoList() {

    const [todos, setTodos] = useState([]);
    const [globalCounter, setGlobalCounter] = useState(0);
    
    const globalStore = GlobalStore.Get(false);
    const store = createStore(TodoReducer);
    useEffect(()=>{
        globalStore.RegisterStore("TodoApp", store, [GlobalStore.AllowAll]);
        getGlobalStore();
        try {
            globalStore.SubscribeToGlobalState("CounterApp", counterChanged)
        }
        catch (error) {     
            //Since
            // console.log('errorr ',error);   
        }
        // globalStore.Subscribe("TodoApp", stateChanged);
    },[])

    // Get all state
    const getGlobalStore =()=>{
        const globalState = globalStore.GetGlobalState("*");
        counterChanged(globalState);
        stateChanged(globalState);
    }

   const addTodo=(description)=> {
        globalStore.DispatchAction("TodoApp", AddTodo(description));
        getGlobalStore()
    }

    const removeTodo=(todoId) =>{
        globalStore.DispatchAction("TodoApp", RemoveTodo(todoId));
        getGlobalStore()
    }

    const counterChanged=(counterState) =>{
        if(counterState?.CounterApp){
            setGlobalCounter(counterState.CounterApp.global)

        }
    }

    const stateChanged=(todoState) =>{
        if(todoState?.TodoApp){
            setTodos(todoState.TodoApp);

        }
    }

    return (
        <div>
        <AddTodoComponent addTodo={addTodo}></AddTodoComponent>
        <h2>Todos</h2>
        <ul>
            {todos.map(todo => {
                return (
                    <li key={todo.id}>
                        <Todo id={todo.id} description={todo.description} removeTodo={removeTodo}/>
                    </li>
                )
            })}
        </ul>
        <div>
            Global Counter: {globalCounter}
        </div>
    </div>
    );
}



































// import React from 'react';
// import { Todo } from './todo';
// import { createStore } from 'redux';
// import { AddTodo as AddTodoComponent } from './addTodo';
// import { TodoReducer } from './store/todoReducer';
// import { GlobalStore } from 'redux-micro-frontend';
// import { AddTodo, RemoveTodo } from './store/todo.actions';

// export class TodoList extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             todos: [],
//             globalCounter: 0
//         };

//         this.addTodo = this.addTodo.bind(this);
//         this.removeTodo = this.removeTodo.bind(this);
//         this.counterChanged = this.counterChanged.bind(this);
//         this.stateChanged = this.stateChanged.bind(this);

//         this.globalStore = GlobalStore.Get();
//         this.store = createStore(TodoReducer);
//         this.globalStore.RegisterStore("TodoApp", this.store, [GlobalStore.AllowAll]);
        
//         try {
//             this.globalStore.SubscribeToPartnerState("TodoApp", "CounterApp", this.counterChanged)
//         }
//         catch (error) { 
//             //Since
//         }
//         this.globalStore.Subscribe("TodoApp", this.stateChanged);
//     }

//     addTodo(description) {
//         this.globalStore.DispatchAction("TodoApp", AddTodo(description));
//     }

//     removeTodo(todoId) {
//         this.globalStore.DispatchAction("TodoApp", RemoveTodo(todoId));
//     }

//     counterChanged(counterState) {
//         this.setState({
//             globalCounter: counterState.global
//         });
//     }

//     stateChanged(todoState) {
//         this.setState({
//             todos: todoState
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <AddTodoComponent addTodo={this.addTodo}></AddTodoComponent>
//                 <h2>Todos</h2>
//                 <ul>
//                     {this.state.todos.map(todo => {
//                         return (
//                             <li>
//                                 <Todo id={todo.id} description={todo.description} removeTodo={this.removeTodo}/>
//                             </li>
//                         )
//                     })}
//                 </ul>
//                 <div>
//                     Global Counter: {this.state.globalCounter}
//                 </div>
//             </div>
//         )
//     }
// }
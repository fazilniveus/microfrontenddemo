import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab,Button } from '@material-ui/core';
import {  useHistory } from 'react-router-dom';
import { GlobalStore } from 'redux-micro-frontend';
import { ShellReducer } from '../store/shellReducer';


var headerStyles = {
	appBar: {
		background: '#00baf2',
		color: '#fff'
	}
};

 const Header=()=> {
	const [global, setGlobal] = useState(0);

	const globalStore = GlobalStore.Get(false);
    useEffect(()=>{
        globalStore.CreateStore("HeaderApp", ShellReducer, []);
        globalStore.RegisterGlobalActions("HeaderApp", ["*"]);
		setTimeout(() => {
			globalStore.SubscribeToPartnerState("HeaderApp", "CounterApp", updateState)
		}, 0);
    },[])

	const updateState=(globalState) =>{
		if(globalState){
         setGlobal(globalState.global);
		 
		}
	 }

	const history = useHistory();
	const location = useLocation();
	const pathname = location.pathname;
	const [ currentTab, setCurrentTab ] = useState(pathname.split('/')[1]);


	useEffect(()=>{
		setCurrentTab(pathname.split('/')[1]);
	}, [location]);
	
	const handleChange = (event, newValue) => {
		setCurrentTab(newValue);
	};
	
	const handler = () => {
         history.push('/loginApp');
    }
	return(
		<>
		   	<Tabs value={currentTab} onChange={handleChange} style={headerStyles.appBar}>
			<Tab label="Home" component={Link} value="home" to={'/home'} />
			<Tab label="counterApp" component={Link} value="counterApp" to={'/counterApp'} />
			<Tab label="Todo" component={Link} value="todo" to={'/todo'} />
			<Tab label="Shopping" component={Link} value="Shopping" to={'/shoppingApp'} />
			<Tab label="LoginApp" component={Link} value="LoginApp" to={'/loginApp'} />
		</Tabs>
        <div>Global Count in header{global}</div>
       <div style={{float:'right'}} > <Button onClick={handler}> Logout</Button></div>
     
	  </>
	)
};
export default Header;


// import React from 'react';

// import HeaderApp from '../microfrontend/headerApp';
        
// const Header=()=> {
//   return <div>
//        <div><HeaderApp/></div>
//   </div>;
// };
// export default Header;

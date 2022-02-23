
import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

// import  Header from './components/Header';
import Progress from './components/Progress';
import  Home from './components/Home';
import CounterApp from './interface/counterApp';
import TodoApp from './interface/todo';
import Loginmodule from './interface/loginApp';

import HeaderApp from './interface/headerApp';

const NotFound = () => <div>Not found</div>;

 export function App() {
	
	// let HideHeader  = window.location.pathname === '/loginApp'? null : <Header />;
	let HideHeader  = window.location.pathname === '/loginApp'? null : <HeaderApp />;

	return (
		<BrowserRouter>
			<div className="container">
				{HideHeader}
				<Suspense fallback={<Progress />}>
					<Switch>
						<Route exact path="/home" component={Home} />
						<Route exact path="/todo" component={TodoApp} /> 
						<Route exact path="/counterApp" component={CounterApp} />
						<Route exact path="/loginApp" component={Loginmodule} />
						<Redirect exact from="/" to="loginApp" /> 
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</Suspense>
			</div>
		</BrowserRouter>
	);
};


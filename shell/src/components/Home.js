import React from 'react';
const RemoteMFE = React.lazy(() => import("../interface/counterApp"));
const RemoteMFE2 = React.lazy(() => import("../interface/todo"));

// import CounterApp from '../microfrontend/counterApp';
// import HeaderApp from '../microfrontend/headerApp';


// const RemoteMFEHeader = React.lazy(() => import("../microfrontend/headerApp"));
// const RemoteLogin = React.lazy(() => import("../microfrontend/loginApp"));
        
const Home=()=> {
  return <div>
    <div><RemoteMFE/></div>
    <div><RemoteMFE2/></div>
    {/* <div><RemoteMFEHeader/></div> */}
    {/* <div><RemoteLogin/></div> */}
  </div>;
};
export default Home;

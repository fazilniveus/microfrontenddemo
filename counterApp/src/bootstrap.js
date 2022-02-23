    import React from 'react';
    import ReactDOM from 'react-dom';
    import { createMemoryHistory, createBrowserHistory } from 'history';
    import { AppCounter } from './appCounter';

       
    // Mount function to start up the app
    const mount = (el, { location='', onNavigate, defaultHistory }) => {
      const history = defaultHistory || createMemoryHistory({
        initialEntries: [location],
      });
      
      if(onNavigate) {
        history.listen(onNavigate);
      }
    
      ReactDOM.render(<AppCounter history={history} />, el);
    
      return {
        onParentNavigate({ pathname: nextPathname }) {
          const { pathname } = history.location;
    
          if (pathname !== nextPathname) {
            history.push(nextPathname);
          }
        }
      }
    };
    
    // If we are in development and in isolation,
    // call mount immediately
    if (process.env.NODE_ENV === 'development'){
        // const devRoot = document.querySelector('#_counter_dev-root"');

//  const devRoot = document.getElementById('todo2Root');
 const devRoot = document.querySelector('#_counter_dev-root')
    
    if (devRoot) {
      mount(devRoot,  {
        defaultHistory: createBrowserHistory()
      });
    }
    }
    
    // We are running through container
    // and we should export the mount function
    export { mount };
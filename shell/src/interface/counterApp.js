import { mount } from 'counterApp/CounterApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const counterApp= () => {
  const ref = useRef(null);
  const history = useHistory();
  
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      location: history.location,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      }
    });

    if (onParentNavigate) {
      history.listen(onParentNavigate);
    }
  }, []);

  return <div ref={ref} />;
};
export default counterApp;
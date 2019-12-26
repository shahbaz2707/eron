import React, {Fragment} from 'react';
import logo from './logo.svg';
import Home from './components/Home';
import AddCustomer from './components/AddCustomer';
import './App.css';

function App() {
  return (
    <Fragment>
      <div className="container">
            <div className="row">
                <div className="offset-2 col-md-8">
                  <Home />
                </div>
            </div>
      </div>
    </Fragment>
    
  );
}

export default App;

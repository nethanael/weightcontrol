import React from 'react';
import Title from './components/title';
import Home from './components/home';
import './App.css';

function App() {
  return (

    <div className="App">
      <div className="row">
        <div className="col-12">
          <Title />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Home />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col blockquote-footer">
          <p className="text-center">- Desarrollado por Pablo Hidalgo - 2020 - </p>
        </div>
      </div>

    </div>

  );
}

export default App;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Panel from  './components/Panel';
import SecondChallenge from './components/SecondChallenge';

function App() {
  return (
    <>
    <div className="App mt-5 pt-5">
        <Panel/>
        <SecondChallenge />
    </div>
    </>
  );
}

export default App;

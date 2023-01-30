import React from 'react';
// import { Container } from 'semantic-ui-react';
import './App.css';
// import { JobForm } from './components/JobForm';
import KeywordForm from './components/KeywordForm';

function App() {
  return (
    <div className='todo-app'>
      <KeywordForm />
    </div>
    
    /* Current Basic Reverse-ATS
    <div className="App">
      <Container>
        <JobForm />
      </Container>
    </div>
    */
  );
}

export default App;

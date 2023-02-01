import React from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import { JobForm } from './components/JobForm';
import KeywordList2 from './components/KeywordList2';

function App() {
  let home = true;
  
  if (home) {
    return (
      <div className='keyword-app'>
        <KeywordList2/>
      </div> )
  } else {
    return (
      <div className="App">
        <Container>
          <JobForm />
        </Container>
      </div>
    )
  }
}

export default App;

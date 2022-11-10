import React from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import { JobForm } from './components/JobForm';

function App() {
  // TODO: Display Keywords
  return (
    <div className="App">
      <Container>
        <JobForm />
      </Container>
    </div>
  );
}

export default App;

import React, {useEffect} from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import { JobForm } from './components/JobForm';

function App() {
  // TODO: Make API call with useEffect and fetch/then
  return (
    <div className="App">
      <Container>
        <JobForm />
      </Container>
    </div>
  );
}

export default App;

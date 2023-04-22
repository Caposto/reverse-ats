import JobForm from "./components/JobForm";

function App() {
  return (
    <div className="flex">
      <div>
        <h1 className="text-xl text-center">Job Description</h1>
        <JobForm className="grow" />
      </div>
      <div>
        <h1 className="text-xl text-center">Resume</h1>
        <JobForm className="grow" />
      </div>
    </div>
  );
}

export default App;

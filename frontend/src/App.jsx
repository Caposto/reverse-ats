import "./App.css";
import { Route, Routes } from "react-router-dom";
import EntryForm from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

import React from 'react';
import ReactDOM from "react-dom/client";
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import EntryForm from './routes';
import NotFound from './routes/error';
import CurrentKeywords from './routes/list';

// Router object handles all of the different url paths - similar to webpack chunks
const router = createBrowserRouter([
  {
    path: "/",
    element: <EntryForm />,
    errorElement: <NotFound />,
  },
  {
    path: "/list",
    element: <CurrentKeywords />,
    errorElement: <NotFound />,
  }
]);

function App() {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;

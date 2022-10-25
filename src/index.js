import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
// PAGES
import CompletePage from './pages/CompletePage';
import CurrentPage from './pages/CurrentPage';
import ComingPage from './pages/ComingPage';
import ProjectsPage from './pages/ProjectsPage';
import EditPage from './pages/EditPage';
import NoPage from './pages/NoPage';


// ROUTEs
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoPage />
  },
  {
    path: "coming",
    element: <ComingPage />,
  },
  {
    path: "current",
    element: <CurrentPage />,
  },
  {
    path: "complete",
    element: <CompletePage />,
  },
  {
    path: "projects/:projectId",
    element: <ProjectsPage />,
  },
  {
    path: "projects/update/:projectId",
    element: <EditPage />,
  },
  

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
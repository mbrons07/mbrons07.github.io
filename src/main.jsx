import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage.jsx";

import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GameJams from "./pages/GameJams";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="gamejams" element={<GameJams />} />
          <Route path="projects/:projectId" element={<ProjectPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

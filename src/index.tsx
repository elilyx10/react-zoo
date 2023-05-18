import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/routes/Home.routes";
import { Animal } from "./components/pages/Animal";
import { Layout } from "./layouts/Layout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/animal/:id" element={<Animal />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


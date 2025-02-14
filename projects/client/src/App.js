import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Admin from "./pages/admin";
import Registrasi from "./pages/registrasiData";
import CekLogin from "./middleware/cekLogin";

function App() {
  return (
    <>
      <CekLogin>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/regis/:token" element={<Registrasi />} />
        </Routes>
      </CekLogin>
    </>
  );
}

export default App;

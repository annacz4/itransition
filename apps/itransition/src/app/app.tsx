import { Router } from 'express';
import React, { useEffect, useState } from 'react';
import Signup from "./registration_form";
import Login from "./login_form";
import Profile from "./components/Profile";
import { Route, Routes } from 'react-router-dom';
import SearchBar from './components/search';
import RegistrationForm from './features/registrationForm';
import LoginForm from './features/loginForm';

export const App = () => {

  return (
    <div className="container">
    <SearchBar />
    <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<RegistrationForm />} />
    </Routes>
    </div>
  );
};

export default App;

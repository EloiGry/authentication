import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import { UserContextProvider } from './contexts/users';
import Admin from './Pages/Admin';
import Signup from './Pages/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider> 
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/auth/login" element={<Login/>}/>
          <Route exact path="/admin" element={<Admin/>}/>
          <Route exact path="/auth/signup" element={<Signup/>}/>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default App;

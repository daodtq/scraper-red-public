import React from 'react';
import Home from './Home';
import Login from './Login';
import GalaxyBackground from './GalaxyBackground';
import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route
              path="/home"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
            {/* <Route
              path="/login"
              element={!isLoggedIn ? <Login /> : <Navigate to="/home" />}
            /> */}
            <Route
              path="/"
              element={!isLoggedIn ? <Home /> : <Navigate to="/home" />}
            />
          </Routes>
      </Router>
    </div>
  );
}

export default App;

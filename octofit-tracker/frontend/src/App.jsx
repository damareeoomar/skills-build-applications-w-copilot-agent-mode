import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const Home = () => (
  <div className="container mt-4">
    <h1>OctoFit Tracker</h1>
    <p>Welcome to the OctoFit frontend. Use the navigation to explore API-backed components.</p>
  </div>
);

const About = () => (
  <div className="container mt-4">
    <h2>About</h2>
    <p>Built with React + Bootstrap. Components fetch data from the Django REST API.</p>
  </div>
);

export default function App({ apiBase }) {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/activities">Activities</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            <Link className="nav-link" to="/about">About</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities apiBase={apiBase} />} />
        <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
        <Route path="/teams" element={<Teams apiBase={apiBase} />} />
        <Route path="/users" element={<Users apiBase={apiBase} />} />
        <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

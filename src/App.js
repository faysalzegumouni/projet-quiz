import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import AddQuiz from "./pages/AddQuiz";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/AddQuiz" element={<AddQuiz />} />

        
      </Routes>
    </Router>
  );
};

export default App;
//j'ai de problème à propos de base de données c'est pour cela j'ai testé fonctionnalités des boutons par questions.json
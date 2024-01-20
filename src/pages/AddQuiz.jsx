import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import "./Add.css"; 

const AddQuiz = () => {
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    title: "",
    username: "", 
    questions: [
      {
        text: "",
        options: [""],
        correctOption: "",
      },
    ],
  });

  const addQuestion = () => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [
        ...prevQuiz.questions,
        { text: "", options: [""], correctOption: "" },
      ],
    }));
  };

  const addOption = (qIndex) => {
    setQuiz((prevQuiz) => {
      const newQuestions = [...prevQuiz.questions];
      newQuestions[qIndex].options.push("");
      return { ...prevQuiz, questions: newQuestions };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/add", quiz);
      console.log(response.data);
      toast.success("Added successfully!");
      navigate("/home");
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <>
      <div className="add-quiz-details">
        <div className="header">
          <button onClick={() => navigate("/")} className="back-button">
            <FiChevronLeft />
          </button>
          <h1 className="quiz-title">Quiz Details</h1>
        </div>
        <form onSubmit={handleSubmit} className="form-container">
          <label className="label-title">Quiz Title:</label>
          <input
            type="text"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            className="input-field"
          />
          {quiz.questions.map((question, qIndex) => (
            <div key={qIndex} className="question-container">
              <label className="question-label">Question:</label>
              <input
                type="text"
                value={question.text}
                onChange={(e) => {
                  const newQuestions = [...quiz.questions];
                  newQuestions[qIndex].text = e.target.value;
                  setQuiz({ ...quiz, questions: newQuestions });
                }}
                className="input-field"
              />
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="option-container">
                  <label className="option-label">Option:</label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newQuestions = [...quiz.questions];
                      newQuestions[qIndex].options[oIndex] = e.target.value;
                      setQuiz({ ...quiz, questions: newQuestions });
                    }}
                    className="input-field"
                  />
                </div>
              ))}
              <label className="question-label">Correct Option:</label>
              <input
                type="text"
                value={question.correctOption}
                onChange={(e) => {
                  const newQuestions = [...quiz.questions];
                  newQuestions[qIndex].correctOption = e.target.value;
                  setQuiz({ ...quiz, questions: newQuestions });
                }}
                className="input-field"
              />
              <button
                type="button"
                onClick={() => addOption(qIndex)}
                className="add-button"
              >
                Add Option
              </button>
            </div>
          ))}

          <div className="buttons-wrapper">
            <button type="button" onClick={addQuestion} className="add-button">
              Add Question
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddQuiz;

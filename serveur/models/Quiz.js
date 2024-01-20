// Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: String,
  optionA: String,
  optionB: String,
  optionC: String,
  optionD: String,
  correctAnswer: Number,
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;

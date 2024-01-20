import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import './index.css';
import questions from '../questions.json';
import isEmpty from './empty';
import M from 'materialize-css';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answerL: '', 
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            time: {
                minutes: 0,
                seconds: 0
            }
        };
        this.interval = null;
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
    }

    displayQuestions = () => {
        const { currentQuestionIndex, questions } = this.state;
        let currentQuestion, nextQuestion, previousQuestion;

        if (!isEmpty(questions) && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
        }

        if (currentQuestion) {
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answerL: currentQuestion.answer
            });
        }
    };

    handleOptionClick = (e) => {
        console.log('AnswerL:', this.state.answerL);

        if (e.target.innerHTML === this.state.answerL) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }
    }

    correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if(this.state.nextQuestion==undefined){
                this.endQuiz();
            }else{
                            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);

            }
        });
    }

    handleNext = () => {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex + 1
        }), () => {
            this.displayQuestions();
        });
    };

    handlePrevious = () => {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex - 1
        }), () => {
            this.displayQuestions();
        });
    };

    handleQuitQuiz = () => {
        clearInterval(this.interval);
        this.props.history.push('/Login');
    };


    startTimer = () => {
        const countDownTime = Date.now() + 60000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endQuiz();
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                });
            }
        }, 1000);
    };
    endQuiz = () => {
        alert('quiz ended');
        const { state } = this;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            fiftyFiftyUsed: 2 - state.fiftyFifty,
        };
        console.log(playerStats);
        setTimeout(() => {
            this.props.history.push('/');
        }, 1000);
    };
    

    render() {
        const { currentQuestion, time } = this.state;
        return (
            <Fragment>
                <Helmet>
                    <title>Quiz page</title>
                </Helmet>
                <div className='questions'>
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css"
                    />
                    <div className='question-header'>
                        <div>
                            <span className='clock-icon mdi mdi-clock mdi-24px'>{time.minutes}:{time.seconds}</span>
                        </div>
                        <h5>{currentQuestion.question}</h5>
                    </div>
                    <div className='option-container'>
                        <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionB}</p>
                    </div>
                    <div className='option-container'>
                        <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionD}</p>
                    </div>
                    <div className='button-container'>
                        <button onClick={this.handleNext}>Next</button>
                        <button onClick={this.handlePrevious}>Previous</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Quiz;

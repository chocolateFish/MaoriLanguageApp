/*
* mla.quizModel.js
* model for quiz feature module for maori language app (mla)
*/

mla.quizModel = (function () {
    "use strict";
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var Question, Test, Tester, getRandomIndex, stateMap, initModule;
    stateMap = {
        theVocab: null
    };
    
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //------------------ BEGIN UTILITY FUNCTIONS -----------------
    //getRandonIndex/Returns a random integer between min and max

    getRandomIndex = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    //------------------ END UTILITY FUNCTIONS -------------------
    //--------------------- BEGIN MODULE MODEL -------------------
    Question = {
        //questionLang can be 'eng'or 'maori'
        ansArray: [],
        setAnswers: function () {
            var corAnsIndex;
            corAnsIndex = getRandomIndex(0, 2);
            this.ansArray.splice(corAnsIndex, 0, this.correctAnswer);
            return this.ansArray;
        },
        studentAnswer: '',
        setStudentAnswer: function (answerProvided) {
            this.studentAnswer  = answerProvided;
        }
    };

    Test = {
        myVocab: {},
        setMyVocab: function (vocab) {
            this.myVocab = vocab;
        },
        allQuestions: [],
        resetAllQuestions: function () {
            this.allQuestions.length = 0;
        },
        genRandomWord: function (randomIndex) {
            var theWord;
            //getRandomIndex(0, (this.myVocab.allWords.length - 1));
            theWord = this.myVocab.getWord(randomIndex);
            return theWord;
        },
        makeQuestion: function (word, questionLang) {
            var question, wrongWord, randomIndex;
            question = Object.create(Question);
            question.quizWord = word.getLang(questionLang);
            question.correctAnswer = word.getTranslation(questionLang);
            question.ansArray = [];
            while (question.ansArray.length < 2) {
                randomIndex = getRandomIndex(0, (this.myVocab.allWords.length - 1));
                //wrongWord is the WordObject at randomIndex
                wrongWord = this.genRandomWord(randomIndex);
                //wrongWord is the string translation
                wrongWord = wrongWord.getTranslation(questionLang);
                if (wrongWord !== question.correctAnswer) {
                    question.ansArray.push(wrongWord);
                }
            }
            question.setAnswers();
            this.allQuestions.push(question);
        }
    };

    Tester = {
        correctTotal: function () {
            var correctNum = 0;
            Test.allQuestions.forEach(function (question) {
                if (question.studentAnswer === question.correctAnswer) {
                    correctNum = correctNum + 1;
                }
            });
            return correctNum;
        },
        incorrectTotal: function () {
            var incorrectNum = 0;
            Test.allQuestions.forEach(function (question) {
                if (question.studentAnswer !== question.correctAnswer && question.studentAnswer !== "") {
                    incorrectNum = incorrectNum + 1;
                }
            });
            return incorrectNum;
        },
        incompleteTotal: function () {
            var incompleteNum = 0;
            Test.allQuestions.forEach(function (question) {
                if (question.studentAnswer === "") {
                    incompleteNum = incompleteNum + 1;
                }
            });
            return incompleteNum;
        }
    };
    //--------------------- END MODEL ---------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    initModule = function (theVocab) {
        stateMap.theVocab = theVocab;
        Test.setMyVocab(stateMap.theVocab);
        Test.myVocab.allWords.forEach(function (word) {Test.makeQuestion(word,'maori'); });
        console.log(Test.allQuestions);
    };
    //------------------- END PUBLIC METHODS ---------------------
    return { initModule : initModule
            };
}());
/*
* mla.quizModel.js
* model for quiz feature module for maori language app (mla)
*/

mla.quizModel = (function () {
    "use strict";
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var lessonScreen, jqueryMap, setJqueryMap, Question, Test, Tester,
        getRandomIndex, stateMap, writeQuestion, displayTest, recordAnswers,
        displayResult, onClickEngQuiz, onClickMaoriQuiz, onClickSubmit,
        onClickClear, initModule;
    //values that stay the same
    lessonScreen = {
        main_html : String()
            + '<div id="test-content">'
                + '<h3>Test</h3>'
                + '<p>Notes</p>'
                + '<ul><li>Choose a language option to get the Quiz</li>'
                    + '<li>Answer questions by selecting the correct translation</li>'
                    + '<li>Click "Clear Answers" to clear selected answers.</li>'
                    + '<li>Click "Submit Answers" to get your results.</li>'
                + '</ul>'
            + '</div>'
            + '<div id="test">'
                + '<div id="questions"></div>'
                + '<input id="clearBtn" type="button" value="Clear Answers">'
                + '<input id="submitBtn" type="button" value="Submit Answers">'
            + '</div>'
            + '<div id="results"></div>'
            + '<div id="testControls">'
                + '<input id="engQuizBtn" type="button" value="Translate English to Maori">'
                + '<input id="maoriQuizBtn" type="button" value="Translate Maori to English">'
            + '</div>'
    };

    jqueryMap = {};
    //values that change
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
        quizWord: '',
        correctAnswer: '',
        ansArray: [],
        studentAnswer: '',
        getQuizWord: function () {
            return this.quizWord;
        },
        getCorrectAnswer: function () {
            return this.correctAnswer;
        },
        getAns: function (index) {
            return this.ansArray[index];
        },
        setAnswers: function () {
            var corAnsIndex;
            corAnsIndex = getRandomIndex(0, 2);
            this.ansArray.splice(corAnsIndex, 0, this.correctAnswer);
            return this.ansArray;
        },
        setStudentAnswer: function (answerProvided) {
            this.studentAnswer  = answerProvided;
        }
    };

    Test = {
        myVocab: {},
        setMyVocab: function (vocab) {
            this.myVocab = vocab;
        },
        testName: function () {
            return this.myVocab.getVocabName();
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
                if (wrongWord !== question.getCorrectAnswer() && wrongWord !== question.ansArray[0]) {
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
                if (question.studentAnswer !== question.correctAnswer && question.studentAnswer !== undefined) {
                    incorrectNum = incorrectNum + 1;
                }
            });
            return incorrectNum;
        },
        incompleteTotal: function () {
            var incompleteNum = 0;
            Test.allQuestions.forEach(function (question) {
                if (question.studentAnswer === undefined) {
                    incompleteNum = incompleteNum + 1;
                }
            });
            return incompleteNum;
        }
    };
    //------------------------ END MODEL -------------------------
    //-------------------- BEGIN DOM METHODS ---------------------
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $testDiv: $container.find('#test'),
            $questionsDiv: $container.find('#questions'),
            $clearBtn: $container.find('#clearBtn'),
            $submitBtn: $container.find('#submitBtn'),
            $resultsDiv: $container.find('#results'),
            $engQuizBtn: $container.find('#engQuizBtn'),
            $maoriQuizBtn: $container.find('#maoriQuizBtn')
        };
    };

    //DOM method/writeQuestion/returns html for a single question
    writeQuestion = function (question, i) {
        var questionStr = '<li id="' + i + '">'
            +  question.getQuizWord() + '<br>'
            + '<input type=\"radio\" name=' + i + ' value="' + question.getAns(0) + '" >' + question.getAns(0) + '<br>'
            + '<input type=\"radio\" name=' + i + ' value="' + question.getAns(1) + '" >' + question.getAns(1) + '<br>'
            + '<input type=\"radio\" name=' + i + ' value="' + question.getAns(2) + '" >' + question.getAns(2)
            + '</li><br>';
        return questionStr;
    };

    //DOM method/displayTest/uses Test.allquestions and the writeQuestion to generate the test on the screen.    
    displayTest = function () {
        var testStr, allQStr;
        allQStr = '';
        Test.allQuestions.forEach(function (question, i) { allQStr = allQStr + writeQuestion(question, i); });
        testStr = '<ol id = "quest">' + allQStr + ' </ol>';
        jqueryMap.$questionsDiv.html(testStr);
    };

    //DOM method/ recordAnswers/sets Question.student answer using the values provided by the student selection
    recordAnswers = function () {
        var theQuestion, theIndex, $ans, $studentAns;
        $('ol li').each(function () {
            theIndex = ($(this).attr('id'));
            theQuestion = Test.allQuestions[theIndex];
            $studentAns = $("input:checked");
            $ans = ($(this).find($studentAns));
            theQuestion.setStudentAnswer($ans.val());
        });
    };

    //DOM method/ displayResults 
    displayResult = function () {
        var resultStr = '<p><b>Correct answers: </b>' + Tester.correctTotal() + '</p>'
                    + '<p><b>Incorrect answers: </b>' + Tester.incorrectTotal() + '</p>'
                    + '<p><b>Incomplete answers: </b>' + Tester.incompleteTotal() + '</p>'
                    + '<br>'
                    + '<p>Choose a quiz option to try agan</p>';
        jqueryMap.$resultsDiv.html(resultStr);
    };

    //--------------------- END DOM METHODS ----------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    //event handler/ onClickEngQuiz/reset allQuestions array. Makes questions in english.
    //display the test and hide buttons
    onClickEngQuiz = function () {
        Test.resetAllQuestions();
        Test.myVocab.allWords.forEach(function (word) {Test.makeQuestion(word, 'eng'); });
        jqueryMap.$testDiv.show();
        displayTest();
        jqueryMap.$engQuizBtn.hide();
        jqueryMap.$maoriQuizBtn.hide();
        jqueryMap.$resultsDiv.hide();
    };

    //event handler/ onClickMaoriQuiz/reset allQuestions array. Makes questions in maori.
    //display the test and hide buttons
    onClickMaoriQuiz = function () {
        Test.resetAllQuestions();
        Test.myVocab.allWords.forEach(function (word) {Test.makeQuestion(word, 'maori'); });
        jqueryMap.$testDiv.show();
        displayTest();
        jqueryMap.$engQuizBtn.hide();
        jqueryMap.$maoriQuizBtn.hide();
        jqueryMap.$resultsDiv.hide();
    };

    //event handler/ onclickSubmit/
    onClickSubmit = function () {
        recordAnswers();
        jqueryMap.$resultsDiv.show();
        displayResult();
        jqueryMap.$testDiv.hide();
        jqueryMap.$engQuizBtn.show();
        jqueryMap.$maoriQuizBtn.show();
    };

    //event handler/ onclickClear/
    onClickClear = function () {
        var $ans, $studentAns;
        $('ol li').each(function () {
            $studentAns = $("input:checked");
            $ans = ($(this).find($studentAns));
            $ans.removeAttr('checked');
        });
    };

    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    //Public method /initModule/might be executed many times
    initModule = function (theVocab, $container) {
        //get the vocab object and save  to stateMap.Vocab;
        stateMap.vocab = theVocab;
        //render html and save the $container argument in the stateMap object
        $container.html(lessonScreen.main_html);
        stateMap.$container = $container;
        //bind the html elements as Jquery objects
        setJqueryMap();
        Test.setMyVocab(stateMap.vocab);
        jqueryMap.$testDiv.hide();
        jqueryMap.$resultsDiv.hide();
        //event handlers
        jqueryMap.$engQuizBtn.click(onClickEngQuiz);
        jqueryMap.$maoriQuizBtn.click(onClickMaoriQuiz);
        jqueryMap.$submitBtn.click(onClickSubmit);
        jqueryMap.$clearBtn.click(onClickClear);
    };
    //------------------- END PUBLIC METHODS ---------------------
    return { initModule : initModule
            };
}());
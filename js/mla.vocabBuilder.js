/*
* mla.vocabBuilder.js
* vocabBuilder feature module for maori language app (mla)
*/

mla.vocabBuilder = (function () {
    "use strict";
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var lessonScreen, jqueryMap, stateMap, setJqueryMap, onClickFlCards, doVocabList, getSelectedVocab,
        onClickQuiz, displaySelectedVocab, onClickVocabList, configModule, initModule;
    //values that stay the same
    lessonScreen = {
        main_html : String()
            + '<div id="nav">'
                + '<div id="navControls">'
                    + '<label for="allVocabsListBox">Select vocabualry</label>'
                    + '<select id="allVocabsListBox"></select>'
                    + '<input id="flashcardsBtn" type="button" value="Flashcards">'
                    + '<input id="quizBtn" type="button" value="Quiz">'
                + '</div>'
            + '</div>'
            + '<div id="vocabName"></div>'
            + '<div id="allVocabsText" class="feature-content"></div>'
            + '<div id="flashcardsDiv" class="feature-content"></div>'
            + '<div id="quizDiv" class="feature-content"></div>'
    };
    //Jquery objects will be mapped here
    jqueryMap = {};
    //values that change or are passed into the module from outside
    stateMap = {
        $container : null,
        currentVocab : null,
        currentVocabIndex: null,
        theDctionary: null,
        allVocabs: null,
        currentAllWords: null
    };
    //----------------- END MODULE SCOPE VARIABLES ---------------

    //--------------------- BEGIN DOM METHODS --------------------
    // DOM method /setJqueryMap/ gets the external $container object 
    //& sets objct with collection of Jquery/ html objects
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $allVocabsList: $container.find('#allVocabsListBox'),
            $allVocabsLabel: $container.find("label[for=allVocabsListBox]"),
            $allVocabsText: $container.find('#allVocabsText'),
            $vocabNameDiv: $container.find('#vocabName'),
            $flCardsBtn: $container.find('#flashcardsBtn'),
            $flCardsDiv: $container.find('#flashcardsDiv'),
            $quizBtn: $container.find('#quizBtn'),
            $quizDiv: $container.find('#quizDiv')
        };
    };

     //DOM method /doVocabsList/Purpose : Populate the ListBox;
    doVocabList = function () {
        //var index theVocab;
        stateMap.allVocabs.forEach(function (theVocab, i) { jqueryMap.$allVocabsList.append($("<option />").val(i).text(theVocab.getVocabEngName())); });
    };

    // for the selected list box option, assign StateMap.current vobab using the getCurrentVocab method.
    getSelectedVocab = function () {
        var theIndex, theVocab;
        theIndex = jqueryMap.$allVocabsList.val();
        theVocab = stateMap.theDictionary.getCurrentVocab(theIndex);
        stateMap.currentVocab = theVocab;
        stateMap.currentAllWords = theVocab.getAllWords();
    };

    // for stateMap.currentVocab, loop thrugh and display each word object.
    displaySelectedVocab = function () {
        var vocabNameStr, wordDisp_str;
        vocabNameStr = '<h2>' + stateMap.currentVocab.getVocabName() + '</h2>';
        wordDisp_str = '';
        //loop through all words,concatinating wordDisp_str
        //&#160; = html for non breaking space
        stateMap.currentAllWords.forEach(function (theWord) {
            wordDisp_str = wordDisp_str + '<br><b>' + theWord.getMaori() + '</b><br><p> &#160;&#160;&#160;&#160;' + theWord.getEng() + '</p>';
        });
        jqueryMap.$vocabNameDiv.show();
        jqueryMap.$vocabNameDiv.html(vocabNameStr);
        // set the html of the $allVocabsText div to wordDisp_str
        jqueryMap.$allVocabsText.show();
        jqueryMap.$allVocabsText.html(wordDisp_str);
    };

    //--------------------- END DOM METHODS ----------------------

    //------------------- BEGIN EVENT HANDLERS -------------------
    //EventHandler/ onClickVocabList - gets the selected vocab and displays the words.
    //shows the quiz and flashcard feature buttons
    //configures the features with the currentVocab object
    onClickVocabList = function () {
        getSelectedVocab();
        displaySelectedVocab();
        jqueryMap.$flCardsBtn.show();
        jqueryMap.$quizBtn.show();
    };

    //EventHandler/ onClickFlCards
    //hides the allVocabsDiv, and initialises the flashcards feature
    onClickFlCards = function () {
        jqueryMap.$allVocabsText.hide();
        jqueryMap.$allVocabsList.hide();
        jqueryMap.$allVocabsLabel.hide();
        jqueryMap.$quizDiv.hide();
        jqueryMap.$flCardsDiv.show();
        mla.flashcards.initModule(stateMap.currentVocab, jqueryMap.$flCardsDiv);
        jqueryMap.$flCardsBtn.hide();
        jqueryMap.$quizBtn.show();
    };

    //EventHandler/ onClickQuiz
    //hides the allVocabsDiv, and initialises the quiz feature
    onClickQuiz = function () {
        jqueryMap.$allVocabsText.hide();
        jqueryMap.$allVocabsList.hide();
        jqueryMap.$allVocabsLabel.hide();
        jqueryMap.$flCardsDiv.hide();
        jqueryMap.$quizDiv.show();
        mla.quizModel.initModule(stateMap.currentVocab, jqueryMap.$quizDiv);
        jqueryMap.$quizBtn.hide();
        jqueryMap.$flCardsBtn.show();
    };

    //-------------------- END EVENT HANDLERS --------------------

    //------------------- BEGIN PUBLIC METHODS -------------------
    // Public method /configModule/only needs to be executed once when the module is loaded
    configModule = function (theDictionary) {
        stateMap.theDictionary = theDictionary;
        stateMap.allVocabs = theDictionary.allVocabs;
    };

    //Public method /initModule/might be executed many times
    initModule = function ($container) {
        $container.html(lessonScreen.main_html);
        stateMap.$container = $container;
        setJqueryMap();
        jqueryMap.$flCardsDiv.hide();
        jqueryMap.$flCardsBtn.hide();
        jqueryMap.$quizBtn.hide();
        doVocabList();
        jqueryMap.$allVocabsList.click(onClickVocabList);
        stateMap.currentVocabIndex = jqueryMap.$allVocabsList.val();
        jqueryMap.$flCardsBtn.click(onClickFlCards);
        jqueryMap.$quizBtn.click(onClickQuiz);
    };

    return {configModule : configModule,
              initModule : initModule};
    //------------------- END PUBLIC METHODS ---------------------
}());
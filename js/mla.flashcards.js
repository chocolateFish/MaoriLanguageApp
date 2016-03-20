/*
* mla.flashcards.js
* flashcards feature module for maori language app (mla)
*/

mla.flashcards = (function () {
    "use strict";
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var lessonScreen, jqueryMap, lessonMaterial, Card, Deck, dispCardInDeck, onClickCont, onClickRemoveCard, onClickNextCard,
        onClickFlipCard, onShowImgCheck, onClickFlipDk, onClickShuffleDk, setJqueryMap, initModule;

    //values that stay the same
    lessonScreen = {
        main_html : String()
            + '<div id="cards-content">'
            + '<h3>Flashcards</h3>'
            + '<p>Notes</p>'
            + '<ul><li>Click the "Continue" button to proceed.</li>'
                + '<li>Click "Show Images" for pictures.</li>'
            + '</ul>'
            + '<br>'
            + '<div id="theCard"></div><br>'
            + '<p id="deckLocation"></p>'
            + '<label for="showImageCheck">Show Images</label>'
            + '<input id="showImageCheck" type="checkbox">'
            + '</div>'
            + '<div id="cardControls">'
                + '<input id="continueBtn" type="button" value="Continue">'
                + '<input id="flipCardBtn" type="button" value="Flip Card">'
                + '<input id="removeCardBtn" type="button" value="Remove Card">'
                + '<input id="nextCardBtn" type="button" value="Next Card">'
                + '<input id="flipDeckBtn" type="button" value="Flip Deck">'
                + '<input id="shuffleDeckBtn" type="button" value="Shuffle Deck">'
            + '</div>'
    };
    //Jquery objects will be mapped here
    jqueryMap = {};
        //values that change or are passed into the module from outside
    lessonMaterial = {
        $container : null,
        vocab : null,
        allWords : null
    };
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //----------------- BEGIN MODULE MODEL ---------------
    Card = {
        myWord: {},
        //lang - eng = english, maori = maori
        language: "eng",
        setLanguage: function (theLanguage) {
            this.language = theLanguage;
        },
        getLanguage: function () {
            return this.language;
        },
        engSide: function () {
            return "<h1>" + this.myWord.getEng() + "</h1>";
        },
        maoriSide: function (imgBoolean) {
            var maoriStr, audioStr, imgStr;
            //set imgStr and maoriStr
            if (imgBoolean === true && this.myWord.getImgSrc() !== undefined) {
                maoriStr = "";
                imgStr = "<img src=" + this.myWord.getImgSrc() + ">";
            }
            if (imgBoolean === true && this.myWord.getImgSrc() === undefined) {
                maoriStr = "<h1>" + this.myWord.getMaori() + "</h1>";
                imgStr = "<p>No image found.</p>";
            }

            if (imgBoolean === false) {
                maoriStr = "<h1>" + this.myWord.getMaori() + "</h1>";
                imgStr = "";
            }
            //set audioStr
            if (this.myWord.getAudioSrc() !== undefined) {
                audioStr = "<audio src=" + this.myWord.getAudioSrc() +  " type=\"audio/wav\" autoplay=\"autoplay\" >"
                    + " Your browser does not support the audio element.</audio>";
            } else {
                audioStr = "<p>No audio found.</p>";
            }
            maoriStr = maoriStr + imgStr + audioStr;
            return maoriStr;
        },

        print: function (theImgBoolean, theDiv) {
            var imgBoolean;
            imgBoolean = theImgBoolean;
            if (this.language === "eng") {
                theDiv.html(this.engSide());
            } else {
                theDiv.html(this.maoriSide(imgBoolean));
            }
        },

        flipLang: function () {
            if (this.language === "eng") {
                this.setLanguage("maori");
            } else {
                this.setLanguage("eng");
            }
        }
    };

    Deck = {
        allCards: [],
        cardNum: 0,
        reset: function () {
            this.allCards.length = 0;
            this.cardNum = 0;
        },
        getCurrentCard: function () {
            return this.allCards[this.cardNum];
        },
        makeCard: function (word) {
            var card;
            card = Object.create(Card);
            card.myWord = word;
            this.allCards.push(card);
            card.setLanguage("eng");
        },
        removeCard: function () {
            this.allCards.splice(this.cardNum, 1);
            return this.allCards;
        },
        dealCard: function () {
            if (this.cardNum < this.allCards.length - 1) {
                this.cardNum = this.cardNum + 1;
            } else {
                this.cardNum = 0;
            }
            this.getCurrentCard().setLanguage("eng");
            return this.cardNum;
        },
        calcTotal: function () {
            return this.allCards.length;
        },
        flipDeck: function () {
            this.cardNum = this.allCards.length - this.cardNum - 1;
            this.allCards.reverse();
            return this.allCards;
        },
        shuffleDeck: function () {
            // Fisher–Yates shuffle code, from bost.ocks.org/mike/shuffle/;
            var currentCardNum, shuffledCard, newCardNum;
            currentCardNum = this.allCards.length;
            // While there remain elements to shuffle…
            while (currentCardNum) {
                // Pick a remaining element…
                newCardNum = Math.floor(Math.random() * currentCardNum--);
                // And swap it with the current element.
                shuffledCard = this.allCards[currentCardNum];
                this.allCards[currentCardNum] = this.allCards[newCardNum];
                this.allCards[newCardNum] = shuffledCard;
            }
            //set cardNum to 0;
            this.cardNum = 0;
            return this.allCards;
        }
    };

    //----------------- END MODULE MODEL --------------
    //--------------------- BEGIN DOM METHODS --------------------
    // DOM method /setJqueryMap/ gets the external $container object 
    //& sets objct with collection of Jquery/ html objects
    setJqueryMap = function () {
        var $container = lessonMaterial.$container;
        jqueryMap = {
            $container : $container,
            $cardDiv: $container.find('#theCard'),
            $maoriStateDiv: $container.find('#maoriState'),
            $showImgCheck: $container.find('#showImageCheck'),
            $nextCdBtn: $container.find('#nextCardBtn'),
            $flipCdBtn: $container.find('#flipCardBtn'),
            $removeCdBtn: $container.find('#removeCardBtn'),
            $continueBtn: $container.find('#continueBtn'),
            $flipDeckBtn: $container.find('#flipDeckBtn'),
            $shuffleDeckBtn: $container.find('#shuffleDeckBtn'),
            $dispDeckLoc: $container.find('#deckLocation')
        };
    };

    //Dom method/ dispCardInDeck
    //inform the user of the current card in the deck
    dispCardInDeck = function () {
        var str, cardNum;
        cardNum = Deck.cardNum + 1;
        str = "Card " + cardNum + " of " + Deck.calcTotal();
        jqueryMap.$dispDeckLoc.text(str);
    };
    //--------------------- END DOM METHODS ----------------------

    //------------------- BEGIN EVENT HANDLERS -------------------
    //call the draw function to change the html depending if checkbox is checked
    //if the card is in the engState, flip the card so the image is visible.
    onShowImgCheck = function () {
        var card;
        card = Deck.getCurrentCard();
        card.setLanguage("maori");
        card.print(jqueryMap.$showImgCheck.is(':checked'), jqueryMap.$cardDiv);
    };

    //event handler/onClickCont/
    onClickCont = function () {
        var card;
        card  = Deck.getCurrentCard();
        if (card.getLanguage() === "eng") {
            card.flipLang();
            card.print(jqueryMap.$showImgCheck.is(':checked'), jqueryMap.$cardDiv);
        } else {
            Deck.dealCard();
            card  = Deck.getCurrentCard();
            card.print(jqueryMap.$showImgCheck.is(':checked'), jqueryMap.$cardDiv);
            dispCardInDeck();
        }
    };

    //event handler/onClickFlipCard/gets the current card and flips it
    onClickFlipCard = function () {
        var card  = Deck.getCurrentCard();
        card.flipLang();
        card.print(jqueryMap.$showImgCheck.is(':checked'), jqueryMap.$cardDiv);
    };

    //event Handler/onClickRemoveCard/ removes the current card form the allCardsArray
    //sets state to 0 and draws the next card
    onClickRemoveCard = function () {
        Deck.removeCard();
        Deck.getCurrentCard().print(jqueryMap.$showImgCheck.is(':checked'), jqueryMap.$cardDiv);
        dispCardInDeck();
    };

    //event handler/ onClickNextCard/ adds to the index in the allCardsArray, 
    //sets the card state to eng, and draws the card.
    onClickNextCard = function () {
        Deck.dealCard();
        Deck.getCurrentCard().print(jqueryMap.$showImgCheck.is(':checked'), jqueryMap.$cardDiv);
        dispCardInDeck();
    };

    onClickFlipDk = function () {
        Deck.flipDeck();
        Deck.getCurrentCard().print(jqueryMap.$showImgCheck.is(':checked'), jqueryMap.$cardDiv);
        dispCardInDeck();
    };

    onClickShuffleDk = function () {
        Deck.shuffleDeck();
        Deck.getCurrentCard().print(jqueryMap.$showImgCheck.is(':checked'), jqueryMap.$cardDiv);
        dispCardInDeck();
    };

    //-------------------- END EVENT HANDLERS --------------------

    //------------------- BEGIN PUBLIC METHODS -------------------
    //Public method /initModule/might be executed many times
    initModule = function (theVocab, $container) {
        //get the vocab object and save  to lessonMaterial.Vocab;
        lessonMaterial.vocab = theVocab;
        lessonMaterial.allWords = theVocab.getAllWords();
        //render html and save the $container argument in the lessonMaterial object
        $container.html(lessonScreen.main_html);
        lessonMaterial.$container = $container;
        //bind the html elements as Jquery objects
        setJqueryMap();
        //clear allCards array, and then populate using vocab.allWords
        Deck.reset();
        lessonMaterial.allWords.forEach(function (word) { Deck.makeCard(word); });
        Deck.getCurrentCard().print(jqueryMap.$showImgCheck.is(':checked'), jqueryMap.$cardDiv);
        dispCardInDeck();

        //eventHandlers for html controls
        jqueryMap.$showImgCheck.change(onShowImgCheck);
        jqueryMap.$nextCdBtn.click(onClickNextCard);
        jqueryMap.$flipCdBtn.click(onClickFlipCard);
        jqueryMap.$removeCdBtn.click(onClickRemoveCard);
        jqueryMap.$continueBtn.click(onClickCont);
        jqueryMap.$flipDeckBtn.click(onClickFlipDk);
        jqueryMap.$shuffleDeckBtn.click(onClickShuffleDk);
    };
    return { initModule : initModule
            };
    //------------------- END PUBLIC METHODS ---------------------
}());
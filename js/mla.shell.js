/*
* mla.shell.js
* Shell module for maori language app (mla)
*/

mla.shell = (function () {
    "use strict";
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap, jqueryMap, stateMap, doStart, doMsg, doExit, doExitMsg,
        onClickExit, onClickMsgOk, onClickMsgCancel, onClickWords,
        setJqueryMap, initModule;
    //values that stay the same.
    configMap = {
        main_html : String()
            + '<div id="header">'
                + '<input id="wordsBtn" type="button" value="Build Vocabulary">'
                + '<input id="exitBtn" class="wordsShow startHide exitHide" type="button" value="Exit">'
            + '</div>'
            + '<div id="messageDiv" class="wordsHide startHide exitHide style=" border: solid 1px">'
                + '<div id="messageText" class="wordsHide startHide exitHide"></div>'
                + '<input id="okBtn" type="button" value="Ok">'
                + '<input id="cancelBtn" type="button" value="Cancel">'
            + '</div>'
            + '<div id="wordsDiv" class="wordsShow starthide exitHide"></div>'
    };
    //collection of Jquery objects
    jqueryMap = {};
    //values that change during execution
    stateMap = {
        $container : null,
        msgTrigger : 0
    };
    //----------------- END MODULE SCOPE VARIABLES ---------------

    //--------------------- BEGIN DOM METHODS --------------------
    // DOM method /setJqueryMap/ objct with collection of Jquery/ html objects
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $startShow: $container.find('.startShow'),
            $startHide: $container.find('.startHide'),
            $exitBtn: $container.find('#exitBtn'),
            $exitShow: $container.find('.exitShow'),
            $exitHide: $container.find('.exitHide'),
            $wordsBtn: $container.find('#wordsBtn'),
            $wordsShow: $container.find('.wordsShow'),
            $wordsHide: $container.find('.wordsHide'),
            $vocabBuilderDiv: $container.find('#wordsDiv'),
            $msgContainer: $container.find('#messageDiv'),
            $msgText: $container.find('#messageText'),
            $okBtn: $container.find('#okBtn'),
            $cancelBtn: $container.find('#cancelBtn'),
            $wordsDiv: $container.find('#wordsDiv')
        };
    };

     //DOM method /doStart/Purpose : StartPage
    doStart = function () {
        jqueryMap.$startShow.show();
        jqueryMap.$startHide.hide();
    };

    // DOM method /doMsg/Displays Message and ok / cancel buttons
    // Arguments:
    // * msg_string - message to display
    // * is_okBtn - boolean, true = show ok btn
    // * is_cancelBtn - boolean, true = show cancel btn
    doMsg = function (msg_String, is_OkBtn, is_CancelBtn) {
        jqueryMap.$msgContainer.show();
        jqueryMap.$msgText.show();
        jqueryMap.$msgText.html(
            '<h5>'
                + msg_String
                + '</h5>'
        );
        if (is_OkBtn === true) {
            jqueryMap.$okBtn.show();
        }
        if (is_CancelBtn === true) {
            jqueryMap.$cancelBtn.show();
        }
    };

    // DOM method /doExitMsg/Purpose : Hide MesgText, Buttons and msgContainer.
    doExitMsg = function () {
        jqueryMap.$msgText.hide();
        jqueryMap.$okBtn.hide();
        jqueryMap.$cancelBtn.hide();
        jqueryMap.$msgContainer.hide();
    };

    // DOM method /doExit/go to exitState, Message -Thanks! and change stateNum
    doExit = function () {
        jqueryMap.$exitShow.show();
        jqueryMap.$exitHide.hide();
        doMsg("Thanks, Have a Lovely Day!", false, false);
    };

    //--------------------- END DOM METHODS ----------------------

    //------------------- BEGIN EVENT HANDLERS -------------------
    onClickExit = function () {
        doMsg('Are you sure you want to exit? Click Ok to proceed or Cancel to go back', true, true);
        jqueryMap.$wordsDiv.hide();
        stateMap.msgTrigger = 1;
    };

    onClickMsgOk = function () {
        doExitMsg();
        if (stateMap.msgTrigger === 1) {
            doExit();
        }
        stateMap.msgTrigger = 0;
    };

    onClickMsgCancel = function () {
        doExitMsg();
        jqueryMap.$wordsHide.hide();
        jqueryMap.$wordsShow.show();
        stateMap.msgTrigger = 0;
    };

    onClickWords = function () {
        jqueryMap.$wordsHide.hide();
        jqueryMap.$wordsShow.show();
        mla.vocabBuilder.initModule(jqueryMap.$vocabBuilderDiv);
    };
    //-------------------- END EVENT HANDLERS --------------------

    //------------------- BEGIN PUBLIC METHODS -------------------
    //Public method /initModule/
    initModule = function ($container) {
         //load HTML and map jQuery collections
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();
        // initialize start state, and enable buttons for exit,words/Vocab, msgDiv
        doStart();
        jqueryMap.$wordsBtn.click(onClickWords);
        jqueryMap.$exitBtn.click(onClickExit);
        jqueryMap.$okBtn.click(onClickMsgOk);
        jqueryMap.$cancelBtn.click(onClickMsgCancel);
        //configure feature modules. modules are initialised using event handler for buttons
        mla.vocabBuilder.configModule(mla.vocabModel.dictionary);
    };
    //------------------- END PUBLIC METHODS -------------------
    return { initModule : initModule };
}());

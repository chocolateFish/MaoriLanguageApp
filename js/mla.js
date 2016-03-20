/*
* mla.js
* Root namespace module
*/

var mla = (function () {
    "use strict";
    var initModule = function ($container) {
        mla.vocabModel.initModule();
        mla.shell.initModule($container);
    };
    return { initModule: initModule };
}());

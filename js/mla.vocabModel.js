mla.vocabModel = (function () {
    "use strict";
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var

        //static WordSet object - values do not change
        WordSets = {
            //index 0 keeps track of if there are images or not,
            //index 1 keeps track of if there are audio files or not,
            //index 2 is the maoriName of the Vocab object and index 3 is the english name
            environment: [true, true, '', 'Environment', 'maunga', 'mountain', 'ika', 'fish', 'awa', 'river', 'roto', 'lake',
                'moana', 'sea', 'ngahere', 'forest', 'puke', 'hill', 'manu', 'bird', 'kereru',
                'wood pigeon', 'kiore', 'rat', 'kiwi', 'kiwi', 'piwakawaka', 'fantail'],

            greetings_and_farewells: [false, true, 'Kupu Mihi/Kupu Poroporoaki', 'Greetings/ Farewells',
                'Tēnā Koe',  'Hello to 1 person',  'Tēnā Kōrua',  'Hello to 2 people',  'Tēnā Koutou',  'Hello to 3 or more',
                'Kia ora',  'Hello',  'Ata mārie',  'Good Morning',  'Mōrena',  'Morning',  'Pō mārie',  'Good Evening',
                'Hei konei rā',  'Good bye',  'Hei konā',  'Good bye',  'E noho rā',  'Good bye',
                'Haere rā',  'Good Bye when leaving'],

            you_and_I: [false, true, 'Tūpou', 'You and I', 'ahau',  'I or me',  'au',  'I or me',  'koe',  'You',
                'ia',  'He or She',  'Ko wai?', 'Who?'],

            saying_How_You_Are: [false, true, '', 'Saying How You Are', 'Kei te pēhea koe?', 'How are you?',
                'Kei te pai',  'Good',  'Kei te māuiui',  'Sick',  'Kei te ngenge',  'Tired',
                'Kei te wherū',  'Under the weather',  'Kei te ora',  'Living',  'Kei te rūhā',  'Worn out or Exhausted',
                'Kei te hiakai',  'Hungry',  'Kei te hiamoe',  'Sleepy',  'Kei te hia inu',  'Thirsty',  'Kei te kaha tonu',
                'Still going strong',  'Kei te pērā tonu',  'Same ole',  'Kei te pokea e te mahi',  'Overworked',
                'Kei raro e putu ana',  'Snowed under',  'Kāore i te pai',  'Not good'],

            personal_Pronouns: [false, true, 'T&#363;pou', 'Personal Pronouns', 'au', 'I or me',  'koe',  'You',
                'ia',  'he or she',  'tāua',  'Us two',  'māua',  'Us two (Excludes listener)',  'kōrua',  'You two',
                'rāua',  'Those two',  'tātou',  'Us all',  'mātou',  'Us all (3 or more) (Excludes listener)',
                'koutou',  'You all (3 or more)',  'rātou',  'Them all (three or more)'],

            possession: [false, false, '', 'Possession', 'Taku/Tōku', 'My', 'Tana/Tōna', 'His/hers', 'Tau/Tōu', 'Yours',
                'Aku/Ōku', 'Mine'],

            colours: [false, true, 'Ngā Tae', 'Colours',  'Mā',  'White',  'Whero',  'Red',  'Kārera',  'Light green',
                'Māwhero',  'Pink',  'Kōwhai',  'Yellow',  'Kākāriki/Māota',  'Dark green',  'Pango',  'Black',
                'Parauri/Paraone',  'Brown',  'Kahurangi',  'Blue',  'Karaka',  'Orange'],

            numbers: [false, true, 'g&#257; Tatau', 'Numbers', 'Tahi/Kotahi',  'One',  'Rua',  'Two',
                'Toru',  'Three',  'Whā',  'Four',  'Rima',  'Five',  'Ono',  'Six',  'Whitu',  'Seven',
                'Waru',  'Eight',  'Iwa',  'Nine',  'Tekau',  'Ten',  'rau',  'Hundred',  'Mano',  'Thousand',
                'E hia?',  'How many?(Things)',  'Tokohia?',  ' How many? (People)'],

            days_of_the_week: [false, false, 'Ng&#257; R&#257; o te Wiki', 'Days of the Week', 'Mane', 'Monday', 'T&#363;rei', 'Tuesday',
                'Wenerei', 'Wednesday', 'Taite', 'Thursday', 'Paraire', 'Friday', 'H&#257;tarei', 'Saturday', 'R&#257;tapu', 'Sunday',
                'R&#257;hina', 'Monday', 'R&#257;t&#363;', 'Tuesday', 'R&#257;apa', 'Wednesday', 'R&#257;pare', 'Thursday',
                'R&#257;mere', ' Friday', ' R&#257;horoi', ' Saturday', 'R&#257;tapu', 'Sunday'],

            months_of_the_year: [false, false, 'Ng&#257; Marama / Kaupeka o te Tau', 'Months of the Year',
                'H&#257;nuere/Kohi-t&#257;tea', 'January', 'P&#275;puere/Hui-tanguru', 'February',
                'M&#257;ehe/Pou-t&#363;-te-rangi', 'March', 'Aperira/Apereira/Paenga-whawha', 'April', 'Mei/Haratua', 'May',
                'Hune/Pipiri', 'June', 'Hurae/H&#333;ngongoi', 'July', '&#257;kuhata/Here-turi-k&#333;k&#257;', 'August',
                'Hepetema/Mahuru', 'September', 'Oketopa/Whiringa-&#257;-nuku', 'October',
                'N&#333;ema/Whiringa-&#257;-rangi', 'November', 'T&#299;hema/Hakihea', 'December'],

            seasons_of_the_year: [false, false, 'Ng&#257; Wahanga o te Tau', 'Seasons of the Year', 'H&#333;toke / Takurua', 'Winter',
                'K&#333;anga', 'Spring', 'Raumati', 'Summer', 'Ngahuru', 'Autumn'],

            the_time: [false, false, 'Te W&#257;', 'The Time', 'W&#257;/Taima', 'Time', 'H&#257;ora', 'Hour', 'Karaka', 'Clock',
                'Mineti', 'Minute', 'Hauwh&#257;', 'Quarter', 'Haurua', 'Half'],

            commands: [false, false, 'Kupu Tono', 'Commands', 'Titiro', 'Look', 'Whakarongo', 'Listen', 'K&#333;rero', 'Speak',
                'Horoia', 'Wash', 'M&#257;rama', 'Understand', 'K&#333;rero mai', 'Speak to me', 'Tangohia', 'Take',
                'Whakahokia', 'Return/Put back', 'E t&#363;', 'Stand up',  'E noho', 'Sit down'],

            commands2: [false, false, 'Kupu Tono', 'Request Commands', 'Homai ________ ki a au', 'Give/Pass to me',
                'Hoatu ________ ki a ia', 'Give/Pass to him/her', 'Hoatu ________ ki a Mere', 'Give/Pass to Mere'],

            geneology: [false, false, 'Whakapapa', 'Geneology', 'Maunga', 'Mountain', 'Awa', 'River', 'Roto', 'Lake',
                'Moana', 'Sea', 'Waka', 'Canoe (Form of Transport)', 'Rangatira', ' Chief', ' Hap&#363;', 'Sub Tribe/Clan',
                'Iwi', 'Tribe'],

            where_something_is: [false, false, '', 'Asking and Saying Where Something is', 'Te Ika a M&#257;ui', 'North Island',
                'T&#257;maki-makau-rau/&#257;karana', 'Auckland', 'P&#257;r&#257;wai', 'Thames', 'R&#257;hui-p&#333;keka', 'Huntly',
                'M&#333;rena', 'Morrinsville', ' Kirikiriroa/Hamutana', 'Hamilton', 'Wh&#257;ingaroa', 'Raglan', 'Kemureti', 'Cambridge',
                'T&#363;ranga/T&#363;ranga-nui-a-Kiwa', 'Gisbourne', 'Ng&#257;motu', 'New Plymouth', 'Ahuriri/Nepia', 'Napier',
                'Heretaunga', 'Hastings', 'Te Papaioea/Pamutana', 'Palmerston North', 'Tamaki-nui-a-Rua', 'Dannivirke', ' Whakaoriori', 'Masterton',
                'Te Whanganui-a-Tara /P&#333;neke', 'Wellington', 'Te Waipounamu', 'South Island', 'Te Waiharakeke', 'Blenheim',
                'Whakat&#363;', 'Nelson', 'Kawatiri', 'Westport', 'M&#257;whera', 'Greymouth', '&#333;tautahi', 'Christchurch',
                'Hakatere', 'Ashburton', 'Piopiotahi', 'Fiordland', '&#333;tepoti', 'Dunedin', 'Waih&#333;pai', ' Invercargill',
                'Kei hea t&#333; k&#257;inga?', 'Where is your home?', 'Kei ______ T&#333;ku k&#257;inga', 'My home is at______'],

            location: [false, false, '', 'Location', 'Konei', 'Here (By me)', 'Kon&#257;', 'There (By you)', 'Kor&#257;', 'Over there',
                'Kei whea/hea?', 'Where?', 'Ki', 'To (Forward direction)'],

            family: [false, false, 'Whanau', 'Family', 'T&#257;ne', 'Male/Man', 'Wahine', 'Female/Woman', 'Tipuna/T&#363;puna', 'Ancestor',
                'Kuia/Taua/Kui', 'Grandmother', 'Koroua/Poua/Koro', 'Grandfather', 'M&#257;tua', 'Parents',
                'Tu&#257;kana/Tuakana', 'Older sibling (same sex)', 'Teina/Taina', 'Younger sibling (same sex)',
                'Tuahine/Tu&#257;hine', 'Sister', 'Tung&#257;ne', 'Brother (of female)', 'K&#333;tiro', 'Girl', 'Tama', 'Boy/Son',
                'M&#257;t&#257;mua', 'Oldest sibling', 'P&#333;tiki/M&#257;t&#257;muri', 'Youngest sibling', 'Tam&#257;hine', 'Daughter',
                'Tamaiti', 'Child', 'Tamariki', 'Children', 'Mokopuna', 'Grandchild', 'Pakeke', 'Adult', 'P&#275;pi', 'Baby',
                'Tangata/T&#257;ngata', 'Person/People'],

            parts_of_the_home: [false, false, 'Ng&#257; Wahanga o te Whare', 'Parts of the Home', 'Papa', 'Floor/Surface',
                'K&#257;uta', 'Kitchen', 'Tuanui', 'Roof', 'R&#363;ma', 'Room', 'Pakitara', 'Wall', 'R&#363;ma Moe', 'Bedroom',
                'Matapihi', 'Window', 'Ruma Kaukau', 'Bathroom', 'K&#363;aha', 'Door', 'Tatau', 'Door way', 'Wharepaku', 'Toilet',
                'Nohomanga', 'Lounge', 'Whare', 'House', 'Ruma Noho', 'Sitting room', 'Arapiki', 'Stairs', 'T&#363;mera', 'Chimney'],

            bedtime: [false, false, 'Te W&#257; Moe', 'Bedtime', 'Horoi', 'Wash', 'P&#257;nui', 'Read', 'Pukapuka', 'Book',
                'Moe', 'Sleep', 'Moenga/Rara', 'Bed', 'Paraihe Niho', 'Brush Teeth', 'R&#363;ma Kaukau', 'Bathroom',
                'R&#363;ma Moe', 'Bedroom'],

            things: [false, false, 'Ng&#257; Momo Taputapu Kai', 'Variety of Items', 'T&#275;pu', 'Table', 'T&#299;kera', 'Jug/Kettle',
                'T&#363;ru', 'Chair', 'Taupoki', 'Lid', 'Pereti', 'Plate', 'K&#333;hua/K&#363;mete', 'Pot', 'Naihi/Maripi', 'Knife',
                'H&#333;pane/P&#257;rai', 'Frying Pan', 'Paoka', 'Fork', 'Kaput&#299;', 'Cup of Tea', 'Pune/Oko', 'Spoon/Laddle',
                'Kapu', 'Cup'],

            food: [false, false, 'Ng&#257; Momo Kai', 'Varieties of Food', 'Par&#257;oa', 'Bread', 'Pata', 'Butter', 'Huka', 'Sugar',
                'Miraka', 'Milk', 'Kawhe/Kowhe', 'Coffee', 'T&#299;whiu', 'Tea Bag', 'H&#275;ki', 'Egg', 'Tote', 'Salt',
                'M&#299;ti', 'Meat', 'Huawhenua', 'Fruit', 'Huar&#257;kau', 'Vegetables', 'W&#299;t&#299;pihiki', 'Weetbix',
                'T&#333;hi', 'Toast'],

            vegetables: [false, false, 'Huawhenua', 'Vegetables', 'R&#275;tihi', 'Lettuce', 'K&#257;reti', 'Carrot',
                'K&#257;peti', 'Cabbage', 'K&#363;kama', ' Cuccumber', 'K&#257;nga', 'Corn', 'Paukena', 'Pumpkin',
                'Harore', 'Mushroom', 'R&#299;ki', 'Onion', 'R&#299;wai/Taewa', 'Potatoe', 'Puan&#299;ko', 'Cauliflour',
                'Rauamiami', 'Herbs', 'Kanekane', 'Garlic'],

            meat: [false, false, 'Miti', 'Meat', 'Kau', 'Cow/Beef', 'T&#333;titi', 'Sausage', 'P&#275;kana', 'Bacon', 'Reme', 'Lamb',
                'Heihei', 'Chicken', 'Poaka', 'Pig/Pork', 'Rakiraki', 'Duck', 'Tia', 'Deer/Venison', 'Mat&#363;', 'Lard/Dripping',
                ' orukoru', 'Turkey'],

            seafood: [false, false, 'Kai Moana/M&#257;taitai', 'Seafood', 'Tio', 'Oyster', 'Kuku/K&#363;tai', 'Mussell',
                'Koura', 'Crayfish', 'P&#257;ua', 'Abalone', 'Kina', 'Sea Egg/Sea Urchin', 'Tuangi', 'Cockle',
                'Inanga', 'Whitebait', 'Mang&#333;', 'Shark'],

            location2: [false, false, '', 'Location', 'T&#275;nei', 'This (By me)', 'T&#275;n&#257;', 'That (By you)',
                'T&#275;r&#257;', 'That (Over there)', '&#275;nei', 'These (my me)', '&#275;n&#257;', 'Those (by you)',
                '&#275;r&#257;', 'Those (over yonder)'],

            parts_of_the_face: [false, false, 'Ng&#257; Wahanga o te Kanohi', 'Parts of the face', 'Arero', 'Tongue', 'Paerunga', 'Eye Lid', 'Ihu',
                'Nose', 'P&#257;p&#257;ringa', 'Cheek', 'Kak&#299;', 'Neck', 'Rae', 'Forehead', 'Kauae raro', 'Jaw',
                'Taringa', 'Ear', 'Kauae', 'Chin', 'Tukemata', 'Eyebrow', 'Ngutu', 'Lips', 'Waha/M&#257;ngai', 'Mouth',
                'Niho', 'Teeth', 'Whatu/Karu', 'Eyes']

        },
        Word, Vocab, Dictionary, initModule;
    //----------------- END MODULE SCOPE VARIABLES ---------------

    //word prototype object
    Word = {
        setImgSrc: function (fileName) {
            var uri, enc;
            uri = fileName.replace("?", "");
            enc = encodeURI(uri);
            return "images/" + enc + ".jpg";
        },
        setAudioSrc: function (fileName) {
            var uri, enc;
            uri = fileName.split("/");
            uri = uri[0].replace("?", "");
            enc = encodeURI(uri);
            return "audio/" + enc + ".wav";
        },

        getLang: function (lang) {
            if (lang === 'eng') {
                return this.eng;
            }
            return this.maori;
        },

        //given a language, return word for other lang
        getTranslation: function (lang) {
            if (lang === 'eng') {
                return this.maori;
            }
            return this.eng;
        },

        getEng: function () {
            return this.eng;
        },
        getMaori: function () {
            return this.maori;
        },
        getImgSrc: function () {
            return this.imgSrc;
        },
        getAudioSrc: function () {
            return this.audioSrc;
        }
    };

    //Vocab prototype Object
    Vocab = {
        engName: '',
        maoriName: '',
        //Array of word objects
        allWords: [],
        //factory function to create a new word object
        makeWord: function (maori_word, eng_word) {
            var word;
            word = Object.create(Word);
            word.eng = eng_word;
            word.maori = maori_word;
            //place into vocab.allWords array
            this.allWords.push(word);
            return word;
        },

        //get functions; array, object, object properties
        getAllWords: function () {
            return this.allWords;
        },
        getWord: function (index) {
            return this.allWords[index];
        },
        getVocabEngName: function () {
            return this.engName;
        },
        getVocabName: function () {
            var name;
            if (this.maoriName === '') {
                name =  this.engName;
            } else {
                name = this.engName + ' - ' + this.maoriName;
            }
            return name;
        }
    };

    Dictionary = {
        allVocabs: [],
        currentVocab: {},
        //factory function to create a vocab object
        makeVocab: function (txtArray) {
            var i, vocab, word;
            vocab = Object.create(Vocab);
            vocab.engName = txtArray[3];
            vocab.maoriName = txtArray[2];
            vocab.allWords = [];
            for (i = 4; i < txtArray.length; i = i + 2) {
                word = vocab.makeWord(txtArray[i], txtArray[i + 1]);
                if (txtArray[0] === true) {
                    word.imgSrc = Word.setImgSrc(word.eng);
                }
                if (txtArray[1] === true) {
                    word.audioSrc = Word.setAudioSrc(word.maori);
                }
            }
            this.allVocabs.push(vocab);
        },
                //set functions
        setCurrentVocab: function (index) {
            this.currentVocab = this.allVocabs[index];
            return this.currentVocab;
        },

        //get functions
        getAllVocabs: function () {
            return this.allVocabs;
        },
        getCurrentVocab: function (index) {
            return this.allVocabs[index];
        }
    };
    //------------------- BEGIN PUBLIC METHODS -------------------
    initModule = function () {
        var word_set;
        for (word_set in WordSets) {
            if (WordSets.hasOwnProperty(word_set)) {
                Dictionary.makeVocab(WordSets[word_set]);
            }
        }
    };

    //------------------- END PUBLIC METHODS ---------------------
    return { initModule: initModule,
             dictionary: Dictionary
            };
}());
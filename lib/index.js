'use strict';
var _ = require('lodash');
var YAML = require('yamljs');
var path = require('path');


module.exports = (function () {
	var stepOneExceptions = YAML.load(path.join(__dirname, '../config/stemmer.yml'))['step_1_exceptions'];
	var protectedWords = YAML.load(path.join(__dirname, '../config/stemmer.yml'))['protected_words'];	
	console.log(stepOneExceptions);
	
	var alphabet = new RegExp("^[ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ]+$");
	console.log(alphabet);
	
    function stem (word) {
			return word;
	}
	return {
		stem : stem
	}
}) ();

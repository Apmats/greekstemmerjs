'use strict';
var path = require('path');
var fs = require('fs');
var greekStemmer = require('../lib/index.js');


module.exports = (function runBenchmark() {
  try {
    fs.unlinkSync(path.join(__dirname, './temp_stemmer_output.txt'));
  } catch (e) {
    //exception swallowed, file just wasn't there
  }

  var writeStream = fs.createWriteStream(path.join(__dirname, './temp_stemmer_output.txt'));
  var lineReader = require('readline').createInterface({
    input: fs.createReadStream(path.join(__dirname, './stemming_sample.txt'))
  });


  lineReader.on('line', function (line) {
    var splitLine = line.split(',');
    writeStream.write(splitLine[0] + ',' + greekStemmer.stem(splitLine[0]) + '\n');
  });
  lineReader.on('close', function () {
    fs.unlinkSync(path.join(__dirname, './stemming_sample.txt'));
    fs.rename(path.join(__dirname, './temp_stemmer_output.txt'), path.join(__dirname, './stemming_sample.txt'));
  });

})();

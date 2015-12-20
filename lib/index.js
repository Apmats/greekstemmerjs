'use strict'
var _ = require('lodash')
var YAML = require('yamljs')
var path = require('path')

module.exports = (function () {
  var stepOneExceptions = YAML.load(path.join(__dirname, '../config/stemmer.yml'))['step_1_exceptions'];
  var protectedWords = YAML.load(path.join(__dirname, '../config/stemmer.yml'))['protected_words'];

  var alphabet = new RegExp('^[ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ]+$');

  function isGreek(word) {
    return alphabet.test(word);
  }

  function endsInVowel(word) {
    return /[ΑΕΗΙΟΥΩ]$/.test(word);
  }

  function endsInVowel2(word) {
    return /[ΑΕΗΙΟΩ]$/.text(word);
  }
 
 

  
  //  match = /^(.+?)(Α|ΑΓΑΤΕ|ΑΓΑΝ|ΑΕΙ|ΑΜΑΙ|ΑΝ|ΑΣ|ΑΣΑΙ|ΑΤΑΙ|ΑΩ|Ε|ΕΙ|ΕΙΣ|ΕΙΤΕ|
  // ΕΣΑΙ|ΕΣ|ΕΤΑΙ|Ι|ΙΕΜΑΙ|ΙΕΜΑΣΤΕ|ΙΕΤΑΙ|ΙΕΣΑΙ|ΙΕΣΑΣΤΕ|ΙΟΜΑΣΤΑΝ|ΙΟΜΟΥΝ|ΙΟΜΟΥΝΑ|
  // ΙΟΝΤΑΝ|ΙΟΝΤΟΥΣΑΝ|ΙΟΣΑΣΤΑΝ|ΙΟΣΑΣΤΕ|ΙΟΣΟΥΝ|ΙΟΣΟΥΝΑ|ΙΟΤΑΝ|ΙΟΥΜΑ|ΙΟΥΜΑΣΤΕ|
  // ΙΟΥΝΤΑΙ|ΙΟΥΝΤΑΝ|Η|ΗΔΕΣ|ΗΔΩΝ|ΗΘΕΙ|ΗΘΕΙΣ|ΗΘΕΙΤΕ|ΗΘΗΚΑΤΕ|ΗΘΗΚΑΝ|ΗΘΟΥΝ|ΗΘΩ|
  // ΗΚΑΤΕ|ΗΚΑΝ|ΗΣ|ΗΣΑΝ|ΗΣΑΤΕ|ΗΣΕΙ|ΗΣΕΣ|ΗΣΟΥΝ|ΗΣΩ|Ο|ΟΙ|ΟΜΑΙ|ΟΜΑΣΤΑΝ|ΟΜΟΥΝ|ΟΜΟΥΝΑ|
  // ΟΝΤΑΙ|ΟΝΤΑΝ|ΟΝΤΟΥΣΑΝ|ΟΣ|ΟΣΑΣΤΑΝ|ΟΣΑΣΤΕ|ΟΣΟΥΝ|ΟΣΟΥΝΑ|ΟΤΑΝ|ΟΥ|ΟΥΜΑΙ|ΟΥΜΑΣΤΕ|
  // ΟΥΝ|ΟΥΝΤΑΙ|ΟΥΝΤΑΝ|ΟΥΣ|ΟΥΣΑΝ|ΟΥΣΑΤΕ|Υ||ΥΑ|ΥΣ|Ω|ΩΝ|ΟΙΣ)$/.exec(stemmedWord);
  // stemmedWord = match[1];

  function stem(word) {
    var stemmedWord = word;
    if (word.length < 3) {
      return stemmedWord;
    }
    if (!isGreek(word)) {
      return stemmedWord;
    }
    if (protectedWords.indexOf(word) >= 0) {
      return stemmedWord;
    }

    //step 1
    var stepOneRegExp = new RegExp('(.*)(' + _.keys(stepOneExceptions).join('|') + ')$');
    var match = stepOneRegExp.exec(stemmedWord);
    if (match !== null) {
      stemmedWord = match[1] + stepOneExceptions[match[2]];
    }
    //step 2
    //2a
    //notice no unicode flag
    match = /^(.+?)(ΑΔΕΣ|ΑΔΩΝ)$/.exec(stemmedWord);
    if (match !== null) {
      stemmedWord = match[1];
      if (!/(ΟΚ|ΜΑΜ|ΜΑΝ|ΜΠΑΜΠ|ΠΑΤΕΡ|ΓΙΑΓΙ|ΝΤΑΝΤ|ΚΥΡ|ΘΕΙ|ΠΕΘΕΡ|ΜΟΥΣΑΜ|ΚΑΠΛΑΜ|ΠΑΡ|ΨΑΡ|ΤΖΟΥΡ|ΤΑΜΠΟΥΡ|ΓΑΛΑΤ|ΦΑΦΛΑΤ)$/.test(match[1])) {
        stemmedWord += 'ΑΔ';
      }
    }

    //2b
    match = /^(.+?)(ΕΔΕΣ|ΕΔΩΝ)$/.exec(stemmedWord);
    if (match !== null) {
      stemmedWord = match[1];
      if (/(ΟΠ|ΙΠ|ΕΜΠ|ΥΠ|ΓΗΠ|ΔΑΠ|ΚΡΑΣΠ|ΜΙΛ)$/.test(match[1])) {
        stemmedWord += 'ΕΔ';
      }
    }

    //2c
    match = /^(.+?)(ΟΥΔΕΣ|ΟΥΔΩΝ)$/.exec(stemmedWord);
    if (match !== null) {
      stemmedWord = match[1];
      if (/(ΑΡΚ|ΚΑΛΙΑΚ|ΠΕΤΑΛ|ΛΙΧ|ΠΛΕΞ|ΣΚ|Σ|ΦΛ|ΦΡ|ΒΕΛ|ΛΟΥΛ|ΧΝ|ΣΠ|ΤΡΑΓ|ΦΕ)$/.test(match[1])) {
        stemmedWord += 'ΟΥΔ';
      }
    }
    //2d
    match = /^(.+?)(ΕΩΣ|ΕΩΝ|ΕΑΣ|ΕΑ)$/.exec(stemmedWord);
    if (match !== null) {
      stemmedWord = match[1];
      if (/^(Θ|Δ|ΕΛ|ΓΑΛ|Ν|Π|ΙΔ|ΠΑΡ|ΣΤΕΡ|ΟΡΦ|ΑΝΔΡ|ΑΝΤΡ)$/.test(match[1])) {
        stemmedWord += 'Ε';
      }
    }
    
    //step 3
    //3a
    match = /^(.+?)(ΙΟΥΣ|ΙΑΣ|ΙΕΣ|ΙΟΣ|ΙΟΥ|ΙΟΙ|ΙΩΝ|ΙΟΝ|ΙΑ|ΙΟ)$/.exec(stemmedWord);
    if (match !== null && match[1].length > 4) {
      stemmedWord = match[1];
    }
 
    //3b
    match = /^(.+?)(ΙΟΥΣ|ΙΑΣ|ΙΕΣ|ΙΟΣ|ΙΟΥ|ΙΟΙ|ΙΩΝ|ΙΟΝ|ΙΑ|ΙΟ)$/.exec(stemmedWord);
    if (match !== null) {
      stemmedWord = match[1];
      if (endsInVowel(stemmedWord) || stemmedWord.length < 2 || /^(ΑΓ|ΑΓΓΕΛ|ΑΓΡ|ΑΕΡ|ΑΘΛ|ΑΚΟΥΣ|ΑΞ|ΑΣ|Β|ΒΙΒΛ|ΒΥΤ|Γ|ΓΙΑΓ|ΓΩΝ|Δ|ΔΑΝ|ΔΗΛ|ΔΗΜ|ΔΟΚΙΜ|ΕΛ|ΖΑΧΑΡ|ΗΛ|ΗΠ|ΙΔ|ΙΣΚ|ΙΣΤ|ΙΟΝ|ΙΩΝ|ΚΙΜΩΛ|ΚΟΛΟΝ|ΚΟΡ|ΚΤΗΡ|ΚΥΡ|ΛΑΓ|ΛΟΓ|ΜΑΓ|ΜΠΑΝ|ΜΠΡ|ΝΑΥΤ|ΝΟΤ|ΟΠΑΛ|ΟΞ|ΟΡ|ΟΣ|ΠΑΝΑΓ|ΠΑΤΡ|ΠΗΛ|ΠΗΝ|ΠΛΑΙΣ|ΠΟΝΤ|ΡΑΔ|ΡΟΔ|ΣΚ|ΣΚΟΡΠ|ΣΟΥΝ|ΣΠΑΝ|ΣΤΑΔ|ΣΥΡ|ΤΗΛ|ΤΙΜ|ΤΟΚ|ΤΟΠ|ΤΡΟΧ|ΦΙΛ|ΦΩΤ|Χ|ΧΙΛ|ΧΡΩΜ|ΧΩΡ)$/.test(stemmedWord)) {
        stemmedWord += 'Ι';
      }
      if (/^(ΠΑΛ)$/.test(stemmedWord)) {
        stemmedWord += 'ΑΙ';
      }
    }
    //step 4
    match = /^(.+?)(ΙΚΟΣ|ΙΚΟΝ|ΙΚΕΙΣ|ΙΚΟΙ|ΙΚΕΣ|ΙΚΟΥΣ|ΙΚΗ|ΙΚΗΣ|ΙΚΟ|ΙΚΑ|ΙΚΟΥ|ΙΚΩΝ|ΙΚΩΣ)$/.exec(stemmedWord);
    if (match !== null) {
      stemmedWord = match[1];
      if (endsInVowel(stemmedWord) || /^(ΑΔ|ΑΛ|ΑΜΑΝ|ΑΜΕΡ|ΑΜΜΟΧΑΛ|ΑΝΗΘ|ΑΝΤΙΔ|ΑΠΛ|ΑΤΤ|ΑΦΡ|ΒΑΣ|ΒΡΩΜ|ΓΕΝ|ΓΕΡ|Δ|ΔΙΚΑΝ|ΔΥΤ|ΕΙΔ|ΕΝΔ|ΕΞΩΔ|ΗΘ|ΘΕΤ|ΚΑΛΛΙΝ|ΚΑΛΠ|ΚΑΤΑΔ|ΚΟΥΖΙΝ|ΚΡ|ΚΩΔ|ΛΟΓ|Μ|ΜΕΡ|ΜΟΝΑΔ|ΜΟΥΛ|ΜΟΥΣ|ΜΠΑΓΙΑΤ|ΜΠΑΝ|ΜΠΟΛ|ΜΠΟΣ|ΜΥΣΤ|Ν|ΝΙΤ|ΞΙΚ|ΟΠΤ|ΠΑΝ|ΠΕΤΣ|ΠΙΚΑΝΤ|ΠΙΤΣ|ΠΛΑΣΤ|ΠΛΙΑΤΣ|ΠΟΝΤ|ΠΟΣΤΕΛΝ|ΠΡΩΤΟΔ|ΣΕΡΤ|ΣΗΜΑΝΤ|ΣΤΑΤ|ΣΥΝΑΔ|ΣΥΝΟΜΗΛ|ΤΕΛ|ΤΕΧΝ|ΤΡΟΠ|ΤΣΑΜ|ΥΠΟΔ|Φ|ΦΙΛΟΝ|ΦΥΛΟΔ|ΦΥΣ|ΧΑΣ)$/.test(stemmedWord) || /(ΦΟΙΝ)$/.test(stemmedWord)) {
        stemmedWord += 'ΙΚ';
      }
    }
    //step 5
    //5a
    if (stemmedWord === 'ΑΓΑΜΕ') {
      stemmedWord = 'ΑΓΑΜ';
    }
    if ((match =/^(.+?)(ΑΓΑΜΕ|ΗΣΑΜΕ|ΟΥΣΑΜΕ|ΗΚΑΜΕ|ΗΘΗΚΑΜΕ)$/.exec(stemmedWord))  !== null) {
      stemmedWord = match[1];
    }

    return stemmedWord;
  }
  return {
    stem: stem
  };
})();

console.log(module.exports.stem('ΦΟΙΝΙΚΕΣ'));

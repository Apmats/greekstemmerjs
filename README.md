# greek-stemmer [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A JS port of the greek stemmer made by the skroutz team in ruby (which is available over here https://github.com/skroutz/greek_stemmer).

## Installation

```sh
$ npm install --save greek-stemmer
```
## Usage

```js
var greekStemmer = require('greek-stemmer');
greekStemmer.stem('ΕΠΙΦΑΝEΙΕΣ');
```

## Contributing

Run the following gulp task to go through a file of words (under the benchmarks folder) and get a test output:

```sh
$ gulp benchmark
```
That should give you an idea of the output of the stemmer to see if it fits your needs or if it needs further tuning. Tuning can be done either by adding manual exceptions in the config files or by forking and doing it in the stemmer code.

## License

MIT © [apmats]()


[npm-image]: https://badge.fury.io/js/greek-stemmer.svg
[npm-url]: https://npmjs.org/package/greek-stemmer
[travis-image]: https://travis-ci.org/Apmats/greekstemmerjs.svg?branch=master
[travis-url]: https://travis-ci.org/Apmats/greekstemmerjs
[daviddm-image]: https://david-dm.org/apmats/greekstemmerjs.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/apmats/greekstemmerjs

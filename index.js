const xml2js = require('xml2js');
const yargs = require('yargs');
const fs = require('fs');
const { URL } = require('url');
// const Promise = require('bluebird');

const fileOps = require('./file-operation');

const extractor = require('./extractor');

// Promise.promisifyAll(fs);
// Promise.promisifyAll(extractor);

const argv = yargs
    .options({
        p: {
            demand: true,
            alias: 'filepath',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const fileUrl = new URL(`file:${argv.filepath}`);

console.log("file path : ", fileUrl.toString());

// this callback code works
// fileOps.readFile(fileUrl, extractor.extractData, fileOps.writeFile);

// Promisification using bluebird not working here
// fs.readFileAsync(fileUrl)
//     .then((data) => extractor.extractDataPromise(data))
//     .then((data) => fs.writeFileAsync('dependency_graph.txt', JSON.stringify(data, undefined, 2)))
//     .catch(err => console.error(err));


fileOps.readFilePromise(fileUrl)
    .then(extractor.extractDataPromise)
    .then(fileOps.writeFilePromise)
    .catch(err => console.log(err));
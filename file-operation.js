const fs = require('fs');
const xml2js = require('xml2js');
const Promise = require('bluebird');

const readFile = (fileUrl, callback1, callback2) => {
    fs.readFile(fileUrl, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('file does not exist');
                return;
            }
            throw err;
        }

        let parser = new xml2js.Parser({explicitArray: false, trim: true});
        parser.parseString(data, (err, result) => {
            if (err) {
                return console.error(err);
            }

            // file data formatted based on callback function
            let formattedData;

            if (callback1) {
                formattedData = callback1(result);
            } else {
                formattedData = result;
            }

            // operation on formatted data
            if (callback2) {
                callback2(formattedData);
            }
            return formattedData;   // return formatted data
        });
    });
};

const writeFile = (data) => {
    fs.writeFile('dependency_graph.txt', JSON.stringify(data, undefined, 2), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};

const readFilePromise = (fileUrl) => {
    return new Promise((resolve, reject) => {

        fs.readFile(fileUrl, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    reject(new Error('file does not exist'));
                }
                reject(err);
            }

            let parser = new xml2js.Parser({explicitArray: false, trim: true});
            parser.parseString(data, (err, result) => {
                if (err) {
                    reject(err);
                }

                resolve(result);
            });
        });
    });
};

const writeFilePromise = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('dependency_graph.txt', JSON.stringify(data, undefined, 2), (err) => {
            if (err) reject(err);

            console.log('The file has been saved!');
            resolve(data);
        });
    });
};

module.exports = {readFile, writeFile, readFilePromise, writeFilePromise};
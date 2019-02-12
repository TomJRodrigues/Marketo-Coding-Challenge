const fs = require('fs');

// ANSI color codes from: https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
module.exports = {
    // Greets user and establishes parameters
    greeting : function (inputFile, outputFile, changeFile) {
        const greeting = 'Removing duplicate JSON entries from ' + inputFile + ' based on ID and email.\n' +
        'See '+ outputFile + ' for filtered JSON results and ' + changeFile + ' for list of removed entries and corresponding reason for removal.\n' +
        'The source file ' + inputFile + ' will remain unchanged.';
        console.log(greeting);
        return;
    },
    emailAndID : function (email, id) {
        const redText = '\x1b[31m%s\x1b[0m';
        const emailAndID = 'The email ' + email + ' and the id ' + id + ' are duplicates. Removed.';
        console.log(redText, emailAndID);
        return;
    },
    email : function (email) {
        const redText = '\x1b[31m%s\x1b[0m';
        const emailText = 'The email ' + email + ' is a duplicate. Removed.';
        console.log(redText, emailText);
    },
    id : function (id) {
        const redText = '\x1b[31m%s\x1b[0m';
        const idText = 'The id ' + id + ' is a duplicate. Removed.';
        console.log(redText, idText);

    },
    count : function (countEmailAndID, countEmail, countID) {
        const cyanText = '\x1b[36m%s\x1b[0m';
        let countTotal = countEmailAndID + countEmail + countID;
        console.log(cyanText, 'Number of records with duplicate email and ID: ' + countEmailAndID);
        console.log(cyanText, 'Number of records with duplicate email: ' + countEmail);
        console.log(cyanText, 'Number of records with duplicate ID: ' + countID);
        console.log(cyanText, 'Total number of duplicate records deleted: ' + countTotal);
    },
    appendHeader : function (changeFile, inputFile, time) {
        fs.appendFile(changeFile, 'Removing duplicate JSON entries from ' + inputFile + 
        ' based on ID and email.\n' + 'Process started: ' + time + '.\n', (err) => {
            if (err) throw err;
        });
    },
    append : function (changeFile, data) {
        fs.appendFile(changeFile, data, (err) => {
            if (err) throw err;
        });
    }
}
const fs = require('fs');
const logging = require('./logging.js');

module.exports = {
    filterDuplicates : function (inputFile, outputFile, changeFile, countEmailAndID, countEmail, countID) {

        logging.greeting(inputFile, outputFile, changeFile);

        let formattedData = {
            leads: []
        }

        fs.readFile(inputFile, 'utf8', (err, data) => {
            if (err) throw err;
            let fileData = JSON.parse(data).leads;  // Parse the input file

            for (i = fileData.length - 1; i > -1; i--) {  // Iterate over the records and compare each one to each other one, starting at the end of the list
                for (j = fileData.length - 1; j > -1; j--) {
        
                    // checks, removes, and logs record if BOTH email and id match
                    if (((fileData[i].email === fileData[j].email) && (i !== j)) && ((fileData[i]._id === fileData[j]._id) && (i !== j))) {
                        logging.emailAndID(fileData[j].email, fileData[j]._id);
                        fs.appendFile(changeFile, JSON.stringify(fileData.splice(j, 1)[0], null, 2) + ', was removed because BOTH the email and ID match an existing record.\n', (err) => {
                            if (err) throw err;
                        });
                        countEmailAndID++;
                        i--;
                    }
        
                    // checks, removes, and logs record if emails match
                    if ((fileData[i].email === fileData[j].email) && (i !== j)) {
                        logging.email(fileData[j].email);
                        fs.appendFile(changeFile, JSON.stringify(fileData.splice(j, 1)[0], null, 2) + ', was removed because the email matches an existing record.\n', (err) => {
                            if (err) throw err;
                        });
                        countEmail++;
                        i--;
                    }
                    
                    // checks, removes, and logs record if ids match
                    if ((fileData[i]._id === fileData[j]._id) && (i !== j)) {
                        logging.id(fileData[j]._id);    
                        fs.appendFile(changeFile, JSON.stringify(fileData.splice(j, 1)[0], null, 2 ) + ', was removed because the ID matches an existing record.\n', (err) => {
                            if (err) throw err;
                        });
                        countID++;
                        i--;
                    }
                }
            }
            
            formattedData.leads = fileData;
            return formattedData;
        });

        logging.count(countEmailAndID, countEmail, countID);

        // write output
        let outputData = JSON.stringify(formattedData, null, 2);
        fs.writeFile(outputFile, outputData, (err) => {
            if (err) throw err;
        });
    }
}
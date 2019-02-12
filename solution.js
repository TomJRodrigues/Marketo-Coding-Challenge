const fs = require('fs');
const logging = require('./logging.js');

function removeDuplicates(inputFile = 'leads.json', outputFile = 'output.json', changeFile = 'changeLog.txt') {
    
    // start the process timer
    const start = new Date;
    const time = start.toTimeString();

    // initialize counters and variables
    let countEmailAndID = 0;
    let countEmail = 0;
    let countID = 0;
    let formattedData = {
        leads: []
    }

    // greet the user and establish parameters
    logging.greeting(inputFile, outputFile, changeFile);

    // add header to changeFile
    logging.appendHeader(changeFile, inputFile, time);

    // Read and filter duplicates, logging reasons for removal to changeFile. 
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) throw err;
        let fileData = JSON.parse(data).leads;  // Parse the input file

        for (i = fileData.length - 1; i > -1; i--) {  // Iterate over the records and compare each one to each other one, starting at the end of the list
            for (j = fileData.length - 1; j > -1; j--) {
    
                // Checks, removes, and logs record if BOTH email and id match
                if ((i !== j) && (fileData[i].email === fileData[j].email) && (fileData[i]._id === fileData[j]._id)) {
                    // Prefer newer records over older ones. If equal, prefer later in record file.
                    if (Date.parse(fileData[i].entryDate) >= Date.parse(fileData[j].entryDate)) {
                        logging.emailAndID(fileData[j].email, fileData[j]._id);
                        logging.append(changeFile, JSON.stringify(fileData.splice(j, 1)[0], null, 2) + 
                        ', was removed because BOTH the email and ID match an existing record.\n');
                    }
                    // Remove older records
                    else {
                        logging.emailAndID(fileData[i].email, fileData[i]._id);
                        logging.append(changeFile, JSON.stringify(fileData.splice(i, 1)[0], null, 2) + 
                        ', was removed because BOTH the email and ID match an existing record.\n');
                    }
                    countEmailAndID++;
                    i--;
                }

                // checks, removes, and logs record if emails match
                if ((i !== j) && (fileData[i].email === fileData[j].email)) {
                    // Prefer newer records over older ones. If equal, prefer later in record file.
                    if (Date.parse(fileData[i].entryDate) >= Date.parse(fileData[j].entryDate)) {
                        logging.email(fileData[j].email);
                        logging.append(changeFile, JSON.stringify(fileData.splice(j, 1)[0], null, 2) + 
                        ', was removed because the email matches an existing record.\n');
                    }
                    // Remove older records
                    else {
                        logging.email(fileData[i].email);
                        logging.append(changeFile, JSON.stringify(fileData.splice(i, 1)[0], null, 2) + 
                        ', was removed because the email matches an existing record.\n');
                    }
                    countEmail++;
                    i--;
                }
                
                // checks, removes, and logs record if ids match
                if ((i !== j) && (fileData[i]._id === fileData[j]._id)) {
                    // Prefer newer records over older ones. If equal, prefer later in record file.
                    if (Date.parse(fileData[i].entryDate) >= Date.parse(fileData[j].entryDate)) {
                        logging.id(fileData[j]._id);
                        logging.append(changeFile, JSON.stringify(fileData.splice(j, 1)[0], null, 2 ) + 
                        ', was removed because the ID matches an existing record.\n');
                    }
                    // Remove older records
                    else {
                        logging.id(fileData[i]._id);
                        logging.append(changeFile, JSON.stringify(fileData.splice(i, 1)[0], null, 2 ) + 
                        ', was removed because the ID matches an existing record.\n');
                    }
                    countID++;
                    i--;
                }
            }
        }
        
        // output duplicate counts
        logging.count(countEmailAndID, countEmail, countID);

        // write output
        formattedData.leads = fileData;
        let outputData = JSON.stringify(formattedData, null, 2);
        fs.writeFile(outputFile, outputData, (err) => {
            if (err) throw err;
        });

        // finish timer
        const end = Date.now();
        const elapsed = end - start;
        console.log('The elapsed time in milliseconds was: ' + elapsed);
        return outputFile;
    });
}
removeDuplicates(process.argv[2], process.argv[3], process.argv[4]);
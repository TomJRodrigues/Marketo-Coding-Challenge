# Marketo-Coding-Challenge
Marketo/Adobe Coding Challenge: Removes duplicate JSON records

By Tom Rodrigues
https://tomjrodrigues.github.io/

### De-duplicates JSON records according to the Marketo Coding Challenge guidelines:
1. The data from the newest date should be preferred.
2. Duplicate IDs count as dups. Duplicate emails count as dups. Duplicate values elsewhere do not count as dups.
3. If the dates are identical the data from the record provided last in the list should be preferred.

### Features:
* No libraries, frameworks, or dependencies outside of Node.
* Small size and just 2 files.
* Handles duplication cases where ids match, emails match, or if both ids and emails match.
* Handles user selection for input file, output file, and changelog file, with defaults set for the user already.
* Times process.

### Usage: 
* Navigate to `solution.js` in terminal.
* Ensure Node is installed.
* Run `node solution.js` with optional arguments (`node solution.js leads.json outputFile.json changeLog.txt`)
* Optional arguments for input file, output file, and changelog file. Defaults are 'leads.json', 'output.json', and 'changeLog.txt'.

const { readCSV } = require("../src/csvReader.js");
const { queryParser } = require("../src/queryParser.js");

exports.executeSELECTQuery = async (query)=> {
    const { fields, table } = queryParser(query);
    const data = await readCSV(`${table}.csv`);
    
    return data.map(row => {
        const filteredRow = {};
        fields.forEach(field => {
            filteredRow[field] = row[field];
        });
        return filteredRow;
    });
}

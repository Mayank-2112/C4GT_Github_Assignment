const { readCSV } = require("../src/csvReader.js");
const { queryParser } = require("../src/queryParser.js");

exports.executeSELECTQuery = async (query)=> {
    const { fields, table, whereClauses } = queryParser(query);
    const data = await readCSV(`${table}.csv`);

    const filteredData = whereClauses.length > 0
        ? data.filter(row=> whereClauses.every(clause =>{
            return row[clause.field]===clause.value;
        })) : data;
        
    return filteredData.map(row =>{
        const selectedRow = {};
        fields.forEach(field =>{
            selectedRow[field] = row[field];
        });
        return selectedRow;
    });
    
}

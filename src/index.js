const { readCSV } = require("../src/csvReader.js");
const { queryParser } = require("../src/queryParser.js");

exports.executeSELECTQuery = async (query)=> {
    const { fields, table, whereClause } = queryParser(query);
    const data = await readCSV(`${table}.csv`);

    const filteredData = whereClause
        ? data.filter(row=>{
            const [field, value] = whereClause.split('=').map(s=> s.trim());
            return row[field]===value;
        }) : data;
    return filteredData.map(row =>{
        const selectedRow = {};
        fields.forEach(field =>{
            selectedRow[field] = row[field];
        });
        return selectedRow;
    });
    
}

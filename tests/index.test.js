const { readCSV } = require("../src/csvReader.js");
const { queryParser } = require("../src/queryParser.js");

test('Basic Jest test',()=>{
    expect(1).toBe(1);
});



test('Read CSV File',async ()=>{
    const data = await readCSV('sample.csv');
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(3);
    expect(data[0].name).toBe('John');
    expect(data[0].age).toBe('30');
});

test('Parse Sql Query', ()=>{
    const query = 'SELECT id, name FROM sample';
    const parsed = queryParser(query);
    expect(parsed).toEqual({
        fields: ['id','name'],
        table: 'sample'
    });
});
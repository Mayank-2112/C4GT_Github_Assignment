const { readCSV } = require("../src/csvReader.js");
const { queryParser } = require("../src/queryParser.js");
const {executeSELECTQuery} = require('../src/index');

// Test 1

test('Basic Jest test',()=>{
    expect(1).toBe(1);
});

//Test 2

test('Read CSV File',async ()=>{
    const data = await readCSV('sample.csv');
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(3);
    expect(data[0].name).toBe('John');
    expect(data[0].age).toBe('30');
});

//Test 3

// test('Parse Sql Query', ()=>{
//     const query = 'SELECT id, name FROM sample';
//     const parsed = queryParser(query);
//     expect(parsed).toEqual({
//         fields: ['id','name',],
//         table: 'sample',
//         whereClause: null
//     });
// });

//Test 4 and 5

// test('Execute SQL Query', async ()=>{
//     const query = 'SELECT id,name FROM sample where age > 25';
//     const result = await executeSELECTQuery(query);
    
//     expect(result.length).toBeGreaterThan(0);
//     expect(result[0]).toHaveProperty('id');
//     expect(result[0]).toHaveProperty('name');
//     expect(result[0].id).toBe('1');

// });

//Test 6

test('Parse SQL query with Multiple where clause',()=>{
    const query = 'SELECT id,name FROM sample where age = 30 AND name = John';
    const parsed = queryParser(query);
    expect(parsed).toEqual({
        fields: ['id', 'name'],
        table: 'sample',
        whereClauses: [{
            "field": "age",
            "operator": "=",
            "value": "30",
        }, {
            "field": "name",
            "operator": "=",
            "value": "John",
        }]
    });
});


test('Execute SQL Query with Multiple WHERE Clause', async () => {
    const query = 'SELECT id, name FROM sample WHERE age = 30 AND name = John';
    const result = await executeSELECTQuery(query);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ id: '1', name: 'John' });
});
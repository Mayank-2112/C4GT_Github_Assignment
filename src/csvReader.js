const fs = require('fs');
const csv = require('csv-parser');

const filePath = 'sample.csv';
exports.readCSV = (filePath) => {
    const result = [];

    return new Promise((resolve,reject)=>{
        fs.createReadStream(filePath)
        .pipe(csv()).on('data',(data)=> result.push(data))
        .on('end',()=>{
            resolve(result);
        })
        .on('error',(error)=>{
            reject(error);
        });
    });
};
const fs = require("fs");

const csv = fs.readFileSync("devices.csv","utf8");

const lines = csv.trim().split(/\r?\n/);

const headers = lines[0].split(",");

const data = lines.slice(1).map(line => {

const values = line.split(",");

let obj = {};

headers.forEach((h,i)=>{
obj[h.trim()] = values[i] ? values[i].trim() : "";
});

return obj;

});

fs.writeFileSync("devices.json",JSON.stringify(data,null,2));

console.log("devices.json created");

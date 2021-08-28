let cleverdb = require("../index.js");

let db = cleverdb();

console.log("Adding Numbers:", typeof db.add("myNumber", 100) === "number");
console.log(
    "Setting Data:",
    typeof db.set("myData", "This data is here") === "string"
);
console.log("Deleting Data:", db.delete("myData"));
console.log("Fetching Deleted Data:", db.get("myData") === null);
console.log("Fetching Added Number:", typeof db.get("myNumber") === "number");
console.log("Pushing to an array:", db.push("myVal", "val") instanceof Array);
console.log("Fetching first prop of array:", db.get("myVal.0") === "val");
console.log(
    "Setting prop in object:",
    db.set("myObj.prop", "myProp").prop === "myProp"
);
console.log("Fetching prop in object:", db.get("myObj.prop") === "myProp");
console.log("Deleting prop in object:", db.delete("myObj.prop"));
console.log("Fetching deleted prop:", db.get("myObj.prop") === undefined);
console.log(
    "Subtracting from Numbers:",
    typeof db.subtract("myNumber", 50) === "number"
);
console.log(
    "Pushing in array in object:",
    db.push("myObj.arr", "myItem").arr instanceof Array
);

console.log(db.set("userInfo", { difficulty: "Easy" }));

console.log(db.push("userInfo.items", "Sword"));

console.log(db.add("userInfo.balance", 500));

console.log(db.push("userInfo.items", "Watch"));

console.log(db.add("userInfo.balance", 500));

console.log(db.get("userInfo.balance")); 
console.log(db.get("userInfo.items")); 


console.log(!db.all().every(e => typeof e == "string")); 
console.log(db.all()[3].data.items); 

const test = new db.table("test");
test.set("data", "hello world");
console.log(db.get("data")); 
console.log(db.get("data", { table: "test" })); 
console.log(test.get("data")); 

// Main.js by Tor Cox
// declare html constants

const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");

//notepad constants
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");
const fourth = document.querySelector(".fourth");
const fifth = document.querySelector(".fifth");
const sixth = document.querySelector(".sixth");
const seventh = document.querySelector(".seventh");
const eigth = document.querySelector(".eigth");
const ninth = document.querySelector(".ninth");
const tenth = document.querySelector(".tenth");

//
// "mongodb+srv://vcox2:<password>@sezzle-calculator.an1n2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// database password Df4XqPGk1Dz8HAKz
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://vcox2:<password>@sezzle-calculator.an1n2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


let tempHistory = "";

// declare variables
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

// number function for when user clicks on a number
numbersEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    display2El.innerText = dis2Num;
    // console.log();
  });
});

// called within mathOperation takes operation, clears variables and makes haveDot = false;
operationEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dis2Num) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
    console.log(result);
  });
});

// clear display when equal pressed
function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " ";
  display1El.innerText = dis1Num;
  display2El.innerText = "";
  dis2Num = "";
  tempResultEl.innerText = result;
}

// function for what happens when click on operation button
function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dis2Num);
  }
}

// equal function 
equalEl.addEventListener("click", () => {
  if (!dis2Num || !dis1Num) return;
  haveDot = false;
  mathOperation();
  updateList();
  clearVar();
  display2El.innerText = result;
  tempResultEl.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

// when CE button pressed 
clearAllEl.addEventListener("click", () => {
  dis1Num = "";
  dis2Num = "";
  display1El.innerText = "";
  display2El.innerText = "";
  result = "";
  tempResultEl.innerText = "";
});

// when C pressed
clearLastEl.addEventListener("click", () => {
  display2El.innerText = "";
  dis2Num = "";
});


// adds keyboard functionality 
window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
    // console.log(e.key)
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
    // console.log(e.key)
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
  // console.log(e.key)
});

// check each button to see if matches
function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

// called within mathOperation takes operation, clears variables and makes haveDot = false;
function clickOperation(key) {
  operationEl.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}

// run 
function clickEqual() {
  equalEl.click();
}

//notepad functions
 function updateList() {
   var noteContent = {
    "tenth": ninth.innerText,
    "ninth": eigth.innerText,
    "eigth": seventh.innerText,
    "seventh": sixth.innerText,
    "sixth": fifth.innerText,
    "fifth": fourth.innerText,
    "fourth": third.innerText,
    "third": second.innerText,
    "second": first.innerText,
    "first": dis1Num.replace(/\s+/gm,'').trim() + dis2Num.replace(/\s+/gm,'').trim() + '=' + result
  }
  //WriteToFile();
  //db.collection('operations').insertOne(noteContent);
  tenth.innerText = noteContent.tenth;
  ninth.innerText = noteContent.ninth;
  eigth.innerText = noteContent.eigth;
  seventh.innerText = noteContent.seventh;
  sixth.innerText = noteContent.sixth;
  fifth.innerText = noteContent.fifth;
  fourth.innerText = noteContent.fourth;
  third.innerText = noteContent.third;
  second.innerText = noteContent.second;
  first.innerText = noteContent.first;
}

function WriteToFile() {
  let fso = CreateObject("Scripting.FileSystemObject");  
  let s = fso.CreateTextFile("test.txt", True);
  s.writeLine("hi");
//  s.writeline(document.passForm.input1.value);
  s.Close();
} 


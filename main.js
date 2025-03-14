var editor = document.getElementById('inp');
var out = document.getElementById('out');
var lines = document.getElementById('lines');

var lineHeight = 20.8;
var charWidth = 14;

var keywords = [
    'function', 'let', 'var', 'const', 'console', 'if', 'else', 'switch', 'case', 'default',
    'for', 'while', 'do', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw',
    'class', 'extends', 'super', 'this', 'new', 'import', 'export', 'from', 'as', 'default',
    'await', 'async', 'yield', 'static', 'get', 'set', 'typeof', 'instanceof', 'in', 'delete',
    'void', 'with', 'debugger', 'arguments', 'eval', 'true', 'false', 'null', 'undefined', 
    'NaN', 'Infinity'
];


function handleScroll(){
  out.scrollTop = editor.scrollTop;
  lines.scrollTop = editor.scrollTop;
}

function main(){
  processText();
  updateLineNumbers()
}

function processText(){
  var txt = editor.value;
  var lines = txt.split('\n');
  out.innerHTML = '';
  for(let i=0; i<lines.length; i++){
    if(lines[i]==''){
      out.innerHTML+='<br/>'
    } else {
      out.innerHTML += '<div class="line">' + highlightCode(lines[i]) + '</div>'
    }
  }
  
}

function highlightCode(code) {
      // let code = editor.value;

      // 1) Escape <, >, & so we can safely insert <span> elements
      code = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

  
 
      // 1) Highlight strings: "..." or '...'
      //    We capture them in ( ) so "$1" is the entire string
      code = code.replace(
    /("([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'|`([^`\\]*(\\.[^`\\]*)*)`)/g,
    '<span class="string">$1</span>'
);
  
   code = code
        .replace(/\t/g, "<span class='tag'>\t</span>")

  // 3) Highlight single-line comments (// ...)
 
      code = code.replace(
        /(\/\/.*)/g,
        '<span class="comment">$1</span>'
      );

      // 4) Highlight keywords
      code = code.replace(/\b(function|return|if|else|for|while|let|const|var|new|extends|super|this|throw|try|catch|switch|case|default|do|break|continue|finally|async|await|yield|import|export|from|as|typeof|instanceof|in|delete|void|with|debugger|arguments|eval|true|false|null|undefined|NaN|Infinity|static|get|set|console)\b/g,
        '<span class="keyword">$1</span>'
      );
  
      // 5) Highlight HTML tags like <html>, </div>, etc.
      code = code.replace(
        /(&lt;\/?[a-zA-Z]+(?:\s[^&]*?)?&gt;)/g,
        '<span class="tag">$1</span>'
      );

  return code;
      // out.innerHTML = code + "\n";
    }


function handleKey(e){
  if(e.key=='Tab'){
    e.preventDefault();
    var cursor = editor.selectionStart;
    editor.value = editor.value.slice(0,cursor) + '\t' + editor.value.slice(cursor, editor.value.length);
     editor.selectionStart = cursor + 1;
     editor.selectionEnd = cursor + 1;
  }
}


function updateLineNumbers(){
  let l = inp.value.split('\n').length;
  let html = "";
  for(let i = 0; i < l; i++){
    html += `<span>${i+1}</span>`;
  }
  
  lines.innerHTML = html;
}

window.onload = function(){

    editor.value = `// A simple JavaScript example that showcases various concepts

// 1. Variables and constants
let userName = 'John Doe';
const userAge = 30;

// 2. Function Declaration
function greetUser(name) {
    return \`Hello, \${name}! Welcome to the website.\`;
}

// 3. Object Definition
const user = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    isActive: true,
    greet() {
        console.log(\`Hello, my name is \${this.name}\`);
    }
};

// 4. Using the function
console.log(greetUser(userName));

// 5. Array Declaration
let numbers = [1, 2, 3, 4, 5];

// 6. Array Manipulation
numbers.push(6); // Adds a number at the end
numbers.unshift(0); // Adds a number at the beginning
numbers.splice(2, 1); // Removes the item at index 2

// 7. Looping through arrays
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

// 8. Conditional Statements
let isAdult = userAge >= 18 ? 'Yes' : 'No';
console.log(\`Is the user an adult? \${isAdult}\`);

// 9. Arrow function example
const square = (x) => x * x;
console.log(square(4));

// 10. Higher-Order Functions
const filteredNumbers = numbers.filter(number => number > 2);
console.log(filteredNumbers);

// 11. Map function
const doubledNumbers = numbers.map(number => number * 2);
console.log(doubledNumbers);

// 12. String Manipulation
let message = 'Hello World!';
let upperMessage = message.toUpperCase();
let lowerMessage = message.toLowerCase();
console.log(upperMessage, lowerMessage);

// 13. Template literals
let greeting = \`Hello, my name is \${user.name} and I am \${user.age} years old.\`;
console.log(greeting);

// 14. Destructuring Objects
const { name, email } = user;
console.log(name, email);

// 15. Destructuring Arrays
let [firstNumber, secondNumber] = numbers;
console.log(firstNumber, secondNumber);

// 16. Default Parameters
function add(a = 5, b = 10) {
    return a + b;
}
console.log(add()); // Uses default values

// 17. Try-Catch for Error Handling
try {
    let result = 10 / 0;
    if (!isFinite(result)) throw 'Division by zero';
} catch (error) {
    console.log(\`Error: \${error}\`);
}
`

    main();
};
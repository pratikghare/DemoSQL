var tableHead = document.getElementById("result-head");
var tableBody = document.getElementById("result-body");
var menubtn = document.getElementById("menu-btn");
var textArea = document.getElementById("query-box");
var selectedQuery = "";

var jsonOBJ = {
    id: 1,
    name : "Pratik",
    role : "Full Stack"
}

textArea.addEventListener('mouseup', event => {  
    if(window.getSelection().toString().length){
       let exactText = window.getSelection().toString(); 
       console.log(exactText)
       selectedQuery = exactText;       
    }
})

function setLeftPanelTableList(){
    var leftPanel = document.getElementById("left-panel");
    removeAllChildNodes(leftPanel);
    for(let i=0; i<5; i++){
        let pTable = document.createElement('p');
        pTable.innerText = 'Table '+(i+1);
        leftPanel.appendChild(pTable);
    }
}

function removeAllChildNodes(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function fetchTableDetails(){
    console.log(selectedQuery)
    console.log(jsonOBJ)
    console.log(getColumnList(JSON.stringify(jsonOBJ)))
    // console.log(strArr)
}

function getColumnList(jsonString){
    let columnArr = []
    let str = "";
    for(let i=0; i<jsonString.length; i++){
        if(jsonString[i] == '{' && (i+1 <= jsonString.length-1) && jsonString[i+1] == '"'){
            i = i + 2;
            while(jsonString[i] != '"') str += jsonString[i++]
            columnArr.push(str);
            str = "";
        }
        else if(jsonString[i] == ',' && (i+1 <= jsonString.length-1) && jsonString[i+1] == '"'){
            i = i + 2;
            while(jsonString[i] != '"') str += jsonString[i++]
            columnArr.push(str);
            str = "";
        }
    }
    return columnArr;
}



function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}
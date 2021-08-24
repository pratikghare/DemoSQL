var tableHead = document.getElementById("result-head");
var tableBody = document.getElementById("result-body");
var menubtn = document.getElementById("menu-btn");
var textArea = document.getElementById("query-box");
var selectedQuery = "";

var jsonOBJ = {
    id: 1,
    name : "Pratik",
    role : "Full Stack",
    age : 25,
    salary : 25000,
    hobby : "games",
    test : "new"
}

var dataList = [jsonOBJ , jsonOBJ, jsonOBJ, jsonOBJ,jsonOBJ,jsonOBJ,jsonOBJ,jsonOBJ,jsonOBJ,jsonOBJ,jsonOBJ]

var columns = getColumnList(JSON.stringify(dataList[0]))

textArea.addEventListener('mouseup', event => {  
    if(window.getSelection().toString().length){
       let exactText = window.getSelection().toString(); 
       console.log(exactText)
       selectedQuery = exactText;       
    }
})

setLeftPanelTableList();

function setLeftPanelTableList(){
    var leftPanel = document.getElementById("left-panel");
    removeAllChildNodes(leftPanel);
    for(let i=0; i<5; i++){
        let pTable = document.createElement('p');
        pTable.innerText = 'Table '+(i+1);
        leftPanel.appendChild(pTable);
    }
    setTableData(dataList)
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

function filterTable(){
    let searchTerm = document.getElementById('searchBox').value;
    // console.log(searchTerm)
    
    // let columns = getColumnList(JSON.stringify(dataList[0]));
    let filterList = dataList.filter(data => {
        let flag = false;
        columns.filter(column => {
            let str = "";
            str = data[column]+"";
            if(str.toLowerCase().includes(searchTerm.toLowerCase())) flag = true;
        })
        if(flag) return data;
    })
    // console.log(filterList)
    setTableData(filterList)

}

function setTableData(data){
    // let columns = getColumnList(JSON.stringify(data[0])); // Fetch Columns list
    let header = document.getElementById('result-head');
    header.innerHTML = ""; // Clear the Column Heading
    let row = document.createElement('tr')
    columns.filter(rowHead => {
        let thead = document.createElement('th');
        thead.innerText = rowHead;
        row.appendChild(thead);
    })
    header.appendChild(row);

    let body = document.getElementById('result-body');
    body.innerHTML = "";
    data.filter(element => {
        let trow = document.createElement('tr');
        columns.filter(column => {
            let rowEl = document.createElement('td');
            rowEl.setAttribute('scope' , 'row');
            rowEl.innerText = element[column];
            trow.appendChild(rowEl);
        })
        body.appendChild(trow);
    })

}


function exportToCSVFile(data, columnList){
    let csvContent = "data:text/csv;charset=utf-8,";
    let columnHead = columnList.join(",");
    csvContent += columnHead + "\n";

    data.filter(row => {
        let arr = [];
        columnList.filter(column => {
            arr.push(row[column]+"");
        })
        csvContent += arr.join(",") + "\n";
    })
    console.log(csvContent)
    let encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "my_data.csv");
document.body.appendChild(link); // Required for FF

link.click();
}

function callcsv(){
    console.log("INSIDE ")
    exportToCSVFile(dataList, columns)
}




// function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}
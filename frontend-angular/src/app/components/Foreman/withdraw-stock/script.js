var submit = document.getElementById("submit");
addItem.addEventListener("click",displayDetails);

var row = 1;

function addItem(){
    var itemid = document.getElementById("itemid").value;
    var qty = document.getElementById("qty").value;
    var display = document.getElementById("display").value;

    var newRow = display.insertRow(row);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);

    cell1.innerHTML = itemid;
    cell2.innerHTML = qty;
    
    row++;
}
  
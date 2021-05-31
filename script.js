$(document).ready(function () {
  /* Fetch Json Object */

  /* Helpful Resources:
  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
  https://www.youtube.com/watch?v=5VCY9yCZnlc
  */

  async function fetchJsonData() {
    let formData;

    await fetch(
      "https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json"
    )
      .then(function (response) {
        //use .json() method on response object to convert json into a regular js object once it is retrieved.
        return response.json();
      })
      .then(function (obj) {
        formData = obj;
        console.log("this is formData", formData);
      })
      .catch(function (error) {
        console.error("There is an error, see logged error message", error);
      });

    return formData;
  }

  /*Create Table Body*/

  /*
  Helpful Resource:
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
  https://www.youtube.com/watch?v=XmdOZ5NSqb8
  */

  async function createTable() {
    let data = await fetchJsonData();

    let tableBody = document.getElementById("table-body");

    for (let i = 0; i < data.length; i++) {
      let row = `<tr>
                <td><input type="checkbox"></td>
                <td>${data[i].creditorName}</td>
                <td>${data[i].firstName}</td>
                <td>${data[i].lastName}</td>
                <td>${data[i].minPaymentPercentage.toFixed(2)}%</td>
                <td>${data[i].balance.toFixed(2)}</td>
              </tr>`;
      tableBody.innerHTML += row;
    }

    /*Alternative method using forEach to iterate through the array:
    let htmlString = ""
    let html = data.forEach(element => htmlString += `<tr>
                  <td>${element.creditorName}</td>
                  <td>${element.firstName}</td>
                  <td>${element.lastName}</td>
                  <td>${element.minPaymentPercentage}</td>
                  <td>${element.balance}</td>
                </tr>`)
    tableBody.innerHTML = htmlString
    */
  }

  createTable();

  /* Event Listeners */

  /* Helpful Resources:
  https://www.w3schools.com/jsref/met_table_insertrow.asp */

  $("#add").click(function () {
    let table = document.getElementById("table-body");
    let newRow = table.insertRow(-1)
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    cell1.innerHTML = "New Cell1"
    cell2.innerHTML = "New Cell2"
    cell3.innerHTML = "New Cell3"
    cell4.innerHTML = "New Cell4"
    cell5.innerHTML = "New Cell5"
  });

  $("#remove").click(function () {
    let deleteTableRow = document.getElementById("table-body");
    deleteTableRow.deleteRow(-1);
  });

  /* Helpful Resources:
  https://www.techiedelight.com/implement-select-all-check-box-html-javascript/
  */

  document.getElementById("select-all").onclick = function(){
    let allCheckboxes = document.getElementsByTagName("input");
    for(let checkbox of allCheckboxes){
      checkbox.checked = this.checked;
    }
  }

});

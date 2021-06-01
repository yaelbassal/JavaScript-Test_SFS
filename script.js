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
                <td class="checkbox-container"><input type="checkbox" class="checkbox"></td>
                <td>${data[i].creditorName}</td>
                <td>${data[i].firstName}</td>
                <td>${data[i].lastName}</td>
                <td>${data[i].minPaymentPercentage.toFixed(2)}%</td>
                <td class="balance">${data[i].balance.toFixed(2)}</td>
              </tr>`;
      tableBody.innerHTML += row;
    }

    //call functions to add total rows, get total balance, and add event listeners
    totalRows();
    totalCheckboxes();
    getBalance();

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

  createTable();

  /* Event Listeners */

  /* Helpful Resources:
  https://www.w3schools.com/jsref/met_table_insertrow.asp
  https://api.jquery.com/category/events/ - jQuery Event Methods
  */

  $("#add").click(function () {
    let table = document.getElementById("table-body");
    let newRow = table.insertRow(-1);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);
    cell1.innerHTML =
      '<td class="checkbox-container"><input type="checkbox" class="checkbox"></td>';
    cell2.innerHTML = "New Cell2";
    cell3.innerHTML = "New Cell3";
    cell4.innerHTML = "New Cell4";
    cell5.innerHTML = "New Cell5";
    cell6.innerHTML = "New Cell6";

    //adds 1 to total row count and event listners for new checkboxes
    totalRows();
    totalCheckboxes();
  });

  $("#remove").click(function () {
    let deleteTableRow = document.getElementById("table-body");
    deleteTableRow.deleteRow(-1);

    //Currently removing last row in the table, alternative functionality: I want it to remove rows that are checked.

    //subtracts 1 to total row count
    totalRows();
  });

  /* Selecting all Checkbox when header checkbox is clicked
  Helpful Resources:
  https://www.techiedelight.com/implement-select-all-check-box-html-javascript/
  */

  document.getElementById("select-all").onclick = function () {
    let allCheckboxes = document.getElementsByTagName("input");
    for (let checkbox of allCheckboxes) {
      checkbox.checked = this.checked;
    }
  };

  /* Checkbox EventListeners and Calculations */

  function totalCheckboxes() {
    let checkboxes = $("input");

    //for calculating checked row count
    let checkCountSpan = document.getElementById("check-row-count");
    let num = parseInt(checkCountSpan.innerHTML);

    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener("click", (event) => {
        if (checkboxes[i].id === "select-all") {
          if (checkboxes[i].checked === true) {
            num = checkboxes.length - 1;
            checkCountSpan.innerHTML = num;
          } else {
            num = 0;
            checkCountSpan.innerHTML = num;
          }
        } else if (checkboxes[i].checked === true) {
          num += 1;
          checkCountSpan.innerHTML = num;
        } else if (checkboxes[i].checked === false) {
          num -= 1;
          checkCountSpan.innerHTML = num;
        }
      });
    }
  }

  /* Total Rows Calculations */

  function totalRows() {
    let totalRows = $("tr");
    let totalRowSpan = document.getElementById("total-row-count");
    totalRowSpan.innerHTML = totalRows.length - 1;
  }

  /* Balance Calculations - currently calculates all values */

  function getBalance() {
    let totalBalanceValues = $(".balance");
    let balanceSpan = document.getElementById("total-balance");
    let balanceTotal = 0;

    for (let i = 0; i < totalBalanceValues.length; i++) {
      let currentAmount = parseInt(totalBalanceValues[i].innerHTML);
      balanceTotal += currentAmount;
    }

    balanceSpan.innerHTML = balanceTotal.toFixed(2);
  }
});


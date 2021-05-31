/*Fetch Json Object*/

/* Helpful Resources:
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
https://www.youtube.com/watch?v=5VCY9yCZnlc
*/

async function fetchJsonData(){

  let formData;

  await fetch("https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json").then(function (response){
    //use .json() method on response object to convert json into a regular js object once it is retrieved.
    return response.json()
  }).then(function(obj){
   formData = obj;
   console.log("this is formData", formData)
  }).catch(function(error){
    console.error("There is an error, see logged error message", error)
  })

  return formData
}


/*Create Table Body*/

/*
Helpful Resource:
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
https://www.youtube.com/watch?v=XmdOZ5NSqb8
*/

async function createTable(){

  let data = await fetchJsonData()

  let tableBody = document.getElementById("table-body")

  for(let i = 0; i < data.length; i++){
    let row = `<tr>
                <td>${data[i].creditorName}</td>
                <td>${data[i].firstName}</td>
                <td>${data[i].lastName}</td>
                <td>${data[i].minPaymentPercentage}</td>
                <td>${data[i].balance}</td>
              </tr>`
    tableBody.innerHTML += row
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

createTable()



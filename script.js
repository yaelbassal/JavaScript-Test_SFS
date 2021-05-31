let formData;
/* Helpful Sources:
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
https://www.youtube.com/watch?v=5VCY9yCZnlc
*/

function fetchJsonData(){
  fetch("https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json").then(function (response){
    //use .json() method on response object to convert json into a regular js object once it is retrieved.
    return response.json()
  }).then(function(obj){
   formData = obj;
   console.log("this is formData", formData)
  }).catch(function(error){
    console.error("There is an error, see logged error message", error)
  })
}

fetchJsonData()

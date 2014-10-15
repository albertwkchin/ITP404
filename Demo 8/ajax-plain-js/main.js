// GET request using AJAX
var ajax = function () {
  var xhr = new XMLHttpRequest();
  var url = "ajax-plain-js/example.php?name=David";
  
  // Set the type of request, the URL
  // 3rd param: true means the request will be asynchronous, false is synchronous
  xhr.open("GET", url, true); 

  /*
  	readyState
     	0: request not initialized 
			1: server connection established
			2: request received 
			3: processing request 
			4: request finished and response is ready

		Status
			200: "OK"
			404: Page not found
  */
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          document.getElementById('ajaxResponse').innerHTML = xhr.responseText;
      }
  };

  xhr.send(); // Make the HTTP request
};

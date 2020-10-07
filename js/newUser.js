var urlBase= 'http://vintagecontacts.com/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function createUser()
{
  userId = 0;
  firstName = document.getElementById("newFirst").value.trim();
  lastName = document.getElementById("newLast").value.trim();
  var username = document.getElementById("newName").value.trim();
  var password = document.getElementById("newPass").value.trim();
  var hashPass = md5(password);

  document.getElementById("createResult").innerHTML = "";

  var jsonPayload = '{"login" : "' + username + '", "password" : "' + hashPass + '", "FirstName" : "' + firstName + '", "LastName" : "' + lastName + '"}';
  var url = urlBase + '/NewUser.' + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  if(!(firstName.trim() === "" || lastName.trim() === "" || password.trim() === "" || username.trim() === "")) {
      try {
        xhr.send(jsonPayload);
        
        var jsonObject = JSON.parse( xhr.responseText );
        userId = jsonObject.id;
        var error = jsonObject.error;
        
        // Error 0: No Error
        if (error == "0")
        {
          document.getElementById("createResult").innerHTML = "Success!";
          window.location.href = "index.html";
        }
        // Error 1062: Non-unique UserName
        else if(error == "1062") {
          document.getElementById("createResult").innerHTML = "Username already taken.";
        }
        
        } catch (e) {
          document.getElementById("createResult").innerHTML = "Woah, there seems to be some bad stuff going on rn:" + e;
        }
    } else {
        document.getElementById("createResult").innerHTML = "All fields must be filled.";
    }
  return;
}

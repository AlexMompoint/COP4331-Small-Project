var urlBase = 'http://vintagecontacts.com/LAMPAPI';
var extension = 'php';

// var firstName = "";
// var lastName = "";
// var email = "";
// var phone = 0;
// var userId = 0;
// var id = 0;

var userId = 0;

function createContact()
{
  var firstName = "";
  var lastName = "";
  var phone = "";
  var email = "";
  var login = userId;
  
  // Does this get updated??
  
  var id = 0;
  
  document.getElementById("contactResult").innerHTML = "Hello, I am here, inside of the stuff!";

  firstName = document.getElementById("newFirst").value;
  lastName = document.getElementById("newLast").value;
  email = document.getElementById("newEmail").value;
  phone = document.getElementById("newPhone").value;

  var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "phone"}';
  
  var url = urlBase + '/CreateContact.' + extension;

  var xhr = new XMLHttpRequest();

  xhr.open("PUT", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.send(jsonPayload);

    var jsonObject = JSON.parse( xhr.responseText );
    var error = jsonObject.error;

    if (error == "0")
    {
      window.location.href = "contacts.html";
      document.getElementById("contactResult").innerHTML = "Contact successfully created!";
    }
    else
    {
      document.getElementById("contactResult").innerHTML = "Something happened while creating your contact! " + userId + " " + jsonObject.error;
    }

  } catch (e) {
    document.getElementById("contactResult").innerHTML = "Could not communicate with the server.";
  }
}

function buildTable()
{
    document.getElementById("userIdResult").innerHTML = "Testing Testing 123";
    
  var contacts = [
    {'firstName':'DefaultFirst', 'lastName':'DefaultLast', 'phone':'0000000000', 'email':'defaultemail@knights.ucf.edu'}
  ]
  
  var jsonPayload = '{"userId" : "' + userId + '"}';

  var url = urlBase + '/Contacts.' + extension;
  var xhr = new XMLHttpRequest();

  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.send(jsonPayload);

    var table = document.getElementById("myTable");

    contacts = JSON.parse( xhr.responseText );

    if (contacts.length > 0)
    {

      for (var i = 0; i < contacts.length; i++)
      {
        var row = `<tr>
                    <td>${contacts[i].firstName}</td>
                    <td>${contacts[i].lastName}</td>
                    <td>${contacts[i].phone}</td>
                    <td>${contacts[i].email}</td>
                  </tr>`;

        table.innerHTML += row;

      }

    }
    else
    {
      table.innerHTML += `<tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                          </tr>`;
    }

  }
  catch (e)
  {

  }

}

var urlBase = 'http://vintagecontacts.com/LAMPAPI';
var extension = 'php';

// Declare out here for global scope
var userId = 0;
var contactId = 0;
var tempRow;

function doLogin() 
{
  var firstName = "";
  var lastName = "";
  var login = document.getElementById("loginName").value;
  var password = md5(document.getElementById("loginPassword").value);

  document.getElementById("loginResult").innerHTML = "";

  var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
  var url = urlBase + '/Login.' + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );
		userId = jsonObject.id;

		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "Incorrect username/password";
			return;
		}
        else
        {
            document.getElementById("loginResult").innerHTML = "Login Successful";
            saveCookie();
            window.location.href = "contacts.html";
        }

  }
  catch(err)
  {
      document.getElementById("loginResult").innerHTML = err.message;
  }
}

function createContact()
{
    var firstName = "";
    var lastName = "";
    var phone = "";
    var email = "";
    var login = userId;
    
    var id = 0;
    
    var table = document.getElementById("myTable");
    var rowNum = table.rows.length + 1;
    
    table.innerHTML += `<tr name="Row ${rowNum}">
                            <td><input style="text-align:center;vertical-align:middle;" type="checkbox" name="Test" />&nbsp;<br /></td>
                            <td><input type="text" id="newFirst" placeholder="First Name" /><br /></td>
                            <td><input type="text" id="newLast" placeholder="Last Name" /><br /></td>
                            <td><input type="text" id="newPhone" placeholder="Phone Number" /><br /></td>
                            <td><input type="text" id="newEmail" placeholder="Email" /><br /></td>
                            <td style="display:none;"></td>
                            <td><button onclick="submitNewContact();">Submit</button> <button onclick="cancelNew();">Cancel</button></td>
                        </tr>`;
                        

}

function submitNewContact()
{
    firstName = document.getElementById("newFirst").value;
    lastName = document.getElementById("newLast").value;
    email = document.getElementById("newEmail").value;
    phone = document.getElementById("newPhone").value;
    var dt = new Date();
    var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "phone" : "' + phone + '", "email" : "' + email + '", "UserID" : "' + userId + '", "ID" : "0", "DateCreated" :"' + (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear()+'"}';
    
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
    
    // Do this after submitting contact to reload table without having to refresh page
    var table = document.getElementById("myTable");
    
    table.innerHTML="";
    
    buildTable();
}

function searchContact() 
{
    var searchFirstName = document.getElementById("searchFirstName").value;
    var searchLastName = document.getElementById("searchLastName").value;
    
    var contacts = [
    {'firstName':'DefaultFirst', 'lastName':'DefaultLast', 'phone':'0000000000', 'email':'defaultemail@knights.ucf.edu', 'ID':0}
  ];
  
  var jsonPayload = '{"userId" : ' + userId +',"firstName": "' + searchFirstName + '","lastName": "' + searchLastName +'"}';

  var url = urlBase + '/SearchContact.' + extension;
  var xhr = new XMLHttpRequest();

  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.send(jsonPayload);
    var table = document.getElementById("myTable");
    table.innerHTML = "";
    contacts = JSON.parse( xhr.responseText );

    if (contacts.length > 0)
    {

      for (var i = 0; i < contacts.length; i++)
      {
        var row = `<tr name="Row ${i+1}">
                    <td><input style="text-align:center;vertical-align:middle;" type="checkbox" name="${contacts[i].ID}" />&nbsp;<br /></td>
                    <td>${contacts[i].firstName}</td>
                    <td>${contacts[i].lastName}</td>
                    <td>${contacts[i].phone}</td>
                    <td>${contacts[i].email}</td>
                    <td style="display:none;">${contacts[i].ID}</td>
                    <td><button style="display:block;margin:auto;" onclick="editContact('Row ${i+1}');">Edit Contact</button></td>
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

function cancelNew()
{
    var table = document.getElementById("myTable");
    var rowNum = table.rows.length - 1;
    
    table.deleteRow(rowNum);
}

function editContact(rowNum)
{
    var row = document.getElementsByName(rowNum)[0];
    var col = row.getElementsByTagName("td");
    
    tempRow = row.cloneNode(true);
    
    row.innerHTML = `<td> </td>
                    <td><input type="text" id="editFirst" value="${col[1].innerHTML}" /><br /></td>
                    <td><input type="text" id="editLast" value="${col[2].innerHTML}" /><br /></td>
                    <td><input type="text" id="editPhone" value="${col[3].innerHTML}" /><br /></td>
                    <td><input type="text" id="editEmail" value="${col[4].innerHTML}" /><br /></td>
                    <td style="display:none;">${col[5].innerHTML}</td>
                    <td style="margin:auto;"><button onclick="submitEdit('${rowNum}');">Submit</button> <button onclick="cancelEdit('${rowNum}');">Cancel</button></td>`;
}

function submitEdit(rowNum)
{
    var firstName = document.getElementById("editFirst").value;
    var lastName = document.getElementById("editLast").value;
    var email = document.getElementById("editEmail").value;
    var phone = document.getElementById("editPhone").value;
    
    console.log("You entered: " + firstName + " " + lastName + " " + email + " " + phone + ", with User ID " + userId);
    
    var row = document.getElementsByName(rowNum)[0];
    var col = row.getElementsByTagName("td");
    
    console.log("Editing, the contact known as: " + col[5].innerHTML);
    
    var ID = col[5].innerHTML;
    
    var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "email" : "' + email + '", "phone" : "' + phone + '", "UserID" : "' + userId + '", "ID" : "' + ID + '"}';
    
    console.log("The payload is as such: " + jsonPayload);
    
    var url = urlBase + '/UpdateContact.' + extension;
    var xhr = new XMLHttpRequest();
    
    xhr.open("PUT", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
    try
    {
        xhr.send(jsonPayload);
        
        console.log("Response: " + xhr.responseText);
    }
    catch(e)
    {
        
    }
    
    row.innerHTML = `<td><input type="checkbox" name="${ID}" />&nbsp;</td>
                    <td>${firstName}</td>
                    <td>${lastName}</td>
                    <td>${phone}</td>
                    <td>${email}</td>
                    <td style="display:none;">${ID}</td>
                    <td><button onclick="editContact('${rowNum}');">Edit Contact</button></td>`;
}

function cancelEdit(rowNum)
{
    console.log("First inside the function: " + tempRow.innerHTML + " " + tempRow);
    
    var row = document.getElementsByName(rowNum)[0];
    var col = row.getElementsByTagName("td");
    
    console.log("Inside the function: " + tempRow.innerHTML + " " + tempRow);
    
    row.innerHTML = tempRow.innerHTML;
}

function deleteContact()
{
    var inputs = document.getElementsByTagName('input');
    var jsonPayload;
    
    var url = urlBase + '/DeleteContact.' + extension;
    var xhr = new XMLHttpRequest();
        if(confirm("Are you sure you want to delete contact(s)?")) {
            for(var i=0; i<inputs.length; i++)
            {
                if(inputs[i].getAttribute('type')=='checkbox' && inputs[i].checked){
                    console.log(inputs[i].name);
                    jsonPayload = '{"ID" : "' + inputs[i].name + '"}';
                    
                    xhr = new XMLHttpRequest();
                    xhr.open("DELETE", url, false);
                    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                    
                    try
                    {
                        xhr.send(jsonPayload);
                    }
                    catch(e)
                    {
                        
                    }
                }
            }
            
            window.location.href = "contacts.html";
        }
}

function buildTable()
{
  var contacts = [
    {'firstName':'DefaultFirst', 'lastName':'DefaultLast', 'phone':'0000000000', 'email':'defaultemail@knights.ucf.edu', 'ID':0}
  ];
  
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
        
        var row = `<tr name="Row ${i+1}">
                    <td><input style="text-align:center;vertical-align:middle;" type="checkbox" name="${contacts[i].ID}" />&nbsp;<br /></td>
                    <td>${contacts[i].firstName}</td>
                    <td>${contacts[i].lastName}</td>
                    <td>${contacts[i].phone}</td>
                    <td>${contacts[i].email}</td>
                    <td style="display:none;">${contacts[i].ID}</td>
                    <td><button style="display:block;margin:auto;" onclick="editContact('Row ${i+1}');">Edit Contact</button></td>
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

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			//firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			//lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		//document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

<?php

  $inData = getRequestInfo();

  $userId = 0;

  $conn = new mysqli("localhost", "group5_HTMLAccess", "thisonlyworkssometimes", "group5_contacts");

  if ($conn->connect_error)
  {
    returnWithError( $conn->connect_error );
  }
  else
  {
    $sql = "SELECT firstName, lastName, phone, email, id FROM contacts WHERE UserID='" . $inData["userId"] . "'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
    {
      $contact_array = array();

      foreach($result as $row)
      {
        $contact_array[] = array("firstName" => $row["firstName"], "lastName" => $row["lastName"], "phone" => $row["phone"], "email" => $row["email"], "ID" => $row["id"]);
      }

      sendResultInfoAsJson( json_encode($contact_array));
    }

  }
  
    function getRequestInfo()
    {
    	return json_decode(file_get_contents('php://input'), true);
    }
    
    function sendResultInfoAsJson( $obj )
    {
    	header('Content-type: application/json');
    	echo $obj;
    }
    
    function returnWithError( $err )
    {
    	$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    	sendResultInfoAsJson( $retValue );
    }
    
    function returnWithInfo( $firstName, $lastName, $id )
    {
    	$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
    	sendResultInfoAsJson( $retValue );
    }

 ?>

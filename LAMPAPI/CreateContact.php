<?php

    $inData = getRequestInfo();
    
    $FirstName = "  ";
    $LastName = "  ";
    $Email = "  ";
    $Phone = 0;
    $DateCreated = "  ";
    $UserID = 0;
    $ID = 0;
    
    $conn = new mysqli("localhost", "group5_HTMLAccess", "thisonlyworkssometimes", "group5_contacts");

    if($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $FirstName = $inData["firstName"];
        $LastName = $inData["lastName"];
        $Email = $inData["email"];
        $Phone = $inData["phone"];
        $DateCreated = $inData["DateCreated"];
        $UserID = $inData["UserID"];
        $ID = $inData["ID"];
        
        $sql = "INSERT INTO contacts VALUES ( '$FirstName', '$LastName', '$Email', '$Phone', '$DateCreated', '$UserID', 0)";
        
        $result = $conn->query($sql);
        
        if(mysqli_error($conn))
        {
            returnWithError($conn->errno);     
        }
        else
        {
            returnWithInfo( 0, $FirstName, $LastName, $Email, $Phone, $DateCreated, $UserID );
        }
    }
    
    
    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
    
    function returnWithInfo( $ID, $FirstName, $LastName, $Email, $Phone, $DateCreated, $UserID )
	{
		$retValue = '{"ID":' . $ID . ',"FirstName":"' . $FirstName . '","LastName":"' . $LastName . '", "Email":"' . $Email . '", "Phone":"' . $Phone . '", "DateCreated":"' . $DateCreated . '", "UserID":"' . $UserID . '", "error":"0"}';
		
		sendResultInfoAsJson( $retValue );
	}
    
    function returnWithError( $err )
	{
		$retValue = '{"ID":0,"FirstName":"  ","LastName":"  ","PhoneNum":0, "Email":"  ", "DateCreated":"  ", "UserID":0, "error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
    
    function getRequestInfo()
    {
		return json_decode(file_get_contents('php://input'), true);
	}
	
?>
<?php
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $newConnection = new mysqli("localhost", "group5_HTMLAccess", "thisonlyworkssometimes", "group5_contacts");

    if($newConnection->connect_error)
    {
        returnWithError( $newConnection->connect_error );
    }
    else
    {
        $ID = $input["ID"];

        $result = $newConnection->query( "DELETE from contacts where ID = '$ID'" );
        
          
        if( $newConnection->affected_rows <= 0 )
        {
            $errorMessage = 'Contact could not be deleted';
            
            returnWithError( $ID, $errorMessage );
        }
        returnWithInfo($ID);
        $newConnection->close();
    }
    
    function returnWithInfo( $ID )
	{
		$returnValue = '{ "ID": "'.$ID.'", "error:": "No error"}';
		
		sendJSON( $returnValue );
	}
  
    function returnWithError( $id,$err )
	{
		$retValue = '{"ID":0,"FirstName":"","LastName":" ","PhoneNum":0, "Email":"  ", "DateCreated":"", "UserID":' . $id.', "error":"' . $err . '"}';
		sendJSON( $retValue );
	}
	
    function sendJSON( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
    

    
 
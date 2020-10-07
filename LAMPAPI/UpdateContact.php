<?php

    $inData = getRequestInfo();
    
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
        
        echo "'$FirstName'";
        
        $ID = $inData["ID"];
        
        $updateFN = "UPDATE contacts SET FirstName = '$FirstName' WHERE ID = '$ID'";
        $updateLN = "UPDATE contacts SET LastName = '$LastName' WHERE ID = '$ID'";
        $updateEmail = "UPDATE contacts SET Email = '$Email' WHERE ID = '$ID'";
        $updatePhone = "UPDATE contacts SET Phone = '$Phone' WHERE ID = '$ID'";
        $updateDateCreated = "UPDATE contacts SET DateCreated = '$DateCreated' WHERE ID = '$ID'";
        $updateUserID = "UPDATE contacts SET UserID = '$UserID' WHERE ID = '$ID'";
        
        if( mysqli_query($conn, $updateFN))
        {
            echo "Success";
        }
        else
        {
            echo "Error updating record: " . mysqli_error( $conn );
        }
        
        if( mysqli_query($conn, $updateLN))
        {
            echo "Success";
        }
        else
        {
            echo "Error updating record: " . mysqli_error( $conn );
        }
        
        if( mysqli_query($conn, $updateEmail))
        {
            echo "Success";
        }
        else
        {
            echo "Error updating record: " . mysqli_error( $conn );
        }
        
        if( mysqli_query($conn, $updatePhone))
        {
            echo "Success";
        }
        else
        {
            echo "Error updating record: " . mysqli_error( $conn );
        }
        
        if( mysqli_query($conn, $updateDateCreated))
        {
            echo "Success";
        }
        else
        {
            echo "Error updating record: " . mysqli_error( $conn );
        }
        
        if( mysqli_query($conn, $updateUserID))
        {
            echo "Success";
        }
        else
        {
            echo "Error updating record: " . mysqli_error( $conn );
        }
        
        $conn->query($update);
        
        if(mysqli_error($conn))
        {
            returnWithError($conn->errno);     
        } else {
         returnWithInfo( $ID, $FirstName, $LastName, $Email, $Phone, $DateCreated, $UserID );
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
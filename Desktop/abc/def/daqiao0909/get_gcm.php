<?php
function getGCM(){
include("database.php");
    // array for json response
    $response = array();
    $response["gcm"] = array();
    $result ="SELECT gcm_token FROM user u WHERE u.category!='A'";
    $query_exec = mysqli_query($con,$result)or die(mysqli_error());

    while($row = mysqli_fetch_array($query_exec)){
        // temporary array to create single category
        $tmp = array();
        $tmp["gcm_token"] = $row["gcm_token"];
        
        // push category to final json array
        array_push($response["gcm"], $tmp);
    }

    // keeping response header to json
    header('Content-Type: application/json');

    // echoing json result
    echo json_encode($response);
}

getGCM();
?>
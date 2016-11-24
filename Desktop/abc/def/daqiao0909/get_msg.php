<?php
function getMSG(){
include("database.php");
    // array for json response
    $response = array();
    $response["msg"] = array();
    $result ="SELECT id,msg,messages.read,messages.delstatus FROM messages";
    $query_exec = mysqli_query($con,$result)or die(mysqli_error());

    while($row = mysqli_fetch_array($query_exec)){
        // temporary array to create single category
        $tmp = array();
        $tmp["id"] = $row["id"];
        $tmp["msg"] = $row["msg"];
        $tmp["read"] = $row["read"];
        $tmp["delstatus"] = $row["delstatus"];
        // push category to final json array
        array_push($response["msg"], $tmp);
    }

    // keeping response header to json
    header('Content-Type: application/json');

    // echoing json result
    echo json_encode($response);
}

getMSG();
?>
<?php 
include("database.php");
$id = $_GET['id'];
$query_search = "UPDATE messages set messages.delstatus=1 WHERE messages.id='".$id."'";
$query_exec = mysqli_query($con,$query_search);
echo "Deleted";
?>
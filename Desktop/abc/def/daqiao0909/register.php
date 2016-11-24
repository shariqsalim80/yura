<?php 
include("database.php");
$regId = $_GET['regId'];
$category = $_GET['category'];
$query_search = "INSERT INTO user (user.category,user.gcm_token,user.createdon) VALUES ('".$category."','".$regId."',now())";
$query_exec = mysqli_query($con,$query_search);

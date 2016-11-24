<?php
include("database.php");
   $target = array();
   $sql = "SELECT gcm_token FROM user u WHERE u.category!='A'";
   $result = mysqli_query($con,$sql);
   while($row = mysqli_fetch_assoc($result)){
   array_push($target, $row['gcm_token']);
   }
$data =$_GET['msg'];  
$query_search = "INSERT INTO messages (messages.msg,messages.createdon) VALUES ('".$data."',now())";
$query_exec = mysqli_query($con,$query_search);
sendMessage($data,$target);
function sendMessage($data,$target){
//FCM api URL
$url = 'https://fcm.googleapis.com/fcm/send';
//api_key available in Firebase Console -> Project Settings -> CLOUD MESSAGING -> Server key
$server_key = 'AIzaSyDWvIZJaf1jXGRjYU4t99YSgtOWu75BVYk';
			
$fields = array();
$fields['data'] = $data;
$msg = array
        (
            'message'     => $data,
         );
        $fields = array
        (
            'registration_ids'     => $target,
            'data'            => $msg
        );

//header with content_type api key
$headers = array(
	'Content-Type:application/json',
  'Authorization:key='.$server_key
);
			
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
$result = curl_exec($ch);
if ($result === FALSE) {
	die('FCM Send Error: ' . curl_error($ch));
}
curl_close($ch);
return $result;
}
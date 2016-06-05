<?php
header('Access-Control-Allow-Origin: *');
$link = mysqli_connect('127.0.0.1', 'root', 'littlemini', 'webservice');
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
$query = "SELECT * FROM city";
$result = mysqli_query($link, $query);

$country_array = array();
while ($row = mysqli_fetch_assoc($result)) {
    $country_array[] = $row;

}


echo json_encode($country_array);
mysqli_close($link);


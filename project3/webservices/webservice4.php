<?php
header('Access-Control-Allow-Origin: *');
$link = mysqli_connect('127.0.0.1', 'root', 'littlemini', 'webservice');
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
if (!isset($_GET['name'])) {
    
    $query = "SELECT * FROM friends";
    $result = mysqli_query($link, $query);

    $friends_array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $friends_array[] = $row;
    }
    echo json_encode($friends_array);
} else {
    
    $name = $_GET['name'];
    $query = "SELECT * FROM friends WHERE name LIKE '$name%'";
    $result = mysqli_query($link, $query);

    $friends_array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $friends_array[] = $row;
    }
    
    echo json_encode($friends_array);
}
mysqli_close($link);

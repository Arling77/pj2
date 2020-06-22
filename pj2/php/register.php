<?php

require_once('config.php');

$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];



try {

    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO traveluser (Email, UserName,Pass) VALUES ('".$email."','".$username."','".$password."')";
    $result = $pdo->query($sql);

    $pdo = null;

    header('Location: http://localhost:63342/pj2/html/login.html?_ijt=g5h90ec4be3fvk4brasq9ckelo');//login.html

}catch (PDOException $e) {
    die( $e->getMessage() );
}
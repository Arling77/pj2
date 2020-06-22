<?php

require_once('config.php');

class UserLoginState{
    var $isSuccessful;
    var $userID;

    function __construct($su,$uid){
        $this->isSuccessful = $su;
        $this->userID = $uid;
    }
}

$name = $_POST['name'];
$password = $_POST['password'];

try {

    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT UID FROM traveluser WHERE UserName ='".$name."' AND Pass='".$password."'";
    $result = $pdo->query($sql);

    if($row = $result->fetch()){
        $answer = new  UserLoginState(true,$row['UID']);
    }else{
        $answer = new UserLoginState(false,-1);
    }

    $pdo = null;
    echo json_encode($answer);

}catch (PDOException $e) {
    die( $e->getMessage() );
}
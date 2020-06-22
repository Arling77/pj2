<?php

require_once('config.php');

$imgID = $_POST['imgID'];
$userID = $_POST['userID'];

try {

    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "DELETE FROM travelimagefavor WHERE ImageID='".$imgID."' AND UID = '".$userID."'";
    $result = $pdo->query($sql);

    $pdo = null;
    echo json_encode("CANCLE FINISHED");

}catch (PDOException $e) {//异常处理
    die( $e->getMessage() );
}
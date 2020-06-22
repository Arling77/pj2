<?php

require_once('config.php');

class Image{
    var $imageID;
    var $title;
    var $des;
    var $path;

    public function __construct($id,$t,$d,$p)
    {
        $this->imageID=$id;
        $this->title = $t;
        $this->des = $d;
        $this->path=$p;
    }
}


$getType=$_POST['getType'];
try {

    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if($getType=="hot"){

        $sql = "SELECT travelimage.ImageID,travelimage.Title,travelimage.Description,travelimage.PATH 
FROM travelimage,(SELECT travelimagefavor.ImageID,COUNT(travelimagefavor.ImageID) AS countN FROM travelimagefavor GROUP BY travelimagefavor.ImageID) AS countTable
WHERE travelimage.ImageID = countTable.ImageID ORDER BY countTable.countN DESC";
        $result = $pdo->query($sql);


        $i = 0;
        $resultSet = array(6);
        $isLackN = 0;
        while ($i<6) {
            if($row = $result->fetch()){
                $resultSet[$i]=new Image($row['ImageID'],$row['Title'],$row['Description'],$row['PATH']);
            }else{
                $resultSet[$i]=new Image(-1,0,0,0);
                $isLackN++;
            }
            $i++;
        }
    }else{
        $isLackN=6;
    }

    if($isLackN>0){
        $sql ="SELECT ImageID,Title,Description,PATH FROM travelimage ORDER BY RAND() limit 0,".$isLackN;
        $result = $pdo->query($sql);
        $i = 0;
        while ($i < $isLackN) {
            if($row = $result->fetch()) {
                $resultSet[$i + 6 - $isLackN] = new Image($row['ImageID'], $row['Title'], $row['Description'], $row['PATH']);
                $i++;
            }
        }
    }
    $pdo = null;
    echo json_encode($resultSet);

}catch (PDOException $e) {
    die( $e->getMessage() );
}
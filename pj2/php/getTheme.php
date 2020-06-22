<?php
//获得所有主题

require_once('config.php');

try {

    $pdo = new PDO(DBCONNSTRING,DBUSER,DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $sql = "SELECT Content FROM travelimage GROUP BY Content order by Content";
    $result = $pdo->query($sql);

    $themes =array();

    while ($row = $result->fetch()) {
        $themes[] = $row['Content'];
    }

    $pdo = null;
    echo json_encode($themes);

}catch (PDOException $e) {
    die( $e->getMessage() );
}
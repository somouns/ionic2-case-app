
<?php
header('Content-Type:application/json');

@$id = $_REQUEST['id'];
if(empty($id))
{
    echo '[]';
    return;
}

$output = [];

//$conn = mysqli_connect('127.0.0.1','root','','kaifanla');
$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT did,name,price,img_lg,detail,material FROM kf_dish WHERE did=$id";
$result = mysqli_query($conn,$sql);

$row = mysqli_fetch_assoc($result);
if(empty($row))
{
    echo '[]';
}
else
{
    $output[] = $row;
    echo json_encode($output);
}

?>
<?php
header('Content-Type:application/json');

$user_name = $_REQUEST['user_name'];
$sex = $_REQUEST['sex'];
$phone = $_REQUEST['phone'];
$addr = $_REQUEST['addr'];
$did = $_REQUEST['did'];
$order_time = time()*1000;

$output = [];

if(empty($user_name) || empty($sex)
|| empty($phone) || empty($addr)
||empty($did))
{
    echo '[]';
    return;
}

//$conn = mysqli_connect('127.0.0.1','root','','kaifanla');
$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "INSERT INTO kf_order VALUES(NULL,'$phone','$user_name','$sex','$order_time','$addr','$did')";
$result = mysqli_query($conn,$sql);

$arr = [];
if($result)
{
    $arr['oid'] = mysqli_insert_id($conn);
    $arr['msg'] = 'succ';
}
else
{
    $arr['msg'] = 'error';
    $arr['reason'] = '插入数据失败';
}

$output[] = $arr;
echo json_encode($output);

?>
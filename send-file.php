<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $file_name = $file['name'];
    $file_tmp_name = $file['tmp_name'];
    $file_size = $file['size'];
    $file_error = $file['error'];
    // do something with the file, e.g. move it to a specific directory
    move_uploaded_file($file_tmp_name, "./$file_name");
    // // return a response to the client
    // $fp = fopen($file_tmp_name, 'r');
    // // $ch = curl_init();
    $curlFile = curl_file_create($file_name);
    $post = array('val1' => 'value','val2' => 'value','file'=> $curlFile );
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,"http://34.136.44.96:4444/yash");
    curl_setopt($ch, CURLOPT_POST,1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    $result=curl_exec ($ch);
    curl_close ($ch);
    // echo "resutl " . $result;
    header('Content-Type: application/json');
    echo json_decode($result);
} else {
    // return an error response if the request is not a POST or if the 'file' parameter is missing
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'File not found']);
}

?>
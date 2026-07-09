<?php
// backend.php

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve data from the POST request
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    // Validate the input data
    if (!empty($name) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Process the data (e.g., save to a database or send an email)

        // Example response
        $response = [
            'status' => 'success',
            'message' => 'Data received successfully.',
            'data' => [
                'name' => $name,
                'email' => $email
            ]
        ];
    } else {
        // Invalid input response
        $response = [
            'status' => 'error',
            'message' => 'Invalid input data.'
        ];
    }

    // Return the response as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Handle non-POST requests
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
}
?>

<?php
// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// Load Pokemon data from JSON file and decode it
$data = json_decode(file_get_contents('pokemon.json/pokedex.json'), true);

// Check if the 'method' parameter is set in the URL query
if (isset($_GET['method'])) {
    // Get the requested method from the URL query parameter
    $method = $_GET['method'];
} else {
    // Set the response status code to 400 (Bad Request) and output an error message
    http_response_code(400);
    echo json_encode(['error' => 'Method not specified']);
    exit;
}

// Process the request based on the method
switch ($method) {
    case 'get_random_pokemon':
        // Set the response content type to JSON
        header('Content-Type: application/json');
        // Shuffle the Pokemon data array
        shuffle($data);
        // Output the first 5 Pokemon as a JSON-encoded string
        echo json_encode(array_slice($data, 0, 5));
        break;

    case 'get_pokemon_by_id':
        // Check if the 'id' parameter is set in the URL query
        if (isset($_GET['id'])) {
            // Get the requested Pokemon ID from the URL query parameter
            $id = intval($_GET['id']);
        } else {
            // Set the response status code to 400 (Bad Request) and output an error message
            http_response_code(400);
            echo json_encode(['error' => 'ID not specified']);
            exit;
        }

        // Filter the Pokemon data array to find the requested Pokemon
        $result = array_filter($data, function ($pokemon) use ($id) {
            return $pokemon['id'] == $id;
        });

        if (count($result) > 0) {
            // Set the response content type to JSON
            header('Content-Type: application/json');
            // Output the found Pokemon as a JSON-encoded string
            echo json_encode(array_values($result)[0]);
        } else {
            // Set the response status code to 404 (Not Found) and output an error message
            http_response_code(404);
            echo json_encode(['error' => 'Pokemon not found']);
        }
        break;

    case 'get_pokemon_image':
        // Check if the 'id' parameter is set in the URL query
        if (isset($_GET['id'])) {
            // Get the requested Pokemon ID from the URL query parameter
            $id = intval($_GET['id']);
        } else {
            // Set the response status code to 400 (Bad Request) and output an error message
            http_response_code(400);
            echo json_encode(['error' => 'ID not specified']);
            exit;
        }

        // Format the ID as a three-digit string with leading zeros
        $formatted_id = str_pad($id, 3, '0', STR_PAD_LEFT);
        // Set the path to the image file
        $path = "pokemon.json/images/$formatted_id.png";
        if (file_exists($path)) {
            // Set the response content type to PNG image
            header('Content-Type: image/png');
            // Output the image file contents
            echo file_get_contents($path);
        } else {
            // Set the response status code to 404 (Not Found) and output an error message
            http_response_code(404);
            echo "Image not found";
        }
        break;

    default:
        // Set the response status code to 400 (Bad Request) and output an error message
        http_response_code(400);
        echo json_encode(['error' => 'Invalid method']);
}
?>
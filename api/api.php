<?php
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('pokemon.json/pokedex.json'), true);

$method = $_GET['method'];

switch ($method) {
    case 'get_random_pokemon':
        header('Content-Type: application/json');
        shuffle($data);
        echo json_encode(array_slice($data, 0, 5));
        break;

    case 'get_pokemon_by_id':
        $id = intval($_GET['id']);
        $result = array_filter($data, function ($pokemon) use ($id) {
            return $pokemon['id'] == $id;
        });
        
        if (count($result) > 0) {
            header('Content-Type: application/json');
            echo json_encode(array_values($result)[0]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Pokemon not found']);
        }
        break;

    case 'get_pokemon_image':
        $id = intval($_GET['id']);
        $formatted_id = str_pad($id, 3, '0', STR_PAD_LEFT);
        $path = "pokemon.json/images/$formatted_id.png";
        if (file_exists($path)) {
            header('Content-Type: image/png');
            echo file_get_contents($path);
        } else {
            http_response_code(404);
            echo "Image not found";
        }
        break;

    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid method']);
}
?>

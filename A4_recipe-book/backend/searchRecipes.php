<?php
header('Content-Type: application/json');

// Require a search query
if (!isset($_GET['ingredient']) || empty($_GET['ingredient'])) {
    echo json_encode(['error' => 'Missing ingredient parameter']);
    exit;
}

$search = strtolower(trim($_GET['ingredient']));
$directory = __DIR__ . '/recipes';

$results = [];

if (is_dir($directory)) {
    $files = scandir($directory);

    foreach ($files as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) === 'json') {
            $content = file_get_contents("$directory/$file");
            $data = json_decode($content, true);

            if (
                $data &&
                (
                    (isset($data['ingredients']) && strpos(strtolower($data['ingredients']), $search) !== false) ||
                    (isset($data['title']) && strpos(strtolower($data['title']), $search) !== false)
                )
            ) {
                $results[] = $data;
            }
        }
    }
}

echo json_encode($results);
<?php
header('Content-Type: application/json');

// Require a difficulty parameter
if (!isset($_GET['level']) || empty($_GET['level'])) {
    echo json_encode(['error' => 'Missing difficulty level parameter']);
    exit;
}

$difficultyParam = strtolower(trim($_GET['level']));
$directory = __DIR__ . '/recipes';

$filteredRecipes = [];

if (is_dir($directory)) {
    $files = scandir($directory);

    foreach ($files as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) === 'json') {
            $content = file_get_contents("$directory/$file");
            $data = json_decode($content, true);

            if ($data && isset($data['difficulty']) && strtolower($data['difficulty']) === $difficultyParam) {
                $filteredRecipes[] = $data;
            }
        }
    }
}

echo json_encode($filteredRecipes);
<?php
header('Content-Type: application/json');

// Directory where recipes are stored (as JSON files or .txt)
// For file-based storage:
$directory = __DIR__ . '/recipes';

$recipes = [];

if (!is_dir($directory)) {
    echo json_encode([]);
    exit;
}

$files = scandir($directory);

foreach ($files as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'json') {
        $content = file_get_contents("$directory/$file");
        $data = json_decode($content, true);
        if ($data) {
            $recipes[] = $data;
        }
    }
}

echo json_encode($recipes);
?>
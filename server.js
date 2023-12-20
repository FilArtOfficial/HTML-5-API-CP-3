const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// In-memory data store
let data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];

// Serve static files (если у вас есть статические файлы, например, index.html)
app.use(express.static('public'));

// Read
app.get('/api/data', (req, res) => {
    res.json(data);
});

// Create
app.post('/api/data', (req, res) => {
    const { name } = req.body;
    const newItem = { id: data.length + 1, name };
    data.push(newItem);
    res.sendStatus(201);
});

// Update
app.put('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const index = data.findIndex(item => item.id == id);
    if (index !== -1) {
        data[index].name = name;
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// Delete
app.delete('/api/data/:id', (req, res) => {
    const { id } = req.params;
    data = data.filter(item => item.id != id);
    res.sendStatus(204);
});

// Обработчик для корневого пути
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Замените 'public/index.html' на путь к вашему файлу index.html
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
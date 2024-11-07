import express from 'express';

const app = express();
const PORT = 3000;

let list = [
    { id: 1, item: 'item1' },
    { id: 2, item: 'item2' },
    { id: 3, item: 'item3' }
];

app.use(express.json());

// GET Route: Returns the list
app.get('/', (req, res) => {
    res.status(200).send(list);
});

// PUT Route: Updates an item based on its ID
app.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { item } = req.body;
    
    const index = list.findIndex((li) => li.id === id);
    if (index === -1) {
        return res.status(404).send({ message: 'Item not found' });
    }

    list[index].item = item; // Update the item at the found index
    res.status(200).send(list);
});

// POST Route: Adds a new item to the list
app.post('/', (req, res) => {
    const { item } = req.body;
    const newItem = { id: list.length + 1, item }; // Assign a new ID
    list.push(newItem);
    res.status(201).send(list);
});

// DELETE Route: Removes an item based on its ID
app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = list.findIndex((li) => li.id === id);
    if (index === -1) {
        return res.status(404).send({ message: 'Item not found' });
    }

    list.splice(index, 1); // Remove item from list
    res.status(200).send(list);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

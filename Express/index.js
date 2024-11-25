import express from 'express';
import logger from './logger.js';
import morgan from 'morgan';

const app = express();
const PORT = 3000;
app.use(express.json());

const morganFormat = ':method :url :status :res[content-length] - :response-time ms';
app.use(morgan(morganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                contentLength: message.split(' ')[3],
                responseTime: message.split(' ')[4]
            };
            logger.info(JSON.stringify(logObject));
        }
    }
}));

let list = [
    { id: 1, item: 'item1' },
    { id: 2, item: 'item2' },
    { id: 3, item: 'item3' }
];


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

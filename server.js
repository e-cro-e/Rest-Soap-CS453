//made by Ethan A. :)

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const YAML = require('js-yaml');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

const db = new sqlite3.Database(':memory:');

// Serve the OpenAPI documentation
const openapiSpec = YAML.load('./docs/openapi.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// Enable CORS for all routes
app.use(cors());

// Route handler for adding a new car to the shop
app.post('/cars', cors(), (req, res) => {
  const {
    vin,
    plate,
    state,
    make,
    model,
    year,
    ownerName,
    ownerAddress,
    ownerDLNumber,
    problemDescription,
    timeInShop,
    workers,
  } = req.body;

  // Insert the car data into the database
  db.run(
    'INSERT INTO cars (vin, plate, state, make, model, year, ownerName, ownerAddress, ownerDLNumber, problemDescription, timeInShop, workers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      vin,
      plate,
      state,
      make,
      model,
      year,
      ownerName,
      ownerAddress,
      ownerDLNumber,
      problemDescription,
      timeInShop,
      JSON.stringify(workers),
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to add the car to the shop' });
      }

      const carId = this.lastID;
      return res.status(201).json({ message: 'Car added successfully', carId });
    }
  );
});

// Route handler for updating a car in the shop
app.put('/cars/:id', cors(), (req, res) => {
  const carId = req.params.id;
  const {
    vin,
    plate,
    state,
    make,
    model,
    year,
    ownerName,
    ownerAddress,
    ownerDLNumber,
    problemDescription,
    timeInShop,
    workers,
  } = req.body;

  // Update the car data in the database
  db.run(
    'UPDATE cars SET vin = ?, plate = ?, state = ?, make = ?, model = ?, year = ?, ownerName = ?, ownerAddress = ?, ownerDLNumber = ?, problemDescription = ?, timeInShop = ?, workers = ? WHERE id = ?',
    [
      vin,
      plate,
      state,
      make,
      model,
      year,
      ownerName,
      ownerAddress,
      ownerDLNumber,
      problemDescription,
      timeInShop,
      JSON.stringify(workers),
      carId,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to update the car' });
      }

      return res.status(200).json({ message: `Car with ID ${carId} updated successfully` });
    }
  );
});

// Route handler for getting a car in the shop
app.get('/cars/:id', cors(), (req, res) => {
  const carId = req.params.id;

  // Retrieve the car data from the database
  db.get('SELECT * FROM cars WHERE id = ?', [carId], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to retrieve the car' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Car not found' });
    }

    return res.status(200).json({ car: row });
  });
});

// Route handler for getting all cars in the shop
app.get('/cars', cors(), (req, res) => {
  // Retrieve all cars from the database
  db.all('SELECT * FROM cars', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to retrieve cars' });
    }

    return res.status(200).json({ cars: rows });
  });
});

// Route handler for removing a car from the shop
app.delete('/cars/:id', cors(), (req, res) => {
  const carId = req.params.id;

  // Delete the car from the database
  db.run('DELETE FROM cars WHERE id = ?', [carId], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to remove the car' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    return res.status(200).json({ message: `Car with ID ${carId} removed successfully` });
  });
});

// Initialize the database and start the server
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vin TEXT,
      plate TEXT,
      state TEXT,
      make TEXT,
      model TEXT,
      year INTEGER,
      ownerName TEXT,
      ownerAddress TEXT,
      ownerDLNumber TEXT,
      problemDescription TEXT,
      timeInShop INTEGER,
      workers TEXT
    )
  `);

const port = 3000;

app.listen(port, () => {
  console.log(`Rest server is running on port 3000/cars`);
	});
});

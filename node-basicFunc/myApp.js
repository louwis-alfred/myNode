const express = require("express"); // Import the express module to create a web server
const app = express(); // Initialize the Express app
const port = 3000; // Define the port on which the server will run

// Middleware to parse JSON request bodies
app.use(express.json());

// Dummy data: an array of objects representing names with unique IDs
let names = [
  {
    id: 1,
    name: "Vitalik Buterin",
  },
  {
    id: 2,
    name: "Donald Trump",
  },
];

// Function to generate a unique ID for new names
let nextId = 3; // Start assigning IDs from 3 (since 1 and 2 are already used)
function generateId() {
  return nextId++; // Increment the ID after each use
}

// Routes

// GET - Retrieve all names
app.get("/names", (req, res) => {
  res.json(names); // Send the entire `names` array as a JSON response
});

// POST - Add a new name
app.post("/add", (req, res) => {
  const newName = {
    id: generateId(), // Generate a unique ID for the new name
    name: req.body.name, // Get the name from the request body
  };
  names.push(newName); // Add the new name to the `names` array
  res.status(201).json(newName); // Send a 201 Created status with the new name
  res.status(200).json({ message: "Added Successfully" }); // Send a success message
});

// PUT - Update an existing name by ID
app.put("/names/:id", (req, res) => {
  const id = parseInt(req.params.id); // Extract the ID from the URL
  const nameToUpdate = names.find((name) => name.id === id); // Find the name by ID

  if (nameToUpdate) {
    nameToUpdate.name = req.body.name; // Update the name
    res.json(nameToUpdate); // Send the updated name as the response
  } else {
    res.status(404).json({ message: "Name not found" }); // Send a 404 Not Found status if the name is not found
  }
});

// DELETE - Delete a name by ID
app.delete("/names/:id", (req, res) => {
  const id = parseInt(req.params.id); // Extract the ID from the URL
  const index = names.findIndex((name) => name.id === id); // Find the index of the name by ID

  if (index !== -1) {
    names.splice(index, 1); // Remove the name from the array

    // Reassign IDs sequentially to ensure there are no gaps
    names.forEach((name, index) => {
      name.id = index + 1; // Assign new IDs starting from 1
    });

    nextId = names.length + 1; // Update the `nextId` variable to avoid conflicts
    res.status(200).json({ message: "Delete Successfully" }); // Send a success message
  } else {
    res.status(404).json({ message: "Name not found" }); // Send a 404 Not Found status if the name is not found
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
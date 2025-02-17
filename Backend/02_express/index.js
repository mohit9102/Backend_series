/**
 * TEA SHOP REST API
 * ================
 * A complete CRUD (Create, Read, Update, Delete) API for managing teas
 */

/**
 * IMPORTS AND SETUP
 * ===============
 * WHAT: Basic Express server configuration
 * WHY: To create a web server with REST capabilities
 * HOW: Using Express.js framework
 */
// Import Express.js framework
import express from 'express';
// Create a new Express.js application instance
// This is the main entry point for the server
const app = express();
// Define the port number for the server
const PORT = 3000;

// Enable JSON parsing middleware
// This allows the server to handle JSON requests/responses
// without manually parsing the body
app.use(express.json());

/**
 * DATA STORAGE
 * ===========
 * WHAT: In-memory data structure for tea storage
 * WHY: To temporarily store tea information
 * HOW: Using array and auto-incrementing ID
 */
// Array to store tea data
// Each tea is an object with ID, name, and price
let teaData = [];
// Auto-incrementing ID for new teas
// This is used to assign unique IDs to new teas
let nextId = 1;

/**
 * CREATE (POST)
 * ============
 * WHAT: Add new tea to collection
 * WHY: Allow users to create new tea entries
 * HOW: POST request with tea details in body
 * 
 * Example POST request:
 * curl -X POST http://localhost:3000/teas 
 *      -H "Content-Type: application/json" 
 *      -d '{"name":"Green Tea","price":2.99}'
 */
// Define a POST route for creating new teas
// This route expects tea details in the request body
// It creates a new tea object and adds it to the teaData array
// It returns the newly created tea with a 201 status code
app.post('/teas', (req, res) => {
    // Extract tea details from request body
    const {name, price} = req.body;//req.body is the body of the request
    // Create a new tea object with auto-incrementing ID
    const newTea = {id: nextId++, name, price};
    // Add the new tea to the teaData array
    teaData.push(newTea);
    // Send the new tea as the response with 201 status code
    res.status(201).send(newTea);
});

/**
 * READ (GET)
 * =========
 * WHAT: Retrieve tea information
 * WHY: Allow users to view tea details
 * HOW: GET request to either list all teas or get specific tea
 * 
 * Example GET requests:
 * curl http://localhost:3000/teas
 * curl http://localhost:3000/teas/1
 */
// Define a GET route to list all teas
app.get('/teas', (req, res) => {//req is the request and res is the response
    // Send the entire teaData array as the response
    res.status(200).send(teaData);//
});

// Define a GET route to retrieve a specific tea by ID
app.get('/teas/:id', (req, res) => {//req.params is the parameters of the request
    // Extract the tea ID from the URL parameters
    const id = req.params.id;
    // Find the tea with the specified ID in teaData
    const tea = teaData.find(tea => tea.id == parseInt(id));//parseInt converts string to integer

    // If tea is found, send it as the response
    // Otherwise, send a 404 Not Found response
    if(tea) {
        // Send the tea object as the response
        res.status(200).send(tea);
    } else {//if tea is not found
        // Send a 404 Not Found response with an error message
        res.status(404).send({message: 'Tea not found'});
    }
});

/**
 * UPDATE (PUT)
 * ===========
 * WHAT: Modify existing tea details
 * WHY: Allow users to update tea information
 * HOW: PUT request with updated details in body
 * 
 * Example PUT request:
 * curl -X PUT http://localhost:3000/teas/1 
 *      -H "Content-Type: application/json" 
 *      -d '{"name":"Premium Green Tea","price":3.99}'
 */
// Define a PUT route to update tea details
app.put('/teas/:id', (req, res) => {
    // Extract the tea ID from the URL parameters
    const id = req.params.id;
    // Extract updated tea details from the request body
    const {name, price} = req.body;
    // Find the tea with the specified ID in teaData
    const tea = teaData.find(tea => tea.id == parseInt(id));   //parseInt converts string to integer

    // If tea is found, update its details and send it as the response
    // Otherwise, send a 404 Not Found response
    
    if(tea) {
        // Update the tea details with the new values
        tea.name = name;
        // Update the tea price with the new value
        tea.price = price;
        // Send the updated tea as the response
        res.status(200).send(tea);
    } else {//if tea is not found
        // Send a 404 Not Found response with an error message
        res.status(404).send({message: 'Tea not found'});
    }
});

/**
 * DELETE
 * ======
 * WHAT: Remove tea from collection
 * WHY: Allow users to delete unwanted teas
 * HOW: DELETE request with tea ID in URL
 * 
 * Example DELETE request:
 * curl -X DELETE http://localhost:3000/teas/1
 */

// Define a DELETE route to remove a tea by ID
// This route deletes the tea with the specified ID from teaData
app.delete('/teas/:id', (req, res) => {
    // Extract the tea ID from the URL parameters
    const id = req.params.id;
    // Find the index of the tea with the specified ID in teaData   
    const index = teaData.findIndex(tea => tea.id == parseInt(id));

    // If tea is found, remove it from teaData and send a 204 response
    
    if(index != -1) {
        // Remove the tea from teaData array
        teaData.splice(index, 1);
        // Send a 204 No Content response
        res.status(204).send();
    } else {//if tea is not found
        // Send a 404 Not Found response with an error message
        res.status(404).send({message: 'Tea not found'});
    }
});

/**
 * SERVER STARTUP
 * =============
 * WHAT: Start the Express server
 * WHY: Make API available for client requests
 * HOW: Listen on specified port
 */

// Start the Express server on the specified port
app.listen(PORT, () => {
    // Log a message when the server is running
    console.log(`Server running at http://localhost:${PORT}`);
});

/**
 * HTTP STATUS CODES
 * ===============
 * 200 OK: Request succeeded
 * 201 Created: Resource created successfully
 * 204 No Content: Request succeeded (typically for DELETE)
 * 404 Not Found: Resource not found
 * 
 * TESTING INSTRUCTIONS
 * ==================
 * 1. Start server: node index.js
 * 2. Test endpoints using Postman or cURL
 * 3. Remember to set Content-Type header for POST/PUT
 * 4. Check response status codes and bodies
 */




import express from 'express'; // import express
const app = express(); // create express app

const PORT = 3000; // set the port

// create a route
//it is a function that takes two arguments request and response
// request is the incoming request from the client
// response is the outgoing response from the server
//it make use of http module to create a server and handle request and response but express is a framework build on top of http module
// it make easy to create server and handle request and response
/*app.get('/', (req, res) => { // create a route
    res.send('Hello from mohit and his tea'); // send the response
})
app.get('/ice-tea', (req, res) => { // create a route
    res.send('what ice tea do you want?'); // send the response
})

app.get('/ice', (req, res) => { // create a route
    res.send('tea or coffee?'); // send the response
})
*/

//used to accetp the incoming request from the client or the frontend side data
app.use(express.json()); // middleware to parse incoming request with JSON payloads

let teaData = []; // create an empty array to store tea data
let nextId = 1; // create a variable to store the next id


app.listen(PORT, () => { // listen to the port
    console.log(`Server is running on port ${PORT}`); // log the message
})




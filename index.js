const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
// Use the provided port or default to 5000 for local development
const port = process.env.PORT || 5000;

const summarizeText = require("./summarize.js");

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.static("public")); // Serve static files from the 'public' directory

// Handle POST requests to the '/summarize' endpoint
app.post("/summarize", (req, res) => {
  // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

  // call your summarizeText function, passing in the text from the request
  summarizeText(text)
    .then((response) => {
      res.send(response); // Send the summary text as a response
    })
    .catch((error) => {
      console.error(error); // Log the error to console
      res.status(500).send("Internal Server Error"); // Send a 500 error response
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send("Something went wrong!"); // Send a generic error response
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Import required modules
const mongoose = require("mongoose");
const fs = require("fs");

// Import model
const Eateries = require("../models/Eateries");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Eateries", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const jsonData = fs.readFileSync("eaterydata.json", "utf8");
const eateryData = JSON.parse(jsonData);

// Function to add data to MongoDB
async function addData() {
    try {
        // Insert data into the Eatery collection
        await Eateries.insertMany(eateryData);
        console.log("Data inserted successfully!");
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        // Close the connection
        mongoose.disconnect();
    }
}

// Call the function to add data
addData();

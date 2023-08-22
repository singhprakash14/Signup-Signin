const { connectToMongoDB } = require("./config/db");
const colors = require("colors");
const express = require("express");

const userRoutes = require("./routes/User.routes");
;
require("dotenv").config({ path: "./.env" });

const app = express();

// for Cross-Origin Resource Sharing (CORS)
const cors = require("cors");
const {
  handleRouteNotFound,
  errorHandler,
} = require("./middleware/error-handler");

app.use(cors());
app.options("*", cors());

// for Parsing incoming JSON data
app.use(express.json());

//app routes
app.use("/v1", userRoutes);




//error handlers
app.use(handleRouteNotFound);
app.use(errorHandler);

// for Starting the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server running on port ${PORT}`.bgBlue);
});
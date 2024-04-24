const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const db = require("./db/db");
const express = require("express");
const PORT = process.env.PORT;
const routes = require("./routes");

db();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});

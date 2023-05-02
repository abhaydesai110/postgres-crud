const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const dbEmp = require("./employee");
var cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/add", dbEmp.createUserId);
app.get("/all", dbEmp.getAllUser);
app.get("/:id", dbEmp.getUserById);
app.put("/:id", dbEmp.updateUserById);
app.delete("/:id", dbEmp.deleteUser);


app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

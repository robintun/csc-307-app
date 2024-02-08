import express from "express";
import cors from "cors";
import userFuncs from "./user-services.js"

const app = express();
const port = 8000;
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

  app.use(cors());
  app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userFuncs.getUsers(name, job)
    .then((data) => {return data})
    .then((json) => {res.send(json)})
    .catch((error => {console.log(error)}))
});

// Getting users by ID
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id

  userFuncs.findUserById(id)
    .then((result) => {res.send(result)})
    .catch((error) => {
      console.log(error)
      res.status(404).send("Resource not found.");
    })
});

// Using the POST method
app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userFuncs.addUser(userToAdd)
    .then((result) => {res.status(201).send(result)})
    .catch((error) => {
      console.log(error)
      //res.status(500).send("User not added")
    })
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id

  userFuncs.deleteUser(id)
    .then((result) => {
      if(!result) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send("User successfully removed!");
      }
    })
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
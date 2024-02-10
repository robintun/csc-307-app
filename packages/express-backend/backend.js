// backend.js
import express from "express";
import cors from "cors";
import User from "./user-services.js";

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
      User.findUserByNameAndJob(name, job).then((result) => {
        const response = result === undefined ? []:result;
        res.send(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else if (name != undefined) {
      User.findUserByName(name).then((result) => {
        const response = result === undefined ? []:result;
        res.send(response);
      })
      .catch((error) => {
        console.log(error);
      });
    } 
    else if (job != undefined) {
      User.findUserByJob(job).then((result) => {
        const response = result === undefined ? []:result;
        res.send(response);
      })        
      .catch((error) => {
          console.log(error);
    });
    }
    else {
      User.getUsers().then((response) => {
        const result = response === undefined ? []:response;
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  });

  const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

  const findUserById = (id) =>
  users["users_list"].find((user) => user["_id"] === id);

app.get("/users/:_id", (req, res) => {
  const id = req.params["_id"]; //or req.params.id
  User.findUserById(id).then((result) => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });
  
});

app.get("/users?name=<name>", (req, res) => {
  const name = req.query.name;
  User.findUserByName(name).then((response) => {
    if (response === undefined){
      res.status(404).send("Resource not found.");
    } else {
      res.send(response);
    }
  })

  
})

const addUser = (user) => {
    //generate a random Id for the new user
    user["id"] = String(generateId());

    //add the user
    users["users_list"].push(user);
    return user;
  };
  
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    
    User.addUser(userToAdd)
      .then((addedUser) => {
        res.status(201).send(addedUser); // 201 status code for successful resource creation
      })
      .catch((error) => {
        console.log(error);
      });
  });

app.delete("/users/:_id", (req, res) => {
    const id = req.params["_id"];
    User.userDelete(id).then((response) => {
      res.status(204).send(response);
    })
    .catch((error) => {
      console.log(error);
    })
});


  
function generateId() {
    const r = Math.random();
    return r
}
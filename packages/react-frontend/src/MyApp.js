// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    // src/MyApp.js
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
      const userId = characters[index]._id; // Get the user ID
      deleteUser(userId)
      .then((response) => {
        if (response.status === 204) {
          // Successfully deleted on the server, now update the frontend state
          setCharacters((prevCharacters) => {
            const updatedCharacters = prevCharacters.filter((character, i) => i !== index);
            console.log(updatedCharacters)
            return updatedCharacters;
          });
        } else {
          throw new Error(`Failed to delete user. Status code: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }


    function updateList(person) {
      postUser(person)
        .then((response) => {
          // Check if the response status code is 201 (Content Created)
          if (response.status === 201) {
            console.log(response.body)
            return response.json(); // Parse the JSON data from the response
          } else {
            throw new Error(`Failed to add user. Status code: ${response.status}`);
          }
        })
        .then((data) => setCharacters([...characters, data]))
        .catch((error) => {
          console.log(error);
        });
    }

    //(a new inner function inside MyApp())
    
    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json))
        .catch((error) => { console.log(error); });
    }, [] );

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    function deleteUser(userId) {
      //const userId = characters[index].id;
      const promise = fetch(`Http://localhost:8000/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      return promise;
    }

    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
      </div>
    );

    
    
    
    
}

export default MyApp;
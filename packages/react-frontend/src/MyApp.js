// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter(
      (character) => character.id !== characters[index].id );
    
    deleteUser(characters[index])
    .then((res) => {
      if (res.status !== 204) {
        throw new Error("Error removing!")
      }
    })
    .then(setCharacters(updated)) // updates frontend after clicking delete right away
    // .then(() => setCharacters(updated)) // updates frontend after clicking delete after refresh
    .catch((error) => {
      console.log(error);
    })
  } // to ask

  // function updateList(person) {
  //   setCharacters([...characters, person]);
  // }
  
  function updateList(person) { 
    postUser(person)
      .then((res) => {
        if (res.status !== 201) {
          throw new Error("Adding user unsuccessful!");
        }
        else {
          return res.json()
        }
      }) // to ask
      .then((json) => setCharacters([...characters, json]))
      .catch((error) => {
        console.log(error);
      })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise; 
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
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
  
  function deleteUser(person) {
    const promise = fetch(`Http://localhost:8000/users/${person.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
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

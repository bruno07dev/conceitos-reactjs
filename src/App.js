import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const  [ repositorieslist, setRepositories ] =useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const repository = await api.post('repositories',{
      title: `Repository ${Date.now()}`
    });

    setRepositories([...repositorieslist, repository.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`)

    setRepositories(repositorieslist.filter(repository => repository.id !== id));
  }

  // id, title, url, techs, likes

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorieslist.map(repository => 
          <li key={ repository.id}>

            <ul>
              <li><a href={ repository.url }>{ repository.title }</a></li>
            </ul>

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
             
          </li>
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

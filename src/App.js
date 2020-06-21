import React from "react";

import "./styles.css";
import api from "./services/api";
import { useState, useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]); //definimos um estado project e ele começa vazio
  const [i, setI] = useState(0)
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  
  
  async function handleAddRepository() {//Cria a função de adicionar repositorio
    const response = await api.post('/repositories', {
      title: 'Repositório ' + i,
      url: 'teste@teste',
      techs: 'react, javascript'
    });
    const repository = response.data;

    setRepositories([...repositories, repository]); //pega a informaçao de projects e adiciona uma nova
    setI(i + 1);
    console.log(i);

  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id)); // atualiza os repositorios que foram deletados
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
          {repository.title}
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

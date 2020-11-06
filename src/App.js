import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      "title": "Desafio ReactJS",
      "url": "https://github.com/l4ndim/reactjs_challenge2",
      "techs": ["ReactJS"]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)

    if(response.status === 204){
      const repoIndex = repositories.findIndex(repo => repo.id === id);
      const repos = repositories
      repos.splice(repoIndex, 1);
      setRepositories([...repos]);
    }
  }

  useEffect(() => {
    api.get("repositories").then(response => setRepositories(response.data))
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => <li>{repo.title} <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

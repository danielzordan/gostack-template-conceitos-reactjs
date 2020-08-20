import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `title aleatorio ${Date.now()}`,
      url: `url aleatoria ${Date.now()}`,
      techs: [`${Date.now()}`, `${Date.now()}`],
    });

    const newRepo = response.data;

    setRepositories([...repositories, newRepo]);
  }

  async function handleRemoveRepository(id) {
    const repoIndex = repositories.findIndex((repo) => repo.id === id);

    if (repoIndex < 0) return;

    await api.delete(`repositories/${id}`);

    const newRepositories = [...repositories];
    newRepositories.splice(repoIndex, 1);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

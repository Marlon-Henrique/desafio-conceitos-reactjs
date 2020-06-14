import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/projects', {
      title: `New project ${Date.now()}`,
      owner: 'Marlon Silva'
    })

    const project = response.data
    setProjects([...projects, project])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/projects/${id}`)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => 
        <li key={project.id}>
          {project.title}
          <button type="button" onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

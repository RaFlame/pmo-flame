import React, { useState } from 'react';

    function Sidebar({ toggleSidebar }) {
      const [isProjectsOpen, setIsProjectsOpen] = useState(false);
      const [projects, setProjects] = useState(['Project 1', 'Project 2', 'Project 3']);
      const [editingIndex, setEditingIndex] = useState(null);

      const toggleProjects = () => {
        setIsProjectsOpen(!isProjectsOpen);
      };

      const handleProjectNameChange = (index, newName) => {
        const updatedProjects = [...projects];
        updatedProjects[index] = newName;
        setProjects(updatedProjects);
      };

      const handleAddProject = () => {
        setProjects([...projects, `Project ${projects.length + 1}`]);
      };

      return (
        <div className="sidebar">
          <div className="toggle-sidebar" onClick={toggleSidebar}>
            &lt;
          </div>
          <ul>
            <li onClick={toggleProjects}>
              Projects
              <span className="plus-sign" onClick={handleAddProject}>+</span>
              {isProjectsOpen && (
                <ul className="dropdown">
                  {projects.map((project, index) => (
                    <li key={index}>
                      {editingIndex === index ? (
                        <input
                          type="text"
                          value={project}
                          onChange={(e) => handleProjectNameChange(index, e.target.value)}
                          onBlur={() => setEditingIndex(null)}
                          autoFocus
                        />
                      ) : (
                        <span onClick={() => setEditingIndex(index)}>{project}</span>
                      )}
                    </li>
                  ))}
                  <li className="add-project" onClick={handleAddProject}>
                    <i>+ Add New Project</i>
                  </li>
                </ul>
              )}
            </li>
            <li>Home</li>
            <li>Documentation</li>
          </ul>
        </div>
      );
    }

    export default Sidebar;

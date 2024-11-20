import React, { useState } from 'react';
    import axios from 'axios';
    import Sidebar from './Sidebar';
    import Header from './Header';

    function App() {
      const [inputText, setInputText] = useState('');
      const [documentation, setDocumentation] = useState('');
      const [isSidebarVisible, setIsSidebarVisible] = useState(true);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('/api/generate-documentation', { inputText });
          setDocumentation(response.data.documentation);
        } catch (error) {
          console.error('Error generating documentation:', error);
        }
      };

      const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
      };

      return (
        <div className="app-container">
          <Header />
          <div className="main-content">
            {isSidebarVisible && <Sidebar toggleSidebar={toggleSidebar} />}
            <div className="content">
              <h1>Prince2 Project Manager</h1>
              <form onSubmit={handleSubmit}>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter project scope and objectives"
                  rows="10"
                  cols="50"
                />
                <button type="submit">Generate Documentation</button>
              </form>
              {documentation && (
                <div>
                  <h2>Generated Documentation</h2>
                  <pre>{documentation}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    export default App;

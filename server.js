const express = require('express');
    const axios = require('axios');
    const bodyParser = require('body-parser');
    require('dotenv').config();

    const app = express();
    const port = process.env.PORT || 3001;

    app.use(bodyParser.json());

    app.post('/api/generate-documentation', async (req, res) => {
      const { inputText } = req.body;

      try {
        const response = await axios.post(
          'https://<your-azure-openai-endpoint>/openai/deployments/<deployment-id>/completions?api-version=2022-12-01',
          {
            prompt: inputText,
            max_tokens: 1500,
            temperature: 0.7,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'api-key': process.env.AZURE_OPENAI_API_KEY,
            },
          }
        );

        const documentation = response.data.choices[0].text;
        res.json({ documentation });
      } catch (error) {
        console.error('Error calling Azure OpenAI API:', error);
        res.status(500).json({ error: 'Failed to generate documentation' });
      }
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

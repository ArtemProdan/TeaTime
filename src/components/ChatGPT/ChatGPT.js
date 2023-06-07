import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  const sendMessage = () => {
    setChatHistory([...chatHistory, { speaker: 'user', text: userInput }]);

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer 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`
    }

    const data = {
      'model': 'text-ada-001',
      'prompt': userInput,
      'temperature': 1,
      'max_tokens': 64,
      'n': 2,
      'stop': ''
    }

    axios.post('https://api.openai.com/v1/completions', data, { headers })
      .then(response => {
        setChatHistory([...chatHistory, { speaker: 'bot', text: response.data.choices[0].text }]);
        setUserInput(''); 
      })
      .catch(error => console.log(error))
    }

  return (
    <div>
      <div>
        {chatHistory.map((entry, index) => (
          <p key={index}>
            <strong>{entry.speaker}: </strong>
            {entry.text}
          </p>
        ))}
      </div>
      <textarea value={userInput} onChange={handleUserInput} onKeyPress={handleKeyPress} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;

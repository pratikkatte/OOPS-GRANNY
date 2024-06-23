import React, { useState,useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1e1e1e;
  color: #e0e0e0;
  padding: 20px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  max-height: 75vh;
  min-height: 75vh;
  margin-bottom: 20px;  // Add some space between chat messages and input area
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Message = styled.div`
  background-color: ${({ isUser }) => (isUser ? '#3a3a3a' : '#444')};
  color: #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  max-width: 70%;
`;

const InputContainer = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   max-width: 600px;  // Set max-width for the input container
//   margin-top: 20px;
//   padding: 0 10px;  // Add some padding to the sides
//   bottom: 0;

  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;  // Set max-width for the input container
  padding: 10px 0;  // Add some padding to the sides
  background-color: #1e1e1e;  // Ensure the input container is also dark
  position: fixed;  // Fix the position at the bottom
  bottom: 0;  // Align it to the bottom
  top: 1;
//   left: 0;  // Align it to the left
//   right: 0;  // Align it to the right
`;

const Input = styled.input`
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #e0e0e0;
  font-size: 16px;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }
`;

const Button = styled.button`
  padding: 15px;
  background-color: #3a3a3a;
  color: #e0e0e0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;

  &:hover {
    background-color: #555;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #e0e0e0;
`;

const ChatPage = ({ messages, setMessages }) => {
//   const [messages, setMessages] = useState([]);
    // const location = useLocation();
//   const { messages } = location.state || { messages: [] };

  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage = {
      text: inputValue,
      isUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue('');

    // Simulate a response from the system
    setTimeout(() => {
      const responseMessage = {
        text: 'Hello! How can I assist you today?',
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    }, 1000);
  };

  const handleSubmit = async () => {
    if (inputValue.trim() === '') return;
    const newMessage = {
      text: inputValue,
      isUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue('');

    const formData = new FormData();
    formData.append('message', inputValue);

    try {
      const response = await axios.post('http://localhost:5000/continue_conversation', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      const responseMessage = {
        text: response.data.message,
        isUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <Container>
        <Title>Chat Page</Title>
      <ChatContainer>
        {messages.map((message, index) => (
          <MessageContainer key={index}>
            <Message isUser={message.isUser}>{message.text}</Message>
          </MessageContainer>
        ))}
        <div ref={chatEndRef} />
      </ChatContainer>
      <InputContainer>
        <Input type="text" value={inputValue} onChange={handleInputChange} placeholder="Ask anything..." />
        <Button onClick={handleSubmit}>Send</Button>
      </InputContainer>
    </Container>
  );
};

export default ChatPage;

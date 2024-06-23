import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './main';
import ChatPage from './ChatPage';
import React, { useState } from 'react';



function App() {
  const [messages, setMessages] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Main messages={messages} setMessages={setMessages}/>}
        ></Route>
        <Route path="/chat" element={
          <ChatPage messages={messages} setMessages={setMessages} />
        }>
        </Route>
      </Routes>
    </Router>
  );
}
export default App;


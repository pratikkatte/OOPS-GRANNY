import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
`;

const Image = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 600px;
  background-color: #222;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  background-color: #333;
  color: #fff;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const OptionButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

const Main = ({ messages, setMessages }) => {
  const history = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const [focus, setFocus] = useState("comfort");
  // const [messages, setMessages] = useState([]);

  const handleFocusClick = () => {
    setShowOptions((prev) => !prev);
  };

  //   const handleSubmit = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/upload', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ input: "inputValue" }),
  //       });
  //       const data = await response.json();
  //       console.log('Response:', data);
  //     } catch (error) {
  //       console.error('Error sending POST request:', error);
  //     }
  //   };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("bloodwork", file);
    formData.append("message", inputValue);

    const newMessage = {
      text: inputValue,
      isUser: true,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      const responseMessage = {
        text: "system response",
        isUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }

    // history.push('/chat', { messages: [...messages, responseMessage] });
    history("/chat");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGrannyType = (grannytype) => {
    setFocus(grannytype);
    console.log(focus);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Container>
      <Image src="/dr_granny.png" alt="Granny" />
      <Title>What Would Your Granny Say</Title>
      <div>
        <h3>
          Say goodbye to the anxiety and confusion of WebMD searches. Our
          AI-powered chatbot is designed to provide you with comforting,
          easy-to-understand insights about your health and nutrition,
          especially when it comes to interpreting your bloodwork. Just like
          your Granny would.
        </h3>
      </div>
      <ChatBox>
        <InputContainer>
          <Input
            type="text"
            placeholder="Talk to your granny..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button onClick={handleSubmit}>➤</Button>
          <Button onClick={handleFocusClick}>Focus</Button>
          {focus === "blood-work" && (
            <Input type="file" onChange={handleFileChange} />
          )}
        </InputContainer>
        {showOptions && (
          <OptionsContainer>
            <OptionButton onClick={() => handleGrannyType("comfort")}>
              Comforting Granny
            </OptionButton>
            <OptionButton onClick={() => handleGrannyType("scientific")}>
              Scientific Granny
            </OptionButton>
            <OptionButton onClick={() => handleGrannyType("blood-work")}>
              Blood-Work Granny
            </OptionButton>
          </OptionsContainer>
        )}
      </ChatBox>
    </Container>
  );
};

export default Main;

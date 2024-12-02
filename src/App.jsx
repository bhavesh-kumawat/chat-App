import logo from "./assets/logo.jpg";
import "./App.css";
import axios from "axios";
import { useState } from "react";

import Form from "./components/Form";
import Quiz from "./components/Quiz";
import ChatWithBot from "./components/ChatWithBot";

function App() {
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [message, setMessage] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  // call the api to generate the answer
  const generateAIAnswer = async (query) => {
    setIsSubmit(true);
    const res = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDpg-LD1NzBIKcVLLYwcdQYxsTcAvqUCF8",
      method: "post",
      data: { contents: [{ parts: [{ text: query }] }] },
    });

    if (!res) return; // return if no data is available

    // store the data after getting data from api
    setMessage([
      ...message,
      {
        text: query,
        isBot: false,
      },
      {
        text: res["data"]["candidates"][0]["content"]["parts"][0]["text"],
        isBot: true,
      },
    ]);
    setIsSubmit(false);
  };

  return (
    <>
      <div className="header">
        <img src={logo} alt="logo" className="logo" />
        <h2>Hello👋🏼</h2>
      </div>

      {/*now we are able to chat with ai */}
      {isShowAnswer && (
        <div className="chats">
          <ChatWithBot message={message} />
        </div>
      )}

      {/* now show it show home page with some quiz */}
      {!isShowAnswer && (
        <div className="App">
          <div className="main">
            <div className="welcomePage">
              <h2>Hello, Friends </h2>
              <h3>How can I help you today?</h3>
            </div>
            <Quiz
              message={message}
              setMessage={setMessage}
              generateAIAnswer={generateAIAnswer}
              setIsShowAnswer={setIsShowAnswer}
            />
          </div>
        </div>
      )}

      {/* all the search components available here */}
      <Form
        isSubmit={isSubmit}
        message={message}
        setMessage={setMessage}
        generateAIAnswer={generateAIAnswer}
        setIsShowAnswer={setIsShowAnswer}
      />
    </>
  );
}

export default App;

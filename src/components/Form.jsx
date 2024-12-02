/* eslint-disable react/prop-types */

import { FaArrowUpLong } from "react-icons/fa6";
import SpeechToText from "./SpeechToText";
import { useState } from "react";

const Form = ({
  isSubmit,
  message,
  setMessage,
  generateAIAnswer,
  setIsShowAnswer,
}) => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInput || isSubmit) return;

    const text = userInput;
    setUserInput("");
    setMessage([...message, { text, isBot: false }, { text: "", isBot: true }]);
    generateAIAnswer(userInput);
    setIsShowAnswer(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search__container">
        <div className="input__field">
          <div className="queries">
            <input
              type="text"
              placeholder="Message ChatApp"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="input__Area"
            />
            <SpeechToText setUserInput={setUserInput} />
          </div>
          <div className="sendBtn" onClick={handleSubmit}>
            {isSubmit ? (
              <div className="cannot-submit"></div>
            ) : (
              <FaArrowUpLong />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;

/* eslint-disable react/prop-types */

const Quiz = ({ message, setMessage, generateAIAnswer, setIsShowAnswer }) => {
  const handleChatQuery = async (e) => {
    const text = e.target.value; // get the value of quiz
    generateAIAnswer(text);
    setMessage([...message, { text, isBot: false }, { text: "", isBot: true }]);
    setIsShowAnswer(true);
  };

  return (
    <div className="container">
      <button
        className="box"
        value={"Quiz me on world capitals to enhance my geography skills"}
        onClick={handleChatQuery}
      >
        Quiz me on world capitals
        <p>to enhance my geography skills</p>
      </button>
      <button
        className="box"
        value={"What is programming?"}
        onClick={handleChatQuery}
      >
        What is programming?
        <p>for develope our mind.</p>
      </button>
      <button
        className="box"
        value={"How to use an API?"}
        onClick={handleChatQuery}
      >
        How to use an API?
        <p>to create a website.</p>
      </button>
      <button
        className="box"
        value={"Help me pick an outfit"}
        onClick={handleChatQuery}
      >
        Help me pick an outfit
        <p>that will look good on camera</p>
      </button>
    </div>
  );
};

export default Quiz;

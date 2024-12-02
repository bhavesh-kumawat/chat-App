/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa6";

const SpeechToText = ({ setUserInput }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null); // Store recognition instance
  const [timeoutId, setTimeoutId] = useState(null); // Store timeout ID for auto-stop

  // Initialize SpeechRecognition API
  const initializeRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const newRecognition = new SpeechRecognition();
      newRecognition.lang = "en-US";
      newRecognition.continuous = true;
      newRecognition.interimResults = true;

      newRecognition.onstart = () => {
        setIsRecording(true);
      };

      newRecognition.onresult = (event) => {
        // Process only final results
        const lastResult = event.results[event.results.length - 1];
        if (lastResult.isFinal) {
          const finalTranscript = lastResult[0].transcript;
          setUserInput(finalTranscript); // Set only final result as user input
        }

        // Clear the previous timeout (reset inactivity timer)
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Set a new timeout to stop listening after 5 seconds of inactivity
        const newTimeoutId = setTimeout(() => {
          stopListening();
        }, 4000); // 4 seconds

        setTimeoutId(newTimeoutId); // Update the timeout ID
      };

      newRecognition.onend = () => {
        setIsRecording(false);
      };

      newRecognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      setRecognition(newRecognition); // Save the recognition instance
    } else {
      alert("Speech recognition is not supported by your browser.");
    }
  };

  // Start listening to the user's speech
  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  // Stop listening to the user's speech
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  // Set up the SpeechRecognition when component mounts
  useEffect(() => {
    initializeRecognition(); // Initialize recognition once on mount
    return () => {
      if (recognition) {
        recognition.stop();
      }
      // Clean up timeout if the component unmounts
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []); // Empty array ensures it runs once when the component mounts

  // Listen to the button click and toggle recognition state
  const handleButtonClick = () => {
    if (isRecording) {
      stopListening();
    } else {
      stopListening(); // Stop any previous session
      initializeRecognition(); // Reinitialize recognition
      startListening(); // Start new session
    }
  };

  return (
    <>
      <button
        className="image_upload"
        type="button"
        onClick={handleButtonClick}
      >
        {isRecording ? (
          <svg
            width="135"
            height="140"
            viewBox="0 0 135 140"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            className="speech__image"
          >
            <rect y="10" width="15" height="120" rx="6">
              <animate
                attributeName="height"
                begin="0.5s"
                dur="1s"
                values="120;110;100;90;80;70;60;50;40;140;120"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                begin="0.5s"
                dur="1s"
                values="10;15;20;25;30;35;40;45;50;0;10"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="30" y="10" width="15" height="120" rx="6">
              <animate
                attributeName="height"
                begin="0.25s"
                dur="1s"
                values="120;110;100;90;80;70;60;50;40;140;120"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                begin="0.25s"
                dur="1s"
                values="10;15;20;25;30;35;40;45;50;0;10"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="60" width="15" height="140" rx="6">
              <animate
                attributeName="height"
                begin="0s"
                dur="1s"
                values="120;110;100;90;80;70;60;50;40;140;120"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                begin="0s"
                dur="1s"
                values="10;15;20;25;30;35;40;45;50;0;10"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="90" y="10" width="15" height="120" rx="6">
              <animate
                attributeName="height"
                begin="0.25s"
                dur="1s"
                values="120;110;100;90;80;70;60;50;40;140;120"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                begin="0.25s"
                dur="1s"
                values="10;15;20;25;30;35;40;45;50;0;10"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="120" y="10" width="15" height="120" rx="6">
              <animate
                attributeName="height"
                begin="0.5s"
                dur="1s"
                values="120;110;100;90;80;70;60;50;40;140;120"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                begin="0.5s"
                dur="1s"
                values="10;15;20;25;30;35;40;45;50;0;10"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        ) : (
          <FaMicrophone />
        )}
      </button>
    </>
  );
};

export default SpeechToText;

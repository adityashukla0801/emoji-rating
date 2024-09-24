import React, { useState } from "react";
import Alright from "../images/Alright.png";
import Bad from "../images/Bad.png";
import Fantastic from "../images/Fantastic.png";
import Good from "../images/Good.png";
import Tribble from "../images/Tribble.png";
import Back from "../images/BackArrow.png";
import Cancel from "../images/Cancel.png";
import Swal from "sweetalert2";
import "./EmojiWidget.css";

const EmojiWidget = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = [
    { img: Tribble, value: "Terrible" },
    { img: Bad, value: "Bad" },
    { img: Alright, value: "Alright" },
    { img: Good, value: "Pretty Good" },
    { img: Fantastic, value: "Fantastic" },
  ];

  const handleSelectEmoji = (index) => {
    setSelectedEmoji(index);
  };

  return (
    <div className="emoji-widget">
      <div className="head-contain">
        <img className="icon" src={Back} alt="Back" />
        <h2>Wellbeing Check-in</h2>
        <img className="icon" src={Cancel} alt="Cancel" />
      </div>
      <div className="outer-contain">
        <h3>Hello! How are you feeling today?</h3>
        <div className="emoji-scale">
          {emojis.map((emoji, index) => (
            <div
              key={index}
              onClick={() => handleSelectEmoji(index)}
              className={`emoji-container ${
                selectedEmoji === index ? "selected" : ""
              }`}
            >
              <img className={`emoji `} alt="emoji" src={emoji.img} />
              <p className="emoji-text">{emoji.value}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        disabled={!selectedEmoji}
        onClick={() =>
          Swal.fire({
            icon: "success",
            title: "Good job!",
            text: `Your feeling ${emojis[selectedEmoji].value} submitted successfully`,
          })
        }
        className={`submit-btn ${!selectedEmoji && "disabled"}`}
      >
        Continue
      </button>
    </div>
  );
};

export default EmojiWidget;

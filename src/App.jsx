import { useEffect, useState } from "react";

const drumPadsData = [
  {
    id: "Q",
    text: "Heater 1",
    audioSrc: "/assets/audio/Heater-1.mp3",
  },
  {
    id: "W",
    text: "Heater 2",
    audioSrc: "/assets/audio/Heater-2.mp3",
  },
  {
    id: "E",
    text: "Heater 3",
    audioSrc: "/assets/audio/Heater-3.mp3",
  },
  {
    id: "A",
    text: "Heater 4",
    audioSrc: "/assets/audio/Heater-4.mp3",
  },
  { id: "S", text: "Clap", audioSrc: "/assets/audio/Clap.mp3" },
  { id: "D", text: "Open-HH", audioSrc: "/assets/audio/Open-HH.mp3" },
  {
    id: "Z",
    text: "Kick-n-Hat",
    audioSrc: "/assets/audio/Kick-n-Hat.mp3",
  },
  { id: "X", text: "Kick", audioSrc: "/assets/audio/Kick.mp3" },
  {
    id: "C",
    text: "Closed-HH",
    audioSrc: "/assets/audio/Closed-HH.mp3",
  },
];

function DrumPad({ id, audioSrc, onClick }) {
  return (
    <div className="drum-pad" id={id} onClick={onClick}>
      {id}
      <audio className="clip" id={id} src={audioSrc}></audio>
    </div>
  );
}

const App = () => {
  const [displayText, setDisplayText] = useState("");

  const playAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  };

  const handlePadClick = (pad) => {
    playAudio(pad.audioSrc);
    setDisplayText(pad.text);
    animateDrumPad(pad.id);
  };

  const animateDrumPad = (id) => {
    const drumPad = document.getElementById(id);
    drumPad.classList.add("clicked");
    setTimeout(() => {
      drumPad.classList.remove("clicked");
    }, 200);
  };

  const handleKeyPress = (event) => {
    const keyPressed = event.key.toUpperCase();
    const drumPad = drumPadsData.find((pad) => pad.id === keyPressed);
    if (drumPad) {
      playAudio(drumPad.audioSrc);
      setDisplayText(drumPad.text);
      animateDrumPad(drumPad.id);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>
      <div className="drum-pads">
        {drumPadsData.map((pad) => (
          <DrumPad
            key={pad.id}
            id={pad.id}
            audioSrc={pad.audioSrc}
            onClick={() => handlePadClick(pad)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

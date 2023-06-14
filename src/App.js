import React, { useState, useEffect } from 'react';
import { useWhisper } from '@chengsokdara/use-whisper';
import AudioAnalyser from 'react-audio-analyser';
require('dotenv').config();

const App = () => {
  const {
    recording,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: process.env.REACT_APP_WHISPER_API_KEY, 
    removeSilence: true,
    streaming: true,
    timeSlice: 1_000,
    nonStop: true,
    stopTimeout: 5000,
    whisperConfig: {
      language: 'de',
    },
  });

  const [isRecording, setIsRecording] = useState(false);
  const [audioStatus, setAudioStatus] = useState('inactive');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    if (isRecording) {
      setAudioStatus('recording');
    } else {
      setAudioStatus('inactive');
    }
  }, [isRecording]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleToggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'white',
    color: '#fff',
  };

  const titleStyles = {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '65px',
    fontFamily: 'Arial',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    color:'black'
  };

  const dropdownStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '1.5rem',
    padding: '10px',
  };

  const buttonContainerStyles = {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  };

  const buttonStyles = {
    fontSize: '1.5rem',
    padding: '10px 70px',
    borderRadius: '50px',
    color: '#fff',
    cursor: 'pointer',
  };

  const startButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#007bff',
  };

  const pauseButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#007bff',
  };

  const textStyles = {
    fontSize: '1.5rem',
    textAlign: 'center',
    marginBottom: '10px',
    fontFamily: 'Arial',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const recordingIndicatorStyles = {
    position: 'fixed',
    top: '10px',
    left: '10px',
    fontSize: '1.2rem',
    backgroundColor:'white',
    display: recording ? 'flex' : 'none',
    alignItems: 'center',
    animation: recording ? 'flash 1s infinite alternate' : 'none',
  };
  const dotStyles = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'red',
    marginRight: '5px',
  };

  const transcriptBoxStyles = {
    background: '#333',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    position: 'relative',
    width: '80%',
    height: '35%',
  };

  const transcriptLabelStyles = {
    position: 'absolute',
    top: '-60px',
    left: '5px',
    color: '#fff',
    fontSize: '1.5rem',
    fontFamily: 'Arial',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    color:'black'
  };

  const transcriptTextStyles = {
    color: '#fff',
    fontSize: '1.8rem',
    textAlign: 'center',
    fontFamily: 'Arial',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const audioProps = {
    audioType: 'audio/webm',
    status: audioStatus,
    backgroundColor: "white",
    strokeColor:"black",
    startCallback: (e) => {
      console.log('succ start', e);
    },
    pauseCallback: (e) => {
      console.log('succ pause', e);
    },
    stopCallback: (e) => {
      console.log('succ stop', e);
    },
    onRecordCallback: (e) => {
      console.log('recording', e);
    },
    errorCallback: (err) => {
      console.log('error', err);
    },
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>The Coolest Speech to Text Tool Ever!</h1>
      <select
        style={dropdownStyles}
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="ar">Arabic</option>
        <option value="de">German</option>
      </select>
      <AudioAnalyser {...audioProps} />
      <div style={recordingIndicatorStyles}>
        <div style={dotStyles} />
        <div style={textStyles}>Recording now</div>
      </div>
      <div style={transcriptBoxStyles}>
        <p style={transcriptLabelStyles}>Transcribed Text:</p>
        <p style={transcriptTextStyles}>{transcript.text}</p>
      </div>
      <div style={buttonContainerStyles}>
        <button
          style={isRecording ? pauseButtonStyles : startButtonStyles}
          onClick={handleToggleRecording}
        >
          {isRecording ? 'Stop' : 'Start'}
        </button>
        {/* <button style={buttonStyles} onClick={pauseRecording}>
          Pause
        </button> */}
      </div>
    </div>
  );
};

export default App;

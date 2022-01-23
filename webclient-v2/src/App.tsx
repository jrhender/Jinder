import React from 'react';
import Modal from 'react-modal';
import './App.css';
import Advanced from './Advanced';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(#e66465, #9198e5)'
  },
};

function App() {
  // let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  return (
    <div className="App">
      <Advanced />
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <button style={{ 'backgroundColor': 'Transparent', border: 'none', margin: 'none' }}
                onClick={closeModal}><h1>&#10006;</h1></button> */}
        <h1>If your name is Nicole... It's a match 😘
        </h1>
      </Modal>
    </div>
  );
}

export default App;

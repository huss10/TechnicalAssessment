import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import thumbtack from './blue pin.png';
import thumbtackHover from './gray pin.png';
import addicon from './addicon.PNG';
import feather from './feather.PNG';
import deleteIcon from './delete.JPG';
import searchIcon from './searchicon.png';
import CollaboratorsModal from './AddCollaborators';
import ComposeMessageModal from './ComposeMessageModal';
import InviteConfirmationModal from './InviteConfirmModal';

function App() {
  const [notes, setNotes] = useState([
    {
      id: uuidv4(),
      title: 'Introduction of Large Language Models and Retrieval Augmented Generation',
      content: 'Roger Craig and Shakeel Avadhany',
      time: '2 mins ago',
    },
    {
      id: uuidv4(),
      title: 'Always Look on the Bright Side of Life',
      content: 'Mick Zomnir',
      time: 'yesterday',
    },
    {
      id: uuidv4(),
      title: 'And Now for Something Completely Different',
      content: 'Add Collaborators',
      time: 'a week ago',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isCollaboratorsModalOpen, setIsCollaboratorsModalOpen] = useState(false);
  const [isComposeMessageModalOpen, setIsComposeMessageModalOpen] = useState(false);
  const [isInviteConfirmationModalOpen, setIsInviteConfirmationModalOpen] = useState(false);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      title: 'And Now for Something Completely Different',
      content: 'Add Collaborators',
      time: 'just now',
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handlePinClick = (id, isTopNote) => {
    setNotes(prevNotes => {
      if (isTopNote) {
        // Move the top note to the second position
        const [topNote, secondNote, ...restNotes] = prevNotes;
        return [secondNote, topNote, ...restNotes];
      } else {
        // Move the clicked note to the top
        const selectedNote = prevNotes.find(note => note.id === id);
        const otherNotes = prevNotes.filter(note => note.id !== id);
        return [selectedNote, ...otherNotes];
      }
    });
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openComposeMessageModal = (collaborators) => {
    setSelectedCollaborators(collaborators);
    setIsCollaboratorsModalOpen(false);
    setIsComposeMessageModalOpen(true);
  };

  const closeComposeMessageModal = () => {
    setIsComposeMessageModalOpen(false);
  };

  const openInviteConfirmationModal = () => {
    setIsComposeMessageModalOpen(false);
    setIsInviteConfirmationModalOpen(true);
  };

  const closeInviteConfirmationModal = () => {
    setIsInviteConfirmationModalOpen(false);
  };

  const openCollaboratorsModalAgain = () => {
    setIsComposeMessageModalOpen(false);
    setIsCollaboratorsModalOpen(true);
  };

  return (
    <div className="relative font-sans text-gray-700 bg-white min-h-screen">
      <div className={`container ${isComposeMessageModalOpen || isInviteConfirmationModalOpen ? 'blur' : ''}`}>
        <header>
          <h1>Notes</h1>
          <button onClick={addNote} className="add-note">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </header>
        <div className="search-bar">
          <img src={searchIcon} alt="Search" className="searchicon" />
          <input
            type="text"
            placeholder="Search through your Notes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <main>
          {notes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-content">
                <p><b>Add your first note.</b></p>
                <button onClick={addNote} className="add-note-empty">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          ) : (
            <div className="notes-container">
              {filteredNotes.map((note, index) => (
                <div key={note.id} className="note">
                  <div className="note-icon">
                    <img
                      src={index === 0 ? thumbtack : thumbtackHover}
                      alt="Thumbtack"
                      className="thumbtack-icon"
                      onClick={() => handlePinClick(note.id, index === 0)}
                    />
                  </div>
                  <div className="note-content">
                    <h2>{note.title}</h2>
                    <p>
                      <span
                        className="add-icon"
                        style={{ backgroundImage: `url(${addicon})` }}
                        onClick={() => setIsCollaboratorsModalOpen(true)}
                      ></span>
                      {note.content}
                      <div className="note-actions">
                        <span className="note-time">{note.time}</span>
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          onClick={() => deleteNote(note.id)}
                          className="delete-icon"
                        />
                      </div>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <img src={feather} alt="Feather" className="feather" />
      </div>

      {isCollaboratorsModalOpen && (
        <CollaboratorsModal 
          onClose={() => setIsCollaboratorsModalOpen(false)}
          onInviteWithMessage={openComposeMessageModal}
          onInviteConfirmation={openInviteConfirmationModal}
        />
      )}

      {isComposeMessageModalOpen && (
        <ComposeMessageModal
          onClose={closeComposeMessageModal}
          collaborators={selectedCollaborators}
          onInviteConfirmation={openInviteConfirmationModal}
          onAddMoreCollaborators={openCollaboratorsModalAgain}
        />
      )}

      {isInviteConfirmationModalOpen && (
        <InviteConfirmationModal
          onClose={closeInviteConfirmationModal}
          onAddMoreCollaborators={openCollaboratorsModalAgain}
        />
      )}
    </div>
  );
}

export default App;

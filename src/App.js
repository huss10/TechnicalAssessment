import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import thumbtack from './thumbtack.PNG';
import thumbtackHover from './thumbtack2.png';
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

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openComposeMessageModal = (collaborators) => {
    setSelectedCollaborators(collaborators); // Set the selected collaborators
    setIsCollaboratorsModalOpen(false); // Close CollaboratorsModal
    setIsComposeMessageModalOpen(true); // Open ComposeMessageModal
  };

  const closeComposeMessageModal = () => {
    setIsComposeMessageModalOpen(false); // Close ComposeMessageModal
  };

  const openInviteConfirmationModal = () => {
    setIsComposeMessageModalOpen(false); // Close ComposeMessageModal
    setIsInviteConfirmationModalOpen(true); // Open InviteConfirmationModal
  };

  const closeInviteConfirmationModal = () => {
    setIsInviteConfirmationModalOpen(false); // Close InviteConfirmationModal
  };

  const openCollaboratorsModalAgain = () => {
    setIsComposeMessageModalOpen(false); // Close ComposeMessageModal before reopening AddCollaborators
    setIsCollaboratorsModalOpen(true); // Reopen CollaboratorsModal
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
                      className={index === 0 ? 'thumbtack-icon' : 'thumbtack-hover-icon'}
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
          onInviteWithMessage={openComposeMessageModal} // Pass function to open ComposeMessageModal
          onInviteConfirmation={openInviteConfirmationModal} // Pass function to open InviteConfirmationModal
        />
      )}

      {isComposeMessageModalOpen && (
        <ComposeMessageModal
          onClose={closeComposeMessageModal}
          collaborators={selectedCollaborators} // Pass the selected collaborators here
          onInviteConfirmation={openInviteConfirmationModal} // Open Invite Confirmation
          onAddMoreCollaborators={openCollaboratorsModalAgain} // *** Change: Pass function to reopen CollaboratorsModal ***
        />
      )}

      {isInviteConfirmationModalOpen && (
        <InviteConfirmationModal
          onClose={closeInviteConfirmationModal}
          onAddMoreCollaborators={openCollaboratorsModalAgain} // Reopen Collaborators Modal
        />
      )}
    </div>
  );
}

export default App;

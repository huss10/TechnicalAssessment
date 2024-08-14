import React, { useState } from 'react';
import './AddCollaborators.css';
import searchIcon from './searchicon.png';
import CollaboratorsPhoto from './photoCollab.png';

const collaboratorsData = [
  {
    name: 'Salvadore Dali',
    role: 'Leading contributor on Surrealism.',
    status: 'Collaborator',
  },
  {
    name: 'Andre Breton',
    role: 'Founder of the Dadaist Movement.',
    status: 'Collaborator',
  },
  {
    name: 'Rene Magritte',
    role: "Ceci n'est pas un artiste.",
    status: 'Collaborator',
  },
  {
    name: 'Max Ernst',
    role: 'The Elephant in the Room.',
    status: 'Observer',
  },
];

function CollaboratorsModal({ onClose, onInviteWithMessage, onInviteConfirmation }) {
  const [collaborators, setCollaborators] = useState(collaboratorsData);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusChange = (index, newStatus) => {
    const updatedCollaborators = [...collaborators];
    updatedCollaborators[index].status = newStatus;
    setCollaborators(updatedCollaborators);
  };

  const handleCollaboratorClick = (index, event) => {
    const collaborator = collaborators[index];
    const isSelected = selectedCollaborators.includes(collaborator);

    if (
      event.target.classList.contains('collaborator-image') ||
      event.target.classList.contains('collaborator-info') ||
      event.target.tagName === 'H3' ||
      event.target.tagName === 'P'
    ) {
      if (isSelected) {
        setSelectedCollaborators(
          selectedCollaborators.filter((item) => item !== collaborator)
        );
      } else {
        setSelectedCollaborators([...selectedCollaborators, collaborator]);
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCollaborators = collaborators.filter((collaborator) =>
    collaborator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collaborator.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isInviteDisabled = filteredCollaborators.length === 0 && searchQuery !== '';

  const handleInviteWithMessage = () => {
    if (!isInviteDisabled) {
      onInviteWithMessage(selectedCollaborators); // Pass selected collaborators
    }
  };

  const handleInvite = () => {
    if (!isInviteDisabled) {
      onInviteConfirmation(); // Trigger InviteConfirmationModal
      onClose();
    }
  };

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <div className="title-column">
              <h2>Add Collaborators</h2>
            </div>
            <div className="search-column">
              <div className="search-bar-collaborators">
                <img src={searchIcon} alt="Search" className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for potential collaborators"
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <button className="close-button" onClick={onClose}>
            <img src={require('./close-button.JPG')} alt="Close" className="close-button" />
            </button>
          </div>
          <div className="collaborators-section">
            {/* Conditionally render the "Suggested" label */}
            <div className={`suggested-column ${filteredCollaborators.length === 0 ? 'suggested-column-error' : 'active'}`}>
              Suggested
            </div>

            <div className="collaborators-list-wrapper">
              {filteredCollaborators.length === 0 ? (
                <div className="search-error">
                  <p>
                    We couldn’t find <strong>{searchQuery}</strong> on the 8-Fold Network...
                  </p>
                  <a href="#" className="invite-link">
                    Invite {searchQuery} to 8-Fold
                  </a>
                </div>
              ) : (
                filteredCollaborators.map((collaborator, index) => (
                  <div
                    key={index}
                    className={`collaborator-item ${selectedCollaborators.includes(collaborator) ? 'selected' : ''}`}
                    onClick={(event) => handleCollaboratorClick(index, event)}
                  >
                    <img
                      src={CollaboratorsPhoto}
                      alt={collaborator.name}
                      className={`collaborator-image ${selectedCollaborators.includes(collaborator) ? 'selected' : ''}`}
                    />
                    <div className={`collaborator-info ${selectedCollaborators.includes(collaborator) ? 'selected' : ''}`}>
                      <h3>{collaborator.name}</h3>
                      <p>{collaborator.role}</p>
                    </div>
                    <div className={`collaborator-status ${selectedCollaborators.includes(collaborator) ? 'selected' : ''}`}>
                      <Dropdown
                        status={collaborator.status}
                        onChange={(newStatus) => handleStatusChange(index, newStatus)}
                        selected={selectedCollaborators.includes(collaborator)}  // Pass selected prop
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="modal-footer-container">
            <div className="modal-footer">
              <div className="added-label">Added</div>
              <div className="selected-collaborators-container">
                <div className="selected-collaborators">
                  {selectedCollaborators.map((collaborator, index) => (
                    <img
                      key={index}
                      src={CollaboratorsPhoto}
                      alt={collaborator.name}
                      className="selected-collaborator-image"
                      style={{ zIndex: selectedCollaborators.length - index }} // Ensure proper overlap
                    />
                  ))}
                </div>
              </div>
              <div className="button-container">
                <button 
                  className={`invite-button-ac ${isInviteDisabled ? 'gray-invite' : ''}`} 
                  onClick={!isInviteDisabled ? handleInvite : null}
                  disabled={isInviteDisabled}
                >
                  INVITE
                </button>
                {filteredCollaborators.length > 0 && (
                  <button className="personal-message-button-ac" onClick={handleInviteWithMessage}>
                    Invite with personal message
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dropdown({ status, onChange, selected }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleStatusChange = (newStatus) => {
    onChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div
        className="dropdown-header"
        onClick={toggleDropdown}
        style={{ color: selected ? '#5cae5a' : '#888' }}  // Apply green color if selected
      >
        {status}
        <img 
          src={selected ? require('./greenArrow.JPG') : require('./arrow.JPG')} 
          alt="Arrow" 
          className="dropdown-arrow" 
        />
      </div>
      {isOpen && (
        <div className="dropdown-list">
          <div className="dropdown-item" onClick={() => handleStatusChange('Collaborator')} style={{ color: status === 'Collaborator' ? 'green' : 'gray' }}>
            Collaborator
          </div>
          <div className="dropdown-item" onClick={() => handleStatusChange('Contributor')} style={{ color: status === 'Contributor' ? 'green' : 'gray' }}>
            Contributor
          </div>
          <div className="dropdown-item" onClick={() => handleStatusChange('Observer')} style={{ color: status === 'Observer' ? 'gray' : 'gray' }}>
            Observer
          </div>
        </div>
      )}
    </div>
  );
}

export default CollaboratorsModal;

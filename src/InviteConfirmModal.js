import React from 'react';
import './InviteConfirmModal.css';

function InviteConfirmationModal({ onClose, onAddMoreCollaborators }) {
  const handleAddMore = () => {
    onClose(); // Close the current modal
    onAddMoreCollaborators(); // Call the passed function to reopen the Collaborators modal
  };

  return (
    <div className="invite-confirmation-overlay">
      <div className="invite-confirmation-modal">
      <button className="close-button" onClick={onClose}>
            <img src={require('./close-button.JPG')} alt="Close" className="close-button" />
            </button>
        <div className="confirmation-content">
          <img src={require('./confirmation.png')} alt="Confirmation Icon" className="confirmation-icon" />
          <p className="confirmation-text">Your invites have been sent</p>
          <button className="add-more-button" onClick={handleAddMore}>
            Add more collaborators
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteConfirmationModal;

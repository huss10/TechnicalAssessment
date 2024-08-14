import React, { useState } from 'react';
import './ComposeMessageModal.css';
import CollaboratorsPhoto from './photoCollab.png';

function ComposeMessageModal({ onClose, collaborators, onInviteConfirmation, onAddMoreCollaborators }) {
    const [message, setMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (e) => {
        setMessage(e.target.innerText);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (message === '') {
            setIsFocused(false);
        }
    };

    const handleInvite = () => {
        onClose(); // Close ComposeMessageModal
        onInviteConfirmation(); // Open InviteConfirmationModal
    };

    const handleAddMore = () => {
        onClose(); // Close the current modal
        onAddMoreCollaborators(); // *** This will reopen the Collaborators modal ***
    };

    return (
        <div className="compose-modal-overlay">
            <div className="compose-modal">
            <button className="close-button" onClick={onClose}>
            <img src={require('./close-button.JPG')} alt="Close" className="close-button" />
            </button>
                <div className="compose-header-message">
                    <h2 className="compose-message-header">Compose a message</h2>
                    <div
                        className={`compose-message-area ${message === '' && !isFocused ? 'empty' : ''}`}
                        contentEditable="true"
                        onInput={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        suppressContentEditableWarning={true}
                    >
                        {message === '' && !isFocused && <span className="placeholder">Write a message here...</span>}
                    </div>
                </div>
                <div className="modal-footer-message">
                    <div className="selected-collaborators-wrapper">
                        <div className="selected-collaborators">
                            {collaborators.map((collaborator, index) => (
                                <img
                                    key={index}
                                    src={CollaboratorsPhoto}
                                    alt={collaborator.name}
                                    className="selected-collaborator-image"
                                    style={{ zIndex: collaborators.length - index }}
                                />
                            ))}
                        </div>
                        <div className="added-label-cm">Added</div>
                        <div className="back-button-container">
                            <button className="back-button-cm" onClick={handleAddMore}>
                                Go Back to Add Collaborators
                            </button> {/* *** This button will now correctly invoke the handleAddMore function *** */}
                        </div>
                    </div>
                    <div className="invite-button-container">
                        <button className="invite-button-cm" onClick={handleInvite}>
                            INVITE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComposeMessageModal;

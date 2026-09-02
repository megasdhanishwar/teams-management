import React from "react";

import { FiX, FiTrash2, FiAlertTriangle } from "react-icons/fi";

export default function DeleteModal({ team, onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal delete-modal">
        <button className="close-btn delete-close" onClick={onClose}>
          <FiX />
        </button>

        <div className="delete-icon">
          <FiAlertTriangle />
        </div>

        <h2>Delete Team?</h2>

        <p>
          Are you sure you want to delete <strong>{team.name}</strong>? This
          action cannot be undone.
        </p>

        <div className="delete-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="delete-btn" onClick={() => onConfirm(team.id)}>
            <FiTrash2 />
            Delete Team
          </button>
        </div>
      </div>
    </div>
  );
}

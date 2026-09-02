import React from "react";

import { FiX, FiUsers, FiEdit2 } from "react-icons/fi";

export default function TeamDetailsModal({ team, onClose, onEdit }) {
  return (
    <div className="modal-overlay">
      <div className="modal details-modal">
        <div className="modal-header">
          <div>
            <h2>Team Details</h2>

            <p>View complete information about this team.</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="details-team-header">
          <div className="large-team-icon">
            <FiUsers />
          </div>

          <div>
            <h2>{team.name}</h2>

            <span
              className={`status ${
                team.status === "Active" ? "active" : "inactive"
              }`}
            >
              <span className="status-dot"></span>
              {team.status}
            </span>
          </div>
        </div>

        <div className="details-section">
          <h3>Description</h3>

          <p>{team.description}</p>
        </div>

        <div className="details-section">
          <div className="details-members-title">
            <h3>Team Members</h3>

            <span>{team.members.length} Members</span>
          </div>

          {team.members.length > 0 ? (
            <div className="details-members">
              {team.members.map((member) => (
                <div className="detail-member" key={member.id}>
                  <div className="member-avatar">{member.initials}</div>

                  <div>
                    <strong>{member.name}</strong>

                    <p>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-members">
              No members have been added to this team.
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Close
          </button>

          <button
            className="save-btn"
            onClick={() => {
              onClose();
              onEdit(team);
            }}
          >
            <FiEdit2 />
            Edit Team
          </button>
        </div>
      </div>
    </div>
  );
}

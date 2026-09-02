import React, { useState } from "react";

import {
  FiUsers,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
} from "react-icons/fi";

export default function TeamCard({ team, onView, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="team-card">
      <div className="team-card-top">
        <div className="team-icon">
          <FiUsers />
        </div>

        <div className="card-menu">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <FiMoreVertical />
          </button>

          {menuOpen && (
            <div className="dropdown-menu">
              <button
                onClick={() => {
                  onView(team);
                  setMenuOpen(false);
                }}
              >
                <FiEye />
                View Details
              </button>

              <button
                onClick={() => {
                  onEdit(team);
                  setMenuOpen(false);
                }}
              >
                <FiEdit2 />
                Edit Team
              </button>

              <button
                className="delete-option"
                onClick={() => {
                  onDelete(team);
                  setMenuOpen(false);
                }}
              >
                <FiTrash2 />
                Delete Team
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="team-content">
        <div className="team-title-row">
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

        <p className="team-description">{team.description}</p>
      </div>

      <div className="card-divider"></div>

      <div className="team-footer">
        <div className="members-preview">
          {team.members.slice(0, 4).map((member) => (
            <div className="member-avatar" title={member.name} key={member.id}>
              {member.initials}
            </div>
          ))}

          {team.members.length > 4 && (
            <div className="member-avatar extra-members">
              +{team.members.length - 4}
            </div>
          )}
        </div>

        <span className="member-count">
          {team.members.length}{" "}
          {team.members.length === 1 ? "Member" : "Members"}
        </span>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";

import { FiX, FiPlus, FiCheck } from "react-icons/fi";

import members from "../data/members";

export default function TeamModal({ team, onClose, onSave }) {
  const isEditMode = Boolean(team);

  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    if (team) {
      setTeamName(team.name);
      setDescription(team.description);
      setStatus(team.status);
      setSelectedMembers(team.members);
    }
  }, [team]);

  function toggleMember(member) {
    const alreadySelected = selectedMembers.some(
      (item) => item.id === member.id,
    );

    if (alreadySelected) {
      setSelectedMembers(
        selectedMembers.filter((item) => item.id !== member.id),
      );
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  }

  function removeMember(id) {
    setSelectedMembers(selectedMembers.filter((member) => member.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!teamName.trim()) {
      alert("Please enter a team name.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a team description.");
      return;
    }

    onSave({
      id: team ? team.id : Date.now(),
      name: teamName,
      description: description,
      status: status,
      members: selectedMembers,
    });
  }

  return (
    <div className="modal-overlay">
      <div className="modal team-modal">
        <div className="modal-header">
          <div>
            <h2>{isEditMode ? "Edit Team" : "Create New Team"}</h2>

            <p>
              {isEditMode
                ? "Update your team information."
                : "Create a new team and add members."}
            </p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Team Name</label>

            <input
              type="text"
              placeholder="Enter team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Team Description</label>

            <textarea
              placeholder="Describe the purpose of this team..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Team Status</label>

            <div className="status-selector">
              <button
                type="button"
                className={`status-select active-option ${
                  status === "Active" ? "selected" : ""
                }`}
                onClick={() => setStatus("Active")}
              >
                <span></span>
                Active
              </button>

              <button
                type="button"
                className={`status-select inactive-option ${
                  status === "Inactive" ? "selected" : ""
                }`}
                onClick={() => setStatus("Inactive")}
              >
                <span></span>
                Inactive
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>
              Team Members
              <span className="selected-count">
                {selectedMembers.length} selected
              </span>
            </label>

            {selectedMembers.length > 0 && (
              <div className="selected-members">
                {selectedMembers.map((member) => (
                  <div className="selected-member" key={member.id}>
                    <div className="member-avatar">{member.initials}</div>

                    <div>
                      <strong>{member.name}</strong>
                      <small>{member.role}</small>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="member-selection">
              <p className="selection-title">
                <FiPlus />
                Add Members
              </p>

              <div className="member-list">
                {members.map((member) => {
                  const isSelected = selectedMembers.some(
                    (item) => item.id === member.id,
                  );

                  return (
                    <button
                      type="button"
                      className={`member-option ${
                        isSelected ? "member-selected" : ""
                      }`}
                      key={member.id}
                      onClick={() => toggleMember(member)}
                    >
                      <div className="member-avatar">{member.initials}</div>

                      <div className="member-info">
                        <strong>{member.name}</strong>

                        <span>{member.role}</span>
                      </div>

                      <div className="check-icon">
                        {isSelected && <FiCheck />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              {isEditMode ? "Save Changes" : "Create Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";

import "./App.css";

import Header from "./components/Header";
import TeamCard from "./components/TeamCard";
import TeamModal from "./components/TeamModal";
import TeamDetailsModal from "./components/TeamDetailsModal";
import DeleteModal from "./components/DeleteModal";

import members from "./data/members";
import { FiUsers } from "react-icons/fi";

const initialTeams = [
  {
    id: 1,
    name: "Frontend Team",
    description:
      "Responsible for building modern, responsive and user-friendly web applications.",
    status: "Active",
    members: [members[0], members[1], members[5]],
  },
  {
    id: 2,
    name: "Backend Team",
    description:
      "Handles APIs, databases, server architecture and application integrations.",
    status: "Active",
    members: [members[2], members[4], members[6]],
  },
  {
    id: 3,
    name: "Design Team",
    description:
      "Creates beautiful user experiences, product designs and design systems.",
    status: "Active",
    members: [members[1], members[3], members[7]],
  },
  {
    id: 4,
    name: "QA Team",
    description:
      "Ensures product quality through testing, validation and issue tracking.",
    status: "Inactive",
    members: [members[4], members[7]],
  },
];

export default function App() {
  const [teams, setTeams] = useState(initialTeams);

  const [searchTerm, setSearchTerm] = useState("");

  const [teamModalOpen, setTeamModalOpen] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState(null);

  const [detailsTeam, setDetailsTeam] = useState(null);

  const [deleteTeam, setDeleteTeam] = useState(null);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleCreate() {
    setSelectedTeam(null);
    setTeamModalOpen(true);
  }

  function handleEdit(team) {
    setSelectedTeam(team);
    setTeamModalOpen(true);
  }

  function handleSave(teamData) {
    if (selectedTeam) {
      setTeams(
        teams.map((team) => (team.id === teamData.id ? teamData : team)),
      );
    } else {
      setTeams([teamData, ...teams]);
    }

    setTeamModalOpen(false);
    setSelectedTeam(null);
  }

  function handleDelete(id) {
    setTeams(teams.filter((team) => team.id !== id));

    setDeleteTeam(null);
  }

  return (
    <div className="app">
      <main className="container">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onCreate={handleCreate}
        />

        <div className="teams-info">
          <div>
            <h2>Your Teams</h2>

            <p>Manage your teams and collaborate with your members.</p>
          </div>

          <div className="total-teams">
            <strong>{teams.length}</strong>

            <span>Total Teams</span>
          </div>
        </div>

        {filteredTeams.length > 0 ? (
          <div className="teams-grid">
            {filteredTeams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onView={setDetailsTeam}
                onEdit={handleEdit}
                onDelete={setDeleteTeam}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <FiUsers />
            </div>

            <h2>No Teams Found</h2>

            <p>We couldn't find any teams matching your search.</p>

            <button className="create-empty-btn" onClick={handleCreate}>
              Create Your First Team
            </button>
          </div>
        )}
      </main>

      {teamModalOpen && (
        <TeamModal
          team={selectedTeam}
          onClose={() => {
            setTeamModalOpen(false);
            setSelectedTeam(null);
          }}
          onSave={handleSave}
        />
      )}

      {detailsTeam && (
        <TeamDetailsModal
          team={detailsTeam}
          onClose={() => setDetailsTeam(null)}
          onEdit={handleEdit}
        />
      )}

      {deleteTeam && (
        <DeleteModal
          team={deleteTeam}
          onClose={() => setDeleteTeam(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

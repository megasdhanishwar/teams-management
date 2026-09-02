import React from "react";
import { FiUsers, FiPlus, FiSearch } from "react-icons/fi";

export default function Header({ searchTerm, setSearchTerm, onCreate }) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="brand">
          <div className="brand-icon">
            <FiUsers />
          </div>

          <div>
            <h1>Teams Management</h1>
            <p>Create, manage and organize your project teams.</p>
          </div>
        </div>

        <button className="create-btn" onClick={onCreate}>
          <FiPlus />
          Create Team
        </button>
      </div>

      <div className="search-wrapper">
        <FiSearch />

        <input
          type="text"
          placeholder="Search teams by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </header>
  );
}

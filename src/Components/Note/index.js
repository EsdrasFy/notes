import React, { useState } from "react";
import "./styles-priority.css";
import "./styles.css";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import axios from "axios";

function Note({ title, notes, priority, id, handleDeletePost }) {
  const [changedNote, setChangedNote] = useState(notes);
  const [onPriority, setOnPriority] = useState(priority);
  const [username] = useState(localStorage.getItem("username") || null);
  const handleSave = async (e) => {
    e.style.cursor = "default";
    if (changedNote !== notes) {
      try {
        await axios.post(
          `https://back-notes-fen6.onrender.com/users/${username}/change/${id}`,
          {
            note: changedNote,
          }
        );
      } catch (error) {
        console.error("Erro ao salvar:", error);
      }
    }
  };
  const handlePriority = async () => {
    setOnPriority(!onPriority);
    await axios.post(
      `https://back-notes-fen6.onrender.com/priorities/${username}/${id}`,
      {
        priority: onPriority,
      }
    );
  };
  const handleEdit = (e) => {
    e.style.cursor = "text";
    e.style.borderRadius = "5px";
  };
  const handleNoteChange = (e) => {
    setChangedNote(e.target.value);
  };
  return (
    <li className={onPriority ? "notepad-priority" : "notepad-infos"}>
      <div>
        <strong>{title}</strong>
        <div>
          <FaTimes onClick={() => handleDeletePost(id)} />{" "}
        </div>
      </div>
      <textarea
        value={changedNote}
        onChange={handleNoteChange}
        onBlur={(e) => handleSave(e.target)}
        onClick={(e) => handleEdit(e.target, priority)}
        spellCheck={false}
        autoFocus
        maxLength={70}
      />
      <span>
        <FaExclamationTriangle className="priority" onClick={handlePriority} />
      </span>
      <span
        className={onPriority ? "maxLength" : "maxLength2"}
        style={{ color: `${changedNote.length >= 70 ? "red" : "#2bfdbe"} ` }}
      >
        {changedNote.length}/70
      </span>
    </li>
  );
}

export default Note;

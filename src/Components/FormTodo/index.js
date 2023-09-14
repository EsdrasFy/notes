import React, { useState } from "react";
import "./index.css";
import { MdOutlineAdd } from "react-icons/md";
import axios from "axios";

function FormTodo({ setAllNotes, allNotes }) {
  const [activeForm, setActiveForm] = useState(true);
  const [title, setTitles] = useState("");
  const [noteAdd, setNoteAdd] = useState("");
  const [username] = useState(localStorage.getItem("username") || null);
  const showFormTodo = () => {
    setActiveForm(!activeForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.post(
      `https://back-notes-fen6.onrender.com/notes/${username}`,
      {
        title: title,
        note: noteAdd,
        priority: false,
      }
    );
    setNoteAdd("");
    setTitles("");
    console.log(noteAdd);
    setAllNotes([...allNotes, resp.data]);
    showFormTodo();
  };
  const handleBackgroundClick = (e) => {
    if (e.target.className === "activeForm") {
      showFormTodo();
    }
  };

  return (
    <div
      className={activeForm ? "divShowAddTodo" : "activeForm"}
      onClick={handleBackgroundClick}
    >
      {activeForm ? (
        <>
          <div onClick={showFormTodo} className="seila2">
            <button className="buttonShowTodo">
              <MdOutlineAdd />{" "}
            </button>
            <div>
              <h4>ADD NEW TO-DO</h4>
            </div>
          </div>
        </>
      ) : (
        <div className="formTodo">
          <div>
            <h1>CADERNO DE NOTAS</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-block">
              <input
                type="text"
                id="title"
                required
                maxLength="30"
                value={title}
                onChange={(e) => setTitles(e.target.value)}
                placeholder="Título da sua Nota"
                spellCheck={false}
              />
              <span
                style={{ color: `${title.length >= 30 ? "red" : "#2bdefd"}` }}
              >
                {title.length}/30
              </span>
            </div>
            <div className="input-block">
              <textarea
                id="nota"
                placeholder="Conteúdo da sua Nota"
                required
                spellCheck={false}
                value={noteAdd}
                onChange={(e) => setNoteAdd(e.target.value)}
                maxLength={70}
              ></textarea>
              <span
                style={{ color: `${noteAdd.length >= 70 ? "red" : "#2bdefd"}` }}
              >
                {noteAdd.length}/70
              </span>
            </div>
            <button type="submit" className="addNoteList">
              ADD NOTE
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormTodo;

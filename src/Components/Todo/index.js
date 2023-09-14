import React, { useState, useEffect } from "react";
import Note from "../Note";
import axios from "axios";
import Header from "../Header";
import "./index.css";
import FormTodo from "../FormTodo";
import HourAndDate from "../HourAndDate";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";

function Todo() {
  const token = localStorage.getItem("tokenLogin");

  const [allNotes, setAllNotes] = useState([]);
  const [username] = useState(localStorage.getItem("username") || null);
  const [loading, setLoading] = useState(true); // Adicione um estado de loading

  const apiUrl = `https://back-notes-fen6.onrender.com/auth/${username}`;

  const getAllNotes = async () => {
    setLoading(true);

    if (token) {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.get(apiUrl, axiosConfig);
        setAllNotes(res.data.user.notes);
      } catch (error) {
        console.error("Erro ao buscar notas:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const handleDeletePost = async (id) => {
    setLoading(true); // Ative o estado de loading ao excluir uma nota

    const deletedNote = await axios.delete(
      `https://back-notes-fen6.onrender.com/users/${username}/${id}`
    );

    if (deletedNote) {
      setAllNotes(allNotes.filter((item) => item._id !== id));
    }

    setLoading(false);
  };

  return (
    <section className="TodoList">
      <div>
        <Header />
        <div className="subHeader">
          <FormTodo setAllNotes={setAllNotes} allNotes={allNotes} />
          <AiOutlineClose className="xis" />
          <HourAndDate />
        </div>
        <main>
          {loading ? (
            <div className="divLoading">
              <AiOutlineLoading3Quarters
                className="loading-spinner"
              />
            </div>
          ) : (
            <ul>
              {allNotes.map((item) => (
                <Note
                  key={item._id}
                  title={item.title}
                  notes={item.note}
                  id={item._id}
                  priority={item.priority}
                  handleDeletePost={handleDeletePost}
                />
              ))}
            </ul>
          )}
        </main>
      </div>
    </section>
  );
}

export default Todo;

import React, { useState, useEffect } from "react";
import Note from "../Note";
import axios from "axios";
import Header from "../Header";
import "./index.css";
import FormTodo from "../FormTodo";
import HourAndDate from "../HourAndDate";
import {AiOutlineClose} from 'react-icons/ai'

function Todo() {
  const token = localStorage.getItem("tokenLogin");

  const [allNotes, setAllNotes] = useState([]);
  const [username] = useState(localStorage.getItem("username") || null);

  const apiUrl = `https://back-notes-fen6.onrender.com/auth/${username}`;

  const getAllNotes = async () => {
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
      }
    }
  };

  useEffect(() => {
    getAllNotes();
  },);

  const handleDeletePost = async (id) => {
    const deletedNote = await axios.delete(
      `https://back-notes-fen6.onrender.com/users/${username}/${id}`
    );

    if (deletedNote) {
      setAllNotes(allNotes.filter((item) => item._id !== id));
    }
  };

  return (
    <section className="TodoList">
      <div>
        <Header />
        <div className="subHeader">
          <FormTodo setAllNotes={setAllNotes} allNotes={allNotes} />
          <AiOutlineClose className="xis"/>
          <HourAndDate />
        </div>
        <main>
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
        </main>
      </div>
    </section>
  );
}

export default Todo;

//
// import React, { useState, useEffect } from "react";
// import Note from "../Note";
// import RadioButton from "../RadioButton";
// import axios from "axios";
// import Header from "../Header";

// import "./index.css";

// function Todo() {
//   const token = localStorage.getItem("tokenLogin");
//   // const username = localStorage.getItem("username");
//   const [title, setTitles] = useState("");
//   const [noteAdd, setNoteAdd] = useState("");
//   const [allNotes, setAllNotes] = useState([]);
//   const [username] = useState(localStorage.getItem("username") || null);

//   const apiUrl = `http://localhost:3333/auth/${username}`;

//   const getAllNotes = async () => {
//     if (token) {
//       const axiosConfig = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       try {
//         const res = await axios.get(apiUrl, axiosConfig);
//         setAllNotes(res.data.user.notes);
//       } catch (error) {
//         console.error("Erro ao buscar notas:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     getAllNotes();
//   },);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const resp = await axios.post("http://localhost:3333/notes/nando", {
//       title: title,
//       note: noteAdd,
//       priority: false,
//     });
//     setNoteAdd("");
//     setTitles("");
//     console.log(noteAdd);
//     setAllNotes([...allNotes, resp.data]);
//   };
//   const handleDeletePost = async (id) => {
//     const deletedNote = await axios.delete(
//       `http://localhost:3333/users/nando/${id}`
//     );

//     if (deletedNote) {
//       setAllNotes(allNotes.filter((item) => item._id !== id));
//     }
//   };

//   return (
//     <div className="App">
//       <Header />
//       <aside>
//         <strong>Caderno de Notas</strong>
//         <form onSubmit={handleSubmit}>
//           <div className="input-block">
//             <label htmlFor="title">Titulo da Anotação</label>
//             <input
//               type="text"
//               id="title"
//               required
//               value={title}
//               onChange={(e) => setTitles(e.target.value)}
//               maxLength="30"
//               spellCheck={false}
//             />
//           </div>
//           <div className="input-block">
//             <label htmlFor="nota">Anotações</label>
//             <textarea
//               id="nota"
//               required
//               value={noteAdd}
//               onChange={(e) => setNoteAdd(e.target.value)}
//               spellCheck={false}
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             style={{
//               background:
//                 title.length > 0 && noteAdd.length > 0 ? "#2bfdbe" : "#55cf9c",
//             }}
//           >
//             Salvar
//           </button>
//           <RadioButton />
//         </form>
//       </aside>
//       <main>
//         <ul>
//           {allNotes.map((item) => (
//             <Note
//               key={item._id}
//               title={item.title}
//               notes={item.note}
//               id={item._id}
//               priority={item.priority}
//               handleDeletePost={handleDeletePost}
//             />
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// }

// export default Todo;
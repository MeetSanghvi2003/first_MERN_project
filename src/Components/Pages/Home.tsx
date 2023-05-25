import { FC, useEffect, useState } from "react";
import { fetchNotes } from "../../state/NotesSlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Link } from "react-router-dom";
import SingleNote from "./SingleNote";

interface addnote {
  title: string;
  description: string;
  tag: string;
}

const Home: FC = () => {
  const [data, setData] = useState<addnote>({
    title: "",
    description: "",
    tag: "",
  });
  const [loader, setLoader] = useState<boolean>(false);
  const { notes } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const [iD, setId] = useState<string>("");

  // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    try {
      dispatch(fetchNotes());
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  const Delete = (id: string) => {
    fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `${localStorage.getItem("token")}`,
      },
    });
    setTimeout(() => {
      dispatch(fetchNotes());
    }, 100);
  };

  const Update = (id: string) => {
    setId(id);
    const doc = document.querySelector(".editnote-container");
    doc?.classList.add("damn");
    console.log(iD);
    // eslint-disable-next-line
    notes.map((note) => {
      if (note._id === id) {
        setData({
          ...data,
          title: note.title,
          description: note.description,
          tag: note.tag,
        });
      }
    });
  };

  const Close = () => {
    const doc = document.querySelector(".editnote-container");
    doc?.classList.remove("damn");
  };

  const Submit = (e: React.FormEvent) => {
    setLoader(true);
    e.preventDefault();
    setTimeout(() => {
      fetch(`http://localhost:5000/api/notes/updatenote/${iD}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          tag: data.tag,
        }),
      });
      setLoader(false);
      Close();
    }, 1000);
    setTimeout(() => {
      dispatch(fetchNotes());
    }, 1100);
  };

  return (
    <>
      <div className="container">
        <div className="addnote-section">
          <Link to="/addnotes" className="align-center">
            <i className="bi bi-plus"></i>
            <div className="addnote-span">Add Note</div>
          </Link>
        </div>
        {notes.length <= 0 ? (
          <div className="emptynotes center">
            Welcome! Make your first Note With MyNotes
          </div>
        ) : (
          <div className="noteshow-container">
            {notes.map((note, index) => {
              return (
                <SingleNote
                  note={note}
                  key={index}
                  Delete={Delete}
                  Update={Update}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="editnote-container ">
        <div className="close-icon center" onClick={Close}>
          <i className="bi bi-x"></i>
        </div>
        <div className="editnote-content center">
          <form onSubmit={Submit}>
            <div className="edit-notes-inp justify-spacebetween align-center">
              <input
                type="text"
                placeholder="Title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
              <select
                value={data.tag}
                onChange={(e) => setData({ ...data, tag: e.target.value })}
              >
                <option value="General">General</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <div className="edit-notes-inp center">
              <textarea
                cols={100}
                rows={10}
                placeholder="Description"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="edit-notes-inp center">
              <button>
                {loader ? <div className="button-loader"></div> : "EDIT"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;

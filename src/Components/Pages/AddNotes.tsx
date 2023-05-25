import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import { postNote } from "../../state/NotesSlice";

interface addnote {
  title: string;
  description: string;
  tag: string;
}

const AddNotes: FC = () => {
  const [data, setData] = useState<addnote>({
    title: "",
    description: "",
    tag: "",
  });

  const [loader, setLoader] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (data.title && data.description) {
      setLoader(true);
      setTimeout(() => {
        setData({ ...data, title: "", description: "", tag: "General" });
        dispatch(
          postNote({
            title: data.title,
            description: data.description,
            tag: data.tag,
          })
        );
        setLoader(false);
        navigate("/home");
      }, 1000);
    }
  };

  return (
    <>
      <div className="addnotes-container">
        <form onSubmit={submit}>
          <div className="notes-inp justify-spacebetween align-center">
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
          <div className="notes-inp center">
            <textarea
              cols={150}
              rows={15}
              placeholder="Description"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="notes-inp center">
            <button>
              {loader ? <div className="button-loader"></div> : "Add"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNotes;

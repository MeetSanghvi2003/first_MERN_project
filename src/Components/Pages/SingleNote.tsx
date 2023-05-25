import { FC } from "react";

interface Single {
  note: {
    _id: string;
    title: string;
    description: string;
    tag: string;
  };
  Delete: (id: string) => void;
  Update: (id: string) => void;
}
const SingleNote: FC<Single> = ({ note, Delete, Update }) => {
  return (
    <>
      <div className="singlenote justify-spacebetween align-center">
        <div
          className="note-title"
          onClick={() => {
            Update(note._id);
          }}
        >
          {note.title}
          <div className="tooltiptext">Tap to Edit</div>
        </div>
        <div className="icons">
          <i
            className="bi bi-trash center"
            onClick={() => {
              Delete(note._id);
            }}
          ></i>
        </div>
      </div>
    </>
  );
};

export default SingleNote;

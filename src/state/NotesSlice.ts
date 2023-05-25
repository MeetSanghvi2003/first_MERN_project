import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Withoutid {
  title: string;
  description: string;
  tag: string;
}
interface Note extends Withoutid {
  _id: string;
}

interface Notes {
  notes: Note[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: Notes = {
  notes: [],
  isLoading: false,
  isError: false,
};

export const fetchNotes = createAsyncThunk("notes/getnotes", async () => {
  const response = await fetch("http://localhost:5000/api/notes/getnotes", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      token: `${localStorage.getItem("token")}`,
    },
  });
  const data = response.json();
  return data;
});

export const postNote = createAsyncThunk(
  "notes/addnote",
  async ({ title, description, tag }: Withoutid) => {
    const response = await fetch("http://localhost:5000/api/notes/addnote", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    const data = await response.json();
    return data;
  }
);

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
      state.isLoading = false;
    });
    builders.addCase(fetchNotes.pending, (state, action) => {
      state.isLoading = true;
    });
    builders.addCase(fetchNotes.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builders.addCase(postNote.fulfilled, (state, action) => {
      state.notes.push(action.payload);
    });
  },
});

export default noteSlice.reducer;

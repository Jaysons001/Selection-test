const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  history: [],
  role: [],
  userWork: {},
};

const historyreducer = createSlice({
  name: "historyreducer",
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.history = [...action.payload];
    },

    setUserWork: (state, action) => {
      state.userWork = action.payload;
    },
  },
});

export const checkIn = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/log/",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("berhasil check in");
  } catch (error) {
    console.log(error);
    alert("ada error");
  }
};

export const checkOut = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.patch(
      "http://localhost:8000/api/log/",
      { ClockOut: new Date(), isDone: true },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("berhasil check out");
  } catch (error) {
    console.log(error);
    alert("ada error");
  }
};

export const getHistory = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/api/log/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch(setHistory(res.data.result));
  } catch (error) {
    console.log(error);
    alert(error.response.data);
  }
};

export const isWorking = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/api/log/work", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(res.data.result);
    dispatch(setUserWork(res.data.result));
  } catch (error) {
    console.log(error);
  }
};

export const { setHistory, setUserWork } = historyreducer.actions;
export default historyreducer.reducer;

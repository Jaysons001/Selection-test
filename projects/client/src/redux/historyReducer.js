const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  history: [],
  role: [],
  salaryMonth: {},
  salaryYear: {},
  userWork: null,
  page: 0,
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
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSalaryMonth: (state, action) => {
      state.salaryMonth = action.payload;
    },
    setSalaryYear: (state, action) => {
      state.salaryYear = action.payload;
    },
  },
});

export const checkIn = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/log/`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("berhasil check in");
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const checkOut = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_BASE_URL}/log/`,
      { ClockOut: new Date(), isDone: true },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(data.log.isOvertime);
    if (data.log.isOvertime) alert("kamu lupa check out!");
    else alert("berhasil check out");
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const getHistory =
  ({ index = 1, startDate = "", endDate = "" }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/log/?page=${index}&startDate=${startDate}&endDate=${endDate}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      dispatch(setHistory(res.data.result));
      dispatch(setPage(res.data.totalPage));
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

export const isWorking = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/log/work`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch(setUserWork(res.data.result));
  } catch (error) {
    console.log(error);
  }
};

export const getSalaryMonth =
  ({ month }) =>
  async (dispatch) => {
    const currentMonth = new Date().getMonth() + 1;
    const selectedMonth = month || currentMonth;
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/log/salary?month=${selectedMonth}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setSalaryMonth(res.data.result));
    } catch (error) {
      console.log(error);
    }
  };

export const getSalaryYear =
  ({ year }) =>
  async (dispatch) => {
    const currentYear = new Date().getFullYear();
    const selectedYear = year || currentYear;
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/log/salary?year=${selectedYear}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setSalaryYear(res.data.result));
    } catch (error) {
      console.log(error);
    }
  };

export const { setHistory, setUserWork, setPage, setSalaryMonth, setSalaryYear } = historyreducer.actions;
export default historyreducer.reducer;

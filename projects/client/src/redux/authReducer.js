const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  user: {
    id: null,
    username: "",
    email: "",
    role: "",
    fullname: "",
    roleName: "",
  },
  login: false,
  role: [],
  allUserAdmin: [],
};

const authreducer = createSlice({
  name: "authreducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, roleID, fullName } = action.payload;
      state.user = { id, username, email, roleID, fullName };
      state.user.roleName = action.payload.Role.role;
    },
    setAllUserAdmin: (state, action) => {
      state.allUserAdmin = [...action.payload];
    },
    loginSuccess: (state) => {
      state.login = true;
    },
    logoutSuccess: (state) => {
      state.login = false;
      localStorage.removeItem("token");
      document.location.href = "/";
    },
    setRole: (state, action) => {
      state.role = [...action.payload];
    },
  },
});

export const loginUser =
  ({ email, password }, navigate) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/`, { email, password });
      localStorage.setItem("token", data.token);
      dispatch(setUser(data.user));
      dispatch(loginSuccess());
      alert("login berhasil");
      if (data.user.roleID === 1) navigate("/admin");
      else navigate("/home");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

export const registerUser =
  ({ email, roleID, baseSalary }) =>
  async (dispatch) => {
    try {
      console.log(email, roleID, baseSalary);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/reg`,
        { email, roleID, baseSalary },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("register berhasil");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

export const getRole = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/role`);
      dispatch(setRole(data.result));
    } catch (error) {
      console.log(error);
    }
  };
};

export const registerLanjutan = (values) => {
  return async (dispatch) => {
    const { fullname, birthday, username, password, token } = values;
    try {
      const user = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (user.data.user.fullName) {
        alert("token sudah digunakan");
        document.location.href = "/";
        return;
      }

      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/reg`,
        { fullname, birthday, username, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("register berhasil");
      document.location.href = "/";
    } catch (error) {
      alert(error.response.data);
    }
  };
};

export const cekLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await dispatch(setUser(data.user));
    } catch (error) {
      if (localStorage.getItem("token")) {
        alert("Anda Logout");
        dispatch(logoutSuccess());
      }
    }
  };
};

export const allUser = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setAllUserAdmin(data.result));
    } catch (error) {
      console.log(error);
    }
  };
};

export const { setUser, loginSuccess, logoutSuccess, setRole, setAllUserAdmin } = authreducer.actions;
export default authreducer.reducer;

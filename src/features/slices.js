import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST } from "../api";
import { NotificationManager } from "react-notifications";
const userSlice = createSlice({
  name: "user",
  initialState: { status: "idle", data: [], test: false, isLoggedIn: false, rule: null, user: {}, isLoading: false, time: null, hash: null, email: null, list: [], size: "S|M|L|XL|2XL|3XL|4XL|5XL", color: "Black|White|Light Pink|Light Blue|Ash|Red", description: { shirt: "", sweatshirt: "", hoodie: "" } },
  reducers: {
    // IMMER
    addTodo: (state, action) => {
      state.push(action.payload);
    }, // action creators
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    }, setLoading: (state, action) => {
      state.isLoading = action.payload;
    }, stopLoading: (state) => {
      state.isLoading = false;
    }, loginSuccess: (state) => {
      state.isLoggedIn = true;
    }, logout: (state) => {
      state.isLoggedIn = false;
      state.time = null;
      state.hash = null;
    },
    setTimeHash: (state, action) => {
      state.time = action.payload.time;
      state.hash = action.payload.hash;
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(teepublic.fulfilled, (state, action) => {
        const res = action.payload;
        if (res?.status != 1) {
          NotificationManager.success(`Thành công`, "Alert", 3000);
        } else {
          NotificationManager.error(res.message, "Alert", 3000);
        }
      })
      .addCase(teepublic.pending, (state, action) => {
        NotificationManager.success("Đang crawl data!", "Alert", 3000);
      })
      .addCase(teepublic.rejected, (state, action) => {
        NotificationManager.error('Lổi Server, liên hệ IT nhé!', 'Error', 3000);
      })

      .addCase(redbubble.fulfilled, (state, action) => {
        const res = action.payload;
        if (res?.status != 1) {
          NotificationManager.success(`Thành công`, "Alert", 3000);
          state.data = res?.data;
        } else {
          NotificationManager.error(res.message, "Alert", 3000);

        }
      })
      .addCase(redbubble.pending, (state, action) => {
        NotificationManager.success("Đang crawl data!", "Alert", 3000);
      })
      .addCase(redbubble.rejected, (state, action) => {
        NotificationManager.error('Lổi Server, liên hệ IT nhé!', 'Error', 3000);
      })

      .addCase(loginGG.fulfilled, (state, action) => {
        const res = action.payload;
        if (res.status == 0) {
          NotificationManager.success("Login thành công ", "Alert", 3000);
          state.size = res?.size
          state.color = res?.color
          state.description = res?.description || { shirt: "", sweatshirt: "", hoodie: "" }
          state.test = res?.test || false
          state.isLoggedIn = true
        } else {
          NotificationManager.error("Login Fail ", "Error", 3000);
          state.isLoggedIn = false
        }
      })
      .addCase(loginGG.pending, (state, action) => {
        NotificationManager.success("Đang Login !", "Alert", 3000);
        state.isLoggedIn = false
      })
      .addCase(loginGG.rejected, (state, action) => {
        NotificationManager.error('Login Fail !', 'Error', 3000);
        state.isLoggedIn = false
      })

  },
});


export const teepublic = createAsyncThunk("user/teepublic", async (newTodo, { dispatch }) => {
  try {
    dispatch(userSlice.actions.setLoading(true)); // Đặt isLoading thành true trước khi gửi yêu cầu
    const response = await POST("/teepublic", newTodo);


    dispatch(userSlice.actions.setLoading(false)); // Đặt isLoading thành false sau khi nhận dữ liệu
    return response.data;
  } catch (error) {
    dispatch(userSlice.actions.setLoading(false)); // Đặt isLoading thành false nếu có lỗi
    throw error;
  }
});

export const redbubble = createAsyncThunk("user/redbubble", async (newTodo, { dispatch }) => {
  try {
    dispatch(userSlice.actions.setLoading(true)); // Đặt isLoading thành true trước khi gửi yêu cầu
    const res = await POST("/redbubble", newTodo);
    dispatch(userSlice.actions.setLoading(false)); // Đặt isLoading thành false sau khi nhận dữ liệu
    return res.data;
  } catch (error) {
    dispatch(userSlice.actions.setLoading(false)); // Đặt isLoading thành false nếu có lỗi
    throw error;
  }
});

export const getTiktok = createAsyncThunk("user/list", async (newTodo, { dispatch }) => {
  try {
    dispatch(userSlice.actions.setLoading(true)); // Đặt isLoading thành true trước khi gửi yêu cầu
    const res = await GET("/listtiktok", newTodo);
    dispatch(userSlice.actions.setLoading(false)); // Đặt isLoading thành false sau khi nhận dữ liệu
    return res.data;
  } catch (error) {
    dispatch(userSlice.actions.setLoading(false)); // Đặt isLoading thành false nếu có lỗi
    throw error;
  }
});

export const loginGG = createAsyncThunk("user/logingg", async (newTodo, { dispatch }) => {
  try {
    dispatch(userSlice.actions.setLoading(true)); // Đặt isLoading thành true trước khi gửi yêu cầu
    const res = await POST("/logingg", { hash: newTodo });
    dispatch(userSlice.actions.setLoading(false)); // Đặt isLoading thành false sau khi nhận dữ liệu
    return res.data;
  } catch (error) {
    dispatch(userSlice.actions.setLoading(false)); // Đặt isLoading thành false nếu có lỗi
    throw error;
  }
});
export const editGG = createAsyncThunk("user/editgg", async (newTodo, { dispatch }) => {
  try {
    dispatch(userSlice.actions.setLoading(true)); // Đặt isLoading thành true trước khi gửi yêu cầu
    const res = await POST("/edittool", newTodo);
    dispatch(userSlice.actions.setLoading(false)); // Đặt isLoading thành false sau khi nhận dữ liệu
    return res.data;
  } catch (error) {
    dispatch(userSlice.actions.setLoading(false)); // Đặt isLoading thành false nếu có lỗi
    throw error;
  }
});
export const { loginSuccess, logout, setTimeHash } = userSlice.actions;
export default userSlice;

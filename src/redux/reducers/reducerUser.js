import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:8080/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState:{
    users:[]
  },
  reducers: {
    // omit reducer cases
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // trường hợp lấy dữ liệu thành công
        console.log("lấy data thành công",action);
        state.users= action.payload;
        
        })
     .addCase(fetchUsers.rejected, (state, action) => {
        // lấy dữ liệu thất bại
        })
       
  }
})
export default usersSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk(
  "data/getdata",
  async ({ page, start, end }) =>
    (
      await axios(
        `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${page}/daily/${start}/${end}`
      )
    ).data
);

/*TOP VIEWED ARTICLES FOR A COUNTRY*/
// https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/BE/all-access/2021/10/06

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getData.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getData.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data = payload.items;
    },
  },
});

export default dataSlice.reducer;

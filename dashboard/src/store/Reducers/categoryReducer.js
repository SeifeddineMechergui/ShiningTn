import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Thunk to add a category
export const categoryAdd = createAsyncThunk(
    'category/categoryAdd',
    async ({ name, subCat, image }, { rejectWithValue, fulfillWithValue, getState }) => {
        const { token } = getState().auth;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('subCat', subCat);  // Include subCat in formData
            formData.append('image', image);
            const { data } = await api.post('/category-add', formData, config);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Thunk to get categories
export const get_category = createAsyncThunk(
    'category/get_category',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState }) => {
        const { token } = getState().auth;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        
        try {
            const { data } = await api.get(`/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, config);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create the category slice
export const categoryReducer = createSlice({
    name: 'category',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        categorys: [],
        totalCategory: 0
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: {
        [categoryAdd.pending]: (state) => {
            state.loader = true;
        },
        [categoryAdd.rejected]: (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        },
        [categoryAdd.fulfilled]: (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.categorys = [...state.categorys, payload.category];
        },
        [get_category.fulfilled]: (state, { payload }) => {
            state.totalCategory = payload.totalCategory;
            state.categorys = payload.categorys;
        },
    }
});

export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;

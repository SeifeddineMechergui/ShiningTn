import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Thunk to get seller statistics
export const get_seller_statistics = createAsyncThunk(
    'sellerStatistics/get_seller_statistics',
    async ({ parPage, page }, { rejectWithValue, fulfillWithValue, getState }) => {
        const { token } = getState().auth;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const { data } = await api.get(`/admin/seller/statistics?page=${page}&parPage=${parPage}`, config);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const sellerStatisticsSlice = createSlice({
    name: 'sellerStatistics',
    initialState: {
        statistics: [],
        totalStatistics: 0,
        loader: false,
        errorMessage: '',
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_seller_statistics.pending, (state) => {
                state.loader = true;
            })
            .addCase(get_seller_statistics.fulfilled, (state, { payload }) => {
                state.statistics = payload.statistics || [];
                state.totalStatistics = payload.totalStatistics || 0;
                state.loader = false;
            })
            .addCase(get_seller_statistics.rejected, (state, { payload }) => {
                state.errorMessage = payload || 'Error fetching statistics';
                state.loader = false;
            });
    },
});

export const { messageClear } = sellerStatisticsSlice.actions;
export default sellerStatisticsSlice.reducer;

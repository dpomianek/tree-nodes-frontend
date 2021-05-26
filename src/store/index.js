import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { getData, putData } from '../api/nodes-api';
import { findFirstFreeId, removeNodesFamily } from '../helpers/nodes-helpers';

const initialState = { nodes: [], message: '' };

export const getNodes = createAsyncThunk(
  'nodes/getNodes',
  async (_, { rejectWithValue }) => {
    try {
      return await getData();
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const putNodes = createAsyncThunk(
  'nodes/putNodes',
  async (nodes, { rejectWithValue }) => {
    try {
      return await putData(nodes);
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    add(state, action) {
        state.nodes.push({
            id: findFirstFreeId(state.nodes),
            name: 'default name',
            pid: action.payload,
        });
    },
    update(state, action) {
        const index = state.nodes.findIndex(node => node.id === action.payload.id);
        state.nodes[index].name = action.payload.name;
    },
    delete(state, action) {
        state.nodes = removeNodesFamily(action.payload, state.nodes);
    },
  },
  extraReducers: {
    [getNodes.fulfilled]: (state, action) => {
      state.nodes = action.payload;
    },
    [putNodes.fulfilled]: (state, action) => {
      state.message = action.payload;
    },
  },
});

const store = configureStore({
  reducer: nodesSlice.reducer,
});

export const nodesActions = nodesSlice.actions;

export default store;

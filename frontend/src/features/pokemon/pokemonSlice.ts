import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  addPokemon,
  getUnownedPokemon,
  getMyPokemon,
  releasePokemon,
  getAllPokemon,
} from '../../services';
import { PokemonType } from '../../types';

const initialState = {
  catchPokemon: {
    pk: 0,
    name: '',
    hp: 0,
    attack: 0,
    defense: 0,
    type: '',
    level: 0
  },
  myPokemon: [],
  unownedPokemon: [],
} as {
  catchPokemon: PokemonType,
  myPokemon: PokemonType[],
  unownedPokemon: PokemonType[]
};

export const getUnownedPokemonAsync = createAsyncThunk(
  'pokemon/getUnownedPokemon',
  async () => {
    return getUnownedPokemon();
  }
);

export const addPokemonAsync = createAsyncThunk(
  'pokemon/addPokemon',
  async (id: number) => {
    const randomLevel = Math.floor(Math.random() * 101);

    return addPokemon(id, randomLevel);
  }
);

export const getAllPokemonAsync = createAsyncThunk(
  'pokemon/getAllPokemon',
  async () => {
    return getAllPokemon();
  }
);

export const getMyPokemonAsync = createAsyncThunk(
  'pokemon/getMyPokemon',
  async () => {
    return getMyPokemon();
  }
);

export const releasePokemonAsync = createAsyncThunk(
  'pokemon/releasePokemon',
  async (id: number) => {
    await releasePokemon(id);

    return getMyPokemon();
  }
);

export const catchPokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUnownedPokemonAsync.fulfilled, (state, action) => {
        return {
          ...state,
          unownedPokemon: action.payload
        };
      })
      .addCase(addPokemonAsync.fulfilled, (state, action) => {
        alert('Gotcha');
      })
      .addCase(getAllPokemonAsync.fulfilled, (state, action) => {
        const randomIndex = Math.floor(Math.random() * action.payload.length)

        return {
          ...state,
          catchPokemon: action.payload[randomIndex]
        };
      })
      .addCase(getMyPokemonAsync.fulfilled, (state, action) => {
        return {
          ...state,
          myPokemon: action.payload
        };
      })
      .addCase(releasePokemonAsync.fulfilled, (state, action) => {
        alert('release');

        return {
          ...state,
          myPokemon: action.payload
        };
      })
      ;
  },
});

export const selectUnownedPokemon = (state: RootState) => state.pokemon.unownedPokemon;
export const selectCatchPokemon = (state: RootState) => state.pokemon.catchPokemon;
export const selectMyPokemon = (state: RootState) => state.pokemon.myPokemon;

export default catchPokemonSlice.reducer;

import {
  Route,
  Routes as ReactRoutes,
  Navigate,
} from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { Login, CatchPokemon, Register, MyPokemon, UnownedPokemon } from '../features';
import { selectAuth } from "../features/auth/authSlice";
import { Navbar } from "../features/navbar";

export const Routes = () => {
  const { access } = useAppSelector(selectAuth);

  return (
    <>
      {access ? (
        <div>
          <Navbar />
          <ReactRoutes>
            <Route path="/catchPokemon" element={<CatchPokemon />} />
            <Route path="/myPokemon" element={<MyPokemon />} />
            <Route path="/unownedPokemon" element={<UnownedPokemon />} />
            <Route path="*" element={<Navigate replace to="/catchPokemon" />} />
          </ReactRoutes>
        </div>
      ) : (
        <ReactRoutes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </ReactRoutes>
      )}
    </>
  );
};
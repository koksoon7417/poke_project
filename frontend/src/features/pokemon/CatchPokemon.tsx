import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { seesionOut } from "../auth/authSlice";
import { addPokemonAsync, getAllPokemonAsync, selectCatchPokemon } from "./pokemonSlice";
import styles from './Pokemon.module.css';
import { useNavigate } from "react-router-dom";

const random = (number: number) => {
  return Math.floor(Math.random() * number);
}

export const CatchPokemon = () => {
  const wildPokemon = useAppSelector(selectCatchPokemon);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [game, setGame] = useState({
    answer: random(10) + 1, //prevent answer 0
    prevGuessNumber: 0,
    guessNumber: 0,
    turn: 1,
    maxTry: 3,
  });

  useMemo(async () => {
    const getAllPokemonAction = await dispatch(getAllPokemonAsync());

    if (getAllPokemonAsync.rejected.match(getAllPokemonAction)) dispatch(seesionOut());
  }, [dispatch])


  const handleChange = (e: any) => {
    setGame(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async () => {
    if (game.answer === +game.guessNumber && game.turn <= game.maxTry) {
      const addPokemonAction = await dispatch(addPokemonAsync(wildPokemon.pk));

      if (addPokemonAsync.rejected.match(addPokemonAction)) dispatch(seesionOut());
      else {
        navigate("/myPokemon");
      }
    }
    else if (game.turn >= game.maxTry) {
      alert('Please try again.')
      navigate("/myPokemon");
    }
    else {
      setGame(prev => ({ ...prev, turn: game.turn++, prevGuessNumber: game.guessNumber }))
    }
  }

  return (
    <div className={styles.container}>
      <h1>You found a wild pokemon</h1>
      {
        wildPokemon && wildPokemon.name &&
        <div className={styles.catchPokemonListing}>
          <div className={styles.listingContent}>
            <h4>{wildPokemon.name}</h4>
            <p>lvl: ???</p>
            <p>hp: ???</p>
            <p>attack: ???</p>
            <p>defense: ???</p>
            <p>type: ???</p>
          </div>
        </div>
      }
      <div style={{ padding: '0.5rem' }}></div>
      <label>Turn {game.turn}</label>
      {
        Boolean(+game.prevGuessNumber) &&
        <label style={{ color: 'red' }}>
          Your guess, {game.prevGuessNumber}, is too {game.prevGuessNumber < game.answer ? 'low' : ' high'}.
        </label>
      }
      <label>Pick a number between 1 and 10.</label>
      <label>You have {game.maxTry - game.turn + 1} turns left.</label>
      <input type="word" name="guessNumber" onChange={handleChange} />
      <button onClick={onSubmit}>throw a pokeball</button>
    </div>
  );
}

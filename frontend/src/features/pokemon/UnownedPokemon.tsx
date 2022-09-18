import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { seesionOut } from "../auth/authSlice";
import { selectUnownedPokemon, getUnownedPokemonAsync } from "./pokemonSlice";
import styles from './Pokemon.module.css';

export const UnownedPokemon = () => {
    const myPokemon = useAppSelector(selectUnownedPokemon);
    const dispatch = useAppDispatch();

    useMemo(async () => {
        const getUnownedPokemonAction = await dispatch(getUnownedPokemonAsync());

        if (getUnownedPokemonAsync.rejected.match(getUnownedPokemonAction)) dispatch(seesionOut());
    }, [dispatch])

    return (
        <div className={styles.container}>
            <h1>Unowned Pokemons</h1>
            {
                myPokemon.length > 0 &&
                <div className={styles.listing}>
                {
                    myPokemon.map((pokemon, index) => (
                        <div key={index} className={styles.listingContent}>
                            <h4>{pokemon.name}</h4>
                            <p>lvl: ???</p>
                            <p>hp: ???</p>
                            <p>attack: ???</p>
                            <p>defense: ???</p>
                            <p>type: ???</p>
                        </div>
                    ))
                }
            </div>
            }
        </div>
    );
}

import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { seesionOut } from "../auth/authSlice";
import { releasePokemonAsync, getMyPokemonAsync, selectMyPokemon } from "./pokemonSlice";
import styles from './Pokemon.module.css';

export const MyPokemon = () => {
    const myPokemon = useAppSelector(selectMyPokemon);
    const dispatch = useAppDispatch();

    useMemo(async () => {
        const getMyPokemonAction = await dispatch(getMyPokemonAsync());

        if (getMyPokemonAsync.rejected.match(getMyPokemonAction)) dispatch(seesionOut());
    }, [dispatch])

    const onSubmit = async (id: number) => {
        const releasePokemonAction = await dispatch(releasePokemonAsync(id));

        if (releasePokemonAsync.rejected.match(releasePokemonAction)) dispatch(seesionOut());
    }

    return (
        <div className={styles.container}>
            <h1>My Pokemons</h1>
            {
                myPokemon.length > 0 &&
                <div className={styles.listing}>
                    {
                        myPokemon.map((pokemon, index) => (
                            <div key={index} className={styles.listingContent}>
                                <h4>{pokemon.name}</h4>
                                <p>lvl: {pokemon.level}</p>
                                <p>hp: {pokemon.hp}</p>
                                <p>attack: {pokemon.attack}</p>
                                <p>defense: {pokemon.defense}</p>
                                <p>type: {pokemon.type}</p>
                                <button
                                    onClick={() => onSubmit(pokemon.pk)}
                                >
                                    release
                                </button>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
}

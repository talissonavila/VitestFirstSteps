import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PokemonType } from "../../types/PokemonType";
import styles from "./styles.module.scss";

interface IProps {
    fetchPokemonDetail: (id: number) => Promise<PokemonType>;
}

export default function PokemonDetail({ fetchPokemonDetail }: IProps) {
    const params = useParams();
    const [ pokemon, setPokemon ]= useState<PokemonType>({
        id: 0,
        name: "",
        image: "",
        type: "",
    });

    useEffect(() => {
        (async () => {
            if(!params.id || params.id === '0'){
                return;
            }
            const data = await fetchPokemonDetail(parseInt(params.id));

            setPokemon(data);
        })();
    }, []);

    return (
        <div className={styles.container}>
            <div>
                <h1>Nome: {pokemon.name}</h1>
                <img src={pokemon.image} alt={pokemon.name} />
                <strong>{pokemon.type}</strong>
            </div>
            <Link to="/dashboard">Voltar para Home</Link>
        </div>
    )
}
import type { FavoritePokemon } from "@interface/favorite-pokemon";
import { For, createSignal } from "solid-js";
import { FavoritePokemonCard } from "./FavoritePokemonCard";


const getLocalStoragePokemons = (): FavoritePokemon[] => {
    const favoritePokemons = JSON.parse(
        localStorage.getItem("favoritesPokemons") ?? '[]'
    )

    return favoritePokemons;
}

export const FavoritePokemons = () => {

    const [pokemons, setPokemons] = createSignal(getLocalStoragePokemons());

    return (
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <For each={pokemons()}>
                {
                    (pokemon) => (
                        <FavoritePokemonCard pokemon={pokemon} />
                    )
                }
            </For>
        </div>
    )
}
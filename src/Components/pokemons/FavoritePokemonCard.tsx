import type { FavoritePokemon } from "@interface/favorite-pokemon";
import { createSignal, Show, type Component } from "solid-js";

interface Props {
    pokemon: FavoritePokemon;
}

export const FavoritePokemonCard: Component<Props> = ({ pokemon }) => {

    const [isVisible, setIsVisible] = createSignal(true);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    const deleteFavorite = () => {
        const favorites = JSON.parse(
            localStorage.getItem("favoritesPokemons") ?? "[]"
        ) as FavoritePokemon[];

        const newfavorite = favorites.filter(pokemonNew => pokemonNew.id !== pokemon.id);

        localStorage.setItem("favoritesPokemons", JSON.stringify(newfavorite));
        setIsVisible(false);
    }
    return (
        <Show when={isVisible()}>
            <div class="flex flex-col items-center justify-center">
                <a
                    href={`/pokemons/${pokemon.name}`}
                >
                    <img
                        src={imageUrl}
                        alt={pokemon.name}
                        width="96"
                        height="96"
                        style={`
                            view-transition-name: ${pokemon.name}-image
                        `}
                    />
                    <p class="capitalize">#{pokemon.id} - {pokemon.name}</p>
                </a>
                <button
                    onClick={deleteFavorite}
                    class="text-red-500 border border-gray-400 bg-slate-200 hover:bg-slate-300 duration-150 transition-all rounded-md w-auto flex items-center justify-center gap-x-4 py-1 px-1 font-bold"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fb2c36" d="m19 19.425l-2.125 2.1l-1.4-1.4l2.1-2.125l-2.1-2.125l1.4-1.4l2.125 2.1l2.125-2.1l1.4 1.4l-2.1 2.125l2.1 2.125l-1.4 1.4zM6 22q-1.25 0-2.125-.875T3 19v-3h3V2h15v10.375q-.475-.175-.975-.262T19 12.025V4H8v12h5.35q-.175.475-.262.975T13 18H5v1q0 .425.288.713T6 20h7.35q.2.575.5 1.075t.7.925zM9 9V7h9v2zm0 3v-2h9v2zm4.35 8H5z" /></svg>
                    Remover favorito
                </button>
            </div>
        </Show>
    )
}
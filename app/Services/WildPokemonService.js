import { ProxyState } from "../AppState.js";
import Pokemon from "../Models/Pokemon.js";
import { pokeApi, sandboxApi } from "./AxiosService.js";


class WildPokemonService {
  async getWildPokemon() {
    let res = await pokeApi.get("?limit=151")
    console.log('initial response', res);
    ProxyState.wildPokemon = res.data.results
    console.log('Appstate - wild pokemon', ProxyState.wildPokemon)
  }

  async setActivePokemon(pokemonName) {
    let res = await pokeApi.get("" + pokemonName)
    ProxyState.activePokemon = new Pokemon(res.data)
    console.log(ProxyState.activePokemon)
  }

  async catchPokemon() {
    let res = await sandboxApi.post("", ProxyState.activePokemon)
    console.log("catch pokemon", res)
    ProxyState.caughtPokemon = [...ProxyState.caughtPokemon, new Pokemon(res.data)]

  }
}

export const wildPokemonService = new WildPokemonService()
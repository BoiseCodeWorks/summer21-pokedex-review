import { ProxyState } from "../AppState.js";
import { pokeApi, sandboxApi } from "./AxiosService.js";
import Pokemon from "../Models/Pokemon.js"


class CaughtPokemonService {

  async getCaughtPokemon() {
    let res = await sandboxApi.get()
    console.log('my pokemon', res);
    ProxyState.caughtPokemon = res.data.map(cp => new Pokemon(cp))
    console.log("my caught pokemon", ProxyState.caughtPokemon);
  }

  async releasePokemon(pokemonName) {
    let foundPokemon = ProxyState.caughtPokemon.find(cp => cp.name == pokemonName)
    console.log('found pokemon', foundPokemon)
    await sandboxApi.delete("/" + foundPokemon.id)
    ProxyState.caughtPokemon = ProxyState.caughtPokemon.filter(cp => cp.id != foundPokemon.id)
  }

  async setActivePokemon(pokemonName) {
    let found = ProxyState.caughtPokemon.find(p => p.name == pokemonName)
    ProxyState.activePokemon = found
    console.log(ProxyState.activePokemon)
  }
}

export const caughtPokemonService = new CaughtPokemonService()
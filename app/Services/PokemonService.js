import { ProxyState } from "../AppState.js";
import { pokeApi, sandboxApi } from "./AxiosService.js";
import Pokemon from "../Models/Pokemon.js"


class PokemonService{
constructor(){
  console.log("hello from the service");
}

async getWildPokemon(){
  let res = await pokeApi.get()
  console.log('initial response', res);
  ProxyState.wildPokemon = res.data.results
  console.log('Appstate - wild pokemon',ProxyState.wildPokemon)
}

async setActivePokemon(pokemonName){
  try {
    let res = await pokeApi.get(pokemonName)
    ProxyState.activePokemon = new Pokemon(res.data)
    console.log(ProxyState.activePokemon);
  } catch (error) {
    console.log(error);
  }
}

async catchPokemon(){
  try {
    let res = await sandboxApi.post("", ProxyState.activePokemon)
    console.log("catch pokemon", res)
    this.getCaughtPokemon()
  } catch (error) {
    console.log(error);
  }
}

async getCaughtPokemon(){
  try {
    let res = await sandboxApi.get()
    console.log('my pokemon', res);
    ProxyState.caughtPokemon = res.data.map(cp => new Pokemon(cp))
    console.log("my caught pokemon", ProxyState.caughtPokemon);
  } catch (error) {
    console.log(error)
  }

}
async releasePokemon(pokemonName){
  try {
    let foundPokemon = ProxyState.caughtPokemon.find(cp => cp.name == pokemonName)
    console.log(foundPokemon)
    let res = await sandboxApi.delete("/" + foundPokemon.id)
    // ProxyState.caughtPokemon = ProxyState.caughtPokemon.filter(cp => cp.id != ProxyState.activePokemon.id)
    this.getCaughtPokemon()
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
}

export const pokemonService = new PokemonService()
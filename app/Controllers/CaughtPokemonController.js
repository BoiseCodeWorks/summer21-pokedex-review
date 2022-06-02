import { ProxyState } from "../AppState.js";
import { caughtPokemonService } from "../Services/CaughtPokemonService.js";


function drawCaughtPokemon() {
  let template = ''
  ProxyState.caughtPokemon.forEach(cp => {
    template += /*html*/ `
    <button class="btn btn-danger m-2" data-toggle="modal" data-target="#pokemonModal" onclick="app.caughtPokemonController.setActivePokemon('${cp.name}')">${cp.name}</button>
    `
  })
  document.getElementById('caught-pokemon').innerHTML = template
}

export default class CaughtPokemonController {
  constructor() {
    console.log("hello from the controller");
    ProxyState.on('caughtPokemon', drawCaughtPokemon)
    this.getMyPokemon()
  }

  async getMyPokemon() {
    try {
      caughtPokemonService.getCaughtPokemon()
    } catch (error) {
      console.error(error)
    }
  }

  async setActivePokemon(pokemonName) {
    try {
      await caughtPokemonService.setActivePokemon(pokemonName)
      console.log(pokemonName)
    } catch (error) {
      console.error(error)
    }
  }

  async releasePokemon(pokemonName) {
    try {
      console.log(pokemonName)
      await caughtPokemonService.releasePokemon(pokemonName)
      // @ts-ignore
    } catch (error) {
      console.error(error)
    }
  }
}
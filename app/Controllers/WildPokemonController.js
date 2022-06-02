import { ProxyState } from "../AppState.js"
import { wildPokemonService } from "../Services/WildPokemonService.js"

function drawActivePokemon() {
  let activePokemon = ProxyState.activePokemon
  document.getElementById('active-pokemon').innerHTML = activePokemon.Template
}

function drawWildPokemon() {
  let template = ''
  ProxyState.wildPokemon.forEach(wp => {
    template += /*html*/
      `
    <button class="btn btn-success m-2" data-toggle="modal" data-target="#pokemonModal" onclick="app.wildPokemonController.setActivePokemon('${wp.name}')">${wp.name}</button>
    `
  })
  document.getElementById('wild-pokemon').innerHTML = template
}

export class WildPokemonController {
  constructor() {
    ProxyState.on('wildPokemon', drawWildPokemon)
    ProxyState.on('activePokemon', drawActivePokemon)
    this.getWildPokemon()
  }

  async catchPokemon() {
    try {
      await wildPokemonService.catchPokemon()
    } catch (error) {
      console.error(error)
    }
  }

  async setActivePokemon(pokemonName) {
    try {
      await wildPokemonService.setActivePokemon(pokemonName)
      console.log(pokemonName)
    } catch (error) {
      console.error(error)
    }
  }

  async getWildPokemon() {
    try {
      await wildPokemonService.getWildPokemon()
    } catch (error) {
      console.error(error)
    }
  }

}
import { ProxyState } from "../AppState.js";
import {pokemonService} from "../Services/PokemonService.js"

function drawWildPokemon(){
  let template = ''
  ProxyState.wildPokemon.forEach(wp => {
    template += /*html*/ `
    <button class="btn btn-success m-2" data-toggle="modal" data-target="#wildActivePokemonModal" onclick="app.pokemonController.setActivePokemon('${wp.name}')">${wp.name}</button>
    `
  })
  document.getElementById('wild-pokemon').innerHTML = template
}

function drawActivePokemon(){
let activePokemon = ProxyState.activePokemon
if(activePokemon.id){
  document.getElementById('caughtPokemon').innerHTML = activePokemon.CaughtPokemon
}
document.getElementById('activePokemon').innerHTML = activePokemon.ActivePokemon
}

function drawCaughtPokemon(){
  let template = ''
  ProxyState.caughtPokemon.forEach(cp => {
    template += /*html*/ `
    <button class="btn btn-danger m-2" data-toggle="modal" data-target="#caughtPokemonModal" onclick="app.pokemonController.setActivePokemon('${cp.name}')">${cp.name}</button>
    `
  })
  document.getElementById('caught-pokemon').innerHTML = template
}

export default class PokemonController{
  constructor(){
    console.log("hello from the controller");
    ProxyState.on('wildPokemon', drawWildPokemon)
    ProxyState.on('activePokemon', drawActivePokemon)
    ProxyState.on('caughtPokemon', drawCaughtPokemon)
    this.getWildPokemon()
    this.getMyPokemon()
  }

  getWildPokemon(){
    pokemonService.getWildPokemon()
  }

  setActivePokemon(pokemonName){
    console.log(pokemonName)
    pokemonService.setActivePokemon(pokemonName)
  }

  catchPokemon(pokemonName){
    console.log('catch pokemans',pokemonName);
    pokemonService.catchPokemon(pokemonName)
  }

  getMyPokemon(){
    pokemonService.getCaughtPokemon()
  }

  releasePokemon(pokemonName){
    console.log(pokemonName)
    pokemonService.releasePokemon(pokemonName)

  }

}
export default class Pokemon {
  constructor(data) {
    this.name = data.name
    this.img = data.img || data.sprites.front_shiny
    this.description = data.description || "Unknown"
    this.weight = data.weight
    this.height = data.height
    this.types = data.types
    this.user = data.user || null
    this.id = data.id || null
  }

  get Template() {
    return /*html*/  `
  <div class="col-6 d-flex justify-content-center">
     <img class="img-fluid" src="${this.img}" alt="" />
   </div>
   <div class="col-6">
     <h5>Name: ${this.name}</h5>
     <h5>Type(s): ${this.BothTypes}</h5>
     <h5>Height: ${this.height}</h5>
     <h5>Description: ${this.description}</h5>
   </div>
   ${this.Buttons}
  `
  }

  get BothTypes() {
    let template = ''
    this.types.forEach(t => template += t.type.name + ' ')
    return template
  }

  get Buttons() {
    if (this.user) {
      return `<button class="btn btn-danger" onclick="app.caughtPokemonController.releasePokemon('${this.name}')">Release Pokemon</button>`
    } else {
      return `<button class="btn btn-success" onclick="app.wildPokemonController.catchPokemon('${this.name}')">Catch Pokemon</button>`

    }
  }

}
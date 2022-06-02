import CaughtPokemonController from "./Controllers/CaughtPokemonController.js";
import ValuesController from "./Controllers/ValuesController.js";
import { WildPokemonController } from "./Controllers/WildPokemonController.js";

class App {
  valuesController = new ValuesController();
  caughtPokemonController = new CaughtPokemonController();
  wildPokemonController = new WildPokemonController
}

window["app"] = new App();

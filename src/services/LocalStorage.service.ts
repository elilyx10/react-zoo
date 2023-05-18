import { IAnimal } from "../models/IAnimal";
import { getAnimal } from "./FetchAnimals.service";

export async function sendToStorage() {
  let allAnimals: IAnimal[] = [];

  let storedAnimals = localStorage.getItem("animals");

  if (storedAnimals) {
    allAnimals = JSON.parse(storedAnimals);
  } else {
    await getAnimal()
      .then((response) => {
        allAnimals = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return allAnimals;
}

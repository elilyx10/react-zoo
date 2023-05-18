import { useEffect, useState } from "react";
import { IAnimal } from "../../models/IAnimal";
import { PrintAnimal } from "./PrintAnimals";
import { sendToStorage } from "../../services/LocalStorage.service";

export const Zoo = () => {
  const [animalList, setAnimalList] = useState<IAnimal[]>([]);

  useEffect(() => {
    sendToStorage().then((response) => {
      localStorage.setItem("animals", JSON.stringify(response));
      setAnimalList(response);
    });
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-evenly gap-1">
        {animalList.map((animal) => {
          return (
            <PrintAnimal animal={animal} key={animal.id}></PrintAnimal>
          );
        })}
      </div>
    </>
  );
};

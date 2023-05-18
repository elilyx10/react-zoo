import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useParams } from "react-router-dom";
import { defaultAnimalValues, IAnimal } from "../../models/IAnimal";
import { sendToStorage } from "../../services/LocalStorage.service";
import { DisabledButton, ActiveButton,} from "../StyledComponents/StyledButtons";

export const Animal = () => {
  const [animal, setAnimal] = useState<IAnimal>(defaultAnimalValues);
  const [allAnimals, setAllAnimals] = useState<IAnimal[]>([]);

  let params = useParams();

  useEffect(() => {
    sendToStorage().then((response) => {
      localStorage.setItem("animals", JSON.stringify(response));

      setAllAnimals(response);
    });
  }, []);

  useEffect(() => {
    if (allAnimals.length === 0) return;

    const index = allAnimals.findIndex(
      (animal) => animal.id.toString() === params.id
    );

    if (index > -1) {
      setAnimal(allAnimals[index]);
    }
  }, [allAnimals]);

  const toggleHungerStatus = () => {
    let updateStatus = {
      ...animal,
      lastFed: DateTime.now().toString(),
      isFed: true,
    };

    let storedAnimals: string | null = localStorage.getItem("animals");
    if (storedAnimals) {
      let targetAnimals: IAnimal[] = JSON.parse(storedAnimals);

      for (let i = 0; i < targetAnimals.length; i++) {
        const changeStatus = targetAnimals[i];

        if (animal.id === changeStatus.id) {
          changeStatus.isFed = updateStatus.isFed;
          changeStatus.lastFed = updateStatus.lastFed;

          localStorage.setItem("animals", JSON.stringify(targetAnimals));

          window.location.reload();

          break;
        }
      }
    } else {
      console.log("error");
    }

    let extAnimal = { ...animal };
    extAnimal.isFed = !extAnimal.isFed;

    if (extAnimal.isFed === true) {
      console.log("full" + Date(), extAnimal.isFed);
    } else {
      console.log("feed");
    }
    setAnimal(extAnimal);
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center bg-black"> 
        <div className="flex flex-col w-4/12 items-center justify-evenly">
          <div className="text-white">{animal.name}</div>
          <img 
            className="object-cover w-48 h-48 hover: translate-y-10"
            src={animal.imageUrl}
            alt={animal.name}
            onError={(e) => {
              e.currentTarget.src =
              "https://scontent.farn1-2.fna.fbcdn.net/v/t39.30808-6/287105035_10160827682071015_4038911532598030992_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=oYWZK-o20DgAX-1MAWJ&tn=y1IS04Synxp2n8qy&_nc_ht=scontent.farn1-2.fna&oh=00_AT_1boibPiZRltJOqayqspCBDNuN97GLj8XvEh7uhAG6Cg&oe=62B1E906";
            }}
          />
          <span className="text-white">{animal.longDescription}</span>
            {animal.isFed ? (
              <>
                Matad:
                <br />
                {DateTime.fromISO(animal.lastFed).toLocaleString(
                 DateTime.DATE_HUGE
                )}
                <br />
                {"Klockan: "}
                {DateTime.fromISO(animal.lastFed).toLocaleString(
                 DateTime.TIME_24_SIMPLE
                )}
                <p>{animal.name} behöver inte matas.</p>
                <DisabledButton
                  disabled={true}
                  onClick={() => {
                   toggleHungerStatus();
                  }}
                >
                <p className="text-white">{animal.name} är mätt</p>
                </DisabledButton>
              </>
            ) : (
              <>
                <ActiveButton
                  onClick={() => {
                    toggleHungerStatus();
                  }}
                >
                <p className="text-black">Mata {animal.name}</p>
                </ActiveButton>
              </>
            )}
        </div>
      </div>
    </>
  );
};

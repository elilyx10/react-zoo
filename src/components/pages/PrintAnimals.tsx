import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";

interface IPrintAnimal {
  animal: IAnimal;
}

export const PrintAnimal = (props: IPrintAnimal) => {
  const [defaultHunger, setDefaultHunger] = useState(props.animal.lastFed);

  useEffect(() => {
    if (defaultHunger.length === 0) return;
    setDefaultHunger(defaultHunger);
    let time = Date.now() - new Date(props.animal.lastFed).getTime();

    if (time >= 14400000) {
      console.log(props.animal.name + "feed");
    } else {
      console.log(props.animal.name + " " + "full");
    }
  }, [defaultHunger]);

  return (
    <div className="flex sm:flex-row lg:flex-col items-center justify-evenly sm:w-12/12 md:w-3/12 bg-black rounded-lg">
      <div className="text-white">{props.animal.name}</div>
        <Link to={"/animal/" + props.animal.id}>
          <img 
            className="object-cover w-48 h-48 cursor-pointer mb-7"
            src={props.animal.imageUrl}
            alt={props.animal.name}
            onError={(e) => {
              e.currentTarget.src =
              "https://scontent.farn1-2.fna.fbcdn.net/v/t39.30808-6/287105035_10160827682071015_4038911532598030992_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=oYWZK-o20DgAX-1MAWJ&tn=y1IS04Synxp2n8qy&_nc_ht=scontent.farn1-2.fna&oh=00_AT_1boibPiZRltJOqayqspCBDNuN97GLj8XvEh7uhAG6Cg&oe=62B1E906"; // Lägg i public
            }}
          />
        </Link>
      <div className=" text-white mb-2 w-1/3">{props.animal.shortDescription}</div>
    </div>
  );
};

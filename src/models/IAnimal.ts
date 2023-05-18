export interface IAnimal {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  isFed: boolean;
  lastFed: string;
}

export const defaultAnimalValues: IAnimal = {
  id: 0,
  name: "",
  shortDescription: "",
  longDescription: "",
  imageUrl: "",
  isFed: false,
  lastFed: "",
};

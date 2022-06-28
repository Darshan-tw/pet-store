import { useState, useEffect, useContext } from "react";
import { Results } from "./Result";
import { ThemeContext } from "./ThemeContext";
import { useBreedList } from "./useBreedList";

export const SearchParams = () => {
  const ANIMALS = ["cat", "Rabbit", "Dog", "Reptail", "Bird"];

  const [theme] = useContext(ThemeContext);
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);

  const requestPets = async () => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  };
  useEffect(() => {
    requestPets();
  }, []);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="search-params">
          Location {location}
          <input
            type="text"
            value={location}
            id="search-params"
            placeholder="params"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Animals
          <select
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option></option>
            {ANIMALS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" style={{ backgroundColor: theme }}>
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

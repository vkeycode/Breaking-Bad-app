import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../Slices/characterSlices";

const Home = () => {
  const characters = useSelector((state) => state.characters.items);
  const disaptch = useDispatch();

  useEffect(() => {
    disaptch(fetchCharacters());
  }, [disaptch]);

  return (
    <div>
      <h1>characters</h1>
      {characters.map((character) => {
        return (
          <div key={character.char_id}>
            <img src={character.img} alt={character.name} />
            <h4>{character.name}</h4>
            <h5>{character.nickname}</h5>
            <div>
              <span>{character.status}</span>
              <span>{character.birthday}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;

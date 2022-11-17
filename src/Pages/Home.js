import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../Slices/characterSlice";
import Masonry from "react-masonry-css";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { Link } from "react-router-dom";

const Home = () => {

  const dispatch = useDispatch();

  const characters = useSelector((state) => state.characters.items);
  const status= useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const nextPage = useSelector((state) => state.characters.page);
  const isPageLeft = useSelector((state) => state.characters.isPageLeft);
  
  // ! READ ME !! "firstEffectRan" This logic was set up so that the use effect doesn't work twice because react strict mode renders twice

  const firstEffectRan = useRef(false);
  useEffect(() => {
    if (firstEffectRan.current && status === "idle") {
      dispatch(fetchCharacters());
    }
    return () => {
      firstEffectRan.current = true;
    };
  }, [dispatch, status]);

  // * IF FETCH RESPONSE ERROR SET ERROR COMPONENT

  if (status === "failed") {
    return <Error message={error} />;
  }
  return (
    <div>
      <h1 className="head">Breaking Bad Characters</h1>
      <Masonry
        breakpointCols={6}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {characters.map((character) => {
          return (
            <div key={character.char_id}>
              <Link to={`/character/${character.char_id}`}>
                <img
                  src={character.img}
                  alt={character.name}
                  className="image"
                />
                <h4 className="name">{character.name}</h4>
                <h5 className="nickName">{character.nickname}</h5>
              </Link>
            </div>
          );
        })}
      </Masonry>
      <div className="btn-div">
        {status === "loading" && <Loading />}
        {isPageLeft && status !== "loading" && (
          <button
            className="btn"
            onClick={() => dispatch(fetchCharacters(nextPage))}
          >
            Load More({nextPage})
          </button>
        )}
        {!isPageLeft && <h2>No More Characters</h2>}
      </div>
    </div>
  );
};

export default Home;

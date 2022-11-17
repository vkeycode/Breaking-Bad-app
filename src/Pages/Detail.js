import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
const Detail = () => {
  const [char, setChar] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { charId } = useParams(); // get charId

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}characters/${charId}`)
      .then((res) => res.data)
      .then((data) => setChar(data[0]))
      .finally(setLoading(false));
  }, [charId]);

  if(isLoading){
    return  <Loading />
  }
  return (
    <div className="detail-container">
      {char && (
        <div className="detail-content">
          <img src={char.img} alt={char.name}></img>
          <div className="char-info">
            <h1>{char.name}</h1>
            <h2>{char.nickname}</h2>
            <h3>Birthday: {char.birthday}</h3>
            <h3>Status: {char.status}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;

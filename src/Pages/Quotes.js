import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading";
import { fetchAllQuotes } from "../Slices/quoteSlice";

const Quotes = () => {
  const quotes = useSelector((state) => state.quotes.items);
  const status = useSelector((state) => state.quotes.status);
  const dispatch = useDispatch();

  // ! READ ME !! "firstEffectRan" This logic was set up so that the use effect doesn't work twice because react strict mode renders twice
  const firstEffectRan = useRef(false);
  useEffect(() => {
    if (firstEffectRan.current && status === "idle") {
      dispatch(fetchAllQuotes());
    }
    return () => {
      firstEffectRan.current = true;
    };
  }, [dispatch, status]);
  console.log(quotes);
  return (
    <div>
      <h1 className="head">Breaking Bad Quotes</h1>
      {status === "loading" && <Loading />}
      {status === "succeeded" &&
        quotes.map((item) => (
          <div className="quotes" key={item.quote_id}>
            <q>{item.quote}</q>
            <author>
              <strong>{item.author}</strong>
            </author>
          </div>
        ))}
    </div>
  );
};

export default Quotes;

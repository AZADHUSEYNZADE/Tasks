import React, { useState, useEffect } from "react";

const Test5 = () => {
  //butun filmler
  const [allMovies, setAllMovies] = useState();
  //tableye otreceksen
  const [filtered, setFiltered] = useState();
  //inputun value
  const [value, setValue] = useState("");
  //daha sonra useeffect
  useEffect(() => {
    if (!value) {
      const filteredMov = allMovies.filter((mov) => {
        return mov.name.startsWith(value);
      });
      setFiltered(filteredMov);
    } else {
      setFiltered(allMovies);
    }
  }, [value]);
  return <div></div>;
};

export default Test5;

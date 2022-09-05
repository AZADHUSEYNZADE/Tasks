import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Tables = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const options = {
    method: "GET",
    url: "https://online-movie-database.p.rapidapi.com/auto-complete",
    params: { q: "game of thr" },
    headers: {
      "X-RapidAPI-Key": "33ea765808msh72309b2de21bf8ep17ae87jsn6f208f07024a",
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setData(response.data.d);
        console.log(response.data.d);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const inputEl = useRef("");

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newFilms = data.filter((mov) => {
        return Object.values(mov)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newFilms);
    } else {
      setSearchResults(data);
    }
  };
  const getSearcTerm = () => {
    searchHandler(inputEl.current.value);
  };

  return (
    <div>
      <InputGroup className="mb-3 w-50">
        <Form.Control
          type="text"
          className="w-100"
          value={searchTerm}
          onChange={getSearcTerm}
          ref={inputEl}
        />
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Rank</th>
            <th>Height</th>
          </tr>
        </thead>
        {searchTerm.length > 1
          ? searchResults
          : data.map((movie) => {
              return (
                <tbody>
                  <td>{movie.l}</td>
                  <td>{movie?.s}</td>
                  <td>{movie?.rank}</td>
                  <td>{movie?.i?.height}</td>
                </tbody>
              );
            })}
      </Table>
    </div>
  );
};

export default Tables;

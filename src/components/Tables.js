import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Tables = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const options = {
    method: "GET",
    url: "https://online-movie-database.p.rapidapi.com/auto-complete",
    params: { q: "game of thr" },
    headers: {
      "X-RapidAPI-Key": "babaa884a9msh35269a46106cc45p150d09jsneafa675f47c3",
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

  return (
    <div className="d-flex flex-lg-column  margin-auto justify-content-center ">
      <div className="d-flex justify-content-center">
        <InputGroup className="mt-3 w-75 d-flex justify-content-center">
          <Form.Control
            type="text"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </InputGroup>
      </div>
      <Table striped bordered hover className="mt-5">
        <thead className="bg-primary text-light">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Rank</th>
            <th>Height</th>
          </tr>
        </thead>
        {data
          .filter((movie) => {
            if (searchTerm === "") {
              return movie;
            } else if (
              movie.l.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return movie;
            }
          })
          .map((movie) => {
            return (
              <tbody className="border-5">
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

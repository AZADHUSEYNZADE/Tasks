import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const schema = yup.object().shape({
  integer: yup.number().min(1).max(99).required(),
});

const Test2 = () => {
  const [arr, setArr] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    setArr([...arr, data.integer]);
    reset();
  };

  const handleSort = () => {
    setArr(sort(arr));
  };

  const sort = (array) => {
    const copyOfOriginalArray = [...array];
    let done = false;
    while (!done) {
      done = true;
      for (let i = 1; i < copyOfOriginalArray.length; i++) {
        if (copyOfOriginalArray[i - 1] > copyOfOriginalArray[i]) {
          done = false;
          let tmp = copyOfOriginalArray[i - 1];
          copyOfOriginalArray[i - 1] = copyOfOriginalArray[i];
          copyOfOriginalArray[i] = tmp;
        }
      }
    }

    return copyOfOriginalArray;
  };

  const handleClear = () => {
    setArr([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <InputGroup className="mb-3 w-50">
          <Form.Control
            type="number"
            {...register("integer")}
            className="w-100"
            min={0}
            max={99}
          />

          <Button
            variant="outline-secondary"
            id="button-addon2"
            type="submit"
            className="bg-primary text-light"
          >
            Button
          </Button>
        </InputGroup>
      </form>
      <p className="errorMessage"> {errors.integer?.message} </p>

      <div className="d-flex justify-content-center">
        <code className="fs-3">[{arr.toString()}]</code>
      </div>
      <div className="d-flex justify-content-center">
        <Button onClick={handleClear}>Clear All</Button>
        <Button className="sortBtn" onClick={handleSort}>
          Sort
        </Button>
      </div>
    </>
  );
};

export default Test2;

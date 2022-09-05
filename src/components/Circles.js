import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "../styles/circle.css";
const schema = yup.object().shape({
  integer: yup.number().min(1).max(180).required(),
});

const Circles = () => {
  const [length, setLength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      integer: 5,
    },
  });

  const submitForm = (data) => {
    setLength(data.integer);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <InputGroup className="mb-3 w-50">
          <Form.Control
            type="number"
            {...register("integer")}
            className="w-100"
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
      <div className="mainBox">
        {!!length &&
          Array.from({ length })?.map((_, i) => {
            const angle = 360 / length;
            console.log(angle, "angle");
            const lastRotate = angle * i + angle;
            console.log(lastRotate, "lastRotate ");
            const circleSize = 10;
            return (
              <div
                key={i}
                className="border-light bg-red main-col gap-5 circle"
                style={{
                  transform: `rotate(${lastRotate * 1}deg) translate(${
                    400 / 2
                  }px) rotate(${lastRotate * -1}deg)`,
                  backgroundColor: "yellow",
                  width: `${circleSize}px`,
                  height: `${circleSize}px`,
                  display: "flex",
                  justifyContent: "center",
                  fontSize: `${circleSize}px`,
                }}
                xs={1}
              >
                {i + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Circles;

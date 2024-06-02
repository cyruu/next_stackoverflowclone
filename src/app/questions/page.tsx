"use client";
import React from "react";
import { useSelector } from "react-redux";

const Questions = () => {
  const loggedInUser = useSelector((state: any) => state.loggedInUser);

  return <div>Questions {loggedInUser?.email}</div>;
};

export default Questions;

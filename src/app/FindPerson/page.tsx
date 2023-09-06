"use client";
import React, { useEffect, useState } from "react";
const FindPerson = () => {
  const searchedName = localStorage.getItem("searchedName");

  return (
    <div>
      <p>You searched for: {searchedName}</p>
    </div>
  );
};

export default FindPerson;

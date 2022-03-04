import React, { useEffect, useState } from "react";
import "./App.css";
import MergeSort from "./components/MergeSort";
import QuickSort from "./components/QuickSort";

function App() {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    generateRandomArray();
  },[]);

  const generateRandomArray = () => {
    const tempArr = [];
    for (let i = 0; i < 100; i++) {
      tempArr.push({
        num: Math.floor(Math.random() * 1000),
        idx: i,
      });
    }
    setArr([...tempArr])
  };

  return (
    <>
      <button className="sort-btn" onClick={() => generateRandomArray()}>Generate Random Array</button>
      <MergeSort arrayProp={arr}/>
      <QuickSort arrayProp={arr}/>
    </>
  )
}

export default App;

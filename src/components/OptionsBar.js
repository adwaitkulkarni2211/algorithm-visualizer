import React, { useEffect, useState } from "react";
import MergeSort from "./MergeSort";
import QuickSort from "./QuickSort";
import BubbleSort from "./BubbleSort.js";

function OptionsBar() {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(100);

  useEffect(() => {
    generateRandomArray();
  }, []);

  useEffect(() => {
    generateRandomArray();
  }, [arrSize])

  const handleSizeChange = (value) => {
    if(value > 120) {
        setArrSize(120);
    } else if(value < 0) {
        setArrSize(0);
    } else {
        setArrSize(value)
    }
  }

  const generateRandomArray = () => {
    const tempArr = [];
    for (let i = 0; i < arrSize; i++) {
      tempArr.push({
        num: Math.floor(Math.random() * 1000),
        idx: i,
      });
    }
    setArr([...tempArr]);
  };

  return (
    <div>
      <button
        onClick={() => {
            generateRandomArray();
        }}>
        Random Array
      </button>
      <input 
        type="Number" 
        placeholder="array size" 
        value={arrSize}
        max={120}
        min={1}
        onChange={(e) => handleSizeChange(e.target.value)} />
      <button>Sort</button>
      <MergeSort arrayProp={arr}/>
      <QuickSort arrayProp={arr}/>
      <BubbleSort arrayProp={arr}/>
    </div>
  );
}

export default OptionsBar;

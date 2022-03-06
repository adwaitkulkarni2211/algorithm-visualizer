import React, { useEffect, useState } from "react";
import MergeSort from "./MergeSort";
import QuickSort from "./QuickSort";
import BubbleSort from "./BubbleSort.js";
import SelectionSort from "./SelectionSort";
import InsertionSort from "./InsertionSort";
import "./OptionsBar.css"

function OptionsBar() {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(100);
  const [currSort, setCurrSort] = useState(0);

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

  const sortOptions = ["Merge Sort", "Quick Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"]

  return (
    <div id="container">
      <div id="sort-options">
        {sortOptions.map((so, idx) => (
          <div 
            className="sort-option"
            onClick={() => {
              setCurrSort(idx);
            }}
            style={{
              backgroundColor: idx == currSort ? '#111827' : '',
              color: idx == currSort ? 'white' : '#d1d5db'
            }}>
              {so}
          </div>
        ))}
      </div>

      <div id="chart-options">
        <button
          onClick={() => {
              generateRandomArray();
          }}
          className="btn"
          id="random-btn">
          Random Array
        </button>

        <input 
          type="Number" 
          placeholder="array size" 
          value={arrSize}
          max={120}
          min={1}
          id="size-input"
          onChange={(e) => handleSizeChange(e.target.value)} />

        <button className="btn" id="sort-btn">Sort</button>
      </div>
      
      {/* <MergeSort arrayProp={arr}/>
      <QuickSort arrayProp={arr}/>
      <BubbleSort arrayProp={arr}/>
      <SelectionSort arrayProp={arr}/>
      <InsertionSort arrayProp={arr}/> */}
    </div>
  );
}

export default OptionsBar;

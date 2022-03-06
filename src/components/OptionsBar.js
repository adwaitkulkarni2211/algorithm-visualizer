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
  const [doSort, setDoSort] = useState(false)

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
    <div>
      <div id="nav-container">
        <div id="sort-options">
          {sortOptions.map((so, idx) => (
            <div 
              className="sort-option"
              onClick={() => {
                if(!doSort)
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
            id="random-btn"
            disabled={doSort}>
            Random Array
          </button>

          <input 
            type="Number" 
            placeholder="Array Size" 
            value={arrSize}
            max={120}
            min={1}
            id="size-input"
            disabled={doSort}
            onChange={(e) => handleSizeChange(e.target.value)} />

          <button 
            className="btn" 
            id="sort-btn"
            disabled={doSort}
            onClick={() => setDoSort(true)}>Sort</button>
        </div>
      </div>
      <div id="visualizer">
        {
          currSort == 0 ? <MergeSort arrayProp={arr} doSort={doSort} setDoSort={setDoSort}/>
          : currSort == 1 ? <QuickSort arrayProp={arr} doSort={doSort} setDoSort={setDoSort}/>
          : currSort == 2 ? <BubbleSort arrayProp={arr} doSort={doSort} setDoSort={setDoSort}/>
          : currSort == 3 ? <SelectionSort arrayProp={arr} doSort={doSort} setDoSort={setDoSort}/>
          : currSort == 4 ? <InsertionSort arrayProp={arr} doSort={doSort} setDoSort={setDoSort}/> 
          : <></>
        }
      </div>
    </div>
  );
}

export default OptionsBar;

import React, { useEffect, useState } from "react";
import MergeSort from "./MergeSort";
import QuickSort from "./QuickSort";
import BubbleSort from "./BubbleSort";
import SelectionSort from "./SelectionSort";
import InsertionSort from "./InsertionSort";
import "./OptionsBar.css"

function OptionsBar() {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(100);
  const [currSort, setCurrSort] = useState(0);
  const [doSort, setDoSort] = useState(false)
  const [delay, setDelay] = useState(5);

  useEffect(() => {
    generateRandomArray();
  }, []);

  useEffect(() => {
    generateRandomArray();
  }, [arrSize])

  const handleSizeChange = (value) => {
    if(value > 200) {
        setArrSize(200);
    } else if(value < 0) {
        setArrSize(0);
    } else {
        setArrSize(value)
    }
  }

  const handleDelayChange = (value) => {
    if(value > 1000) {
        setDelay(1000);
    } else if(value < 0) {
        setDelay(0);
    } else {
        setDelay(value)
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

  function timeout() {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  const sortOptions = ["Merge Sort", "Quick Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"]

  return (
    <div>
      <div id="nav-container">
        <div id="sort-options">
          {sortOptions.map((so, idx) => (
            <div 
              key={idx}
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
            Random
          </button>
          <div id='arrSize-container'>
            <label className="slider-label" htmlFor="array-size">
              Array size
            </label>
            <input
              id="array-size"
              type="range"
              value={arrSize}
              onChange={(event) => handleSizeChange(Number(event.target.value))}
              className="slider"
              disabled={doSort}
              max="200"
              min="0"
              step="10"
            />
              <p className="slider-value">{arrSize}</p>
          </div>
          
          <div id="delay-container">
            <label className="slider-label" htmlFor="animation-delay">
              Animation delay
            </label>
            <input
              id="animation-delay"
              type="range"
              value={delay}
              onChange={(event) => handleDelayChange(Number(event.target.value))}
              className="slider"
              disabled={doSort}
              max="500"
              min="0"
              step="5"
            />
              <p className="slider-value">{delay} ms</p>
          </div>

          <button 
            className="btn" 
            id="sort-btn"
            disabled={doSort}
            onClick={() => setDoSort(true)}>
              Sort
          </button>
        </div>
      </div>
      <div id="visualizer">
        {
          currSort == 0 ? <MergeSort arrayProp={arr} doSort={doSort} setDoSort={setDoSort} timeout={timeout}/>
          : currSort == 1 ? <QuickSort arrayProp={arr} doSort={doSort} setDoSort={setDoSort} timeout={timeout}/>
          : currSort == 2 ? <BubbleSort arrayProp={arr} doSort={doSort} setDoSort={setDoSort} timeout={timeout}/>
          : currSort == 3 ? <SelectionSort arrayProp={arr} doSort={doSort} setDoSort={setDoSort} timeout={timeout}/>
          : currSort == 4 ? <InsertionSort arrayProp={arr} doSort={doSort} setDoSort={setDoSort} timeout={timeout}/> 
          : <></>
        }
      </div>
    </div>
  );
}

export default OptionsBar;

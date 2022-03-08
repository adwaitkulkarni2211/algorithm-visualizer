import React, { useEffect, useState } from "react";
import MergeSort from "./MergeSort";
import QuickSort from "./QuickSort";
import BubbleSort from "./BubbleSort.js";
import SelectionSort from "./SelectionSort";
import InsertionSort from "./InsertionSort";
import "./OptionsBar.css"
import Slider from 'react-input-slider'

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

          {/* <input 
            type="Number" 
            placeholder="Array Size" 
            value={arrSize}
            max={120}
            min={1}
            className="num-input"
            disabled={doSort}
            onChange={(e) => handleSizeChange(e.target.value)} /> */}
            <div id='arrSize-container'>
              <Slider 
                axis="x" 
                x={arrSize}
                onChange={(e) => handleSizeChange(e.x)}
                className="slider"
                disabled={doSort}
                xmax={200}
                xmin={0}
                xstep={10}
                styles={{
                  track: {
                    width: '10vw'
                  },
                  thumb: {
                    width: '15px',
                    height: '15px'
                  }
                }} />
                <p style={{paddingLeft: '1rem'}}>{arrSize}</p>
            </div>
          
          <div id="delay-container">
            {/* <input 
              type="Number" 
              placeholder="Delay" 
              value={delay}
              max={200}
              min={0}
              className="num-input"
              disabled={doSort}
              onChange={(e) => handleDelayChange(e.target.value)} /> */}
              <Slider 
                axis="x" 
                x={delay}
                onChange={(e) => handleDelayChange(e.x)}
                className="slider"
                disabled={doSort}
                xmax={500}
                xmin={0}
                xstep={5}
                styles={{
                  track: {
                    width: '10vw'
                  },
                  thumb: {
                    width: '15px',
                    height: '15px'
                  }
                }} />
              <p style={{paddingLeft: '1rem'}}>{delay} ms</p>
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

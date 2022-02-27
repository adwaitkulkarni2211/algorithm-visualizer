import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [arr, setArr] = useState([]);
  const [masterArr, setMasterArr] = useState([]);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const tempArr = [];
    for (let i = 0; i < 100; i++) {
      tempArr.push({
        num: Math.floor(Math.random() * 1000),
        idx: i,
      });
    }
    setArr([...tempArr]);
    setMasterArr([...tempArr]);
  };

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const mergeTwoSortedLists = (arr1, arr2) => {
    setMasterArr([
      ...arr1,
      ...arr2,
      ...arr.slice(Math.max.apply(Math, arr2.map((o) => o.idx)) + 1),
    ]);
    
    let i = 0, j = 0;

    let mergedArr = [];    

    while (i < arr1.length && j < arr2.length) {
      if (arr2[j].num < arr1[i].num) {
        mergedArr.push(arr2[j]);
        j++;
      } else {
        mergedArr.push(arr1[i]);
        i++;
      }
      setMasterArr([
        ...mergedArr,
        ...arr1.slice(i),
        ...arr2.slice(j),
        ...arr.slice(Math.max.apply(Math, arr2.map((o) => o.idx)) + 1),
      ]);  
    }

    while (i < arr1.length) {
      mergedArr.push(arr1[i]);
      i++;  
      setMasterArr([
        ...mergedArr,
        ...arr1.slice(i),
        ...arr.slice(Math.max.apply(Math, arr2.map((o) => o.idx)) + 1),
      ]);    
    }

    while (j < arr2.length) {
      mergedArr.push(arr2[j]);
      j++;  
      setMasterArr([
        ...mergedArr,
        ...arr2.slice(j),
        ...arr.slice(Math.max.apply(Math, arr2.map((o) => o.idx)) + 1),
      ]);    
    }

    return mergedArr;
  };

  const mergeSort = (arr, lo, hi) => {
    if (lo == hi) {
      return [arr[lo]];
    }

    let mid = Math.floor((lo + hi) / 2);

    let left = mergeSort(arr, lo, mid);
    let right = mergeSort(arr, mid + 1, hi);

    return mergeTwoSortedLists(left, right);
  };

  const compare = () => {
    let methodArr = mergeSort(arr, 0, arr.length - 1);
    for(let i=0; i<methodArr.length; i++) {
      if(masterArr[i] !== methodArr[i]) {
        console.log("false");
        return;
      }
    }
    console.log("true");
  }

  return (
    <div className="container">
      <button
        className="sort-btn"
        onClick={() => mergeSort(arr, 0, arr.length - 1)}
      >
        Merge Sort
      </button>
      <button className="sort-btn" onClick={() => compare()}>Compare</button>
      <button className="sort-btn" onClick={() => generateRandomArray()}>Generate Random Array</button>
      <div className="barchart">
        {masterArr.map((num) => (
          <div key={num.idx}>
            <div
              className="bar"
              style={{
                height: `${(num.num * 50) / 1000}px`,
                width: `2px`,
                margin: `2px`,
                backgroundColor: "blue",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

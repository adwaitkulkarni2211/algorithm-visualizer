import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [arr, setArr] = useState([]);
  const [masterArr, setMasterArr] = useState([]);

  useEffect(() => {
    generateRandomArray();
  }, []);

  useEffect(() => {
    console.log("masterArr after re-render:", masterArr);
  })

  const generateRandomArray = () => {
    const tempArr = [];
    for (let i = 0; i < 100; i++) {
      tempArr.push({
        num: Math.floor(Math.random() * 1000),
        idx: i,
      });
    }
    // for(let i=500, j=0; i>=100; i-=100, j++) {
    //   tempArr.push({num: i, idx: j});
    // }
    setArr([...tempArr]);
    setMasterArr([...tempArr]);
    //console.log("from generate random arr: ", arr);
  };

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const mergeTwoSortedLists = async (arr1, arr2, tempMasterArr) => {
    let mergedArr = [];
    await timeout(10)
    console.log("arr1: ", arr1, " arr2: ", arr2);    
    tempMasterArr = [...tempMasterArr.slice(0, Math.min.apply(Math, arr1.map(o => o.idx))), ...arr1, ...arr2, ...arr.slice(Math.max.apply(Math, arr2.map(o => o.idx)) + 1)];
    setMasterArr([...tempMasterArr]);

    let i = 0, j = 0;
    while(i < arr1.length && j < arr2.length) {
      if(arr2[j].num < arr1[i].num) {
          mergedArr.push(arr2[j]);
          j++;
      } else {
          mergedArr.push(arr1[i]);
          i++;
      }

      await timeout(10)      
      tempMasterArr = [...tempMasterArr.slice(0, Math.min.apply(Math, arr1.map(o => o.idx))), ...mergedArr, ...arr1.slice(i), ...arr2.slice(j), ...arr.slice(Math.max.apply(Math, arr2.map(o => o.idx)) + 1)];
      setMasterArr([...tempMasterArr]);
    }

    while(i < arr1.length) {
      mergedArr.push(arr1[i]);
      i++;
      await timeout(10)
      tempMasterArr = [...tempMasterArr.slice(0, Math.min.apply(Math, arr1.map(o => o.idx))), ...mergedArr, ...arr1.slice(i), ...arr.slice(Math.max.apply(Math, arr2.map(o => o.idx)) + 1)]
      setMasterArr([...tempMasterArr]);
    }
    while(j < arr2.length) {
      mergedArr.push(arr2[j]);
      j++;
      await timeout(10)      
      tempMasterArr = [...tempMasterArr.slice(0, Math.min.apply(Math, arr1.map(o => o.idx))), ...mergedArr, ...arr2.slice(j), ...arr.slice(Math.max.apply(Math, arr2.map(o => o.idx)) + 1)]
      setMasterArr([...tempMasterArr]);
    }

    return {mergedArr: mergedArr, tempMasterArr: tempMasterArr};
}

  const mergeSort = async (arr, lo, hi, tempMasterArr) => {
    if(lo == hi) {
      return {mergedArr: [arr[lo]], tempMasterArr: tempMasterArr};
    }

    let mid = Math.floor((lo + hi) / 2);

    let leftCall = await mergeSort(arr, lo, mid, tempMasterArr);
    let leftMergedArr = leftCall.mergedArr;
    let leftTempMasterArr = leftCall.tempMasterArr

    let rightCall = await mergeSort(arr, mid + 1, hi, leftTempMasterArr);
    let rightMergedArr = rightCall.mergedArr;
    let rightTempMasterArr = rightCall.tempMasterArr;

    return await mergeTwoSortedLists(leftMergedArr, rightMergedArr, rightTempMasterArr);
  }

  return (
    <div className="container">
      <button
        className="sort-btn"
        onClick={async () => {
          console.log("before: ", arr);
          let tempMasterArr = [...masterArr];
          const ans = await mergeSort(arr, 0, arr.length - 1, tempMasterArr);
          setArr([...ans])
          console.log("ans: ", ans);
          console.log("arr: ", arr);
        }}
      >
        Merge Sort
      </button>
      <button className="sort-btn" onClick={() => generateRandomArray()}>Generate Random Array</button>
      <div className="barchart">
        {masterArr.map((num) => (
          <div key={num.idx}>
            <div
              className="bar"
              style={{
                height: `${((num.num * 50) / 1000) * 5}px`,
                width: `2px`,
                margin: `2px`,
                backgroundColor: "blue",
              }}
            >
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

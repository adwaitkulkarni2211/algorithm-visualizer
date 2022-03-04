import React, {useState, useEffect} from 'react'
import "./MergeSort.css"

function MergeSort() {
    const [arr, setArr] = useState([]);
    const [masterArr, setMasterArr] = useState([]);
    const [delay, setDelay] = useState(5);
    const [activeBars, setActiveBars] = useState([]);
  
    useEffect(() => {
      generateRandomArray();
    }, []);
  
    const generateRandomArray = () => {
      const tempArr = [];
      for (let i = 0; i < 120; i++) {
        tempArr.push({
          num: Math.floor(Math.random() * 1000),
          idx: i,
        });
      }
      setArr([...tempArr]);
      setMasterArr([...tempArr]);
    };
  
    function timeout() {
      return new Promise(resolve => setTimeout(resolve, delay));
    }
  
    const mergeTwoSortedLists = async (arr1, arr2, tempMasterArr) => {
      let mergedArr = [];
  
      await timeout()  
  
      tempMasterArr = [...tempMasterArr.slice(0, Math.min.apply(Math, arr1.map(o => o.idx))), ...arr1, ...arr2, ...arr.slice(Math.max.apply(Math, arr2.map(o => o.idx)) + 1)];
      setMasterArr([...tempMasterArr]);
  
      let i = 0, j = 0;
      while(i < arr1.length && j < arr2.length) {
        await timeout()
        setActiveBars([arr1[i], arr2[j]]);
  
        if(arr2[j].num < arr1[i].num) {
            mergedArr.push(arr2[j]);
            j++;
        } else {
            mergedArr.push(arr1[i]);
            i++;
        }
  
        await timeout()
  
        tempMasterArr = [...tempMasterArr.slice(0, Math.min.apply(Math, arr1.map(o => o.idx))), ...mergedArr, ...arr1.slice(i), ...arr2.slice(j), ...arr.slice(Math.max.apply(Math, arr2.map(o => o.idx)) + 1)];
        setMasterArr([...tempMasterArr]);
        setActiveBars([]);
      }
  
      while(i < arr1.length) {
        await timeout();
        setActiveBars([arr1[i]]);
  
        mergedArr.push(arr1[i]);
        i++;
  
        await timeout()
  
        tempMasterArr = [...tempMasterArr.slice(0, Math.min.apply(Math, arr1.map(o => o.idx))), ...mergedArr, ...arr1.slice(i), ...arr.slice(Math.max.apply(Math, arr2.map(o => o.idx)) + 1)]
        setMasterArr([...tempMasterArr]);
        setActiveBars([])
      }
      while(j < arr2.length) {
        await timeout();
        setActiveBars([arr2[j]]);
  
        mergedArr.push(arr2[j]);
        j++;
  
        await timeout()  
  
        tempMasterArr = [...tempMasterArr.slice(0, Math.min.apply(Math, arr1.map(o => o.idx))), ...mergedArr, ...arr2.slice(j), ...arr.slice(Math.max.apply(Math, arr2.map(o => o.idx)) + 1)]
        setMasterArr([...tempMasterArr]);
        setActiveBars([])
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
            let tempMasterArr = [...masterArr];
            const ans = await mergeSort(arr, 0, arr.length - 1, tempMasterArr);
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
                  margin: `3px`,
                  backgroundColor: activeBars.find(bar => bar.idx == num.idx) ? "black" : "cyan",
                }}
              >
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default MergeSort
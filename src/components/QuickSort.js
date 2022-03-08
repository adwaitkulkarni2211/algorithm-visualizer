import React, { useEffect, useState } from "react";
import "./style.css"

function QuickSort({arrayProp, doSort, setDoSort, timeout}) {
  const [arr, setArr] = useState([]);
  const [activeBars, setActiveBars] = useState([]);
  const [pivotBar, setPivotBar] = useState({})

  useEffect(() => {
    setArr(arrayProp)
  }, [arrayProp])

  useEffect(async () => {
    if(doSort) {
      let tempArr = [...arr];
      await quickSort(tempArr, 0, tempArr.length - 1)
      setDoSort(false)
    }
  }, [doSort])

  const partition = async (arr, pivot, lo, hi) => {
    setPivotBar(arr[hi]);

    let i = lo, j = lo;
    while (i <= hi) {
      await timeout();
      setActiveBars([arr[i], arr[j]])

      if (arr[i].num > pivot) {
        i++;
      } else {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        i++;
        j++;
      }

      await timeout()
      setArr([...arr]);
    }

    setActiveBars([])
    setPivotBar({});
    return j - 1;
  };

  const quickSort = async (arr, lo, hi) => {
    if (lo >= hi) {
      return;
    }

    let partitionIdx = await partition(arr, arr[hi].num, lo, hi);
    await quickSort(arr, lo, partitionIdx - 1);
    await quickSort(arr, partitionIdx + 1, hi);
  };

  return (
    <div className="container">
      <div id="barchart-container">
        {arr.map((num) => (
          <div id='barchart' key={num.idx}>
            <div
              className="bar"
              style={{
                height: `${((num.num * 50) / 1000) * 5}px`,
                width: arr.length < 21 ? `50px` 
                      : arr.length < 70 ? `20px` 
                      : arr.length < 116 ? `10px` : `2px`,
                margin: `3px`,
                padding: arr.length < 21 ? `1rem` : `0rem`,
                backgroundColor: activeBars.find(bar => bar.idx == num.idx) ? "white" : pivotBar.idx == num.idx ? "red" : "#6366f1"
              }}
            >
              <div
                style={{
                  display: arr.length < 21 ? 'flex' : 'none', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  color: '#d1d5db'
                }}>
                {num.num}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id='code-tc'>
          <div id='code'>
            <h3>Pseudo Code:</h3>
            <pre>
{`quickSort(arr, left, right):
  if(lo >= hi)
    return
  
  int pivot = partition(arr, arr[hi], lo, hi)
  
  quickSort(arr, lo, pivot - 1)
  quickSort(arr, pivot + 1, hi)
end
  
partition(arr, pivotNum, lo, hi):
  int i = lo, j = lo
  
  while(i < hi)
    if(arr[i] > pivotNum)
      i++
    else
      swap(arr[i], arr[j])
      i++
      j++
end`}
            </pre>
          </div>
          <div id='tc'>
            <h3>Time Complexity:</h3>
            <pre>
{`Best Case: O(NLogN)

Average Case: O(NLogN)

Worst Case: O(N^2)`}
            </pre>
          </div>
      </div>
    </div>
  );
}

export default QuickSort;

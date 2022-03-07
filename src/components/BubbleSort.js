import React, { useEffect, useState } from "react";
import "./style.css"

function BubbleSort({ arrayProp, doSort, setDoSort, timeout }) {
  const [arr, setArr] = useState([]);
  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);

  useEffect(() => {
    setArr(arrayProp);
  }, [arrayProp]);

  useEffect(async () => {
    if(doSort) {
      let tempArr = [...arr];
      await bubbleSort(tempArr);
      setDoSort(false);
    }
  }, [doSort])

  const bubbleSort = async (arr) => {
    for(let i=0; i<arr.length - 1; i++) {
        for(let j=0; j<arr.length - i - 1; j++) {
            await timeout();
            setActiveBars([arr[j], arr[j+1]]);

            if(arr[j + 1].num < arr[j].num) {
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
        await timeout();
        setSortedBars([...arr.slice(arr.length - i - 1)])
        setActiveBars([]);
        setArr([...arr]);
    }
    await timeout();
    setSortedBars([]);
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
                backgroundColor: activeBars.find((bar) => bar.idx == num.idx)
                  ? "white"
                  : sortedBars.find(bar => bar.idx == num.idx)
                  ? "lightgreen"
                  : "#6366f1"
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
{`bubbleSort(arr):
  for(int i = 0; i < arr.length - 1; i++)
    for(int j = 0; j < arr.length - 1 - i; j++)
      if(arr[j] > arr[j + 1])
        swap(arr[i], arr[j])
end`}
            </pre>
          </div>
          <div id='tc'>
            <h3>Time Complexity:</h3>
            <pre>
{`Best Case: O(N^2)

Average Case: O(N^2)

Worst Case: O(N^2)`}
            </pre>
          </div>
      </div>
    </div>
  );
}

export default BubbleSort;

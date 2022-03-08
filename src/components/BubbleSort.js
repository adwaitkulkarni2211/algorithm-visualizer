import React, { useEffect, useState } from "react";
import Barchart from "./Barchart";
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
      <Barchart arr={arr} activeBars={activeBars} pivotBar={[]} sortedBars={sortedBars} />
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

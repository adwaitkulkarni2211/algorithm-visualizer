import React, { useEffect, useState } from "react";
import "./style.css"
import Barchart from "./Barchart";

function SelectionSort({arrayProp, doSort, setDoSort, timeout}) {
  const [arr, setArr] = useState([]);
  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);

  useEffect(() => {
    setArr(arrayProp);
  }, [arrayProp]);

  useEffect(async () => {
    if(doSort) {
      let tempArr = [...arr];
      await selectionSort(tempArr);
      setDoSort(false);
    }
  }, [doSort])

  const selectionSort = async (arr) => {
    for(let i=0; i<arr.length - 1; i++) {
        let min = i;
        for(let j=i + 1; j<arr.length; j++) {
            await timeout()
            setActiveBars([arr[i], arr[j]]);

            if(arr[j].num < arr[min].num) {
                min = j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;

        await timeout();
        setActiveBars([]);
        setSortedBars([...arr.slice(0, i + 1)]);
        setArr([...arr])
    }
    await timeout();
    setSortedBars([]);
  }

  return (
    <div className="container">
      <Barchart arr={arr} activeBars={activeBars} pivotBar={[]} sortedBars={sortedBars} />
      <div id='code-tc'>
          <div id='code'>
            <h3>Pseudo Code:</h3>
            <pre>
{`selectionSort(arr):
  for(int i = 0; i < arr.length - 1; i++)
    int min = i
    for(int j = i + 1; j < arr.length; j++)
      if(arr[j] < arr[min])
        min = j
    swap(arr[i], arr[min])
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

export default SelectionSort;

import React, { useEffect, useState } from "react";
import "./style.css"

function InsertionSort({ arrayProp, doSort, setDoSort, timeout }) {
  const [arr, setArr] = useState([]);
  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);

  useEffect(() => {
    setArr(arrayProp);
  }, [arrayProp]);

  useEffect(async () => {
    if(doSort) {
      let tempArr = [...arr];
      await insertionSort(tempArr);
      setDoSort(false);
    }
  }, [doSort])

  const insertionSort = async (arr) => {
    await timeout();
    setSortedBars([arr[0]]);

    for (let i = 1; i < arr.length; i++) {
      for (let j = i - 1; j >= 0; j--) {
        await timeout();
        setActiveBars([arr[j], arr[j + 1]]);

        if (arr[j].num > arr[j + 1].num) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        } else {
            break;
        }
      }

      await timeout();
      setSortedBars([...arr.slice(0, i + 1)])
      setActiveBars([]);
      setArr([...arr])
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
                width: `2px`,
                margin: `3px`,
                backgroundColor: activeBars.find((bar) => bar.idx == num.idx)
                  ? "black"
                  : sortedBars.find((bar) => bar.idx == num.idx)
                  ? "lightgreen"
                  : "cyan",
              }}
            ></div>
          </div>
        ))}
      </div>
      <div id='code-tc'>
          <div id='code'>
            <h3>Pseudo Code:</h3>
            <pre>
{`insertionSort(arr):
  for(int i = 1; i < arr.length - 1; i++)
    for(int j = i - 1; j >= 0; j--)
      if(arr[j] > arr[j + 1])
        swap(arr[i][j])
      else
        break
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

export default InsertionSort;

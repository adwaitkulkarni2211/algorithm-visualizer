import React, { useEffect, useState } from "react";

function InsertionSort({ arrayProp }) {
  const [arr, setArr] = useState([]);
  const [delay, setDelay] = useState(5);
  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);

  useEffect(() => {
    setArr(arrayProp);
  }, [arrayProp]);

  function timeout() {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

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
      <button
        className="sort-btn"
        onClick={async () => {
          let tempArr = [...arr];
          await insertionSort(tempArr);
        }}
      >
        Insertion Sort
      </button>
      <div className="barchart">
        {arr.map((num) => (
          <div key={num.idx}>
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
    </div>
  );
}

export default InsertionSort;

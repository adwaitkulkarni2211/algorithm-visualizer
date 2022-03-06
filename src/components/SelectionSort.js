import React, { useEffect, useState } from "react";

function SelectionSort({arrayProp}) {
  const [arr, setArr] = useState([]);
  const [delay, setDelay] = useState(5);
  const [activeBars, setActiveBars] = useState([]);
  const [sorttedBars, setSortedBars] = useState([]);

  useEffect(() => {
    setArr(arrayProp);
  }, [arrayProp]);

  function timeout() {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  const selectionSort = async (arr) => {
    for(let i=0; i<arr.length; i++) {
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
      <button
        className="sort-btn"
        onClick={async () => {
          let tempArr = [...arr];
          await selectionSort(tempArr);
        }}
      >
        Selection Sort
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
                  : sorttedBars.find((bar) => bar.idx == num.idx)
                  ? "green"
                  : "cyan",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectionSort;

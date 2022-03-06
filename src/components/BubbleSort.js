import React, { useEffect, useState } from "react";

function BubbleSort({ arrayProp }) {
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
      <button
        className="sort-btn"
        onClick={async () => {
          let tempArr = [...arr];
          bubbleSort(tempArr);
        }}
      >
        Bubble Sort
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
                  : sorttedBars.find(bar => bar.idx == num.idx)
                  ? "green"
                  : "cyan"
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BubbleSort;

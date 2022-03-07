import React, { useEffect, useState } from "react";

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

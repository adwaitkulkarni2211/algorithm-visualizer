import React, { useEffect, useState } from "react";

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

export default SelectionSort;

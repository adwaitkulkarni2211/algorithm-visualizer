import React, { useEffect, useState } from "react";

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
                  : sortedBars.find(bar => bar.idx == num.idx)
                  ? "lightgreen"
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

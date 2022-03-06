import React, { useEffect, useState } from "react";

function QuickSort({arrayProp, doSort, setDoSort}) {
  const [arr, setArr] = useState([]);
  const [delay, setDelay] = useState(5);
  const [activeBars, setActiveBars] = useState([]);
  const [pivotBar, setPivotBar] = useState({})

  useEffect(() => {
    setArr(arrayProp)
  }, [arrayProp])

  useEffect(async () => {
    if(doSort) {
      let tempArr = [...arr];
      await quickSort(tempArr, 0, tempArr.length - 1)
      setDoSort(false)
    }
  }, [doSort])

  function timeout() {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  const partition = async (arr, pivot, lo, hi) => {
    setPivotBar(arr[hi]);

    let i = lo, j = lo;
    while (i <= hi) {
      await timeout();
      setActiveBars([arr[i], arr[j]])

      if (arr[i].num > pivot) {
        i++;
      } else {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        i++;
        j++;
      }

      await timeout()
      setArr([...arr]);
      setActiveBars([])
    }

    setPivotBar({});
    return j - 1;
  };

  const quickSort = async (arr, lo, hi) => {
    if (lo >= hi) {
      return;
    }

    let partitionIdx = await partition(arr, arr[hi].num, lo, hi);
    await quickSort(arr, lo, partitionIdx - 1);
    await quickSort(arr, partitionIdx + 1, hi);
  };

  return (
    <div className="container">
      {/* <button
        className="sort-btn"
        onClick={async () => {
          let tempArr = [...arr];
          await quickSort(tempArr, 0, tempArr.length - 1)
        }}
      >
        Quick Sort
      </button> */}
      <div className="barchart">
        {arr.map((num) => (
          <div key={num.idx}>
            <div
              className="bar"
              style={{
                height: `${((num.num * 50) / 1000) * 5}px`,
                width: `2px`,
                margin: `3px`,
                backgroundColor: activeBars.find(bar => bar.idx == num.idx) ? "black" : pivotBar.idx == num.idx ? "red" : "cyan"
              }}
            >
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickSort;

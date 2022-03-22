import React, { useEffect, useState } from "react";
import Barchart from "./Barchart";
import "./style.css"

function HeapSort ({arrayProp, doSort, setDoSort, timeout}) {
  const [arr, setArr] = useState([]);
  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);

  useEffect (() => {
    setArr(arrayProp)
  }, [arrayProp])

  useEffect (async () => {
    if(doSort) {
      let tempArr = [...arr];
      await heapSort (tempArr);
      setDoSort(false);
    }
  }, [doSort])

  // To heapify a subtree rooted with node i which is
  // an index in arr[]. n is size of heap
  const heapify = async (arr, n, i) => {
    var largest = i; // Initialize largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < n && arr[l].num > arr[largest].num)
      largest = l;
 
    // If right child is larger than largest so far
    if (r < n && arr[r].num > arr[largest].num)
      largest = r;
 
    // If largest is not root
    if (largest != i) {
      await timeout ();
      setActiveBars ([arr[i], arr[largest]]);

      var swap = arr[i];
      arr[i] = arr[largest];
      arr[largest] = swap;

      await timeout ();
      setActiveBars ([]);
      setArr ([...arr]);

      // Recursively heapify the affected sub-tree
      await heapify (arr, n, largest);
    }
  };

  const heapSort = async (arr) => {
    var n = arr.length;

    // Build heap (rearrange array)
    for (var j = Math.floor(n / 2) - 1; j >= 0; j--)
      await heapify (arr, n, j);
 
    // One by one extract an element from heap
    for (j = n - 1; j > 0; j--) {
      await timeout ();
      setActiveBars ([arr[0], arr[j]]);

      // Move current root to end
      var temp = arr[0];
      arr[0] = arr[j];
      arr[j] = temp;
 
      await timeout ();
      setSortedBars([...arr.slice (j)])
      setActiveBars ([]);
      setArr ([...arr]);

      // call max heapify on the reduced heap
      await heapify (arr, j, 0);
    }

    await timeout ();
    setSortedBars ([]);
    //setArr ([...arr]);
  };

  return (
    <div className="container">
      <Barchart arr={arr} activeBars={activeBars} pivotBar={[]} sortedBars={sortedBars} />
      <div id='code-tc'>
          <div id='code'>
            <h3>Pseudo Code:</h3>
            <pre>
{`heapSort(arr):
  for (j = Math.floor(arr.length / 2) - 1; j >= 0; j--)
    heapify (arr, arr.length, j)
 
  for (j = arr.length - 1; j > 0; j--)
    swap (arr[0], arr[j]
    heapify (arr, j, 0)
end
 
heapify(arr, size, i):
  largest = i
  l = 2 * i + 1
  r = 2 * i + 2

  if (l < size && arr[l] > arr[largest])
    largest = l
 
  if (r < size && arr[r] > arr[largest])
    largest = r
 
  if (largest != i)
    swap (arr[i], arr[largest])
    heapify (arr, size, largest);
end`}
            </pre>
          </div>
          <div id='tc'>
            <h3>Time Complexity:</h3>
            <pre>
{`Best Case: O(NLogN)

Average Case: O(NLogN)

Worst Case: O(NlogN)`}
            </pre>
          </div>
      </div>
    </div>
  );
}

export default HeapSort;

import React, {useState, useEffect} from 'react'
import "./style.css"

function MergeSort({arrayProp, doSort, setDoSort, timeout}) {
    const arr = arrayProp;
    const [masterArr, setMasterArr] = useState([]);
    const [activeBars, setActiveBars] = useState([]);

    useEffect(() => {
        setMasterArr(arrayProp)
    }, [arrayProp])

    useEffect(async () => {
      if(doSort) {
        let tempMasterArr = [...masterArr];
        const ans = await mergeSort(arr, 0, arr.length - 1, tempMasterArr);
        setDoSort(false)
      }      
    }, [doSort])
  
    const mergeTwoSortedLists = async (arr1, arr2, tempMasterArr) => {
      let mergedArr = [];
  
      await timeout()  
  
      tempMasterArr = [...tempMasterArr.slice(0, Math.min.apply(Math, arr1.map(o => o.idx))), ...arr1, ...arr2, ...arr.slice(Math.max.apply(Math, arr2.map(o => o.idx)) + 1)];
      setMasterArr([...tempMasterArr]);
  
      let i = 0, j = 0;
      while(i < arr1.length && j < arr2.length) {
        await timeout()
        setActiveBars([arr1[i], arr2[j]]);
  
        if(arr2[j].num < arr1[i].num) {
            mergedArr.push(arr2[j]);
            j++;
        } else {
            mergedArr.push(arr1[i]);
            i++;
        }
  
        await timeout()
  
        tempMasterArr = [...tempMasterArr.slice(0, Math.min.apply(Math, arr1.map(o => o.idx))), ...mergedArr, ...arr1.slice(i), ...arr2.slice(j), ...arr.slice(Math.max.apply(Math, arr2.map(o => o.idx)) + 1)];
        setMasterArr([...tempMasterArr]);
      }
  
      while(i < arr1.length) {
        await timeout();
        setActiveBars([arr1[i]]);
  
        mergedArr.push(arr1[i]);
        i++;
  
        await timeout()
  
        tempMasterArr = [...tempMasterArr.slice(0, Math.min.apply(Math, arr1.map(o => o.idx))), ...mergedArr, ...arr1.slice(i), ...arr.slice(Math.max.apply(Math, arr2.map(o => o.idx)) + 1)]
        setMasterArr([...tempMasterArr]);
      }
      while(j < arr2.length) {
        await timeout();
        setActiveBars([arr2[j]]);
  
        mergedArr.push(arr2[j]);
        j++;
  
        await timeout()  
  
        tempMasterArr = [...tempMasterArr.slice(0, Math.min.apply(Math, arr1.map(o => o.idx))), ...mergedArr, ...arr2.slice(j), ...arr.slice(Math.max.apply(Math, arr2.map(o => o.idx)) + 1)]
        setMasterArr([...tempMasterArr]);
      }

      setActiveBars([])
  
      return {mergedArr: mergedArr, tempMasterArr: tempMasterArr};
  }
  
    const mergeSort = async (arr, lo, hi, tempMasterArr) => {
      if(lo == hi) {
        return {mergedArr: [arr[lo]], tempMasterArr: tempMasterArr};
      }
  
      let mid = Math.floor((lo + hi) / 2);
  
      let leftCall = await mergeSort(arr, lo, mid, tempMasterArr);
      let leftMergedArr = leftCall.mergedArr;
      let leftTempMasterArr = leftCall.tempMasterArr
  
      let rightCall = await mergeSort(arr, mid + 1, hi, leftTempMasterArr);
      let rightMergedArr = rightCall.mergedArr;
      let rightTempMasterArr = rightCall.tempMasterArr;
  
      return await mergeTwoSortedLists(leftMergedArr, rightMergedArr, rightTempMasterArr);
    }
  
    return (
      <div className="container">
        <div id="barchart-container">
          {masterArr.map((num) => (
            <div id='barchart' key={num.idx}>
              <div
                className="bar"
                style={{
                  height: `${((num.num * 50) / 1000) * 5}px`,
                  width: masterArr.length < 21 ? `50px` 
                        : masterArr.length < 70 ? `20px` 
                        : masterArr.length < 116 ? `10px` : `2px`,
                  margin: `3px`,
                  padding: masterArr.length < 21 ? `1rem` : `0rem`,
                  backgroundColor: activeBars.find(bar => bar.idx == num.idx) ? "white" : "#6366f1",
                }}
              >
                <div
                  style={{
                    display: masterArr.length < 21 ? 'flex' : 'none', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    color: '#d1d5db'
                  }}>
                  {num.num}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div id='code-tc'>
          <div id='code'>
            <h3>Pseudo Code:</h3>
            <pre>
{`mergeSort(arr, left, right):
  if (left > right)
    return

  int mid = (left + right) / 2
  int arr1 = mergeSort(arr, left, mid)
  int arr2 = mergeSort(arr, mid + 1, right)

  return mergeTwoSortedLists(arr1, arr2)
end

mergeTwoSortedLists(arr1, arr2):
  int i = 0, j = 0, k = 0
  int mergedArr[arr1.length + arr2.length]

  while(i < arr1.length && j < arr2.length)
    if(arr2[j] < arr1[i])
      mergedArr[k] = arr2[j]
      j++
    else
      mergedArr[k] = arr1[i]
      i++
    k++

  while(i < arr1.length)
    mergedArr[k] = arr1[i]
    i++
    k++

  while(j < arr2.length)
    mergedArr[k] = arr2[j]
    j++
    k++
end`}
            </pre>
          </div>
          <div id='tc'>
            <h3>Time Complexity:</h3>
            <pre>
{`Best Case: O(NLogN)

Average Case: O(NLogN)

Worst Case: O(NLogN)`}
            </pre>
          </div>
        </div>
      </div>
    );
}

export default MergeSort
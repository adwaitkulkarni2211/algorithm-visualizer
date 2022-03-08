import React from "react";
import "./style.css";

function Barchart({ arr, activeBars, pivotBar, sortedBars }) {
  return (
    <div 
      id="barchart-container">
      {arr.map((num) => (
        <div id="barchart" key={num.idx}>
          <div
            className="bar"
            style={{
              height: `${((num.num * 50) / 1000) * 5}px`,
              width:
                arr.length < 21
                  ? `50px`
                  : arr.length < 70
                  ? `20px`
                  : arr.length < 116
                  ? `10px`
                  : `2px`,
              margin: `3px`,
              padding: arr.length < 21 ? `1rem` : `0rem`,
              backgroundColor: activeBars.find((bar) => bar.idx == num.idx)
                ? "white"
                : pivotBar.idx == num.idx
                ? "red"
                : sortedBars.find((bar) => bar.idx == num.idx)
                ? "lightgreen"
                : "#6366f1",
            }}
          >
            <div
              style={{
                display: arr.length < 21 ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
                color: "#d1d5db",
              }}
            >
              {num.num}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Barchart;

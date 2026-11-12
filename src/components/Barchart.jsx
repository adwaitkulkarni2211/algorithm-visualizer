import React from "react";
import "./style.css";

function Barchart({ arr, activeBars, pivotBar, sortedBars }) {
  let currWidth, currMargin;
  if (arr.length < 11) {
    currWidth = "3rem";
    currMargin = "1rem";
  } else if (arr.length < 21) {
    currWidth = "1rem";
    currMargin = "0.5rem";
  } else if (arr.length < 31) {
    currWidth = "2rem";
    currMargin = "0.5rem";
  } else if (arr.length < 51) {
    currWidth = "1rem";
    currMargin = "0.4rem";
  } else if (arr.length < 71) {
    currWidth = "0.7rem";
    currMargin = "0.3rem";
  } else if (arr.length < 91) {
    currWidth = "0.6rem";
    currMargin = "0.2rem";
  } else if (arr.length < 121) {
    currWidth = "0.5rem";
    currMargin = "0.1rem";
  } else if (arr.length < 151) {
    currWidth = "0.4rem";
    currMargin = "0.1rem";
  } else if (arr.length < 181) {
    currWidth = "0.3rem";
    currMargin = "0.1rem";
  } else {
    currWidth = "0.25rem";
    currMargin = "0.1rem";
  }

  return (
    <div id="barchart-container">
      {arr.map((num) => (
        <div id="barchart" key={num.idx}>
          <div
            className="bar"
            style={{
              height: `${((num.num * 50) / 1000) * 5}px`,
              width: currWidth,
              marginRight: currMargin,
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
                color:
                  sortedBars.find((bar) => bar.idx == num.idx) ||
                  activeBars.find((bar) => bar.idx == num.idx) ||
                  pivotBar.idx == num.idx
                    ? "black"
                    : "#d1d5db",
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

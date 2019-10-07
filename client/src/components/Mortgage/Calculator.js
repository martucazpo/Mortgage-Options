import API from "../utils/API";
import React from "react";
// down, desired, term, rate
function Calculator(props) {
  console.log("MY PROPS", props);
  var totalSales = props.desired * props.term;

  var totalLoan = totalSales - props.down;

  var taxloan = totalSales * 0.01052;

  var loanRate = (totalSales * 0.05) / 365;

  var totalPymt = totalLoan / props.term + taxloan / 12 + (loanRate * 365) / 12;

  console.log(totalSales, totalLoan, taxloan, loanRate, totalPymt);

  return <div>{totalSales}</div>;
}

// Mortgagecalc(5000, 800, 360, 0.05);

// mortgagecalc(200, 160, 240, 0.05);

// mortgagecalc(3500, 1500, 180, 0.05);

export default Calculator;

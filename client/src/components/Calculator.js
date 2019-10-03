// import API from "../utils/API";
import React from "react";

function MortgageCalc(down, desired, length, rate) {
  var totalSales = desired * length;

  var totalLoan = totalSales - down;

  var taxloan = totalSales * 0.01052;

  var loanRate = (totalSales * 0.05) / 365;

  var totalPymt = totalLoan / length + taxloan / 12 + (loanRate * 365) / 12;

  console.log(totalSales, totalLoan, taxloan, loanRate, totalPymt);

  return <div>hi</div>;
}

// Mortgagecalc(5000, 800, 360, 0.05);

// mortgagecalc(200, 160, 240, 0.05);

// mortgagecalc(3500, 1500, 180, 0.05);

export default MortgageCalc;

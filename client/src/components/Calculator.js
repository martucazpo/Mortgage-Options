import API from "../utils/API";
import React from "react";
// mortgageJs = require("mortgage-js");

// let mortgageCalculator = mortgageJs.createMortgageCalculator();
// mortgageCalculator.totalPrice = 800000;
// mortgageCalculator.downPayment = 160000;
// mortgageCalculator.interestRate = 0.045;
// mortgageCalculator.months = 360;
// mortgageCalculator.taxRate = 0.012;
// mortgageCalculator.insuranceRate = 0.0013;
// mortgageCalculator.mortgageInsuranceRate = 0.01;
// mortgageCalculator.mortgageInsuranceEnabled = true;
// mortgageCalculator.mortgageInsuranceThreshold = 0.2;
// mortgageCalculator.additionalPrincipalPayment = 100;
// let payment = mortgageCalculator.calculatePayment();
// down, desired, length, rate
function Calculator(props) {
  console.log("MY PROPS", props);
  var totalSales = props.desired * props.length;

  var totalLoan = totalSales - props.down;

  var taxloan = totalSales * 0.01052;

  var loanRate = (totalSales * 0.05) / 365;

  var totalPymt =
    totalLoan / props.length + taxloan / 12 + (loanRate * 365) / 12;

  console.log(totalSales, totalLoan, taxloan, loanRate, totalPymt);

  return <div>{totalSales}</div>;
}

// Mortgagecalc(5000, 800, 360, 0.05);

// mortgagecalc(200, 160, 240, 0.05);

// mortgagecalc(3500, 1500, 180, 0.05);

export default Calculator;

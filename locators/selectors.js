export const selectors = {
  //Car Loan Section
  carLoanTab: "#car-loan", // Tab for Car Loan calculator
  loanAmount: "#loanamount", // Input field for loan amount
  loanInterest: "#loaninterest", // Input field for interest rate
  loanTerm: "#loanterm", // Input field for loan tenure
  principalAmt: "//td[@class='col-3 col-sm-2 currency']", // Principal amount in EMI breakdown
  interestAmt: "//td[@class='col-3 col-sm-2 currency']", // Interest amount in EMI breakdown

  //Home Loan Section
  menuLoanWidgets: '//a[@title="Loan Calculators & Widgets"]', // Main menu for loan calculators
  homeLoanLink: '//li[@id="menu-item-3294"]//a[contains(text(),"Home Loan EMI Calculator")]', // Link to Home Loan EMI Calculator
  homePrice: "#homeprice", // Input field for home price
  homeLoanInterest: "#homeloaninterest", // Input field for home loan interest
  homeLoanTerm: "#homeloanterm", // Input field for home loan tenure
  monthlyPayment: "//div[@class='monthlypaymentcontainer']//td[@class='col-3 col-sm-2 currency']", // Monthly payment breakdown

  //Loan Calculator Section
  loanCalculatorLink: '//a[@title="Loan Calculator"]', // Link to general Loan Calculator

  //Loan Amount Calculator
  loanAmountCalcTab: "#loan-amount-calc", // Tab for Loan Amount Calculator
  loanEMI: "#loanemi", // Input field for EMI amount
  monthToggle: '//div[@class="btn-group btn-group-toggle"]//label[text()="Mo "]', // Toggle for monthly tenure mode

  //Loan Tenure Calculator
  loanTenureCalcTab: "#loan-tenure-calc", // Tab for Loan Tenure Calculator
  loanSummaryTenure: "#loansummary-tenure", // Result field for calculated loan tenure

  //Interest Rate Calculator
  interestRateCalcTab: "#interest-rate-calc", // Tab for Interest Rate Calculator
  loanSummaryInterestRate: "#loansummary-interestrate" // Result field for calculated interest rate
};

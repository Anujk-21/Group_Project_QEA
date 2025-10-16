import { selectors } from "../locators/selectors";

export class EmiCalculatorPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to the EMI calculator homepage
  async gotoSite() {
    await this.page.goto("https://emicalculator.net/",{waitUntil:"load"});
  }

  // Fill car loan form
  async fillCarLoan(data) {
    await this.page.locator(selectors.carLoanTab).click();
    await this.page.locator(selectors.loanAmount).fill(data.amount);
    await this.page.locator(selectors.loanInterest).fill(data.interest);
    await this.page.locator(selectors.loanTerm).fill(data.term);
    await this.page.locator(selectors.loanTerm).press("Enter");
  }

  // Get car loan monthly breakdown
  async getCarLoanBreakdown() {
    const principal = await this.page.locator(selectors.principalAmt).nth(2).textContent();
    const interest = await this.page.locator(selectors.interestAmt).nth(3).textContent();
    return { principal, interest };
  }

  // Navigate to Home Loan EMI Calculator
  async navigateToHomeLoan() {
    await this.page.locator(selectors.menuLoanWidgets).click();
    await this.page.locator(selectors.homeLoanLink).click();
  }

  // Fill home loan form
  async fillHomeLoan(data) {
    await this.page.locator(selectors.homePrice).fill(data.amount);
    await this.page.locator(selectors.homeLoanInterest).fill(data.interest);
    await this.page.locator(selectors.homeLoanTerm).fill(data.term);
    await this.page.keyboard.press("Enter");
  }

  // Get home loan monthly breakdown
  async getHomeLoanBreakdown() {
    const principal = await this.page.locator(selectors.monthlyPayment).nth(0).textContent();
    const interest = await this.page.locator(selectors.monthlyPayment).nth(1).textContent();
    return { principal, interest };
  }

  // Navigate to Loan Calculator
  async navigateToLoanCalculator() {
    await this.page.locator(selectors.menuLoanWidgets).click();
    await this.page.locator(selectors.loanCalculatorLink).click();
  }

  // Fill personal loan form
  async fillPersonalLoan(data) {
    await this.page.locator(selectors.loanAmount).fill(data.amount);
    await this.page.locator(selectors.loanInterest).fill(data.interest);
    await this.page.locator(selectors.loanTerm).fill(data.term);
    await this.page.locator(selectors.loanTerm).press("Enter");
  }

  // Get personal loan breakdown
  async getPersonalLoanBreakdown() {
    const principal = await this.page.locator(selectors.principalAmt).nth(2).textContent();
    const interest = await this.page.locator(selectors.interestAmt).nth(3).textContent();
    return { principal, interest };
  }

  // Fill Loan Amount Calculator (Yearly)
async fillLoanAmountCalcYearly(data) {
//   await this.page.waitForSelector("#loan-amount-calc", { state: "visible" });
await this.page.locator('//a[@title="Loan Calculators & Widgets"]').click();
  await this.page.locator('//a[@title="Loan Calculator"]').click();
  await this.page.locator("#loan-amount-calc").click();
  await this.page.locator("#loanemi").fill(data.emi);
  await this.page.locator("#loaninterest").fill(data.interest);
  await this.page.locator("#loanterm").fill(data.termYear);
  await this.page.locator("#loanterm").press("Enter");
}

  // Fill Loan Amount Calculator (Monthly)
  async fillLoanAmountCalcMonthly(data) {
    await this.page.locator('//a[@title="Loan Calculators & Widgets"]').click();
  await this.page.locator('//a[@title="Loan Calculator"]').click();
    await this.page.locator(selectors.loanAmountCalcTab).click();
    await this.page.locator(selectors.loanEMI).fill(data.emi);
    await this.page.locator(selectors.loanInterest).fill(data.interest);
    await this.page.locator(selectors.monthToggle).click();
    await this.page.locator(selectors.loanTerm).fill(data.termMonth);
    await this.page.locator(selectors.loanTerm).press("Enter");
  }

  // Get loan amount breakdown
  async getLoanAmountBreakdown() {
    const principal = await this.page.locator(selectors.principalAmt).nth(2).textContent();
    const interest = await this.page.locator(selectors.interestAmt).nth(3).textContent();
    return { principal, interest };
  }

  // Fill Loan Tenure Calculator
  async fillLoanTenureCalc(data) {
    await this.page.locator('//a[@title="Loan Calculators & Widgets"]').click();
  await this.page.locator('//a[@title="Loan Calculator"]').click();
    await this.page.locator(selectors.loanTenureCalcTab).click();
    await this.page.locator(selectors.loanAmount).fill(data.amount);
    await this.page.locator(selectors.loanEMI).fill(data.emi);
    await this.page.locator(selectors.loanInterest).fill(data.interest);
    await this.page.locator(selectors.loanInterest).press("Enter");
  }

  // Get loan tenure result
  async getLoanTenure() {
    return await this.page.locator(selectors.loanSummaryTenure).textContent();
  }

  // Fill Interest Rate Calculator
  async fillInterestRateCalc(data) {
    await this.page.locator('//a[@title="Loan Calculators & Widgets"]').click();
  await this.page.locator('//a[@title="Loan Calculator"]').click();
    await this.page.locator(selectors.interestRateCalcTab).click();
    await this.page.locator(selectors.loanAmount).fill(data.amount);
    await this.page.locator(selectors.loanEMI).fill(data.emi);
    await this.page.locator(selectors.loanTerm).fill(data.term);
    await this.page.locator(selectors.loanTerm).press("Enter");
  }

  // Get interest rate result
  async getInterestRate() {
    return await this.page.locator(selectors.loanSummaryInterestRate).textContent();
  }
}

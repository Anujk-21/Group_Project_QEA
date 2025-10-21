// Import selectors used to locate elements on the page
import { selectors } from "../locators/selectors";
// Import Node.js file system module to handle file operations
import fs from "fs";

// Define a class to interact with the EMI Calculator web page
export class EmiCalculatorPage {
  constructor(page) {
    // Store the Playwright page object for browser interaction
    this.page = page;
  }

  // Navigate to the EMI calculator homepage
  async gotoSite() {
    await this.page.goto("https://emicalculator.net/", { waitUntil: "load" });
  }

  // Fill car loan form with provided data
  async fillCarLoan(data) {
    await this.page.locator(selectors.carLoanTab).click();
    await this.page.locator(selectors.loanAmount).fill(data.amount);
    await this.page.locator(selectors.loanInterest).fill(data.interest);
    await this.page.locator(selectors.loanTerm).fill(data.term);
    await this.page.locator(selectors.loanTerm).press("Enter");
  }

  // Retrieve car loan monthly breakdown values
  async getCarLoanBreakdown() {
    const principal = await this.page
      .locator(selectors.principalAmt)
      .nth(2)
      .textContent();
    const interest = await this.page
      .locator(selectors.interestAmt)
      .nth(3)
      .textContent();
    return { principal, interest };
  }

  // Navigate to the Home Loan EMI Calculator section
  async navigateToHomeLoan() {
    await this.page.locator(selectors.menuLoanWidgets).click();
    await this.page.locator(selectors.homeLoanLink).click();
  }

  // Fill home loan form with provided data
  async fillHomeLoan(data) {
    await this.page.locator(selectors.homePrice).fill(data.amount);
    await this.page.locator(selectors.homeLoanInterest).fill(data.interest);
    await this.page.locator(selectors.homeLoanTerm).fill(data.term);
    await this.page.keyboard.press("Enter");
  }

  // Extract yearly payment table data and save it as a JSON file
  async generateJson() {
    const tableData = await this.page.evaluate(() => {
      const rows = Array.from(
        document.querySelectorAll(".yearlypaymentdetails"));
        return rows.map((row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        return cells.map((cell) => cell.innerText.trim());
      });
    });

    // Extract table headers and clean them
    let headerElements = await this.page.locator("//table//th").allInnerTexts();
    headerElements=headerElements.map((text)=> text.split("\n")[0]);
    // Map each row to an object using headers
    const structuredData = tableData.map((row) =>
      Object.fromEntries(
        row.map((cell, i) => [headerElements[i], cell])
      )
    );

    // Write structured data to a JSON file
    fs.writeFileSync("tableData.json", JSON.stringify(structuredData, null, 2));
  }

  // Retrieve home loan monthly breakdown values
  async getHomeLoanBreakdown() {
    const principal = await this.page
      .locator(selectors.monthlyPayment)
      .nth(0)
      .textContent();
    const interest = await this.page
      .locator(selectors.monthlyPayment)
      .nth(1)
      .textContent();
    return { principal, interest };
  }

  // Navigate to the Loan Calculator section
  async navigateToLoanCalculator() {
    await this.page.locator(selectors.menuLoanWidgets).click();
    await this.page.locator(selectors.loanCalculatorLink).click();
  }

  // Fill personal loan form with provided data
  async fillPersonalLoan(data) {
    await this.page.locator(selectors.loanAmount).fill(data.amount);
    await this.page.locator(selectors.loanInterest).fill(data.interest);
    await this.page.locator(selectors.loanTerm).fill(data.term);
    await this.page.locator(selectors.loanTerm).press("Enter");
  }

  // Retrieve personal loan breakdown values
  async getPersonalLoanBreakdown() {
    const principal = await this.page
      .locator(selectors.principalAmt)
      .nth(2)
      .textContent();
    const interest = await this.page
      .locator(selectors.interestAmt)
      .nth(3)
      .textContent();
    return { principal, interest };
  }

  // Fill Loan Amount Calculator (Yearly mode) with provided data
  async fillLoanAmountCalcYearly(data) {
    // Navigate through menu to reach Loan Amount Calculator
    //   await this.page.waitForSelector("#loan-amount-calc", { state: "visible" });
    await this.page.locator('//a[@title="Loan Calculators & Widgets"]').click();
    await this.page.locator('//a[@title="Loan Calculator"]').click();
    await this.page.locator("#loan-amount-calc").click();
    await this.page.locator("#loanemi").fill(data.emi);
    await this.page.locator("#loaninterest").fill(data.interest);
    await this.page.locator("#loanterm").fill(data.termYear);
    await this.page.locator("#loanterm").press("Enter");
  }

  // Fill Loan Amount Calculator (Monthly mode) with provided data
  async fillLoanAmountCalcMonthly(data) {
    // Navigate through menu to reach Loan Amount Calculator
    await this.page.locator('//a[@title="Loan Calculators & Widgets"]').click();
    await this.page.locator('//a[@title="Loan Calculator"]').click();
    await this.page.locator(selectors.loanAmountCalcTab).click();
    await this.page.locator(selectors.loanEMI).fill(data.emi);
    await this.page.locator(selectors.loanInterest).fill(data.interest);
    await this.page.locator(selectors.monthToggle).click();
    await this.page.locator(selectors.loanTerm).fill(data.termMonth);
    await this.page.locator(selectors.loanTerm).press("Enter");
  }

  // Retrieve loan amount breakdown values
  async getLoanAmountBreakdown() {
    const principal = await this.page
      .locator(selectors.principalAmt)
      .nth(2)
      .textContent();
    const interest = await this.page
      .locator(selectors.interestAmt)
      .nth(3)
      .textContent();
    return { principal, interest };
  }

  // Fill Loan Tenure Calculator with provided data
  async fillLoanTenureCalc(data) {
    // Navigate through menu to reach Loan Tenure Calculator
    await this.page.locator('//a[@title="Loan Calculators & Widgets"]').click();
    await this.page.locator('//a[@title="Loan Calculator"]').click();
    await this.page.locator(selectors.loanTenureCalcTab).click();
    await this.page.locator(selectors.loanAmount).fill(data.amount);
    await this.page.locator(selectors.loanEMI).fill(data.emi);
    await this.page.locator(selectors.loanInterest).fill(data.interest);
    await this.page.locator(selectors.loanInterest).press("Enter");
  }

  // Retrieve calculated loan tenure result
  async getLoanTenure() {
    return await this.page.locator(selectors.loanSummaryTenure).textContent();
  }

  // Fill Interest Rate Calculator with provided data
  async fillInterestRateCalc(data) {
    // Navigate through menu to reach Interest Rate Calculator
    await this.page.locator('//a[@title="Loan Calculators & Widgets"]').click();
    await this.page.locator('//a[@title="Loan Calculator"]').click();
    await this.page.locator(selectors.interestRateCalcTab).click();
    await this.page.locator(selectors.loanAmount).fill(data.amount);
    await this.page.locator(selectors.loanEMI).fill(data.emi);
    await this.page.locator(selectors.loanTerm).fill(data.term);
    await this.page.locator(selectors.loanTerm).press("Enter");
  }

  // Retrieve calculated interest rate result
  async getInterestRate() {
    return await this.page
      .locator(selectors.loanSummaryInterestRate)
      .textContent();
  }
}

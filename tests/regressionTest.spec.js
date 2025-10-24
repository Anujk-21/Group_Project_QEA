// Import Playwright test functions and assertions
import { test, expect } from "@playwright/test";
// Import the page object that encapsulates interactions with the EMI Calculator site
import { EmiCalculatorPage } from "../pages/EmiCalculatorPage";
// Import test data for different loan scenarios
import loanData from "../data/loandata.json";

// Reusable page object instance used across tests
let emiPage;

// Regression test group covering multiple calculators and scenarios
test.describe("@Regression Tests - EMI Calculator", () => {
  test.beforeEach(async ({page}) => {
    emiPage = new EmiCalculatorPage(page);
    await emiPage.gotoSite();
  });

  // Yearly tenure scenario for Loan Amount Calculator
  test("Loan Amount Calculator - Yearly Tenure", async () => {
    await test.step("Fill loan amount calculator with yearly tenure", async () => {
      await emiPage.fillLoanAmountCalcYearly(loanData.loanAmountCalc);
    });
    await test.step("Fetch and validate monthly breakdown", async () => {
      const { principal, interest } = await emiPage.getLoanAmountBreakdown();
      console.log(`Loan Amount Principal (1st month): ${principal}`);
      console.log(`Loan Amount Interest (1st month): ${interest}`);
      expect.soft(principal).not.toBeNull();
      expect.soft(interest).not.toBeNull();
    });
  });

  // Monthly tenure scenario for Loan Amount Calculator
  test("Loan Amount Calculator - Monthly Tenure", async () => {
    await test.step("Fill loan amount calculator with monthly tenure", async () => {
      await emiPage.fillLoanAmountCalcMonthly(loanData.loanAmountCalc);
    });
    await test.step("Fetch and validate monthly breakdown", async () => {
      const { principal, interest } = await emiPage.getLoanAmountBreakdown();
      console.log(`Loan Amount Principal (1st month): ${principal}`);
      console.log(`Loan Amount Interest (1st month): ${interest}`);
      expect.soft(principal).not.toBeNull();
      expect.soft(interest).not.toBeNull();
    });
  });

  // Loan Tenure Calculator validation for expected output format
  test("Loan Tenure Calculator - Valid Inputs", async () => {
    await test.step("Fill loan tenure calculator", async () => {
      await emiPage.fillLoanTenureCalc(loanData.loanTenureCalc);
    });
    await test.step("Fetch and validate loan tenure", async () => {
      const tenure = await emiPage.getLoanTenure();
      console.log(`Calculated Loan Tenure: ${tenure}`);
      // Assert the tenure string contains the expected default format
      expect.soft(tenure).toContain("Loan Tenure36months");//default value
    });
  });

  // Interest Rate Calculator validation ensuring percent output
  test("Interest Rate Calculator - Valid Inputs", async () => {
    await test.step("Fill interest rate calculator", async () => {
      await emiPage.fillInterestRateCalc(loanData.interestRateCalc);
    });
    await test.step("Fetch and validate interest rate", async () => {
      const rate = await emiPage.getInterestRate();
      console.log(`Calculated Interest Rate: ${rate}`);
      expect.soft(rate).toContain("%");
    });
  });

  // Personal loan flow validation
  test("Personal Loan EMI Calculator", async () => {
    await test.step("Navigate to Loan Calculator", async () => {
      await emiPage.navigateToLoanCalculator();
    });
    await test.step("Fill personal loan details", async () => {
      await emiPage.fillPersonalLoan(loanData.personalLoan);
    });
    await test.step("Fetch and validate monthly breakdown", async () => {
      const { principal, interest } = await emiPage.getPersonalLoanBreakdown();
      console.log(`Personal Loan Principal (1st month): ${principal}`);
      console.log(`Personal Loan Interest (1st month): ${interest}`);
      expect.soft(principal).not.toBeNull();
      expect.soft(interest).not.toBeNull();
    });
  });
});
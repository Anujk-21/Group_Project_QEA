// Import Playwright test functions and assertions
import { test, expect } from "@playwright/test";
// Import the page object that encapsulates interactions with the EMI Calculator site
import { EmiCalculatorPage } from "../pages/EmiCalculatorPage";
// Import test data for different loan scenarios
import loanData from "../data/loandata.json";

// Reusable page object instance used across tests
let emiPage;
// Positive tests focusing on format and presence of expected symbols/values
test.describe("Positive Tests - EMI Calculator", () => {
  test.beforeEach(async ({page}) => {
    emiPage = new EmiCalculatorPage(page);
    await emiPage.gotoSite();
  });

  // Validate car loan display includes currency symbol
  test("Car Loan - Validate EMI Breakdown", async () => {
    await test.step("Fill car loan form with valid data", async () => {
      await emiPage.fillCarLoan(loanData.carLoan);
    });
    await test.step("Verify principal and interest values", async () => {
      const { principal, interest } = await emiPage.getCarLoanBreakdown();
      expect.soft(principal).toMatch(/₹/);
      expect.soft(interest).toMatch(/₹/);
    });
  });

  // Validate home loan display includes currency symbol
  test("Home Loan - Validate EMI Breakdown", async () => {
    await test.step("Navigate and fill home loan form", async () => {
      await emiPage.navigateToHomeLoan();
      await emiPage.fillHomeLoan(loanData.homeLoan);
    });
    await test.step("Verify principal and interest values", async () => {
      const { principal, interest } = await emiPage.getHomeLoanBreakdown();
      expect.soft(principal).toMatch(/₹/);
      expect.soft(interest).toMatch(/₹/);
    });
  });

  // Ensure loan tenure returns expected string format
  test("Loan Tenure - Validate Result Format", async () => {
    await test.step("Fill loan tenure calculator", async () => {
      await emiPage.fillLoanTenureCalc(loanData.loanTenureCalc);
    });
    await test.step("Verify tenure format", async () => {
      const tenure = await emiPage.getLoanTenure();
      expect.soft(tenure).toMatch("Loan Tenure36months");
    });
  });

  // Ensure interest rate formatted as percentage
  test("Interest Rate - Validate Result Format", async () => {
    await test.step("Fill interest rate calculator", async () => {
      await emiPage.fillInterestRateCalc(loanData.interestRateCalc);
    });
    await test.step("Verify interest rate format", async () => {
      const rate = await emiPage.getInterestRate();
      expect.soft(rate).toMatch(/\d+(\.\d+)?%/);
    });
  });

  // Verify monthly loan amount calculator shows currency symbols
  test("Loan Amount Calculator - Monthly Tenure Format", async () => {
    await test.step("Fill monthly tenure loan amount calculator", async () => {
      await emiPage.fillLoanAmountCalcMonthly(loanData.loanAmountCalc);
    });
    await test.step("Verify breakdown values", async () => {
      const { principal, interest } = await emiPage.getLoanAmountBreakdown();
      expect.soft(principal).toContain("₹");
      expect.soft(interest).toContain("₹");
    });
  });
});
import { test, expect } from "@playwright/test";
import { EmiCalculatorPage } from "../pages/EmiCalculatorPage";
import loanData from "../data/loandata.json";

test.describe("Smoke & Sanity Tests - EMI Calculator", () => {
  test.beforeEach(async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
    await emiPage.gotoSite();
  });

  test("@Smoke Test - Car Loan EMI Breakdown", async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
    await test.step("Fill car loan details", async () => {
      await emiPage.fillCarLoan(loanData.carLoan);
    });
    await test.step("Fetch and validate monthly breakdown", async () => {
      const { principal, interest } = await emiPage.getCarLoanBreakdown();
      console.log(`Car Loan Principal (1st month): ${principal}`);
      console.log(`Car Loan Interest (1st month): ${interest}`);
      expect.soft(principal).not.toBeNull();
      expect.soft(interest).not.toBeNull();
    });
  });

  test("@Sanity Test - Home Loan EMI Breakdown", async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
    await test.step("Navigate to Home Loan EMI Calculator", async () => {
      await emiPage.navigateToHomeLoan();
    });
    await test.step("Fill home loan details", async () => {
      await emiPage.fillHomeLoan(loanData.homeLoan);
    });
    await test.step("Fetch and validate monthly breakdown", async () => {
      const { principal, interest } = await emiPage.getHomeLoanBreakdown();
      console.log(`Home Loan Principal (1st month): ${principal}`);
      console.log(`Home Loan Interest (1st month): ${interest}`);
      expect.soft(principal).not.toBeNull();
      expect.soft(interest).not.toBeNull();
    });
  });
});

test.describe("@Regression Tests - EMI Calculator", () => {
  test.beforeEach(async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
    await emiPage.gotoSite();
  });

  test("Loan Amount Calculator - Yearly Tenure", async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
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

  test("Loan Amount Calculator - Monthly Tenure", async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
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

  test("Loan Tenure Calculator - Valid Inputs", async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
    await test.step("Fill loan tenure calculator", async () => {
      await emiPage.fillLoanTenureCalc(loanData.loanTenureCalc);
    });
    await test.step("Fetch and validate loan tenure", async () => {
      const tenure = await emiPage.getLoanTenure();
      console.log(`Calculated Loan Tenure: ${tenure}`);
      expect.soft(tenure).toContain("Loan Tenure36months");//default value
    });
  });

  test("Interest Rate Calculator - Valid Inputs", async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
    await test.step("Fill interest rate calculator", async () => {
      await emiPage.fillInterestRateCalc(loanData.interestRateCalc);
    });
    await test.step("Fetch and validate interest rate", async () => {
      const rate = await emiPage.getInterestRate();
      console.log(`Calculated Interest Rate: ${rate}`);
      expect.soft(rate).toContain("%");
    });
  });

  test("Personal Loan EMI Calculator", async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
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

test.describe("Positive Tests - EMI Calculator", () => {
  test.beforeEach(async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
    await emiPage.gotoSite();
  });

  test("Car Loan - Validate EMI Breakdown", async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
    await test.step("Fill car loan form with valid data", async () => {
      await emiPage.fillCarLoan(loanData.carLoan);
    });
    await test.step("Verify principal and interest values", async () => {
      const { principal, interest } = await emiPage.getCarLoanBreakdown();
      expect.soft(principal).toMatch(/₹/);
      expect.soft(interest).toMatch(/₹/);
    });
  });

  test("Home Loan - Validate EMI Breakdown", async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
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

  test("Loan Tenure - Validate Result Format", async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
    await test.step("Fill loan tenure calculator", async () => {
      await emiPage.fillLoanTenureCalc(loanData.loanTenureCalc);
    });
    await test.step("Verify tenure format", async () => {
      const tenure = await emiPage.getLoanTenure();
      expect.soft(tenure).toMatch("Loan Tenure36months");
    });
  });

  test("Interest Rate - Validate Result Format", async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
    await test.step("Fill interest rate calculator", async () => {
      await emiPage.fillInterestRateCalc(loanData.interestRateCalc);
    });
    await test.step("Verify interest rate format", async () => {
      const rate = await emiPage.getInterestRate();
      expect.soft(rate).toMatch(/\d+(\.\d+)?%/);
    });
  });

  test("Loan Amount Calculator - Monthly Tenure Format", async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
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

test.describe("Negative Tests - EMI Calculator", () => {
  test.beforeEach(async ({ page }) => {
    const emiPage = new EmiCalculatorPage(page);
    await emiPage.gotoSite();
  });

  test("Car Loan - Empty Loan Amount", async ({ page }) => {
    test.info().annotations.push({ type: 'negative', description: 'Validates rejection of empty loan amount in car loan calculator' });

    const emiPage = new EmiCalculatorPage(page);
    await test.step("Fill car loan with empty amount", async () => {
      await emiPage.fillCarLoan({ amount: "", interest: "9.5", term: "1" });
    });
    await test.step("Check if breakdown is blocked", async () => {
      const { principal, interest } = await emiPage.getCarLoanBreakdown();
      expect.soft(principal.trim()).toBe("₹ 0");
      expect.soft(interest.trim()).toBe("₹ 0");
    });
  });
});



// Import Playwright test functions and assertions
import { test, expect } from "@playwright/test";
// Import the page object that encapsulates interactions with the EMI Calculator site
import { EmiCalculatorPage } from "../pages/EmiCalculatorPage";
// Import test data for different loan scenarios
import loanData from "../data/loandata.json";

// Reusable page object instance used across tests
let emiPage;

// Group of smoke and sanity tests for quick verification of core flows
test.describe("Smoke & Sanity Tests - EMI Calculator", () => {
  // Before each test create a fresh page object and navigate to the site
  test.beforeEach(async ({ page }) => {
    emiPage = new EmiCalculatorPage(page);
    await emiPage.gotoSite();
  });

  // Smoke test: verify car loan EMI breakdown can be filled and returns values
  test("@Smoke Test - Car Loan EMI Breakdown", async () => {
    await test.step("Fill car loan details", async () => {
      // Populate car loan form using test data
      await emiPage.fillCarLoan(loanData.carLoan);
    });
    await test.step("Fetch and validate monthly breakdown", async () => {
      // Read principal and interest for the first month and assert they exist
      const { principal, interest } = await emiPage.getCarLoanBreakdown();
      console.log(`Car Loan Principal (1st month): ${principal}`);
      console.log(`Car Loan Interest (1st month): ${interest}`);
      expect.soft(principal).not.toBeNull();
      expect.soft(interest).not.toBeNull();
    });
  });

  // Sanity test: verify home loan flow including table extraction and breakdown
  test("@Sanity Test - Home Loan EMI Breakdown", async () => {
    await test.step("Navigate to Home Loan EMI Calculator", async () => {
      // Navigate to the home loan section of the site
      await emiPage.navigateToHomeLoan();
    });
    await test.step("Fill home loan details", async () => {
      // Fill the home loan form with provided data
      await emiPage.fillHomeLoan(loanData.homeLoan);
    });

    await test.step("Fetch data from table and store it in json",async () =>{
      // Extract yearly payment table and write it to a JSON file
      await emiPage.generateJson();
    });

    await test.step("Fetch and validate monthly breakdown", async () => {
      // Validate monthly principal and interest values are present
      const { principal, interest } = await emiPage.getHomeLoanBreakdown();
      console.log(`Home Loan Principal (1st month): ${principal}`);
      console.log(`Home Loan Interest (1st month): ${interest}`);
      expect.soft(principal).not.toBeNull();
      expect.soft(interest).not.toBeNull();
    });
  });
});

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

// Negative tests to validate error handling and boundary conditions
test.describe("Negative Tests - EMI Calculator", () => {
  test.beforeEach(async ({ page }) => {
    emiPage = new EmiCalculatorPage(page);
    await emiPage.gotoSite();
  });

  // Negative case: empty loan amount should result in zeroed breakdown
  test("Car Loan - Empty Loan Amount", async () => {
    // Annotate the test with metadata indicating it's a negative test
    test.info().annotations.push({ type: 'negative', description: 'Validates rejection of empty loan amount in car loan calculator' });

    await test.step("Fill car loan with empty amount", async () => {
      // Provide empty amount while other fields are valid
      await emiPage.fillCarLoan({ amount: "", interest: "9.5", term: "1" });
    });
    await test.step("Check if breakdown is blocked", async () => {
      // Expect the breakdown to show zero values when amount is empty
      const { principal, interest } = await emiPage.getCarLoanBreakdown();
      expect.soft(principal.trim()).toBe("₹ 0");
      expect.soft(interest.trim()).toBe("₹ 0");
    });
  });
});

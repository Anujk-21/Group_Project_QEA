// Import Playwright test functions and assertions
import { test, expect } from "@playwright/test";
// Import the page object that encapsulates interactions with the EMI Calculator site
import { EmiCalculatorPage } from "../pages/EmiCalculatorPage";
// Import test data for different loan scenarios
import loanData from "../data/loandata.json";

// Reusable page object instance used across tests
let emiPage;

// Group of smoke and sanity tests for quick verification of core flows
test.describe("Smoke Tests - EMI Calculator", () => {
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

  // Smoke test: verify home loan flow including table extraction and breakdown
  test("@Smoke Test - Home Loan EMI Breakdown", async () => {
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







// Import Playwright test functions and assertions
import { test, expect } from "@playwright/test";
// Import the page object that encapsulates interactions with the EMI Calculator site
import { EmiCalculatorPage } from "../pages/EmiCalculatorPage";
// Import test data for different loan scenarios
import loanData from "../data/loandata.json";

// Reusable page object instance used across tests
let emiPage;

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
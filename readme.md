
# 📘 EMI Calculator Automation

## 🧾 Problem Statement
Automate the process of calculating EMI and validating loan-related UI components using Playwright. The project focuses on extracting financial data and performing validations on EMI calculators from legitimate banking and financial websites.

## 🚗 Use Case
- **Car Price**: ₹15,00,000  
- **Interest Rate**: 9.5%  
- **Tenure**: 1 Year  
- **Goal**: Display the **interest amount** and **principal amount** for the first month.

## 📌 Project Objectives
1. EMI calculation for a car loan and extract monthly breakdown.
2. Extract year-on-year data from Home Loan EMI Calculator and store in Excel.
3. Validate input fields, sliders, and dynamic changes across Loan Amount, Tenure, and EMI calculators.
4. Implement reusable methods for navigation, scrolling, and data extraction.

## 🛠️ Tech Stack
- **Language**: TypeScript / JavaScript
- **Framework**: Playwright
- **Design Pattern**: Page Object Model (POM)
- **Reporting**: Allure Reports
- **Data Storage**: JSON, Excel

## 📁 Folder Structure
```
.github/workflows         # CI/CD workflows
allure-results            # Test results for Allure
data                      # Input/output data files
locators                  # Element locators
node_modules              # Dependencies
pages                     # Page Object classes
playwright-report         # HTML test reports
tests                     # Test scripts
tableData.json            # Extracted table data
playwright.config.ts      # Playwright configuration
package.json              # Project metadata and scripts
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
npx playwright test
```

### 3. View Report
```bash
npx allure serve allure-results
```

## 📊 Features
- EMI calculation automation
- UI validations for sliders and input fields
- Data extraction and storage
- Modular and reusable codebase
- Scroll and navigation automation

## 📌 Suggested Sites
- https://www.emicalculator.net
- https://www.hdfcbank.com

## 👨‍💻 Author
- **Anujk-21** 
- **i-arman7565**
- **ashish6274**
- **OmBaraskar**
- **Parakh1305**

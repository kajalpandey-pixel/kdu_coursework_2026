const path = require("path");
const { readEmployeeData } = require("./src/fileReader");
const {
  generateSummaryReport,
  generateDepartmentReport,
  generateTopEarnersReport
} = require("./src/reports");

function printUsage() {
  console.log(`
Usage:
  node index.js                 -> Generate ALL reports
  node index.js summary         -> Generate summary report
  node index.js department HR   -> Generate department report for HR
  node index.js top 3           -> Generate top 3 earners report

Outputs go to ./reports/
`);
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const dataPath = path.join("employees.json");
  const employees = readEmployeeData(dataPath);

  const reportsDir = "reports";

  if (!command) {
    generateSummaryReport(employees, path.join(reportsDir, "summary.txt"));
    generateDepartmentReport(employees, "Engineering", path.join(reportsDir, "department-engineering.txt"));
    generateTopEarnersReport(employees, 5, path.join(reportsDir, "top-earners.txt"));
    console.log("Generated: summary.txt, department-engineering.txt, top-earners.txt");
    return;
  }

  if (command === "summary") {
    generateSummaryReport(employees, path.join(reportsDir, "summary.txt"));
    console.log("Generated: summary.txt");
    return;
  }

  if (command === "department") {
    const dept = args.slice(1).join(" ").trim();
    if (!dept) {
      console.error("Error: department name missing.");
      printUsage();
      process.exit(1);
    }
    const safeName = dept.toLowerCase().replace(/\s+/g, "-");
    generateDepartmentReport(employees, dept, path.join(reportsDir, `department-${safeName}.txt`));
    console.log(`Generated: department-${safeName}.txt`);
    return;
  }

  if (command === "top") {
    const count = args[1] || 5;
    generateTopEarnersReport(employees, count, path.join(reportsDir, "top-earners.txt"));
    console.log("Generated: top-earners.txt");
    return;
  }

  console.error(`Unknown command: ${command}`);
  printUsage();
  process.exit(1);
}

main();

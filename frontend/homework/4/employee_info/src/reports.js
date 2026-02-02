const { writeReport } = require("./reportGenerator");

function formatMoney(n) {
  return Number(n).toFixed(2);
}

function groupByDepartment(employees) {
  const map = {};
  for (const emp of employees) {
    const dept = emp.department || "Unknown";
    if (!map[dept]) map[dept] = [];
    map[dept].push(emp);
  }
  return map;
}

function generateSummaryReport(employees, outputPath) {
  const totalEmployees = employees.length;
  const totalSalary = employees.reduce((sum, e) => sum + (Number(e.salary) || 0), 0);
  const avgSalary = totalEmployees ? totalSalary / totalEmployees : 0;

  const deptGroups = groupByDepartment(employees);

  let report = "";
  report += "SUMMARY REPORT\n";
  report += "==============\n\n";
  report += `Total Employees: ${totalEmployees}\n`;
  report += `Total Company Salary: ${formatMoney(totalSalary)}\n`;
  report += `Average Salary: ${formatMoney(avgSalary)}\n\n`;

  report += "Department-wise Breakdown:\n";
  report += "--------------------------\n";

  const depts = Object.keys(deptGroups).sort();
  for (const dept of depts) {
    const list = deptGroups[dept];
    const deptCount = list.length;
    const deptTotal = list.reduce((sum, e) => sum + (Number(e.salary) || 0), 0);
    const deptAvg = deptCount ? deptTotal / deptCount : 0;

    report += `\nDepartment: ${dept}\n`;
    report += `  Count: ${deptCount}\n`;
    report += `  Total Salary: ${formatMoney(deptTotal)}\n`;
    report += `  Average Salary: ${formatMoney(deptAvg)}\n`;
  }

  writeReport(outputPath, report);
}

function generateDepartmentReport(employees, department, outputPath) {
  const filtered = employees.filter(
    (e) => String(e.department).toLowerCase() === String(department).toLowerCase()
  );

  const count = filtered.length;
  const totalSalary = filtered.reduce((sum, e) => sum + (Number(e.salary) || 0), 0);
  const avgSalary = count ? totalSalary / count : 0;

  let report = "";
  report += "DEPARTMENT REPORT\n";
  report += "=================\n\n";
  report += `Department: ${department}\n`;
  report += `Number of Employees: ${count}\n\n`;

  report += "Employees (Name - Salary):\n";
  report += "--------------------------\n";

  if (count === 0) {
    report += "No employees found in this department.\n";
  } else {
    for (const emp of filtered) {
      report += `- ${emp.name} - ${formatMoney(emp.salary)}\n`;
    }
  }

  report += `\nTotal Salary: ${formatMoney(totalSalary)}\n`;
  report += `Average Salary: ${formatMoney(avgSalary)}\n`;

  writeReport(outputPath, report);
}

function generateTopEarnersReport(employees, count, outputPath) {
  const n = Number(count);
  const topN = Number.isFinite(n) && n > 0 ? n : 5;

  const sorted = [...employees].sort((a, b) => (Number(b.salary) || 0) - (Number(a.salary) || 0));
  const selected = sorted.slice(0, topN);

  let report = "";
  report += "TOP EARNERS REPORT\n";
  report += "==================\n\n";
  report += `Top ${topN} Earners:\n`;
  report += "---------------\n";

  if (selected.length === 0) {
    report += "No employees available.\n";
  } else {
    selected.forEach((emp, idx) => {
      report += `${idx + 1}. ${emp.name} | ${emp.department} | ${formatMoney(emp.salary)}\n`;
    });
  }

  writeReport(outputPath, report);
}

module.exports = {
  generateSummaryReport,
  generateDepartmentReport,
  generateTopEarnersReport
};

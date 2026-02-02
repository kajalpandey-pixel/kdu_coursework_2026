const fs = require("fs");
const path = require("path");

/**
 * @param {string} filePath 
 * @returns {Array<{id:number,name:string,department:string,salary:number,age:number}>}
 */
function readEmployeeData(filePath) {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Employee data file not found: ${absolutePath}`);
  }

  const raw = fs.readFileSync(absolutePath, "utf-8");

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON in file: ${absolutePath}`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Employee data must be an array.");
  }

  return parsed;
}

module.exports = { readEmployeeData };

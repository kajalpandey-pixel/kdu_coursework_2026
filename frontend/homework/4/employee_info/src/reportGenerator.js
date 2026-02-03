const fs = require("fs");
const path = require("path");

/**

 * @param {string} filePath
 * @param {string} content -
 */
function writeReport(filePath, content) {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);

  const dir = path.dirname(absolutePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(absolutePath, content, "utf-8");
}

module.exports = { writeReport };

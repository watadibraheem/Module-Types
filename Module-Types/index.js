// Programmers: Ibraheem Watad, Karim Biadsy
// This program reads lines from multiple input files located in the "text" folder and writes them to an output file.

const fs = require("fs");
const readline = require("readline");
const path = require("path");

// Folder containing input files
const folderPath = path.join(__dirname, "text");

const inputFiles = [
  "input1.txt",
  "input2.txt",
  "input3.txt",
  "input4.txt",
  "input5.txt",
  "input6.txt",
  "input7.txt",
  "input8.txt",
  "input9.txt",
  "input10.txt",
].map((file) => path.join(folderPath, file));

const outputFile = path.join(__dirname, "output.txt");

// Function to read 'n' lines from a file
const readLines = async (filePath, linesToRead) => {
  const lines = [];
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (lines.length < linesToRead) {
      lines.push(line);
    } else {
      break;
    }
  }
  return lines;
};

// Main function to process files and write to output
const processFiles = async () => {
  const outputStream = fs.createWriteStream(outputFile);

  for (let i = 0; i < inputFiles.length; i++) {
    const fileName = inputFiles[i];
    const linesToRead = i + 1; // Read 'i+1' lines from the (i+1)th file

    try {
      const lines = await readLines(fileName, linesToRead);
      lines.forEach((line) => outputStream.write(line + "\n"));
    } catch (error) {
      console.error(`Error reading ${fileName}:`, error.message);
    }
  }

  outputStream.end();
  console.log(`Content written to ${outputFile}`);
};

// Run the main function
processFiles();

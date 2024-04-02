
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const server = Bun.serve({
  port: 8080, // You can change this to your desired port number
  fetch(request) {
    return new Response("Hello from Bun server!");
  },
});


async function getFiles(directoryPath:string) {
  try {
    const fileNames = await readdir(directoryPath);
    // const filePaths = fileNames.map(fileName => join(directoryPath, fileName));
    const onlyNotHidden = fileNames.filter((fileName) => !fileName.startsWith('.'));
    return onlyNotHidden;
  } catch (err) {
    console.error("Error reading directory:", err);
    return []; // Handle or return an empty array on error
  }
}

// Example usage
const targetDir = "/home/tchisama"; // Replace with your actual directory

getFiles(targetDir)
  .then(filePaths => {
    console.log("Files in", targetDir, ":");
    filePaths.forEach(filePath => console.log(filePath));
  })
  .catch(error => console.error("Error getting files:", error));





console.log(`Listening on ${server.url}`);

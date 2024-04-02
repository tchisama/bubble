import { Elysia } from "elysia";
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { cors } from '@elysiajs/cors'


const app = new Elysia()
    .use(cors())





app.post("/filelist", async (context)=>{
  const { path } =  context.body as { path: string };
  const files = await getFiles(path);
  const filesWithoutHidden = files.filter(file => !file.startsWith('.'));
  const makeFileObject = (file: string) => {
    return {
      name: file.split('/').pop(),
      path: file,
      // i want the type if its folder or file
      type: file.split('/').pop()?.includes('.') ? 'file' : 'folder',
    };
  }
  return filesWithoutHidden.map(makeFileObject).filter(file=>!file.name?.startsWith('.'));
})
app.get("/", ()=> {
  console.log("Hello World")
  return "Hello World"});


app.listen(8080);









console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);





async function getFiles(directoryPath:string) {
  try {
    const fileNames = await readdir(directoryPath);
    const filePaths = fileNames.map(fileName => join(directoryPath, fileName));
    return filePaths;
  } catch (err) {
    console.error("Error reading directory:", err);
    return []; // Handle or return an empty array on error
  }
}



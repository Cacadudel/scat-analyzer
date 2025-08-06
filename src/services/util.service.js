import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  const utilService = {
    getLastID,
    incrementID,
    getAndIncrementID
  };

async function getLastID(idCounterPath){
    const dataPath = path.join(__dirname, idCounterPath);
    const data = await fs.readFile(dataPath, "utf8");
    return  +data;
}

async function incrementID(idCounterPath,newID){
   const dataPath = path.join(__dirname, idCounterPath);
   await fs.writeFile(dataPath,String(newID),"utf-8");
}

async function getAndIncrementID(idCounterPath) {
  let id = await getLastID(idCounterPath);
  id+=1;
  await incrementID(idCounterPath,id);
  return id;
}

export default utilService;
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import utilService from "./util.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "scat-reports.json");

const SCAT_ID_COUNTER_PATH = "scatIdCounter.txt";

var scatIdCounter = 1;

const initializeScatData = async () => {
  try {
    await fs.access(dataPath);
  } catch {
    await fs.writeFile(dataPath, JSON.stringify([]));
  }
};

const getScatById = async (id) => {
  console.log("id: ", id);
  await initializeScatData();
  const data = await fs.readFile(dataPath, "utf8");
  console.log("data: ", data[0]);
  const scat = data.find((s) => s.id === id);
  console.log("scat: ", scat);
  return scat;
};

const getScatByHorseId = async (id) => {
  await initializeScatData();
  const data = await fs.readFile(dataPath, "utf8");
  const scats = data.filter((s) => s.horse - id === id);
  return scats;
};

async function createScat (scatReport){
  let {hid,uid,img_urls,img_creation_date,consistency,dryness,comments} = scatReport;
  await utilService.getLastID(SCAT_ID_COUNTER_PATH);
}




export const scatService = {
  getScatById,
  getScatByHorseId,
};

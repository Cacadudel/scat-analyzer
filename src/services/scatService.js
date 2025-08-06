import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import utilService from "./util.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "scat-reports.json");

const SCAT_ID_COUNTER_PATH = "scatIdCounter.txt";


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
  const dataJson = await JSON.parse(data);
  console.log("data: ", dataJson[0]);
  const scat = dataJson.find((s) => s.id === id);
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
  const idCounter = await utilService.getAndIncrementID(SCAT_ID_COUNTER_PATH);
  const newScat = {
    ...scatReport,
    id: `sid-${idCounter}`,
    created_at: new Date(),
    updated_at: new Date(),
  };
  console.log("New Scat:", newScat);
  //TODO: save to scat-report.json
}




export const scatService = {
  createScat,
  getScatById,
  getScatByHorseId,
};

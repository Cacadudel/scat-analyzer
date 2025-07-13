import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "scat-reports.json");

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

export const scatService = {
  getScatById,
  getScatByHorseId,
};

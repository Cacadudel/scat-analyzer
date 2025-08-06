import {scatService} from "../services/scatService.js"


async function getScatById(req, res) {
  console.log("getScatById");
  try {
    const scat = await scatService.getScatById(req.params.id);
    if (!scat) return res.status(404).send({ error: "Not found" });
    res.json(scat);
  } catch (err) {
    return res.status(404).send({ error: err });
  }
}

async function getScatByHorseId(req, res) {
  try {
    const scat = await scatService.getScatByHorseId(req.params.hid);
    if (!scat) return res.status(404).send({ error: "Not found" });
    res.json(scat);
} catch (err) {
    return res.status(404).send({ error: err });
  }
}

async function createScat(req,res){
  
  console.log("controller.createScat:" , req.body);
  let horse_id,vet_id,img_urls,img_creation_date,consistency,dryness,comments = req.body;
}

export default {
  createScat,
  getScatById,
  getScatByHorseId
};

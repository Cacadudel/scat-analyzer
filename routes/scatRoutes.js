import express from "express";
import scatController from "../src/controllers/scatController.js"

const router = express.Router();

router.get("/", scatController.getScatById);
router.get("/:id", scatController.getScatById);
router.get("/:hid", scatController.getScatByHorseId);
router.post("/", scatController.createScat);

// router.put("/:id", scatController.updateBook);
// router.delete("/:id", scatController.deleteBook);
// router.get("/:id/details", scatController.getBookWithAuthor);

export default router;

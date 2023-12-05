//Rotas da API
const express = require("express");
const router = express.Router();

const UserController = require("./controllers/UserController");
const MateriaController = require("./controllers/MateriaController");


router.post("/usuario", UserController.logar);



router.post("/marcarComoCursada", MateriaController.marcarComoCursada);
router.post("/cadastroMateria", MateriaController.cadastrarMateria);
router.get("/materiasACursar", MateriaController.getMateriasACursar);
router.get("/materiasCursadas", MateriaController.getMateriasCursadas);

module.exports = router;
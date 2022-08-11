const router = require("express").Router();
const userCtrl = require('../controllers/userCtrl');
const { upload } = require('../multerConfig')

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.put("/update", userCtrl.updateUser);
router.get("/logout", userCtrl.logout);
router.get("/:id", userCtrl.getUser);
router.get("/all/users", userCtrl.getAllUsers);
router.delete("/delete/:id", userCtrl.deleteUser)


router.put("/upload", upload.single('file'), userCtrl.updatePic)

module.exports = router;
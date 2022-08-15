const router = require("express").Router();
const postCtrl = require('../controllers/postCtrl');
const { upload } = require('../multerConfig');

router.post("/add", upload.single('file'), postCtrl.addPost);
router.get("/all", postCtrl.getAllPosts);
router.delete("/delete/:id", postCtrl.deletePost);
router.put("/update/:id", postCtrl.updatePost);
router.get("/update/:id", postCtrl.getOnePost)

//likes
router.post("/like/:id", postCtrl.likePost)
router.get("/likes", postCtrl.allLikes)
router.get("/likes/:id", postCtrl.likesByPost)

//comments
router.post('/comments/:id', postCtrl.addComments);
router.get('/comments/all', postCtrl.getComments);
router.get('/comments/update/:id', postCtrl.getOneComment);
router.delete('/comments/delete/:id', postCtrl.deleteComment);
router.put('/comments/update/:id', postCtrl.updateComment);

module.exports = router;
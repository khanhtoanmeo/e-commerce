const db = require("../models");
const uuid = require("uuid");
const upload = require("../imageStorageConfig");
const storage = require("../firebase");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

async function CreatePost(req, res, next) {
  try {
    const { image, description, price, user_id, name, type } = req.body;
    const id = uuid.v4();

    if (!image || !description || !price || !user_id || !name || !type)
      return next(new Error("Thiếu thông tin hoặc thông tin không hợp lệ"));
    const post = await db.Post.create({
      id,
      image,
      description,
      price,
      user_id,
      name,
      type,
    });

    return res.json({ status: "Ok", post });
  } catch (err) {
    next(new Error(err.message));
  }
}

async function GetAllPosts(req, res, next) {
  try {
    const posts = await db.Post.findAll();
    return res.json({ status: "Ok", posts });
  } catch (err) {
    next(new Error(err.message));
  }
}

async function UploadImage(req, res, next) {
  try {
    upload.single("image")(req, res, async (err) => {
      const file = req.file;
      if (!file) return next(new Error("Không load được ảnh"));
      const storageRef = ref(
        storage,
        `images/${new Date().toISOString() + file.originalname}`
      );

      const snapshot = await uploadBytes(storageRef, file.buffer);
      const imageURL = await getDownloadURL(snapshot.ref);

      res.json({ status: "Ok", imageURL });
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

module.exports = {
  CreatePost,
  GetAllPosts,
  UploadImage,
};

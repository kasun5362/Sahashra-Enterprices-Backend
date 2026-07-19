import { isUserNull } from "./userController.js";

export const uploadImage = (req, res) => {
  try {
    if (isUserNull(req)) {
      return res.status(401).json({
        message: "You are not authorized to perform this task",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No image file provided",
      });
    }

    // The Cloudinary URL is returned in req.file.path by multer-storage-cloudinary
    res.status(200).json({
      url: req.file.path,
      message: "Image uploaded successfully",
    });
  } catch (e) {
    console.error("Error in uploadImage:", e);
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
};

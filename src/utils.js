import { dirname } from "path";
import { fileURLToPath } from "url";
// import multer from "multer";

export const __dirname = dirname(fileURLToPath(import.meta.url));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads"); // Directorio donde se guardarán las imágenes
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extension = file.mimetype.split("/")[1];
//     cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`); // Nombre del archivo
//   },
// });

// export const upload = multer({ dest: 'src/uploads/' });

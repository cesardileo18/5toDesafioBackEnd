import { Server } from "socket.io";
// import cloudinary from 'cloudinary'
import ProductManager from "./clases/ProductManager.js";
// import multer from 'multer';

// En algun momento le voy a poder agregar los thumbnails
// const storage = multer.diskStorage({
//   destination: './src/uploads/',
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

const productManager = new ProductManager("./src/db/products.json");

const configureWebSockets = (server) => {
  const io = new Server(server);

  // Configurar eventos de Socket.io
  io.on("connection", (socket) => {
    console.log("cliente conectado");

    // Evento para emitir la lista de productos actualizada a los clientes
    const emitProductList = async () => {
      const products = await productManager.getProducts();
      socket.emit("productList", products);
    };

    // Emitir la lista de productos al cliente recién conectado
    emitProductList();

    // Escuchar el evento de creación de un nuevo producto
    socket.on("createProduct", async (productData) => {
      try {
        // const { title, description, price, code, stock, category } =
        // productData;

        // Subir la imagen a Cloudinary
        // const result = await cloudinary.v2.uploader.upload(thumbnail);

        // Obtener el enlace de la imagen de Cloudinary
        // const thumbnailUrl = result.secure_url;

        await productManager.addProduct(productData);
        emitProductList();
      } catch (error) {
        console.error("Error creando el producto:", error);
      }
    });

    // Escuchar el evento de eliminación de un producto
    socket.on("deleteProduct", async (productId) => {
      await productManager.deleteProduct(productId);
      emitProductList();
    });

    // Manejar la desconexión del cliente
    socket.on("disconnect", () => {
      console.log("cliente desconectado");
    });
  });
};
export default configureWebSockets;

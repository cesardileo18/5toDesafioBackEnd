const socket = io();
// Escuchar el evento 'productList' y actualizar la lista de productos
socket.on("productList", (products) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  function generarTabla(products) {
    // Verificar si los elementos de datos tienen las propiedades "status" y "thumbnails"
    const tieneStatus = products.every((elemento) => "status" in elemento);
    const tieneThumbnails = products.every((elemento) => "thumbnails" in elemento);

    // Agregar las propiedades "status" y "thumbnails" a los elementos que no las tienen
    if (!tieneStatus) {
      products.forEach((elemento) => {
        if (!("status" in elemento)) {
          elemento.status = "Sin datos";
        }
      });
    }
    // Agregar las propiedades "status" y "thumbnails" a los elementos que no las tienen
    if (!tieneThumbnails) {
      products.forEach((elemento) => {
        if (!("thumbnails" in elemento)) {
          elemento.thumbnails = "Sin datos";
        }
      });
    }
    const tabla = document.createElement('table');
    tabla.className = "table table-responsive table-hover"
    // Crear encabezado de la tabla
    const encabezado = document.createElement('thead');
    const encabezadoFila = document.createElement('tr');
    const encabezadoColumnas = Object.keys(products[0]);
    encabezadoColumnas.forEach(columna => {
      const th = document.createElement('th');
      th.textContent = columna;
      encabezadoFila.appendChild(th);
    });
    encabezado.appendChild(encabezadoFila);
    tabla.appendChild(encabezado);
    // Crear cuerpo de la tabla
    const cuerpoTabla = document.createElement('tbody');
    products.forEach(producto => {
      const fila = document.createElement('tr');
      for (const prop in producto) {
        let celda = document.createElement('td');
        celda.textContent = producto[prop];
        fila.appendChild(celda);
      }
      cuerpoTabla.appendChild(fila);
    });
    tabla.appendChild(cuerpoTabla);
    return tabla;
  }
  const tablaProductos = generarTabla(products);
  productList.appendChild(tablaProductos);
});
const createProductForm = document.getElementById('createProductForm');
createProductForm.addEventListener('submit', event => {
  event.preventDefault();
  const title = createProductForm.elements.title.value;
  const description = createProductForm.elements.description.value;
  const price = createProductForm.elements.price.value;
  const code = createProductForm.elements.code.value;
  const stock = createProductForm.elements.stock.value;
  const category = createProductForm.elements.category.value;
  // const thumbnailFile = createProductForm.elements.thumbnail.files[0];

  // Crear un objeto FormData para enviar los datos y la imagen como una solicitud multipart/form-data
  const formData = {
    title: title,
    description: description,
    price: price,
    code: code,
    stock: stock,
    category: category,
    // thumbnail: thumbnailFile);
  }
  socket.emit('createProduct', formData); // Enviar los datos y la imagen como FormData
  createProductForm.reset();
});
// Enviar el evento 'deleteProduct' cuando se envíe el formulario de eliminación de productos
const deleteProductForm = document.getElementById("deleteProductForm");
deleteProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const productId = deleteProductForm.elements.productId.value;
  socket.emit("deleteProduct", productId);
  deleteProductForm.reset();
});

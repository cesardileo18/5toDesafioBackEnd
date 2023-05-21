
### Desafio:
- Todos los archivos excepto el README, los package.json y el .gitignore pasaron a estar en la carpeta /src.
- /config → Carpeta para la configuracion de bases de datos, Cludinary por ejemplo.
- /clases → Carpeta clases CartManager y ProductManager.
- /db → Carpeta para las bases de datos.
- /public → Carpeta estatica para la ruta './':
    + index.js aca va a estar el script de la vista realTimeProducts.hbs.
    + bootstrap
    + css 
- /router '/' (views):
    + GET '/' render home.hbs
    + GET '/realTimeProducts' render realTimeProducts.hbs
- En /views estan las vistas home y realTimeProducts.hbs

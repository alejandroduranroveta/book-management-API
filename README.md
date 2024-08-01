# Proyecto de Gestión de Libros

Este proyecto es un servicio de gestión de libros desarrollado realizado por Mario Alejandro Duran Roveta con NestJS. Permite crear, actualizar y gestionar libros, asi como crear autores y editoriales.


## Instalación

1. Clona el repositorio o descarga el release
   Para clonar el repositorio 
    ```bash
    git clone https://github.com/alejandroduranroveta/book-management-API.git
    ```
3. Navega al directorio del proyecto:
    ```bash
    cd book-management-API/book-management
    ```
3. Levanta los contenedores con Docker Compose:
    ```bash
    docker-compose up
    ```

## Uso

La API estará disponible en `http://localhost:3000`.

Para usar la colección de Postman:
Es necesario descargar la coleccion de la carpeta *PostmanCollection* y ese archivo importarlo en Postman

### Endpoints

- `POST /authors`: Crear un nuevo autor.
- `POST /publisher`: Crear un nuevo editorial.

- `POST /books`: Crear un nuevo libro.
- `GET /books/:id`: Obtener un libro segun su id.
- `GET /books`: Obtener una lista de libros.
- `PUT /books/:id`: Actualizar un libro existente.
- `DELETE /books/:id`: Eliminar un libro.

# Aplicación REST con Spring Boot

## Descripción
Esta es una aplicación REST construida con Spring Boot que proporciona endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en recursos específicos. Se utiliza MySQL como base de datos, y Ajax junto con Thymeleaf en el frontend para interactuar con la API.

## Funcionalidades Principales
- Crear nuevos recursos utilizando el método POST.
- Leer recursos existentes utilizando el método GET.
- Actualizar recursos utilizando el método PUT o PATCH.
- Eliminar recursos utilizando el método DELETE.

## Tecnologías Utilizadas
- Java
- Spring Boot
- MySQL
- Maven
- Thymeleaf
- Ajax
- JavaScript

## Requisitos Previos
- Tener instalado Java Development Kit (JDK).
- Tener una instancia de MySQL ejecutándose localmente o en un servidor remoto.
- Tener Maven instalado.

## Instalación y Ejecución
1. Clona este repositorio.
2. Importa el proyecto en tu IDE preferido (Eclipse, IntelliJ, etc.).
3. Configura las credenciales de acceso a la base de datos en el archivo `application.properties`.
4. Ejecuta la aplicación desde tu IDE o utilizando el comando `mvn spring-boot:run` en la terminal.

## Uso
- Accede a la URL de la aplicación en tu navegador.
- Utiliza las páginas generadas dinámicamente por Thymeleaf para interactuar con los endpoints de la API.
- Utiliza Ajax para realizar operaciones asíncronas en el frontend sin necesidad de recargar la página.

## Validaciones
- **Validación de Datos en el Backend**: Implementa validaciones en el backend utilizando las anotaciones proporcionadas por Spring Boot para garantizar la integridad de los datos.
- **Validación de Datos en el Frontend**: Utiliza JavaScript para validar los datos ingresados por el usuario antes de enviar las solicitudes a la API.
- **Manejo de Excepciones**: Implementa un manejo adecuado de excepciones para devolver respuestas HTTP apropiadas en caso de errores de validación o cualquier otro error interno.

## Contribución
Si deseas contribuir a este proyecto, por favor sigue estos pasos:
1. Haz un fork de este repositorio.
2. Crea una nueva rama con tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un nuevo Pull Request.

## Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

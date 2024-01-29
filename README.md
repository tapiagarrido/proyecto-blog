# Proyecto JavaScript en el Backend

### Proyecto Blog

*Estimado usuario:*
*¡Bienvenido a la configuración API REST para nuestro proyecto de blog! Aquí encontrará los pasos necesarios para poner en funcionamiento este sistema.*

Recomendaciones previas: lo ideal es poseer en tu sistema nodejs v21, nestjs cli, mongodb (mas adelante se genera alternativa)

#### Clonar el Repositorio

Para comenzar, clona el repositorio en tu ambiente local utilizando el siguiente comando:

**git clone https://github.com/tapiagarrido/proyecto-blog.git**

Una vez hemos descargado los archivos en su totalidad, nos posicionaremos en la carpeta blog y descargaremos los paquetes npm

**npm i**

#### Creacion de variables de entorno

genere un archivo llamado .env.development y pegue lo siguiente:

MONGO_URI=mongodb://localhost:27018/blog
JWT_PASSWORD=miclavesecreta
(puede modificar el jwt_password; tambien puede modificar el puerto dependiendo si sera local o virtual)

genere un archivo llamado .env.test y pegue lo siguiente:
MONGO_URI=mongodb://localhost:27018/blog-test
JWT_PASSWORD=miclavesecreta
(puede modificar el jwt_password; tambien puede modificar el puerto dependiendo si sera local o virtual)

Si no desea ejecutar mongodb directamente en su sistema, existe en la raiz del proyecto un archivo .yml para levantar un servicio mongo en el puerto 27018, ademas esta configurado para respaldar los datos dentro de la aplicacion.
Para la opcion mencionada ejecute:

**sudo docker compose up** 

*Si su opcion es mongodb local, modifique el puerto en la variable de entorno.*

### Iniciando sistema

para levantar los servicios, ejecute el siguiente comando

**npm run start:dev**

este script tomara las variables dentro de .env.development y el puerto 3000 (puede modificar segun lo requiera)

el servicio estara funcionando y podra estudiar los endpoints accediendo a :

**http://localhost:3000/docs**

*recuerde que debera registrar un usuario, loguear y tomar el token para los endpoints que exigen autenticacion.*

Si desea conocer el estado de los endpoints, ejecute

**npm run test:e2e**

esto permitira testear todas las tareas de el modulo de usuario y autenticacion (solo las respuestas deseadas y no los errores)





This is the base node js project template, which anyone can use as it has been prepared, by keeping some of the most important code principles and project management recommendations. Feel free to change anything.

`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make it separate folder for it)

Lets take a look inside the `src` folder

 - `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For ex- setting up `dotenv` so that we can use environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup your logging library that can help you to prepare meaning full logs, so configuration for this library should also be done here.

 - `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

 - `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

 - `controllers` -> they are kind of the last middlewares as post them you call your bussiness layer to execute the bussiness logic. In controllers we just recieve the incoming requests and data and then pass it to the bussiness layer, and once bussiness layer returns an output, we structure the API response in controllers and send the output.

 - `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw querires or ORM queries will go here.

 - `services` -> contains the bussiness logic and interacts with repositories for data from the database

 - `utils` -> contains helper methods, error classes etc.

### Setup the Project

 - Download this template from github and open it in your favorite editor.
 - Go inside the folder and execute the following command:
    ```
        npm install
    ```
 - In the root directory create a `.env` file and add the following env variables
    ```
        PORT=< PORT number of your choice
    ```
    ex : 
    ```
        PORT = 3000
    ```
 - go inside the `src` folder and execute the following command:
    ```
        npx sequelize init
    ```
 - By executing the above command you will get migrations and seeders folders along with a config.json folder inside the config folder.
 - If you're setting up your development environment, then write the username of your Db, password of your db and in dialect mention whatever db you are using. For ex: mysql, mariadb etc
 - If you're setting up your test or production environment, make sure you also replace the host with a hosted db url.
 - To run the server, Execute
    ```
        npm run dev
    ```
# rest-api-expreess
 This API will provide a way to administer a school database containing information about users and courses. Users can interact with the database to create new courses, retrieve information on existing courses, and update or delete existing courses. To make changes to the database, users will be required to log in, so the API will also allow users to create a new account or retrieve information on an existing account.


Models folder, in both files, contains SQL model validation:
- unique email
- notNull and notEmptty validation
- foreign key to sync course and user IDs

Used:
- Nodejs
- sequelize, sqlite3, 
- bcrypt, for password protection
- basic-auth, for user authentication
- express

Postman used to explore and test REST API.
DB Browserfor SQLite used for model viewing

Prominent features:
- GET routes filter out password, createdAt, updatedAt properties
- SequelizeUniqueConstraintError for erroring
- Personalized HTTP Status Codes and messages depending on the type of error thrown
- /api/courses/:id PUT and /api/courses/:id DELETE routes ensure that the currently authenticated user is the owner of the requested course
- If the currently authenticated user is not the owner of the requested course a 403 HTTP status code should be returned.



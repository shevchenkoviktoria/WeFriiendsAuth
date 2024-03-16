# User Auth Service  WIP repo (cloned)
The User Authentication Service provides functionality for adding new users to the user pool through various authentication methods, including Email, Facebook, Google, and Gmail. It interacts with MongoDB to store user data and utilizes **bcrypt** for password hashing.

After successful authentication, the service issues JWT tokens containing digitally signed user information, excluding the password, which are subsequently used for authorization in the "Authorization" header of requests to the server.

Thank you for considering contributing to our project! Here's how you can **get started**:

# Setup:

1. Clone the repository to your local machine. 
2. Navigate to the VS Code or other code editor.
3. Install dependencies using ```npm install```
5. Ensure you have access to necessary databases or external services.
6. Create new branch from latest master  ```git checkout -b branch-name```
7. Starts the server by running in the terminal ```npm start``` 
8. Access the API endpoints locally at http://localhost:8080.

# GitHub Packages:

Programming languages: **JavaScript (Node.js)**
Frameworks: **Express.js**
Dependencies: **bcrypt**, **jsonwebtoken**, **mongoose**

**bcrypt** is used for password hashing for users who authenticate via email

After user has been successfully authenticated, **JWT** token is sent back with digitally-signed information about the authenticated user such as their userId, but not the password. It will be sent with each subsequent request to the server in the "Authorization" header.

## Routes

**/api/auth/register** 

POST route, accepts JSON object containing user email and 2 passwords, adds user to the user pool if email is unique (doesn't already exist in the database) and passwords match. A new user is added with "Pending" status pending email confirmation.

**Params**

```
{
    "email": "email@email.com",
    "password": "123456",
    "password2": "123456"
}
```

**Response (if registration was successful)**
```
{
    "message": "Pending registration confirmation for /user email/"
}
```
______________________________

**/api/auth/signin**

POST route, accepts JSON object containing user email and password, checks the validity and user status in the database. Approves user if data is valid and user is "Active". Prompts to check email if user status is still "Pending"

**Params**
```
{
    "email": "email@email.com",
    "password": "123456"
}
```

**Response (for inactive user, or invalid data)**
```
{
    "message": "message"
}
```

**Response (successful login)**
```
{ 
    "message": "login successful", 
    "token": "token"
}
```
______________________________

**/api/auth/confirm/:confirmationCode**

GET route, changes user status from "Pending" to "Active" if confirmation code passes validity check in the database

**Response**
```
{ 
    "message": "message"
}
```
______________________________


**/api/auth/google**

GET route, initiates passport-google authentication.

Please reference Google auth documentation.
______________________________

**/api/auth/google/callback**

GET route, callback route, saves the info of authenticated user in the database if user doesn't exist. Confirms user validity if user exists.

**Response (successful login)**
```
{ 
    "message": "login successful", 
    "token": "token"
}
```
______________________________


**/auth/facebook**

GET route, initiates passport-Facebook authentication.

Please reference Facebook auth documentation.
______________________________


**/auth/facebook/callback**

GET route, callback route, saves the info of authenticated user in the database if user doesn't exist. Confirms user validity if user exists.

**Response (successful login)**
```
{ 
    "message": "login successful", 
    "token": "token"
}
```
______________________________


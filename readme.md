https://www.toptal.com/nodejs/secure-rest-api-in-nodejs


POST
http://localhost:3600/auth
{
    "email": "rbutta@gmail.com",
    "password": "rbutta"
}

---> And get the accessToken from response


Then to list users

GET
http://localhost:3600/users

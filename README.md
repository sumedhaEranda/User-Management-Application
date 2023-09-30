
# Building-a-Task-Management-Application.
### _Asp.Net Web API + React Js_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# 1. How to Setup the Back-End in Your local Computer
#### Please Verify the tool and flowing Prerequisites: 

- Node.js
- Visual Studio (for backend development)
- SqlServerManagemnt (for Database)
- Code Editor of Your Choice (for frontend development)

## Download or Clone a Repository in local Computer

- Go to the Visual Studio tool select to the WebApplicationBackend.sln file and open it

#### Please check  your Connection String in appsettings.json file 
```sh
"ConnectionStrings": {
  "DefaultConnectionString": "server=localhost\\sqlexpress;database=companydb;trusted_connection=true;Encrypt=False;"
},
``` 
#### Create Database in SqL Query in SqlManagemnt Studio
```sh
Create Database companydb;
``` 
- Go to the Package Manager Console in Visual Studio

#### Please follow the command and check for  available Tables in your Database
```sh
PM> dotnet add package Microsoft.EntityFrameworkCore
PM> dir
PM> cd .\WebApplicationBackend
PM> dir
PM> dotnet ef migrations add CreateInitial
PM> dotnet ef database update
```
#### Can We After Run the WebApplicationBackend
[Can you see a URL ] (https://localhost:7260/swagger/index.html

![Annotation 2023-09-29 134848](https://github.com/sumedhaEranda/User-Management-Application/assets/120088434/caf50cc8-67c1-410a-a72a-3bd246286464)



# 2.   How to Setup the Front-End in Your local Computer

#### Download or Clone a Repository in local Computer

- Go to the web-app folder and open it command prompt 
### Following steps
![Alt text](https://github-production-user-asset-6210df.s3.amazonaws.com/120088434/271474321-4a57e390-528c-4d8e-8eb6-367e7a4a273e.png)

![Annotation 2023-09-29 101603](https://github.com/sumedhaEranda/User-Management-Application/assets/120088434/33f63557-f7f6-4580-bf2f-5da190a0fc66)

## Desktop View
![DesktopView](https://github.com/sumedhaEranda/User-Management-Application/assets/120088434/5294d668-aa36-434c-8f3f-ff64d8a6623e)


## Mobile View
![MobileView](https://github.com/sumedhaEranda/User-Management-Application/assets/120088434/c0197b31-ca22-449c-8fd3-fdfd27bb2d09)



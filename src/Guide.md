# updating package.json

```json
{
  "name": "customers",
  "version": "1.0.0",
  "description": "",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js"
  },
  "author": "",
  "license": "ISC"
}
```

# Run

```powershell
npm run start
```

# Basic dependencies

```powershell
# generate random identifiers
npm install uuid
```

```powershell
# for making website
npm install express
```

# setup git

```bash
git init
git status
```

- gitIgnore

  search: toptal node.js gitIgnore
  and paste in gitIgnore file

```bash
git add .
git commit -m "Initial commit"
git log
```

**creating repository name nodejs**

```bash
git remote add origin https://github.com/DhruvJais01/nodejs.git
git branch -M main
git push -u origin main
```

# Testing requests using postman

- GET method

```javascript
app.get("/", (req, res) => {
  res.send("Hello, world");
});
```

- POST method

```javascript
app.post("/", (req, res) => {
  res.send("This is a post request");
});
```

# nodemon

```bash
# it automatically refreshes server if any changes made in code
npm install nodemon

# to run
npx nodemon src/app.js
```

and changing in package.json

```json
"scripts": {
    "start": "npx nodemon src/app.js"
}
```

if we are using nodemon we can omit the src/app.js from script, nodemaon will automatically read from main property

```json
{
  "name": "customers",
  "version": "1.0.0",
  "description": "",
  "main": "src/app.js",
  "scripts": {
    "start": "npx nodemon"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "nodemon": "^3.1.0",
    "uuid": "^9.0.1"
  }
}
```

# JSON

using JSON data in app and playing around in postman

```javascript
const customers = [
  { name: "Caleb", industry: "music" },
  { name: "John", industry: "networking" },
  { name: "Sal", industry: "sports medicine" },
];

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/api/customers", (req, res) => {
  res.send({ customers: customers });
});
```

**POST REQUEST**

_how we can send a body to a api request?_
_to send data to backend_

for POST requests we need to add these code otherwise itll show undefined in terminal

```javascript
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

![alt text](image.png)

```javascript
app.post("/api/customers", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
```

# MongoDB

1. Created a cloud database
2. installing packages

   ```powershell
   npm install mongoose
   ```

3. importing mongoose
   ```javascript
   const mongoose = require("mongoose");
   mongoose.set("strictQuery", false);
   ```
4. implementing hardcoded

   ```javascript
   const start = async () => {
     try {
       await mongoose.connect(
         "mongodb+srv://dhruvjaiswal400:dHRUv_n9@cluster0.xxq9arr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
       );

       app.listen(PORT, () => {
         console.log("App listening on port " + PORT);
       });
     } catch (e) {
       console.log(e.message);
     }
   };

   start();
   ```

# Environment variables

**Preview**

```javascript
const PORT = process.env.PORT || 3000;
```

```powershell
PORT=3002 npm start
# or
PORT=3002 npm run start #(run explicitly from different starting point)
# or
PORT=3002 npx nodemon
# or
PORT=3002 npx nodemon src/app.js
```

**env**

1. installing dotenv package

```bash
npm install dotenv
```

2 . creating .env file in root folder and creting variables

```env
PORT=3005
```

3. importing dotenv package

```javascript
const dotenv = require("dotenv");
dotenv.config();
```

4. to run

```powershell
NODE_ENV=production npm run start
```

_**better way to do it**_

```javascript
// this way we dont have to import dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
```

```powershell
npm run start
```

**Same with Connection**

```javascript
const CONNECTION = process.env.CONNECTION;

//inside start function
await mongoose.connect(CONNECTION);
```

adding environment variables in .env file

```env
CONNECTION=mongodb+srv://dhruvjaiswal400:dHRUv_n9@cluster0.xxq9arr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

```

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

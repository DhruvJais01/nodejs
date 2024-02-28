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

# Models and working with schema in Mongodb database

1. created customer(model) in src/models folder

```javascript
const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  name: String,
  industry: String,
});

module.exports = mongoose.model("Customer", customerSchema);
// in mongodb the table name is always in lowercase and pluralized
// it doesnt matter if you write customer
```

2. implentation in application

```javascript
const Customer = require("./models/customer");
```

_sneak peek_

```javascript
const customer = new Customer({
  name: "caleb",
  industry: "marketing",
});

customer.save(); // it saves the customer data in cloud database

app.get("/", (req, res) => {
  res.send(customer);
});
```

# Reading data from collection

finds all customers from Customer collection and store in result and pass it for request

here res.read or res.json are same thing

```javascript
app.get("/api/customers", async (req, res) => {
  try {
    const result = await Customer.find();
    res.json({ customers: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
```

# Writing data to collection

### Changing collection name

write the name between '/' and '?' in CONNECTION

```env
CONNECTION=mongodb+srv://dhruvjaiswal400:dHRUv_n9@cluster0.xxq9arr.mongodb.net/customers?retryWrites=true&w=majority&appName=Cluster0
```

```javascript
app.post("/api/customers", async (req, res) => {
  console.log(req.body);
  // here we are sending data from code
  const customer = new Customer({ name: "kamal", industry: "sports" });

  try {
    await customer.save();
    res.status(200).json({ customer });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
```

**another way to provide value to each of fields for customer**

```javascript
// this way we can save data from client side
app.post("/api/customers", async (req, res) => {
  console.log(req.body);
  // here we are sending data from code
  const customer = new Customer({
    name: req.body.name,
    industry: req.body.industry,
  });

  try {
    await customer.save();
    res.status(200).json({ customer });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
```

_We can short this code providing only request body, because object
is matching the structure of the schema_

```javascript
const customer = new Customer(req.body);
```

**setting field to required**

```javascript
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: String,
});
```

# Parameterized URLs and Query String Parameters

### parameterized url

_sneak peek_

```javascript
app.get("/api/customers/:id", async (req, res) => {
  res.json({ requestParams: req.params });
});
```

```url parameters
http://localhost:3005/api/customers/65dda5714670659d0f6ec28d
```

```json
{
  "requestParams": {
    "id": "65dda5714670659d0f6ec28d"
  }
}
```

the :id is parameterized url, so when u give extra path like "/api/customers/..." then it will return the id of the customer which is the request parameter

if u want more than one request parameter u need to follow the convention like "/:pathname" otherwise it will open different page.

```javascript
app.get("/api/customers/:id/:test", async (req, res) => {
  res.json({ requestParams: req.params });
});
```

```url parameters
http://localhost:3005/api/customers/65dda5714670659d0f6ec28d/hello
```

```json
{
  "requestParams": {
    "id": "65dda5714670659d0f6ec28d",
    "test": "hello"
  }
}
```

### Query parameters

Request parameters starts with '?' and if u want to add more use '&'

_sneak peek_

```javascript
app.get("/api/customers/:id/:test", async (req, res) => {
  res.json({ requestParams: req.params, requestQuery: req.query });
});
```

```url parameters
http://localhost:3005/api/customers/65dda5714670659d0f6ec28d/hello?age=23&state=ohio
```

```json
{
  "requestParams": {
    "id": "65dda5714670659d0f6ec28d",
    "test": "hello"
  },
  "requestQuery": {
    "age": "40",
    "state": "ohio"
  }
}
```

**getting customer from id**

```javascript
app.get("/api/customers/:id", async (req, res) => {
  console.log({ requestParams: req.params, requestQuery: req.query });
  // const customerId = req.params.id;
  try {
    const { id: customerId } = req.params; // destructuring
    console.log(customerId);
    const customer = await Customer.findById(customerId);
    console.log(customer);
    if (!customer) {
      res.status(404).json({ error: "user not found" });
    } else {
      res.json({ customer });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
```

# Updadting data with PUT requests

```javascript
app.put("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const result = await Customer.replaceOne({ _id: customerId }, req.body);
    console.log(result);
    res.json({ updatedCount: result.modifiedCount });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
```

# Deleting data

```javascript
app.delete("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const result = await Customer.deleteOne({ _id: customerId });
    res.json({ deletedCount: result.deletedCount });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
```

# Adding frontend react js project

### Installing cors

it makes connection between different origin server and project

```bash
npm install cors
```

```javascript
const cors = require("cors");

app.use(cors());
```

**In shared.js file from react folder**

```javascript
export const baseUrl = "http://localhost:3005/";
```

- set the url of nodejs server

- and set the id to \_id in customers.js (mongodb default) so we can change data selected from id
- and set POST request to PUT request in customer.js
- Now everythings is fine in react project but still put request not working fine because we are getting updated counts from server instead of customer object

```json
{
  "updatedCount": 1
}
```

_modifying put request_

```javascript
app.put("/api/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findOneAndReplace(
      { _id: customerId },
      req.body,
      { new: true } // if we not pass this property, server return old data after updating in database
    );
    console.log(customer);
    res.json({ customer });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});
```

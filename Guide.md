```powershell
npm init

# default configuration
npm init -y
```

## if you want to re install project from dependencies

```powershell
npm install
```

or

```powershell
npm i
```

## for more information

https://www.npmjs.com/

## type module

```javascript
// in react
import {v4 as uuidv4} from 'uuid`;
```

- to use this type of coding (ES6 only), we need to change settings in package.json

```json
{
  "name": "customers",
  "type": "module", // for react
  "version": "1.0.0",
  "description": "",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "uuid": "^9.0.1"
  }
}
```

# Git

if u want to change ssh to http url

```bash
git remote set-url origin https://github.com/DhruvJais01/nodejs.git
``
```

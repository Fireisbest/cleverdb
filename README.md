<p align="center"><a href="https://nodei.co/npm/superchatbot/"><img src="https://nodei.co/npm/cleverdb.png"></a></p>
<p align="center"><img src="https://img.shields.io/npm/v/cleverdb?style=for-the-badge"> <img src="https://img.shields.io/npm/dt/cleverdb?style=for-the-badge">

# Cleverdb
## cleverdb is here to provide an easy way for beginners and people of all levels to access & store data in a low to medium volume environment

#
### 📂 [NPM](https://www.npmjs.com/package/cleverdb)
#

# Example

### Javascript
```js
const db = require('cleverdb');

// Setting an object in the database:
db.set('userInfo', { difficulty: 'Easy' })
// -> { difficulty: 'Easy' }

// Pushing an element to an array (that doesn't exist yet) in an object:
db.push('userInfo.items', 'Sword')
// -> { difficulty: 'Easy', items: ['Sword'] }

// Adding to a number (that doesn't exist yet) in an object:
db.add('userInfo.balance', 500)
// -> { difficulty: 'Easy', items: ['Sword'], balance: 500 }

// Repeating previous examples:
db.push('userInfo.items', 'Watch')
// -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 500 }
db.add('userInfo.balance', 500)
// -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 1000 }

// Fetching individual properties
db.get('userInfo.balance') // -> 1000
db.get('userInfo.items') // ['Sword', 'Watch']
```

# Installation
Windows and Linux
  - `npm i cleverdb`

# :D
Feel Free to Use this and you could make your own Db with my Code , and i would not say any thing :)

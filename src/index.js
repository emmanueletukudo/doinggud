const express = require('express')
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const app = express()
const port = 9000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/create", async (req, res, next) => {
  try {
    const ipfsOptions = { repo: './ipfs' }
    const ipfs = await IPFS.create(ipfsOptions)
    const orbitdb = await OrbitDB.createInstance(ipfs)

    const db1 = await orbitdb.keyvalue('users')
    await db1.put('name', 'Emmanuel Etukudo')
    await db1.close()

    const db2 = await orbitdb.keyvalue('users')
    await db2.load()
    const value = db2.get('name')
    res.json(value);
  } catch (error) {
    console.log(error);
  }
  next();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

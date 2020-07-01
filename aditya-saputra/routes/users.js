var express = require('express');
var router = express.Router();
const Users = require('../models/users')

async function getUsers(req, res, next) {
  let user;
  try {
    user = await Users.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cant find user'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }
  res.user = user
  next()
}

router.get('/', async (req, res) => {
  try {
    const user = await Users.find()
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', getUsers, (req, res) => {
  res.json(res.user)
})

router.get('/:accountNumber', async (req, res) => {
  try {
    const user = new Users.find(accountNumber)
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/users/login', async(req, res) => {
  //Login a registered user
  try {
      const { email } = req.body
      const user = await User.findByCredentials(email)
      if (!user) {
          return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      }
      const token = await user.generateAuthToken()
      res.send({ user, token })
  } catch (error) {
      res.status(400).send(error)
  }

})

router.post('/', async (req, res) => {
  const users = new Users({
    userName: req.body.userName,
    accountNumber: req.body.accountNumber,
    emailAddress: req.body.emailAddress,
    identityNumber: req.body.identityNumber,
  })

  try {
    const newUsers = await users.save()
    res.status(201).json(newUsers)

    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', getUsers, async (req, res) => {
  if (req.body.userName != null) {
    res.user.userName = req.body.userName
  }

  if (req.body.accountNumber != null) {
    res.user.accountNumber = req.body.accountNumber
  }

  if (req.body.emailAddress != null) {
    res.user.emailAddress = req.body.emailAddress
  }

  if (req.body.identityNumber != null) {
    res.user.identityNumber = req.body.identityNumber
  }

  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch {
    res.status(400).json({ message: err.message })
  }

})

router.delete('/:id', getUsers, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'Deleted This Users' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})



module.exports = router;

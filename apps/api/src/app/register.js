const express = require('express');
const router = express.Router();
const User = require('./models/user');

router.post('/register', async (req, res) => {
  try {
    const dto = req.body;
    const existUsername = await User.findOne({ email: dto.email });
    if (existUsername) {
      console.log('Email taken');
      res.status(400);
      res.send({ message: 'User already exists!' });
    } else {
      User.create(dto);
      res.status(200);
      res.send({ message: 'User Created' });
    }
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send({ error: e });
  }
});

module.exports = router;

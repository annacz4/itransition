const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try {
    const dto = req.body;
    const user = await User.findOne({ email: dto.email });

    if (user) {
        if (user.password === dto.password) {
            const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '3600s'});
            res.json(token);
        }
    }
  } catch (e) {
    res.status(500);
    res.send({ error: e });
  }
});

module.exports = router;
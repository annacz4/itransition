const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
  try {
    const dto = req.body;
    const user = await User.findOne({ email: dto.email });

    if (user) {
        if (user.password === dto.password) {
            res.status(200);
            res.send();
        }
    }
  } catch (e) {
    res.status(500);
    res.send({ error: e });
  }
});

module.exports = router;
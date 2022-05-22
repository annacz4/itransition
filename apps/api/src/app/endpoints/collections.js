const express = require('express');
const router = express.Router();
const Collections = require('../models/collection');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mutler = require('multer');
const { readFileSync } = require('fs');
const { join } = require('path');

const storage = mutler.diskStorage({
  destination: join(__dirname, '/uploads/'),
  filename: (req, file, next) => {
    console.log(file)
    next(null, file.originalname);
  },
});

const upload = mutler({ storage });

router.get('/collections', async (req, res) => {
  try {
    // console.log(req.headers['authorization']);
    const token = req.headers['authorization'];
    const { email } = jwt.verify(token, 'secret');
    const result = await User.findOne({ email });
    res.status(200);
    res.json(result.collections);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send({ error: e });
  }
});

router.post('/collections', upload.single('image'), async (req, res) => {
  try {
    const token = req.headers['authorization'];
    const { email } = jwt.verify(token, 'secret');
    const user = await User.findOne({ email });

    const newCollectionItem = new Collections.collectionModel({
      name: req.body.name,
      description: req.body.description,
      topic: req.body.topic,
      deleted: false,
      image: new Collections.collectionImageModel({
        name: req.file.filename,
        img: {
          data: readFileSync(
            join(__dirname, '/uploads/', req.file.originalname)
          ),
          contentType: req.file.mimetype,
        },
      }),
    });

    if (!user.collections) {
      user.collections = [
        newCollectionItem
      ];
    } else {
      user.collections.push(newCollectionItem);
    }

    await user.save();

    // if (!user.collections) {
    //   user.collections = [

    //     // { name: 'test', description: 'test2', topic: 'test3' },
    //   ];
    // } else {
    //   user.collections.push({});
    // }
    // // console.log(user);
    // await user.save();
    // user.collections.push({ name: 'test', description: 'test2', topic: 'test3'});
    res.status(200);
    res.send();
    // console.log(user);
    // user.save();
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send({ error: e.message });
  }
});

module.exports = router;

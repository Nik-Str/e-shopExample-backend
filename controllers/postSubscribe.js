const Subscribe = require('../models/subscribe');

module.exports = async (req, res) => {
  try {
    const controll = await Subscribe.findOne({ email: req.body.email });

    if (controll === null) {
      let newSub = new Subscribe({
        email: req.body.email,
      });
      await newSub.save();
      res.status(201).json({ message: 'Prenumeration aktiverad!' });
      //Send mail with subscription details
    } else {
      res.status(203).json({ message: 'Prenumeration är redan aktiverad!' });
    }
  } catch (err) {
    console.log(err);
    res.statsu(500).end();
  }
};

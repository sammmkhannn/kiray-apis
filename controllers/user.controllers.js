import User from "../models/User.model.js";

export const createUser = async (req, res) => {
  try {
    let profile = req.file.filename;
    let user = new User({
      fullName: req.body.fullName,
      profile,
      cell: req.body.cell,
    });
    await user.save();
    return res
      .status(200)
      .send({ success: true, Message: "User has been registered" });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
};

import Request from "../models/Request.model.js";

export const createRequest = async (req, res) => {
  let userId = req.params.userId;
  try {
    let request = new Request({
      userId: userId,
      fullName: req.body.fullName,
      email: req.body.email,
      subject: req.body.subject,
      description: req.body.description,
    });
    await request.save();
  } catch (err) {
    return res.status(200).send({ success: false, Message: err.message });
  }
};

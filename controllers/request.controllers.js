import Request from "../models/Request.model";

export const createRequest = async (req, res) => {
  let userId = req.params.userId;
  try {
    let request = new Request({
      fullName: req.body.fullName,
      email: req.body.email,
      subject: req.body.subject,
      description: req.body.description,
      userId,
    });
    await request.save();
  } catch (err) {
    return res.status(200).send({ success: false, Message: err.message });
  }
};

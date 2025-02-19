import { sendCode } from "lib/controllers/auth";
const methods = require("micro-method-router");

export default methods({
  async post(req, res) {
    const result = sendCode(req.body.email);
    res.send(result);
  },
});

import { sendCode } from "lib/controllers/auth";
import * as methods from "micro-method-router";

export default methods({
  async post(req, res) {
    const result = sendCode(req.body.email);
    res.send(result);
  },
});

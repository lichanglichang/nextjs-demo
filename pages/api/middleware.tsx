import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "../../utils/cookies";
import Cors from "cors";
const connect = require("connect");
const app = connect();

const cors = Cors({
  methods: ["POST", "HEAD"],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

app.use((req: NextApiRequest, res: NextApiResponse, next: any) => {
  runMiddleware(req, res, cors);
  next();
});

app.use((req: NextApiRequest, res: NextApiResponse, next: any) => {
  setCookie(res, "Next.js", "api-middleware!");
  res.end(res.getHeader("Set-Cookie"));
});

export default app;

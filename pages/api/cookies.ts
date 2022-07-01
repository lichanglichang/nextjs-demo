import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "../../utils/cookies";
const connect = require("connect");
const app = connect();

app.use((req: NextApiRequest, res: NextApiResponse, next: any) => {
  setCookie(res, "Next.js", "api-middleware!");
  next();
});

app.use((req: NextApiRequest, res: NextApiResponse, next: any) => {
  setCookie(res, "name", "liChang");
  res.end(res.getHeader("Set-Cookie"));
});

export default app;

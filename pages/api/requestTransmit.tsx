import { NextApiRequest, NextApiResponse } from "next";
const RequestTransmit = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.status(403);
    res.end("internet Error");
    return;
  }
  let response = await fetch("http://localhost:3002/api/detail", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: { "Content-Type": "application/json" },
  });

  let resData = await response.json();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(resData);
};

export default RequestTransmit;

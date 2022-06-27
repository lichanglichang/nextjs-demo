import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
function handler( req: NextApiRequest,
  res: NextApiResponse) {
  // 获取动态API路由参数
  const eventId = req.query.eventId;
  //   判断请求方式
  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "comments.json");
    // 过滤数据
    const CommentsData = JSON.parse(fs.readFileSync(filePath) as unknown as string).filter(
      (item:any) => {
        return item.blogId === eventId;
      }
    );

    res.status(200).json({ CommentsData: CommentsData });
  }
}
export default handler;

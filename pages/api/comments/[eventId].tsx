import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
function handler(req: NextApiRequest, res: NextApiResponse) {
  // 获取动态API路由参数
  const eventId = req.query.eventId;
  // 读取文件路径
  const filePath = path.join(process.cwd(), "data", "comments.json");

  // 根据请求方式做不同处理
  if (req.method === "GET") {
    // 获取
    const CommentsData = JSON.parse(
      fs.readFileSync(filePath) as unknown as string
    ).filter((item: any) => {
      return item.slug === eventId;
    });
    res.status(200).json({ CommentsData: CommentsData });
  } else if (req.method === "DELETE") {
    // 删除
    const CommentsData = JSON.parse(
      fs.readFileSync(filePath) as unknown as string
    ).filter((item: any) => {
      return item.id !== eventId;
    });

    // 重写文件数据
    fs.writeFileSync(filePath, JSON.stringify(CommentsData));
    res.status(200).json({ message: "删除成功" });
  }
}
export default handler;

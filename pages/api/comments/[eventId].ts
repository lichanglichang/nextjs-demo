import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
function handler( req: NextApiRequest,
  res: NextApiResponse) {
  // 获取动态API路由参数
  const eventId = req.query.eventId;
  const filePath = path.join(process.cwd(), "data", "comments.json");
  //   判断请求方式
  if (req.method === "GET") {
    // 过滤数据
    const CommentsData = JSON.parse(fs.readFileSync(filePath) as unknown as string).filter(
      (item:any) => {
        return item.slug === eventId;
      }
    );
    res.status(200).json({ CommentsData: CommentsData });
  }else if(req.method === "DELETE"){
    const CommentsData = JSON.parse(fs.readFileSync(filePath) as unknown as string).filter(
      (item:any) => {
        return item.id !== eventId;
      }
    );

    // 重写文件数据
    fs.writeFileSync(filePath, JSON.stringify(CommentsData));

    res.status(200).json({ message: "删除成功" });
  }
}
export default handler;

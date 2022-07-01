import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  code: number;
  message: string;
};

// 1.req
// req.method 请求方式
// req.body (经过处理的解析成字符串)
// req.query 请求参数
// req.cookies cookie

// 2.res
// res.statusCode-设置状态码
// res.setHeader-设置响应头
// res.end()-发送数据nextjs包装的：
// res.status(code)-设置状态码的功能。code必须是有效的HTTP状态代码res.json(json)-发送JSON响应。json必须是有效的JSON对象
// res.send(body)-发送HTTP响应。body可以是string，object或Buffer

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // 判断请求方式
  if (req.method === "POST") {
    // 获取参数
    const { username, text, blogId } = req.body;
    // 验证
    if (!username || username.trim() === "" || !text || text.trim() === "") {
      res.status(422).json({ code: 0, message: "无效输入" });
      return;
    }

    // 新增评论
    const newComment = {
      id: new Date().toISOString(),
      username,
      text,
      blogId,
    };

    // 获取文件路径
    const filePath = path.join(process.cwd(), "data", "comments.json");
    // 读取文件数据
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData as unknown as string);
    data.push(newComment);

    // 重写文件数据
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({
      code: 1,
      message: "添加成功",
    });
  }
};
export default handler;

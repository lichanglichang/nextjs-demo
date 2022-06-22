import fs from "fs";
import path from "path";
const handler = (req, res) => {
  // 判断请求方式
  if (req.method === "POST") {
    // 获取参数
    const { username, text, blogId } = req.body;

    // 验证
    if (!username || username.trim() === "" || !text || text.trim() === "") {
      res.status(422).json({ massage: "无效输入" });
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
    const data = JSON.parse(fileData);
    data.push(newComment);

    // 重写文件数据
    fs.writeFileSync(filePath, JSON.stringify(data));
    
    res.status(201).json({
      msg: "添加成功"
    });
  }
};
export default handler;

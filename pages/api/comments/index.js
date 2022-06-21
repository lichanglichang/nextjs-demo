import fs from "fs";
import path from "path";
const handler = (req, res) => {
  if (req.method === "POST") {
    const { username, text, blogId } = req.body;

    const newComment = {
      id: new Date().toISOString(),
      username,
      text,
      blogId,
    };
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData)
    data.push(newComment)
    fs.writeFileSync(filePath,JSON.stringify(data))
    res.status(201).json({msg:"添加成功",CommentsData:JSON.parse(fs.readFileSync(filePath))})
  }
};
export default handler;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BlogDetail = () => {
  const { id } = useRouter().query;
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const handleSubmit = () => {
    fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ username: name, blogId: id, text: text }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      res.json().then((res) => {
        console.log(res);
      });
    });
  };

  useEffect(()=>{
    fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ username: name, blogId: id, text: text }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      res.json().then((res) => {
        console.log(res);
      });
    });
  })
  return (
    <div>
      这是{id}
      <br></br>
      姓名：
      <input
        type="text"
        value={name}
        onChange={(e) => {
         setName(e.target.value)
         
        }}
      />
        <br></br>
      评论：
      <input type="text"    value={text}
        onChange={(e) => {
         setText(e.target.value)
         
        }}/>
          <br></br>
      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        
        发表评论
      </button>
    </div>
  );
};
export default BlogDetail;

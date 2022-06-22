import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BlogDetail = () => {
  const { id } = useRouter().query;
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = () => {
    fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ username: name, blogId: id, text: text }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      res.json().then((res) => {
        console.log(res);
        fetch(`/api/comments/${id}`, {
          method: "GET",
        }).then((res) => {
          res.json().then((res) => {
            console.log(res);
            setComments(res.CommentsData)
          });
        });
      });
    });
  };

  useEffect(()=>{
    fetch(`/api/comments/${id}`, {
      method: "GET",
    }).then((res) => {
      res.json().then((res) => {
        console.log(res);
        setComments(res.CommentsData)
      });
    });
  },[])
  return (
    <div>
      技术博客{id}
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
      {comments.map((item:any,index:number)=>{
        return <div key={index}><p>{item.username}</p><p>{item.text}</p><hr></hr></div>
      })}
    </div>
  );
};
export default BlogDetail;

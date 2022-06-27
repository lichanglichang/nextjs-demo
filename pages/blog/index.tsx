import { useRouter } from "next/router";
import styles from "../../styles/blog.module.css";
const Blog = () => {
  // fetch("/api/comments", {
  //   method: "POST",
  //   body: JSON.stringify({ username: "@123", blogId: "小强", text: "666" }),
  //   headers: { "Content-Type": "application/json" },
  // }).then((res) => {
  //   res.json().then((res) => {
  //     console.log(res);
  //   });
  // });
  // fetch("/api/comments/10", {
  //   method: "GET",
  // })
  //   .then((res) => {
  //     res.json();
  //   })
  //   .then((data) => {
  //     // console.log(data);
  //   });
  const data = [1, 2, 3, 4, 5];
  const router = useRouter();
  return (
    <div style={{ padding: "20px" }}>
      <h2>
        技术博客
        <span
          onClick={() => {
            router.back();
          }}
          className={styles.back}
        >
          返回首页
        </span>
      </h2>
      {data.map((item) => (
        <p
          key={item}
          onClick={() => {
            router.push(`/blog/${item}`);
          }}
        >
          博客{item}
        </p>
      ))}
    </div>
  );
};
export default Blog;

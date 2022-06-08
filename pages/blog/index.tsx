import { useRouter } from "next/router";

const Blog = () => {
  const data = [1, 2, 3, 4, 5];
  const router = useRouter();
  return (
    <div>
      <h2>博客内容</h2>
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

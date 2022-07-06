import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/blog.module.css";
import useSWR from "swr";
import { getAllPosts } from "../../utils/api";
const fetcher = (url: any) => fetch(url).then((res) => res.text());
const Blog = ({ allPosts }: any) => {
  const router = useRouter();

  const { data: cookiesData, error } = useSWR("/api/middleware", fetcher);

  return (
    <div style={{ padding: "20px" }}>
      <Head>
        <title>Blog-列表页</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>技术博客</h2>
      {allPosts.map((item: any, index: number) => (
        <div
          key={index}
          onClick={() => {
            router.push(`/blog/${item.slug}`);
          }}
          className={styles.title}
        >
          <h3>标题：{item.title}</h3>
          <p> 作者：{item.author.name}</p>
          <p> 时间：{item.date}</p>
          <p> 介绍：{item.excerpt}</p>
        </div>
      ))}
      <p>cookies值：{cookiesData}</p>
    </div>
  );
};
export default Blog;

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}

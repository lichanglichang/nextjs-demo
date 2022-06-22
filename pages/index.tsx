import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Blog</h1>
      <div>
        <span
        className={styles.blogItem}
          onClick={() => {
            router.push("/blog");
          }}
        >
          技术blog
        </span>
        |<span  className={styles.blogItem}>生活blog</span>|<span  className={styles.blogItem}>体育blog</span>
      </div>
    </div>
  );
};

export default Home;

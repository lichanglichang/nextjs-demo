import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from "../../styles/blog.module.css";
import { getAllPosts, getPostBySlug } from "../../utils/api";
import markdownToHtml from "../../utils/markdownToHtml";
interface commentType {
  id: string;
  username: string;
  text: string;
  blogId: string;
}

const BlogDetail = ({ post }: any) => {
  const { slug } = useRouter().query;
  const router = useRouter();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  // 获取评论
  const queryComment = useCallback(() => {
    fetch(`/api/comments/${slug}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setComments(res.CommentsData));
  }, [slug]);

  useEffect(() => {
    queryComment();
  }, [queryComment]);

  // 提交评论
  const handleSubmit = () => {
    fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ username: name, slug: slug, text: text }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          queryComment();
        } else {
          alert(res.message);
        }
      });
  };

  // 删除评论
  const handleDelete = (id: string) => {
    fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        queryComment();
        alert(res.message);
      });
  };

  return (
    <div className={styles.wrap}>
      <Head>
        <title>Blog-首页</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>
        技术博客{slug}
        <span
          onClick={() => {
            router.back();
          }}
          className={styles.back}
        >
          返回
        </span>
        <span
          onClick={() => {
            router.push(`/blog/${post.slug}/?counter=10`, undefined, {
              shallow: true,
            });
          }}
          className={styles.back}
        >
          浅层路由跳转
        </span>
        <span className={styles.back}>
          <Link as="/detail" href={`/blog/detail`}>
            重命名路径
          </Link>
        </span>
      </h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className={styles.textInput}>
        姓名：
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={styles.input}
        />
      </div>

      <div className={styles.textInput}>
        评论：
        <textarea
          value={text}
          rows={4}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className={styles.textarea}
        />
      </div>

      <button
        onClick={() => {
          handleSubmit();
        }}
        className={styles.button}
      >
        发表评论
      </button>

      {comments.map((item: commentType, index: number) => {
        return (
          <div key={index}>
            <h3>评论 {index + 1}</h3>
            <span className={styles.span}>by:{item.username}</span>
            <span className={styles.span}>评论内容：{item.text}</span>
            <button
              className={styles.button}
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              删除
            </button>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};
export default BlogDetail;

// 静态生成
export async function getStaticProps({ params }: any) {
  const post: any = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

// 页面路径取决于外部数据
export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post: any) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

import { useRouter } from "next/router";

const BlogDetail = () => {
  const { id } = useRouter().query;
  return <div>这是{id}</div>;
};
export default BlogDetail;

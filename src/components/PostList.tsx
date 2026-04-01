import { Post } from "@/models/Post";
import axios from "axios";

export default async function PostList() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/comments');

  const posts: Post[] = response.data;
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h5>{post.name}</h5>
          <p>{post.email}</p>
          <p>{post.body}</p>
        </div>
      ))}

    </div>
  )
}
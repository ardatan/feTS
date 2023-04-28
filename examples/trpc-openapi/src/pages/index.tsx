import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import type { Mutable, OASOutput } from 'fets';
import { client } from '../fets/client';
import { oas } from '../server/oas';

type Post = OASOutput<Mutable<typeof oas>, '/posts/{id}', 'get'>;

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post['post'][]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await client['/posts'].get();
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    };
    fetchPosts()
      .then(res => {
        if (res.posts) {
          setPosts(res.posts);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

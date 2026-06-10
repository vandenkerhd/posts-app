import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PostFilter } from "./PostFilter";
import { PostForm } from "./PostForm";
import { PostList } from "./PostList";
import { loadPosts } from "./postsSlice";

export function PostsPage() {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.posts.initialized);

  useEffect(() => {
    if (!initialized) {
      dispatch(loadPosts());
    }
  }, [dispatch, initialized]);

  return (
    <main className="page-shell">
      <section className="posts-card">
        <PostFilter />
        <PostList />

        <div className="form-section">
          <h2>Crear nuevo post</h2>
          <PostForm />
        </div>
      </section>
    </main>
  );
}

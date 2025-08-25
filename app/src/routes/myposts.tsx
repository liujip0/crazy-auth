import { Button } from "@liujip0/components";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import NewPost from "../components/NewPost/NewPost.tsx";
import Post from "../components/Post/Post.tsx";
import TopBar from "../components/TopBar/TopBar.tsx";
import { LOCAL_STORAGE_KEYS, trpc } from "../trpc.ts";
import styles from "./myposts.module.css";

export default function MyPosts() {
  const navigate = useNavigate();

  const userInfo = useQuery(
    trpc.users.userInfo.queryOptions(
      localStorage.getItem(LOCAL_STORAGE_KEYS.apiToken) ? undefined : skipToken
    )
  );

  const getPosts = useQuery(
    trpc.posts.getPosts.queryOptions({
      limit: 20,
      offset: 0,
      user: userInfo.data?.username,
    })
  );

  const [newPost, setNewPost] = useState(false);

  return (
    <div className={styles.container}>
      <TopBar buttons={userInfo.data?.username || "loggedout"} />
      <div className={styles.content}>
        <div className={styles.feed}>
          <h1 className={styles.title}>My Posts</h1>
          {getPosts.data?.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              user={post.user}
              content={post.body}
            />
          ))}
        </div>

        <Button
          className={styles.newPostButton}
          onClick={() => {
            setNewPost(true);
          }}>
          <span className="material-symbols-outlined">add</span>Create Post
        </Button>
      </div>

      <NewPost
        open={newPost}
        onClose={() => {
          setNewPost(false);
        }}
        onSuccess={() => {
          setNewPost(false);
          navigate(0);
        }}
      />
    </div>
  );
}

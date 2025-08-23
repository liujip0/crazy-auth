import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextArea,
} from "@liujip0/components";
import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import Post from "../components/Post/Post.tsx";
import TopBar from "../components/TopBar/TopBar.tsx";
import { LOCAL_STORAGE_KEYS, trpc } from "../trpc.ts";
import styles from "./index.module.css";

export default function Index() {
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
    })
  );

  const [newPost, setNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostError, setNewPostError] = useState("");
  const publishPost = useMutation(
    trpc.posts.publishPost.mutationOptions({
      onSuccess() {
        setNewPost(false);
        setNewPostTitle("");
        setNewPostContent("");
        setNewPostError("");
        navigate(0);
      },
      onError(error) {
        setNewPostError("Error: " + error.message);
      },
    })
  );

  return (
    <div className={styles.container}>
      <TopBar buttons={userInfo.data ? userInfo.data.username : "loggedout"} />
      <div className={styles.content}>
        <div className={styles.feed}>
          {getPosts.data?.map((post) => (
            <Post
              title={post.title}
              user={post.user}
              content={post.body}
            />
          ))}
        </div>

        {userInfo.data && (
          <Button
            className={styles.newPostButton}
            onClick={() => {
              setNewPost(true);
            }}>
            <span className="material-symbols-outlined">add</span>Create Post
          </Button>
        )}
      </div>

      <Dialog open={newPost}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent className={styles.newPostDialogContent}>
          <Input
            id="new-post-title"
            value={newPostTitle}
            onChange={(value) => {
              setNewPostTitle(value);
            }}
            label="Post Title"
          />
          <TextArea
            id="new-post-content"
            value={newPostContent}
            onChange={(value) => {
              setNewPostContent(value);
            }}
            label="Post Content"
          />
          {newPostError && (
            <p className={styles.newPostError}>{newPostError}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            className={styles.newPostDialogButton}
            onClick={() => {
              setNewPost(false);
            }}>
            Cancel
          </Button>
          <Button
            className={styles.newPostDialogButton}
            onClick={() => {
              publishPost.mutate({
                title: newPostTitle,
                content: newPostContent,
              });
            }}>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

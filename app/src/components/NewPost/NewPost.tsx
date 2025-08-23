import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextArea,
} from "@liujip0/components";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { trpc } from "../../trpc.ts";
import styles from "./NewPost.module.css";

type NewPostProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};
export default function NewPost({ open, onClose, onSuccess }: NewPostProps) {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostError, setNewPostError] = useState("");

  const publishPost = useMutation(
    trpc.posts.publishPost.mutationOptions({
      onSuccess() {
        setNewPostTitle("");
        setNewPostContent("");
        setNewPostError("");
        onSuccess();
      },
      onError(error) {
        setNewPostError("Error: " + error.message);
      },
    })
  );

  return (
    <Dialog open={open}>
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
        {newPostError && <p className={styles.newPostError}>{newPostError}</p>}
      </DialogContent>
      <DialogActions>
        <Button
          className={styles.newPostDialogButton}
          onClick={() => {
            onClose();
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
  );
}

import { Button } from "@liujip0/components";
import { skipToken, useQuery } from "@tanstack/react-query";
import Post from "../components/Post/Post.tsx";
import TopBar from "../components/TopBar/TopBar.tsx";
import { LOCAL_STORAGE_KEYS, trpc } from "../trpc.ts";
import styles from "./index.module.css";

export default function Index() {
  const userInfo = useQuery(
    trpc.users.userInfo.queryOptions(
      localStorage.getItem(LOCAL_STORAGE_KEYS.apiToken) ? undefined : skipToken
    )
  );

  return (
    <div className={styles.container}>
      <TopBar buttons={userInfo.data ? userInfo.data.username : "loggedout"} />
      <div className={styles.content}>
        <div className={styles.feed}>
          <Post />
          <Post />
          <Post />
          <Post />
        </div>

        {userInfo.data && (
          <Button className={styles.newPostButton}>
            <span className="material-symbols-outlined">add</span>Create Post
          </Button>
        )}
      </div>
    </div>
  );
}

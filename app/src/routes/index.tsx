import Post from "../components/Post/Post.tsx";
import TopBar from "../components/TopBar/TopBar.tsx";
import styles from "./index.module.css";

export default function Index() {
  return (
    <div className={styles.container}>
      <TopBar buttons="loggedout" />
      <div className={styles.content}>
        <div className={styles.feed}>
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
}

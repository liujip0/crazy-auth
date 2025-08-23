import styles from "./Post.module.css";

type PostProps = {
  title: string;
  user: string;
  content: string;
};
export default function Post({ title, user, content }: PostProps) {
  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>
        <span className={styles.username}>{user}: </span>
        {content}
      </p>
    </div>
  );
}

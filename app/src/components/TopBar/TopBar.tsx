import { Button } from "@liujip0/components";
import { Link, useNavigate } from "react-router";
import { LOCAL_STORAGE_KEYS } from "../../trpc.ts";
import styles from "./TopBar.module.css";

type TopBarProps = {
  buttons: "loggedout" | "none" | string;
};
export default function TopBar({ buttons }: TopBarProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.topBar}>
      <Link to="/">
        <h1 className={styles.title}>@liujip0/crazy-auth</h1>
      </Link>
      <div className={styles.buttons}>
        {buttons === "loggedout" ?
          <>
            <Link to="/signup">
              <Button className={styles.button}>Sign Up</Button>
            </Link>
            <Link to="/login">
              <Button className={styles.button}>Log In</Button>
            </Link>
          </>
        : buttons === "none" ?
          <></>
        : <>
            <div className={styles.userContainer}>
              <p className={styles.userLabelContainer}>
                <span className={styles.userLabel}>Username: </span>
                {buttons}
              </p>
              <Link
                to="/myposts"
                className={styles.myPostsLink}>
                My Posts
              </Link>
            </div>
            <Button
              className={styles.button}
              onClick={() => {
                localStorage.removeItem(LOCAL_STORAGE_KEYS.apiToken);
                navigate(0);
                navigate("/");
              }}>
              Log Out
            </Button>
          </>
        }
      </div>
    </div>
  );
}

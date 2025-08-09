import { Button } from "@liujip0/components";
import { Link } from "react-router";
import styles from "./TopBar.module.css";

type TopBarProps = {
  buttons: "loggedout" | "none" | string;
};
export default function TopBar({ buttons }: TopBarProps) {
  return (
    <div className={styles.topBar}>
      <h1 className={styles.title}>@liujip0/crazy-auth</h1>
      <div className={styles.buttons}>
        {buttons === "loggedout" ?
          <>
            <Link to="signup">
              <Button className={styles.button}>Sign Up</Button>
            </Link>
            <Button className={styles.button}>Log In</Button>
          </>
        : buttons === "none" ?
          <></>
        : <>
            <div className={styles.userContainer}>
              <span className={styles.userLabel}>Username: </span>
              {buttons}
            </div>
            <Button className={styles.button}>Log Out</Button>
          </>
        }
      </div>
    </div>
  );
}

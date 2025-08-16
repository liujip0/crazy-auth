import { Button, Input } from "@liujip0/components";
import { useState } from "react";
import PasswordEditor from "../components/PasswordEditor/PasswordEditor.tsx";
import TopBar from "../components/TopBar/TopBar.tsx";
import styles from "./signup.module.css";

export default function SignUp() {
  const [page, setPage] = useState<"username" | "password">("username");
  const [username, setUsername] = useState("");

  return (
    <div className={styles.container}>
      <TopBar buttons="none" />
      <div className={styles.content}>
        {page === "username" ?
          <>
            <h1 className={styles.title}>Sign Up</h1>
            <Input
              id="signup-username"
              value={username}
              onChange={(value) => {
                setUsername(value);
              }}
              label="Username"
              className={styles.input}
              labelClassName={styles.inputLabel}
            />
            <Button
              className={styles.button}
              onClick={() => {
                //TODO: check username validity
                setPage("password");
              }}>
              Next
            </Button>
          </>
        : <PasswordEditor />}
      </div>
    </div>
  );
}

import { Button, Input, Password } from "@liujip0/components";
import { useState } from "react";
import TopBar from "../components/TopBar/TopBar.tsx";
import styles from "./signup.module.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      <TopBar buttons="none" />
      <div className={styles.content}>
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
        <Password
          id="signup-password"
          value={password}
          onChange={(value) => {
            setPassword(value);
          }}
          label="Password"
          className={styles.input}
          labelClassName={styles.inputLabel}
        />
        <Button className={styles.button}>Confirm</Button>
      </div>
    </div>
  );
}

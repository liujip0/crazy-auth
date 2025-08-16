import { Input } from "@liujip0/components";
import { useState } from "react";
import TopBar from "../components/TopBar/TopBar.tsx";
import styles from "./signup.module.css";

export default function SignUp() {
  const [username, setUsername] = useState("");

  return (
    <div className={styles.container}>
      <TopBar buttons="none" />
      <div className={styles.content}>
        <Input
          id="signup-username"
          value={username}
          onChange={(value) => {
            setUsername(value);
          }}
          label="Username"
          labelClassName={styles.inputLabel}
        />
      </div>
    </div>
  );
}

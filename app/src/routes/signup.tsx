import { Button, Input } from "@liujip0/components";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import PasswordEditor from "../components/PasswordEditor/PasswordEditor.tsx";
import TopBar from "../components/TopBar/TopBar.tsx";
import { trpc } from "../trpc.ts";
import styles from "./signup.module.css";

export default function SignUp() {
  const [page, setPage] = useState<"username" | "password">("username");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const checkusername = useMutation(trpc.users.checkusername.mutationOptions());

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
              error={usernameError !== ""}
              helperText={usernameError}
            />
            <Button
              className={styles.button}
              onClick={async () => {
                if (username.length <= 3) {
                  setUsernameError("Username must be at least 3 characters");
                  return;
                }
                const check = await checkusername.mutateAsync(username);
                switch (check) {
                  case "ok":
                    setUsernameError("");
                    setPage("password");
                    break;
                  case "invalid":
                    setUsernameError("Username is invalid");
                    break;
                  case "taken":
                    setUsernameError("Username is already taken");
                    break;
                }
              }}>
              Next
            </Button>
          </>
        : <PasswordEditor />}
      </div>
    </div>
  );
}

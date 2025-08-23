import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@liujip0/components";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import PasswordEditor, {
  ITEM_SEPARATOR,
  MacIcon,
  OS_SEPARATOR,
} from "../components/PasswordEditor/PasswordEditor.tsx";
import TopBar from "../components/TopBar/TopBar.tsx";
import { trpc } from "../trpc.ts";
import styles from "./login.module.css";

export default function LogIn() {
  const navigate = useNavigate();

  const [page, setPage] = useState<"username" | "password">("username");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");

  const submitUsernameRef = useRef<HTMLButtonElement>(null);

  const checkusername = useMutation(trpc.users.checkusername.mutationOptions());
  const signup = useMutation(trpc.users.signup.mutationOptions());

  return (
    <div className={styles.container}>
      <TopBar buttons="none" />
      <div className={styles.content}>
        {page === "username" ?
          <>
            <h1 className={styles.title}>Log In</h1>
            <Input
              id="login-username"
              value={username}
              onChange={(value) => {
                setUsername(value);
              }}
              label="Username"
              className={styles.input}
              labelClassName={styles.inputLabel}
              error={usernameError !== ""}
              helperText={usernameError}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  if (submitUsernameRef.current) {
                    submitUsernameRef.current.click();
                  }
                }
              }}
            />
            <Button
              ref={submitUsernameRef}
              className={styles.button}
              onClick={async () => {
                if (username.length <= 3) {
                  setUsernameError("Username is invalid");
                  return;
                }
                const check = await checkusername.mutateAsync(username);
                switch (check) {
                  case "ok":
                    setUsernameError("Username is invalid");
                    break;
                  case "invalid":
                    setUsernameError("Username is invalid");
                    break;
                  case "taken":
                    setUsernameError("");
                    setPage("password");
                    break;
                }
              }}>
              Next
            </Button>
          </>
        : <PasswordEditor
            onDone={(value) => {
              setPassword(value);
            }}
          />
        }
        <Dialog
          open={password !== ""}
          onClose={() => {
            setPassword("");
          }}>
          <DialogTitle>Confirm Password</DialogTitle>
          <DialogContent>
            <div className={styles.dock}>
              {password !== "" &&
                password
                  .split(OS_SEPARATOR)[1]
                  .split(ITEM_SEPARATOR)
                  .map((app) => (
                    <MacIcon
                      key={app}
                      icon={app}
                    />
                  ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setPassword("");
              }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                signup.mutate({
                  username,
                  password,
                });
                navigate("/");
              }}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

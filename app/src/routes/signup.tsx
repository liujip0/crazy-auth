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
import {
  ITEM_SEPARATOR,
  MAC_APPS,
  OS_SEPARATOR,
} from "../components/appslist.ts";
import PasswordEditor, {
  MacIcon,
} from "../components/PasswordEditor/PasswordEditor.tsx";
import TopBar from "../components/TopBar/TopBar.tsx";
import { trpc } from "../trpc.ts";
import styles from "./signup.module.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [page, setPage] = useState<"username" | "password">("username");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");

  const submitUsernameRef = useRef<HTMLButtonElement>(null);

  const checkusername = useMutation(trpc.users.checkUsername.mutationOptions());
  const signup = useMutation(
    trpc.users.signup.mutationOptions({
      onSuccess: () => {
        navigate("/login");
      },
    })
  );

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
                  setUsernameError("Username must be at least 3 characters");
                  return;
                }
                if (/"|'|\/|\\|\||<|>/.test(username)) {
                  setUsernameError(
                    "Username cannot contain quotes, slashes, pipes, or angle brackets"
                  );
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
                      icon={app as keyof typeof MAC_APPS}
                    />
                  ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setPassword("");
              }}>
              Back
            </Button>
            <Button
              onClick={() => {
                signup.mutate({
                  username,
                  password,
                });
              }}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

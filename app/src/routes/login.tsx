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
  OS_SEPARATOR,
  type MAC_APPS,
} from "../components/appslist.ts";
import PasswordEditor, {
  MacIcon,
} from "../components/PasswordEditor/PasswordEditor.tsx";
import TopBar from "../components/TopBar/TopBar.tsx";
import { LOCAL_STORAGE_KEYS, trpc } from "../trpc.ts";
import styles from "./login.module.css";

export default function LogIn() {
  const navigate = useNavigate();

  const [page, setPage] = useState<"username" | "password">("username");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");

  const submitUsernameRef = useRef<HTMLButtonElement>(null);

  const checkusername = useMutation(trpc.users.checkUsername.mutationOptions());
  const [loginError, setLoginError] = useState("");
  const login = useMutation(
    trpc.users.login.mutationOptions({
      onSuccess(data) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.apiToken, data);
        navigate("/");
      },
      onError(error) {
        setLoginError("Error: " + error.message);
      },
    })
  );

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
              setLoginError("");
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
            {loginError && <p className={styles.errorMessage}>{loginError}</p>}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setPassword("");
                setLoginError("");
              }}>
              Back
            </Button>
            <Button
              onClick={() => {
                login.mutate({
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

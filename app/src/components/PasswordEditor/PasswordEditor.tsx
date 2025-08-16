import { Button } from "@liujip0/components";
import { useState } from "react";
import styles from "./PasswordEditor.module.css";

const macApps = ["Finder"];

export default function PasswordEditor() {
  const [os, setOs] = useState<"mac" | "">("");

  return (
    <div className={styles.container}>
      {
        {
          "": (
            <div className={styles.selectOs}>
              <Button
                onClick={() => {
                  setOs("mac");
                }}>
                Mac
              </Button>
            </div>
          ),
          mac: (
            <>
              <div className={styles.desktop}>
                <MacIcon />
                <MacIcon />
                <MacIcon />
                <MacIcon />
                <MacIcon />
                <MacIcon />
                <MacIcon />
                <MacIcon />
              </div>
              <div className={styles.dock}>
                <MacIcon />
                <MacIcon />
                <MacIcon />
                <MacIcon />
              </div>
            </>
          ),
        }[os]
      }
    </div>
  );
}

function MacIcon() {
  return (
    <div className={styles.macIcon}>
      <img
        src={import.meta.env.BASE_URL + "assets/appicons/mac/Finder.png"}
        className={styles.macIcon}
      />
    </div>
  );
}

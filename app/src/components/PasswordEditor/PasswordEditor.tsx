import { Button } from "@liujip0/components";
import { useState } from "react";
import styles from "./PasswordEditor.module.css";

const macApps = ["Finder", "Safari", "Weather", "Calculator"];

type PasswordEditorProps = {
  onDone?: (value: string) => void;
};
export default function PasswordEditor({ onDone }: PasswordEditorProps) {
  const [os, setOs] = useState<"mac" | "">("");
  const [dockApps, setDockApps] = useState<string[]>([]);

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
              <div
                className={styles.desktop}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  const icon = event.dataTransfer.getData("text/plain");
                  setDockApps(dockApps.filter((app) => app !== icon));
                }}>
                {macApps.map((app) =>
                  dockApps.includes(app) ?
                    <></>
                  : <MacIcon
                      key={app}
                      icon={app}
                    />
                )}
              </div>
              <div
                className={styles.dock}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  const icon = event.dataTransfer.getData("text/plain");
                  if (!dockApps.includes(icon)) {
                    setDockApps([...dockApps, icon]);
                  }
                }}>
                {dockApps.map((app) => (
                  <MacIcon
                    key={app}
                    icon={app}
                  />
                ))}
              </div>
              <Button
                className={styles.doneButton}
                onClick={() => {
                  if (onDone) {
                    onDone("macos***" + dockApps.join(",,"));
                  }
                }}>
                Submit
              </Button>
            </>
          ),
        }[os]
      }
    </div>
  );
}

type MacIconProps = {
  icon: (typeof macApps)[number];
};
function MacIcon({ icon }: MacIconProps) {
  return (
    <div
      className={styles.macIcon}
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", icon);
      }}>
      <img
        src={import.meta.env.BASE_URL + "assets/appicons/mac/" + icon + ".png"}
        className={styles.macIcon}
        draggable={false}
      />
    </div>
  );
}

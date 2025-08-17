import { Button } from "@liujip0/components";
import React, { useState } from "react";
import styles from "./PasswordEditor.module.css";

const MAC_APPS = [
  "Calculator",
  "Chrome",
  "Facetime",
  "Finder",
  "Firefox",
  "Mail",
  "Messages",
  "Music",
  "Safari",
  "System Preferences",
  "Weather",
  "Zen Browser",
];
export const OS_SEPARATOR = "***";
export const ITEM_SEPARATOR = "//";

type PasswordEditorProps = {
  onDone?: (value: string) => void;
};
export default function PasswordEditor({ onDone }: PasswordEditorProps) {
  const [os, setOs] = useState<"mac" | "">("");
  const [dockApps, setDockApps] = useState<string[]>([]);
  const [leftDragHover, setLeftDragHover] = useState(false);
  const [rightDragHover, setRightDragHover] = useState(false);

  return (
    <div className={styles.container}>
      {
        {
          "": (
            <>
              <h1 className={styles.selectOsTitle}>Select OS</h1>
              <div className={styles.selectOs}>
                <Button
                  onClick={() => {
                    setOs("mac");
                  }}>
                  Mac
                </Button>
              </div>
            </>
          ),
          mac: (
            <>
              <p className={styles.instructions}>
                Enter your password by dragging apps into the dock below.
              </p>
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
                {MAC_APPS.map((app) =>
                  dockApps.includes(app) ?
                    <React.Fragment key={app}></React.Fragment>
                  : <MacIcon
                      key={app}
                      icon={app}
                    />
                )}
              </div>
              <div className={styles.dock}>
                <div
                  className={
                    styles.dockSpacer +
                    " " +
                    (leftDragHover ? styles.dockSpacerLeftDragHover : "")
                  }
                  onDragOver={(event) => {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "move";
                    setLeftDragHover(true);
                  }}
                  onDragLeave={() => {
                    setLeftDragHover(false);
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    setLeftDragHover(false);

                    const icon = event.dataTransfer.getData("text/plain");
                    if (!dockApps.includes(icon)) {
                      setDockApps([icon, ...dockApps]);
                    }
                  }}></div>
                {dockApps.map((app, index) => (
                  <MacIcon
                    key={app}
                    icon={app}
                    index={index}
                    dockApps={dockApps}
                    setDockApps={setDockApps}
                  />
                ))}
                <div
                  className={
                    styles.dockSpacer +
                    " " +
                    (rightDragHover ? styles.dockSpacerRightDragHover : "")
                  }
                  onDragOver={(event) => {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "move";
                    setRightDragHover(true);
                  }}
                  onDragLeave={() => {
                    setRightDragHover(false);
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    setRightDragHover(false);

                    const icon = event.dataTransfer.getData("text/plain");
                    if (!dockApps.includes(icon)) {
                      setDockApps([...dockApps, icon]);
                    }
                  }}></div>
              </div>
              <Button
                className={styles.doneButton}
                onClick={() => {
                  if (onDone) {
                    onDone(
                      "mac" + OS_SEPARATOR + dockApps.join(ITEM_SEPARATOR)
                    );
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

export type MacIconProps = {
  icon: (typeof MAC_APPS)[number];
  index?: number;
  dockApps?: string[];
  setDockApps?: (value: string[]) => void;
};
export function MacIcon({ icon, index, dockApps, setDockApps }: MacIconProps) {
  const [dragHover, setDragHover] = useState(false);

  return (
    <div
      className={
        styles.macIcon + " " + (dragHover ? styles.macIconDragHover : "")
      }
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", icon);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setDragHover(true);
      }}
      onDragLeave={() => {
        setDragHover(false);
      }}
      onDrop={(event) => {
        event.stopPropagation();
        event.preventDefault();
        setDragHover(false);

        if (index !== undefined && dockApps && setDockApps) {
          const droppedIcon = event.dataTransfer.getData("text/plain");
          const droppedIconIndex = dockApps.indexOf(droppedIcon);
          if (droppedIconIndex !== -1 && droppedIconIndex < index) {
            const newDockApps = dockApps.filter((app) => app !== droppedIcon);
            newDockApps.splice(index, 0, droppedIcon);

            setDockApps(newDockApps);
          } else {
            const newDockApps = dockApps.filter((app) => app !== droppedIcon);
            newDockApps.splice(index + 1, 0, droppedIcon);

            setDockApps(newDockApps);
          }
        }
      }}>
      <img
        src={import.meta.env.BASE_URL + "assets/appicons/mac/" + icon + ".png"}
        className={styles.macIcon}
        draggable={false}
      />
    </div>
  );
}

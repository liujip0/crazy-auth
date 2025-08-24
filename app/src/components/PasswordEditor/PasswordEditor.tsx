import { Button } from "@liujip0/components";
import React, { useState } from "react";
import { ITEM_SEPARATOR, MAC_APPS, OS_SEPARATOR } from "../appslist.ts";
import styles from "./PasswordEditor.module.css";

type PasswordEditorProps = {
  onDone?: (value: string) => void;
};
export default function PasswordEditor({ onDone }: PasswordEditorProps) {
  const [os, setOs] = useState<"mac" | "">("");
  const [dockApps, setDockApps] = useState<(keyof typeof MAC_APPS)[]>([]);
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
                {Object.keys(MAC_APPS).map((app) =>
                  dockApps.includes(app as keyof typeof MAC_APPS) ?
                    <React.Fragment key={app}></React.Fragment>
                  : <MacIcon
                      key={app}
                      icon={app as keyof typeof MAC_APPS}
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
                    if (!dockApps.includes(icon as keyof typeof MAC_APPS)) {
                      setDockApps([icon as keyof typeof MAC_APPS, ...dockApps]);
                    }
                  }}></div>
                {dockApps.map((app, index) => (
                  <MacIcon
                    key={app}
                    icon={app as keyof typeof MAC_APPS}
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
                    if (!dockApps.includes(icon as keyof typeof MAC_APPS)) {
                      setDockApps([...dockApps, icon as keyof typeof MAC_APPS]);
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
  icon: keyof typeof MAC_APPS;
  index?: number;
  dockApps?: string[];
  setDockApps?: (value: (keyof typeof MAC_APPS)[]) => void;
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

            setDockApps(newDockApps as (keyof typeof MAC_APPS)[]);
          } else {
            const newDockApps = dockApps.filter((app) => app !== droppedIcon);
            newDockApps.splice(index + 1, 0, droppedIcon);

            setDockApps(newDockApps as (keyof typeof MAC_APPS)[]);
          }
        }
      }}>
      <img
        src={
          import.meta.env.BASE_URL +
          "assets/appicons/mac/" +
          icon +
          "." +
          MAC_APPS[icon]
        }
        className={styles.macIcon}
        draggable={false}
      />
    </div>
  );
}

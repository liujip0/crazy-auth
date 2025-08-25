import { Button } from "@liujip0/components";
import React, { useEffect, useState } from "react";
import {
  ITEM_SEPARATOR,
  MAC_APPS,
  OS_SEPARATOR,
  WINDOWS_APPS,
} from "../appslist.ts";
import styles from "./PasswordEditor.module.css";

type PasswordEditorProps = {
  onDone?: (value: string) => void;
};
export default function PasswordEditor({ onDone }: PasswordEditorProps) {
  const [os, setOs] = useState<"mac" | "windows" | "">("");
  const [dockApps, setDockApps] = useState<(keyof typeof MAC_APPS)[]>([]);
  const [taskbarApps, setTaskbarApps] = useState<(keyof typeof WINDOWS_APPS)[]>(
    ["Start", "Widgets"]
  );
  const [leftDragHover, setLeftDragHover] = useState(false);
  const [rightDragHover, setRightDragHover] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const checkImageLoad = setInterval(() => {
      if (os === "mac") {
        console.log(
          Object.keys(MAC_APPS).reduce(
            (accumulator, app) =>
              accumulator +
              ((
                (
                  document.getElementById(
                    "mac-icon-" + app.replaceAll(" ", "")
                  )! as HTMLImageElement
                ).complete
              ) ?
                1
              : 0),
            0
          )
        );
        if (
          Object.keys(MAC_APPS).reduce(
            (accumulator, app) =>
              accumulator +
              ((
                (
                  document.getElementById(
                    "mac-icon-" + app.replaceAll(" ", "")
                  )! as HTMLImageElement
                ).complete
              ) ?
                1
              : 0),
            0
          ) >= Object.keys(MAC_APPS).length
        ) {
          setImagesLoaded(true);
          clearInterval(checkImageLoad);
        }
      } else {
        console.log(
          Object.keys(WINDOWS_APPS).reduce(
            (accumulator, app) =>
              accumulator +
              ((
                (
                  document.getElementById(
                    "windows-icon-" + app.replaceAll(" ", "")
                  )! as HTMLImageElement
                ).complete
              ) ?
                1
              : 0),
            0
          )
        );
        if (
          Object.keys(WINDOWS_APPS).reduce(
            (accumulator, app) =>
              accumulator +
              ((
                (
                  document.getElementById(
                    "windows-icon-" + app.replaceAll(" ", "")
                  )! as HTMLImageElement
                ).complete
              ) ?
                1
              : 0),
            0
          ) >= Object.keys(WINDOWS_APPS).length
        ) {
          setImagesLoaded(true);
          clearInterval(checkImageLoad);
        }
      }
    }, 500);

    return () => {
      clearInterval(checkImageLoad);
    };
  }, [os]);

  return (
    <div className={styles.container}>
      {os === "" ?
        <>
          <h1 className={styles.selectOsTitle}>Select OS</h1>
          <div className={styles.selectOs}>
            <Button
              onClick={() => {
                setOs("mac");
              }}>
              Mac
            </Button>
            <Button
              onClick={() => {
                setOs("windows");
              }}>
              Windows
            </Button>
          </div>
        </>
      : <>
          <p className={styles.instructions}>
            Enter your password by dragging apps into the
            {os === "mac" ? " dock " : " taskbar "}
            below.
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
              if (os === "mac") {
                setDockApps(dockApps.filter((app) => app !== icon));
              } else {
                setTaskbarApps(taskbarApps.filter((app) => app !== icon));
              }
            }}>
            {!imagesLoaded && (
              <div className={styles.loadingText}>Loading Icons...</div>
            )}
            {os === "mac" ?
              Object.keys(MAC_APPS).map((app) =>
                dockApps.includes(app as keyof typeof MAC_APPS) ?
                  <React.Fragment key={app}></React.Fragment>
                : <MacIcon
                    id={"mac-icon-" + app.replaceAll(" ", "")}
                    key={app}
                    icon={app as keyof typeof MAC_APPS}
                  />
              )
            : Object.keys(WINDOWS_APPS).map((app) =>
                taskbarApps.includes(app as keyof typeof WINDOWS_APPS) ?
                  <React.Fragment key={app}></React.Fragment>
                : <WindowsIcon
                    id={"windows-icon-" + app.replaceAll(" ", "")}
                    key={app}
                    icon={app as keyof typeof WINDOWS_APPS}
                  />
              )
            }
          </div>
          <div className={os === "mac" ? styles.dock : styles.taskbar}>
            <div
              className={
                (os === "mac" ? styles.dockSpacer : styles.taskbarSpacerLeft) +
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
                if (os === "mac") {
                  setDockApps([
                    icon as keyof typeof MAC_APPS,
                    ...dockApps.filter((app) => app !== icon),
                  ]);
                } else {
                  setTaskbarApps([
                    icon as keyof typeof WINDOWS_APPS,
                    ...taskbarApps.filter((app) => app !== icon),
                  ]);
                }
              }}></div>
            {os === "mac" ?
              dockApps.map((app, index) => (
                <MacIcon
                  id={"mac-icon-" + app.replaceAll(" ", "")}
                  key={app}
                  icon={app as keyof typeof MAC_APPS}
                  index={index}
                  dockApps={dockApps}
                  setDockApps={setDockApps}
                />
              ))
            : taskbarApps.map((app, index) => (
                <WindowsIcon
                  id={"windows-icon-" + app.replaceAll(" ", "")}
                  key={app}
                  icon={app as keyof typeof WINDOWS_APPS}
                  index={index}
                  taskbarApps={taskbarApps}
                  setTaskbarApps={setTaskbarApps}
                />
              ))
            }
            {!imagesLoaded && (
              <div className={styles.loadingText}>Loading Icons...</div>
            )}
            <div
              className={
                (os === "mac" ? styles.dockSpacer : styles.taskbarSpacerRight) +
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
                if (os === "mac") {
                  setDockApps([
                    ...dockApps.filter((app) => app !== icon),
                    icon as keyof typeof MAC_APPS,
                  ]);
                } else {
                  setTaskbarApps([
                    ...taskbarApps.filter((app) => app !== icon),
                    icon as keyof typeof WINDOWS_APPS,
                  ]);
                }
              }}></div>
          </div>
          <Button
            className={styles.doneButton}
            onClick={() => {
              if (onDone) {
                if (os === "mac") {
                  onDone("mac" + OS_SEPARATOR + dockApps.join(ITEM_SEPARATOR));
                } else {
                  onDone(
                    "windows" + OS_SEPARATOR + taskbarApps.join(ITEM_SEPARATOR)
                  );
                }
              }
            }}>
            Submit
          </Button>
        </>
      }
    </div>
  );
}

export type MacIconProps = {
  icon: keyof typeof MAC_APPS;
  index?: number;
  dockApps?: string[];
  setDockApps?: (value: (keyof typeof MAC_APPS)[]) => void;
  id?: string;
};
export function MacIcon({
  icon,
  index,
  dockApps,
  setDockApps,
  id,
}: MacIconProps) {
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
        id={id}
        src={
          import.meta.env.BASE_URL +
          "assets/appicons/mac/" +
          icon +
          "." +
          MAC_APPS[icon]
        }
        className={styles.macIconImage}
        draggable={false}
      />
    </div>
  );
}

export type WindowsIconProps = {
  icon: keyof typeof WINDOWS_APPS;
  index?: number;
  taskbarApps?: string[];
  setTaskbarApps?: (value: (keyof typeof WINDOWS_APPS)[]) => void;
  id?: string;
};
export function WindowsIcon({
  icon,
  index,
  taskbarApps,
  setTaskbarApps,
  id,
}: WindowsIconProps) {
  const [dragHover, setDragHover] = useState(false);

  return (
    <div
      className={
        styles.windowsIcon + " " + (dragHover ? styles.macIconDragHover : "")
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
        event.preventDefault();
        setDragHover(false);

        if (index !== undefined && taskbarApps && setTaskbarApps) {
          const droppedIcon = event.dataTransfer.getData("text/plain");
          const droppedIconIndex = taskbarApps.indexOf(droppedIcon);
          if (droppedIconIndex !== -1 && droppedIconIndex < index) {
            const newDockApps = taskbarApps.filter(
              (app) => app !== droppedIcon
            );
            newDockApps.splice(index, 0, droppedIcon);

            setTaskbarApps(newDockApps as (keyof typeof WINDOWS_APPS)[]);
          } else {
            const newDockApps = taskbarApps.filter(
              (app) => app !== droppedIcon
            );
            newDockApps.splice(index + 1, 0, droppedIcon);

            setTaskbarApps(newDockApps as (keyof typeof WINDOWS_APPS)[]);
          }
        }
      }}>
      <img
        id={id}
        src={
          import.meta.env.BASE_URL +
          "assets/appicons/windows/" +
          icon +
          "." +
          WINDOWS_APPS[icon]
        }
        className={styles.macIconImage}
        draggable={false}
      />
    </div>
  );
}

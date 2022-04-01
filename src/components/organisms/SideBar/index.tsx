import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useDelayedRender from "use-delayed-render";
import cn from "classnames";

import { LogoutIcon, MinusIcon, PlusIcon } from "@/icons";

import { AuthService } from "@/services";

import styles from "./index.module.scss";

import { AdminModel, AdminSection } from "~/type";
import config from "~/admin.config";

export function SideBar() {
  const router = useRouter();

  const signout = () => {
    AuthService.signout();
    router.push("/login");
  };

  return (
    <aside className={styles.wrapper}>
      {config.sections.map((section) => (
        <Section key={section.name} {...section} />
      ))}
      <div className={styles.logout} onClick={signout}>
        <LogoutIcon />
        로그아웃
      </div>
    </aside>
  );
}

function Section({ name, models }: AdminSection) {
  const [isOpen, setOpen] = useState(true);
  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const listRef = useRef<HTMLUListElement>();
  const { mounted, rendered } = useDelayedRender(isOpen, {
    enterDelay: 10,
    exitDelay: 200,
  });

  return (
    <>
      <span className={cn(styles.item, styles.section)} onClick={toggle}>
        {name}
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </span>
      {mounted && (
        <ul
          ref={listRef}
          className={styles.list}
          style={{
            height:
              typeof window === "undefined"
                ? "fit-content"
                : rendered
                ? listRef.current.scrollHeight
                : 0,
            opacity: typeof window === "undefined" ? 1 : rendered ? 1 : 0,
          }}
        >
          {models
            .filter((model) => model.list !== false)
            .map((model) => (
              <Model key={model.name} {...model} />
            ))}
        </ul>
      )}
    </>
  );
}

function Model({ name, label }: AdminModel) {
  const router = useRouter();

  return (
    <Link key={name} href={`/${name}s`}>
      <a
        className={cn(styles.item, styles.model)}
        data-current={router.asPath.startsWith(`/${name}s`)}
      >
        {label}
      </a>
    </Link>
  );
}

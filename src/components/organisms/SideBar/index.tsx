import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";

import styles from "./index.module.scss";
import config from "~/admin.config.json";
import { LogoutIcon } from "@/icons";
import { AuthService } from "@/services";

export function SideBar() {
  const router = useRouter();

  return (
    <aside className={styles.wrapper}>
      <h1 className={styles.title}>{config.name}</h1>
      {config.sections.map((section) => (
        <React.Fragment key={section.name}>
          <span className={cn(styles.item, styles.section)}>
            {section.name}
          </span>
          {section.models.map((model) => (
            <Link key={model.name} href={`/${model.name}s`}>
              <a
                className={cn(styles.item, styles.model)}
                data-current={router.asPath.startsWith(`/${model.name}s`)}
              >
                {model.label}
              </a>
            </Link>
          ))}
        </React.Fragment>
      ))}
      <div
        className={styles.logout}
        onClick={() => {
          AuthService.signout();
          router.push("/login");
        }}
      >
        <LogoutIcon />
        로그아웃
      </div>
    </aside>
  );
}

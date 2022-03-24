import { ReactNode } from "react";

import { Button, ButtonType } from "@/components/atoms";

import styles from "./Buttons.module.scss";

export type ListButtonsProps = {
  children: ReactNode;
  buttons?: Array<
    {
      label: string;
      type?: ButtonType;
    } & (
      | {
          href: string;
        }
      | {
          onClick: () => void;
        }
    )
  >;
};

export default function ListButtons({ children, buttons }: ListButtonsProps) {
  return (
    <div className={styles.wrapper}>
      {children}
      {buttons?.map((data) => {
        if ("href" in data) {
          return (
            <Button.Link key={data.label} {...data}>
              {data.label}
            </Button.Link>
          );
        }
        return (
          <Button key={data.label} {...data}>
            {data.label}
          </Button>
        );
      })}
    </div>
  );
}

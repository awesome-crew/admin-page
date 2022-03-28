import { Button, ButtonProps, ButtonType } from "../Button";

import styles from "./index.module.scss";

export type ButtonGroupProps = {
  buttons?: Array<
    {
      label: string;
    } & Pick<ButtonProps, "type" | "htmlType" | "onClick"> &
      (
        | {
            href: string;
          }
        | {}
      )
  >;
};

export function ButtonGroup({ buttons }: ButtonGroupProps) {
  return (
    <div className={styles.wrapper}>
      {buttons
        ?.filter((v) => v)
        .map((data) => {
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

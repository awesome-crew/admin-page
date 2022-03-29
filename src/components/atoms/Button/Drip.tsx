/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

import styles from "./Drip.module.scss";

export default function ButtonDrip({
  x,
  y,
  color,
  onCompleted,
}: {
  x: number;
  y: number;
  color: string;
  onCompleted: () => void;
}) {
  const dripRef = useRef<HTMLDivElement>(null);
  /* istanbul ignore next */
  const top = Number.isNaN(+y) ? 0 : y - 10;
  /* istanbul ignore next */
  const left = Number.isNaN(+x) ? 0 : x - 10;

  useEffect(() => {
    if (!dripRef.current) return;
    dripRef.current.addEventListener("animationend", onCompleted);
    return () => {
      if (!dripRef.current) return;
      dripRef.current.removeEventListener("animationend", onCompleted);
    };
  });

  return (
    <div ref={dripRef} className={styles.drip}>
      <svg width="20" height="20" viewBox="0 0 20 20" style={{ top, left }}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fill={color}>
            <rect width="100%" height="100%" rx="10" />
          </g>
        </g>
      </svg>

      <style jsx>{``}</style>
    </div>
  );
}

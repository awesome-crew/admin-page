import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Input } from "@geist-ui/core";

import { Seo } from "@/components/atoms";

import { AuthService } from "@/services";

import styles from "./login.module.scss";

import config from "~/admin.config";

export default function LoginPage() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    await AuthService.signin(code, password);
    alert("로그인되었습니다.");
    router.push("/");
  };

  const isReady = code.length > 0 && password.length > 0;

  return (
    <>
      <Seo title="Login" />
      <div className={styles.wrapper}>
        <h1>{config.name}에 로그인하세요</h1>
        <Input
          width="22rem"
          scale={1.5}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="ID"
        />
        <Input.Password
          width="22rem"
          scale={1.5}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              signin();
            }
          }}
          placeholder="Password"
        />
        <Button
          width="22rem"
          scale={1.5}
          type="secondary"
          disabled={!isReady}
          onClick={signin}
        >
          Log In
        </Button>
      </div>
    </>
  );
}

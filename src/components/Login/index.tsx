import { Button, TextInput } from "@dataesr/react-dsfr";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export interface LoginProps {
  error: string;
  callbackUrl: string;
}

export const Login = ({ error, callbackUrl }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const connection = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      callbackUrl,
      email,
      password,
    });
  };

  return (
    <div
      className="fr-my-4w"
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 650,
      }}
    >
      <h1>Connexion</h1>
      <form onSubmit={connection}>
        <TextInput
          required
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          required
          type="password"
          label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={!email || !password} submit>
          Se connecter
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

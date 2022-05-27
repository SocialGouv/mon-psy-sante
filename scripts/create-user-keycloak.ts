import axios from "axios";
import fs from "fs/promises";

const KEAYCLOAK_URL =
  "http://localhost:8080/auth/admin/realms/mon-psy-sante/users";

const TOKEN = "ACCESS_TOKEN";

const config = {
  headers: { Authorization: `Bearer ${TOKEN}` },
};

const createuser = async (dep, email) => {
  console.log("Create user start");

  const result = await axios
    .post(
      KEAYCLOAK_URL,
      {
        username: "cpam-" + dep,
        email: email,
        enabled: true,
        emailVerified: false,
        disableableCredentialTypes: [],
        requiredActions: ["UPDATE_PASSWORD"],
        attributes: { department: dep },
        groups: ["CPAM"],
        credentials: [
          { type: "password", value: "temporary password", temporary: true },
        ],
      },
      config
    )
    .catch((e) => {
      console.log(e.response);
    });

  // @ts-ignore
  console.log("result", result.status);
  return result;
};

(async () => {
  try {
    const data = await fs.readFile("groupe-instructeurs-emails.csv", "utf8");
    const lines = data.split("\n");
    await Promise.all(
      await lines.map(async (line) => {
        console.log(line);
        const chunk = line.split(",");
        const dep = chunk[0];
        const email = chunk[1];
        return await createuser(dep, email);
      })
    );
  } catch (err) {
    console.log(err);
  }
  setTimeout(() => {
    process.exit();
  }, 200);
})();

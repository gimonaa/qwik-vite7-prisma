import { exec } from "child_process";

// Funzione per eseguire comandi shell
const runCommand = (command: string) => {
  return new Promise<void>((resolve, reject) => {
    const process = exec(command);

    process.stdout?.on("data", (data) => {
      console.log(data.toString());
    });

    process.stderr?.on("data", (data) => {
      console.error(data.toString());
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}: ${command}`));
      }
    });
  });
};

(async () => {
  try {
    console.log("Running npm install...");
    await runCommand("npm install");

    console.log("Running prisma:migrate...");
    await runCommand("npm run prisma:migrate");

    console.log("Running prisma:seed...");
    await runCommand("npm run prisma:seed");

    console.log("Running npm build...");
    await runCommand("npm run build");

    console.log("All commands executed successfully!");
  } catch (error) {
    console.error("Error executing commands:", error);
  }
})();

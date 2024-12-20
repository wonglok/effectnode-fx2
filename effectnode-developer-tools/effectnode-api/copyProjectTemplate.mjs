import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import slugify from "slugify";
import copydir from "copy-dir";

export const copyProjectTemplate = async ({ title = "new-project-title" }) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  let sourceDir = `${join(
    __dirname,
    "../../",
    "src/effectnode/template/project",
    "/"
  )}`;

  let slugStr = slugify(title, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "hk", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
  //
  let targetDir = `${join(
    __dirname,
    "../../",
    "src/effectnode/projects/",
    slugStr,
    "/"
  )}`;

  try {
    await fs.mkdir(targetDir, { recursive: true });
  } catch (e) {
    console.log(e);
  }

  await new Promise((resolve) => {
    copydir(
      sourceDir,
      targetDir,
      {
        utimes: false, // keep add time and modify time
        mode: false, // keep file mode
        cover: true, // cover file when exists, default is true
      },
      function (err) {
        if (err) throw err;
        console.log("done copy folder");

        resolve();
      }
    );
  });
  return {};
};

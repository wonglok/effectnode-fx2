import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import slugify from "slugify";
import copydir from "copy-dir";

export const removeProject = async ({
  oldTitle,
  title = "new-project-title",
}) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  let oldSlugStr = slugify(oldTitle, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "hk", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });

  let slugStr = slugify(title, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "hk", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });

  let fromFolder = `${join(
    __dirname,
    "../../",
    "src/effectnode/projects/",
    oldSlugStr,
    "/"
  )}`;

  let toFolder = `${join(
    __dirname,
    "../../",
    "src/effectnode/recycle-bin/",
    slugStr,
    "/"
  )}`;

  await new Promise((resolve) => {
    copydir(
      fromFolder,
      toFolder,
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

  if (fromFolder !== toFolder) {
    await fs.rm(fromFolder, {
      recursive: true,
      retryDelay: 10,
    });
  }

  return {};
};

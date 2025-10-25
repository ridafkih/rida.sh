import chalk from "chalk";
import type { Dirent } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

type FilePath = string;
type NetworkPath = string;

/**
 * Will take a folder, and represent it as a map of pathname-filename
 * module file paths. Meant to be used on a folder structure which represents
 * a path structure, with `index.ts` files serving a function as the default
 * export.
 *
 * @example
 * ```ts
 * await tree(import.meta.dirname, "app");
 * ```
 * @param trunkSegments The segments of the trunk, will be joined to make a trunk root path.
 * @returns A map with a pathname-filepath key-value pair of importable modules.
 */
export const tree = async (...trunkSegments: string[]) => {
  const trunk = join(...trunkSegments);
  const indices: Record<NetworkPath, FilePath> = {};

  const entries: Dirent<string>[] = await readdir(trunk, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const entryPath = join(entry.parentPath, entry.name);

    if (entry.isFile() && entry.name === "index.ts") {
      const relativePath = relative(trunk, entryPath);
      const networkPath = `/${relativePath.split("/").slice(0, -1).join("/")}`;

      indices[networkPath] = entryPath;
      continue;
    }

    if (!entry.isDirectory()) {
      continue;
    }

    const subEntries = await readdir(entryPath, { withFileTypes: true });
    entries.push(...subEntries);
  }

  return indices;
};

export const formatTree = (
  tree: Record<string, string>,
  trunk: string = "/"
) => {
  return (
    "\n" +
    Object.entries(tree)
      .map(([networkPath, filePath]) => {
        return `${chalk.white(networkPath)}${chalk.gray(
          ` → ${relative(trunk, filePath)}`
        )}`;
      })
      .join("\n")
  );
};

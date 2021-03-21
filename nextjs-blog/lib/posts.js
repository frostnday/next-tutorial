import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // posts 配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // id を取得するためにファイル名から .md を削除する
    const id = fileName.replace(/\.md$/, "");

    // マークダウンファイラうを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContests = fs.readFileSync(fullPath, "utf8");

    // 投稿のメタデータ部分ｎを解析するために gray-matter を使う
    const matterResult = matter(fileContests);

    // データを id をあわせる
    return {
      id,
      ...matterResult.data,
    };
  });

  // 投稿を日付でソートする
  return allPostsData.sort((a, b) => {
    if (a.data < b.data) {
      return 1;
    } else {
      return -1;
    }
  });
}

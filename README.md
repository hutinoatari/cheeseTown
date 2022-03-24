# cheeseTown

## コンパイル

`deno run --allow-read --allow-write ./main.ts abc.txt`

## 記法

| 記法 | 変換前                  | 変換後           |
| -- | -------------------- | ------------- |
| 題名 | `[title] %1`         | `<h1>%1</h1>` |
| 章  | `[section] %1`       | `<h2>%1</h2>` |
| 節  | `[subsection] %1`    | `<h3>%1</h3>` |
| 項  | `[subsubsection] %1` | `<h4>%1</h4>` |
| 段落 | `%1`                 | `<p>%1</p>`   |

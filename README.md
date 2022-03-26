# cheeseTown

## コンパイル

`deno run --allow-read --allow-write main.ts abc.txt`

## タイトル

### 変換前

```
[title] word
```

### 変換後

```
<h1>word</h1>
```

## 章

### 変換前

```
[chapter] word
```

### 変換後

```
<h2>x. word</h2>
```

## 節

### 変換前

```
[section] word
```

### 変換後

```
<h3>n.x. word</h3>
```

## 項

### 変換前

```
[subsection] word
```

### 変換後

```
<h4>n.m.x. word</h4>
```

## 段落

### 変換前

```
text
```

### 変換後

```
<p>text</p>
```

## 図

### 変換前

```
[picture]{url} caption
```

### 変換後

```
<figure>
    <img src="url">
    <figcaption>caption</figcaption>
</figure>
```

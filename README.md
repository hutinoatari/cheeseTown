# cheeseTown

## タイトル

```
[title]{author} word
===(convert)===
<h1>word</h1>
<p>author</p>
```

## 章

```
[chapter] word
===(convert)===
<h2>x word</h2>
```

## 節

```
[section] word
===(convert)===
<h3>n.x word</h3>
```

## 項

```
[subsection] word
===(convert)===
<h4>n.m.x word</h4>
```

## 段落

```
text
===(convert)===
<p>text</p>
```

## リスト

```
[list] item1 | item2 | item3
===(convert)===
<ul>
    <li>item1</li>
    <li>item2</li>
    <li>item3</li>
</ul>
```

## 図

```
[picture]{url} caption
===(convert)===
<figure>
    <img src="url">
    <figcaption>図-n.x caption</figcaption>
</figure>
```

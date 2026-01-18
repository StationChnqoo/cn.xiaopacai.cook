### Java

最低版本是`Java 17`，

```java
sdk use java 17.0.9-oracle
```

## 打包

./gradlew generateCodegenArtifactsFromSchema --rerun-tasks

```bash
ENVFILE=.env.sit ./gradlew assembleDebug --refresh-dependencies
ENVFILE=.env.uat ./gradlew assembleRelease
```

## icon

https://www.iconfont.cn/collections/detail?spm=a313x.search_index.0.da5a778a4.52f83a81Ciudyi&cid=33211

## 工具

### 在线 Csv -> Json

https://tableconvert.com/zh-cn/csv-to-json
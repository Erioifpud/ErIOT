# 接口说明文档

> Fri Apr 12 2019 23:17:09 GMT+0800 (中国标准时间)

## 平台介绍
平台主要分3个层次，分别是Channel、Field和Datapoint，Channel与Field是**一对多**关系，Field与Datapoint也是**一对多**关系。

用户的认证通过JWT实现，因此在需要验明用户身份时应该主动提供token进行认证，token可以在三种情况下获取，分别是**登录**、**注册**和**对已有token的续期**，*简单来说，如果服务器给你提供token，那么token肯定在响应对象中的第一层（和code、message同级）*。

每个Channel都有自己的api-key作为**唯一标示**，api-key只有**Channel所有者**能查看，通过api-key能使用大部分接口，所以不建议将它分享给其他人，因为这意味着其他人也有权限对你的Channel以及Field和Datapoint进行操作。
Channel的**创建**与**修改**操作无法通过api-key使用，需要用户的身份证明(token)。

----

## 接口介绍
### Common
这部分包括了一些常规的操作，比如注册与登录。

#### 注册
接口：/api/common/register
请求体格式：
```json
{
    "username": "账号",
    "password": "密码"
}
```

----

### Field
Field实现了**增删改查**4种操作，对应的接口如下：

#### 查询所有
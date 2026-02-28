---
title: TypeScript 类型体操实战技巧
date: 2026-02-26
excerpt: 深入探讨 TypeScript 的高级类型技巧，包括泛型、条件类型、映射类型等实战应用。
tags:
  - TypeScript
  - 类型系统
category: 技术
author: 开发者
---

# TypeScript 类型体操实战技巧

TypeScript 的类型系统非常强大，掌握一些"类型体操"技巧可以让你的代码更加类型安全。

## 泛型约束

```typescript
// 约束必须有 length 属性
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength('hello'); // ✅
getLength([1, 2, 3]); // ✅
getLength(123); // ❌ Error
```

## 条件类型

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

## 映射类型

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number; }
```

## 实战案例：API 响应类型

```typescript
type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type UserResponse = ApiResponse<{
  id: string;
  name: string;
}>;
```

## 总结

TypeScript 的类型系统图灵完备，善用类型体操可以让代码更加健壮！


# Typescript 基础与进阶
- 基本类型
    1. string: 表示文本字符串。
    2. number: 表示数字，包括整数和浮点数。
    3. boolean: 表示布尔值，即true或false。
    4. null、undefined: 分别表示null和undefined。
    4. symbol: 表示唯一的、不可变的值。
- 复合类型
    1. array: 表示数组，可以使用number[]或Array```<number>```来声明其中元素的类型。
    2. tuple: 表示元组，用于表示固定数量和类型的数组。
    3. enum: 表示枚举类型，用于定义具名常量集合。
- 对象类型
    1. object: 表示非原始类型，即除number、string、boolean、symbol、null或undefined之外的类型。
    2. interface: 用于描述对象的结构，并且可以重复使用。
- 函数类型
    1. function: 表示函数类型。
    2. void: 表示函数没有返回值。
    3. any: 表示任意类型。
- 高级类型
    1. union types: 表示一个值可以是几种类型之一。
    2. intersection types: 表示一个值同时拥有多种类型的特性。


## 为什么 Typescript？
1. 类型安全
2. 编码时类型错误提示和自动补全
3. Typescript 自称为 JavaScript 超集，可以支持一些很新的特性（babel、polyfill）
4. 针对编码文档的支持（不过我们之前是可以使用 JSDoc 实现，sevlte 宣布部分弃用 ts，而用 jsdoc 做类型支持）

除了 Typescript 外，还有 flow，因为 Facebook 的 react 正是用的它。

## Typescript 基础语法
很多其实在之前都把 typescript 用成了 anyScript，
因为在 Typescript 中，有一个声明类型的关键字——any，这个any表示任何类型，所以很多同学为了方便，为了爽，一上来 any 一把梭。

### 基础类型定义

```ts
// 我们在写代码前就知道，一个人的名称一定是字符串，所以我们就把这个变量的类型定义为：string
let personName:string = 'heyi'
let personAge:number = 18


// any 表示任何类型，从今天这节课过后，忘掉 any，为什么？因为只要你用 any，就证明你的 ts 掌握得较差。
let personInfo:any = 10
personInfo = '1000'
```

```ts
// 我们在写代码前就知道，一个人的名称一定是字符串，所以我们就把这个变量的类型定义为：string
let personName:string = 'heyi'
let personAge:number = 18


// any 表示任何类型，从今天这节课过后，忘掉 any，为什么？因为只要你用 any，就证明你的 ts 掌握得较差。
let personInfo:any = 10
personInfo = '1000'


// 类型的表示，基础类型
const cName: string = '字符串'
const cAge: number = 10

const isOpen: boolean = false
const noName: null = null
const undef: undefined = undefined
// 常规写法
const arr: number[] = [1, 2, 3]
// 泛型的写法
const arr2: Array<string> = ['222', '333']
// 元组，Python 有对应概念
// react 中 const [state, setState] = useState()
// 他是有特定的几个元素的数组，我们把它称为元组
// 数组里面就两个元素，第一个是字符串，第二个是函数
const val: [string, () => number] = ['123', () => 123]

// 日期类型
const date: Date = new Date()

// 正则
const reg: RegExp = new RegExp('^Hi$')

// 浏览器的 DOM 相关类型
const el: HTMLDivElement = document.querySelector('div')
// HTMLDivElement
// HTMLInputElement

// 浏览器宿主，还有一些变量






// 这段代码一定能保证获取到 DOM 吗？

const dom:Element | null = document.querySelector('')
```

### 联合类型、交叉类型
#### 联合类型
类型联合用于指定一个值的类型可以是多个，我们可以把一个业务化的数据变量指定成既可以是 string 又可以是 number。
```ts
// 有一个变量它既可能是 string，有可能是 number
// const age = 18
// const age = '18'
const age: number | string = 18
```
```ts
// 有一个变量它既可能是 string，有可能是 number
// const age = 18
// const age = '18'
const age: number | string = 18

// 为什么我们既有可能是 string，有可能是 number
// <Button size="xl"></Button>
// <Button size={24}></Button>
// 通常，除了特定规格外，你还想做定制，订制外的内容可能是新类型
const size: string | number = 18
// 类型的定义，通过 tpye 关键字去派生新类型

type Size = 'sm' | 'xl' | 'lg' | number
// 通过这个 Size 定义后
const buttonSize: Size = 36

```

#### 交叉类型
类型交叉是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
```ts
// 鸭子模型
// 面向协议的类型定义方式
type NameLikeProtocal = {name: string} // 协议，具名
type AgeLikeProtocal = {age: number}   // 协议，具年龄
type SayLikeProtocal = {say: (message: string) => void}

// 联合类型 几个中间选一个

// 交织
// 交叉类型，由两个基础对象结构组合成新的对象结构
type PersonLikeProtocal = NameLikeProtocal & AgeLikeProtocal & SayLikeProtocal

const person: PersonLikeProtocal = {
    name: 'heyi',
    age: 18,
    say(msg) {
        console.log(msg)
        return 'hello'
    }
}

person.say('1123')

```

### 类型操作
```ts
type Person = {
    name: string;
    age: number;
    say(m: string): string 
}

// 我想去掉 Person 类型中间的 age 属性
type NoAgePerson = Omit<Person, 'age'>

// 稍后讲解 Omit 的原理

const noAgePerson: NoAgePerson = {
    name: 'heyi',
    say(message) {
        return message
    }
}
```

## 泛型
```ts
// 理解泛型，我们需要会向语文知识，
// 代词
// 你我他它，不用点名道姓谁谁谁，通过代词可以借用上下文来指示
// 有时我们在定义类型时，可能无法预知类型的具体结构，怎么办呢？我们可以用“代词”这种形式，暂时忽略他的具体实现，
// 这个在 Typescript 中，叫泛型

// 计算传入 number 数组的合
// 入参多样化
// 入参虽然使用了泛型，但是我限制了，类型必须为 number 或者是 string
// 泛型是在一定范围内让你灵活，给你一定自由，又给了一定限制
function sum<T extends (number | string)>(nums: T[]): number {
    let total = 0;
    for(let num of nums) {
        // 做一个判断，就是传入的能不能被转成一个数字，如果能那就尽情转
        const n = Number(num)
        // 确保传进来的元素一定是被转成了合法的数字
        const newNumber = isNaN(n) ? 0 : n
        total += Number(newNumber)
    }

    return total
}

console.log(sum([1, '2', 3, 0]))



// 对象泛型
const numbers: Array<number> = [1, 2]

// interface type 之间的区别
interface IPerson<T> {
    name: string;
    age: T; // 有可能是一个 string，也可能是 number，这个就在你具体用的时候确定
    say(msg: T): T
}

// 还是不知道具体类型，在 new Person 的时候决定
// 跟函数的参数有点像
// 泛型是形参，在使用的时候决定实参
class Person<T extends (string | number)> implements IPerson<T> {
    name: string
    age: T
    
    constructor(name: string, age: T) {
        this.name = name
        this.age = age
    }

    say(message: T): T {
        return message
    }
}

// 泛型是在一定范围内让你灵活，给你一定自由，又给了一定限制
const person = new Person('heyi', '18' /*应该传入 string 或者是 number */)
```

### 体操
```ts
// 体操 术语，Typescript 类型体操
// 就是通过类型来编程
// TypeScript type challenges，跟刷算法题一样
// 泛型 + extends + infer 就能做很多很多事情了

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Person {
    name: string;
    age: number;
}

//type MyPick<T, K extends keyof T> = {
//  [key in K]: T[key]
//}
// 需要两个泛型，第一个泛型是因为我不知道传入对象的具体类型，第二个泛型我不知道我需要拿传入对象的哪些属性

// 1. 首先定义两个泛型
// 2. 确定第二个泛型的内容部分来自于第一个，以此限制传入的第二参数是在确定范围内的
// 3. 在返回的时候，确定键，以及返回值
type MyPick<T, K extends keyof T> = {
    [k in K]: T[k]
}

// Person 的 key 只有 name、age
type K = keyof Person

type TodoPreview = MyPick<Todo, 'title' | 'completed'>
type PersonPerivew = MyPick<Person, 'name'>
type SomePreview = MyPick<{hello: true, world: false}, 'hello'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
```

### infer
```ts
// infer 就是假定推断的意思
// 泛型相当于是形参
// 而这个 infer 相当于是我完全不知道什么类型，完全由传入之后的数据，程序自动推导
type ParamType<T> = T extends (arg: infer P) => any ? P : T;

type TestParams = {name: string}

// void 表示无返回类型，不同于  undefined
type TestFn = (params: TestParams) => void

function test(params: TestParams) {
    console.log(params)
}

const testParams: ParamType<TestFn> = {
    name: 'heyi'
}


type Thenable<T> = {
  then: (onfulfilled: (arg: T) => unknown) => unknown;
}

type MyAwaited<T extends Thenable<any> | Promise<any>> = T extends Promise<infer Inner>
? Inner extends Promise<any> ? MyAwaited<Inner> : Inner
: T extends Thenable<infer U> ? U : false
```

> https://github.com/type-challenges/type-challenges

## 运行时检查
zod、yup、joi、io-ts
大家不用纠结，直接选用 zod。
https://zod.dev/

## 拓展
```ts
// 一个表格有多个类型的字段
type NumberField ={
    type: 'number';
    value: number;
}

type StringField = {
    type: 'string';
    value: string;
}

type DateField = {
    type: 'date';
    value: Date

}



type Field  = NumberField | StringField | DateField

// 这是个大类型
let field: Field = {type: 'string', value: '123'}

// 一个类型守卫
if (field.type === 'string') {
    field?.value
}
```

### 装饰器
```ts
// nestjs 代码
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

## 常见面试题
1. TS中的interface和type有什么区别？
    - 扩展方式
        - interface 可以直接通过 extends 关键字来继承其他接口。
        - type 别名通常使用交叉类型 (&) 来实现类似继承的功能。虽然不能直接用 extends，但在泛型约束等场景下也可以使用 extends。
    - 声明合并
        - interface 支持声明合并。如果你在不同的地方定义了同名的接口，TypeScript 会自动将它们合并成一个接口。
        - type 不支持声明合并。如果尝试重新声明同一个类型别名，会导致编译错误。
    - 适用范围
        - interface 主要用于定义对象的形状（即对象应包含哪些属性和方法）。
        - type 更加通用，除了可以像 interface 那样定义对象形状外，还可以用来为原始类型、联合类型、元组等创建别名。
    - 表达能力
        - interface 只能用于定义对象类型
        - type 可以定义更复杂的类型操作，如联合类型、交叉类型、映射类型、条件类型等
    - 互操作性
        - 在大多数情况下，你可以用 type 实现 interface 的功能，反之亦然。但是，对于某些高级类型操作（如条件类型），只能使用 type。
        
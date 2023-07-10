// 结构型模式
// 外观模式，将多个子系统中复杂逻辑进行抽象，提供一个统一、外观相同的接口，比如适配不同浏览器的逻辑封装在同一个api，方便统一的管理
// 代理模式，讲对象与被调用对象分离，降低系统的解耦；同时代理对象可以扩展目标对象的功能，符合开闭原则。缺点：处理请求速度可能有差异，非直接访问存在开销，Proxy

// 创造型模式
// 工厂模式 当构造函数过多不方便管理时，且创建的对象存在一定关联（比如同一个父类，实现同一个接口等），使用工厂模式。
// 增加新的产品，需要扩展新的工厂类，编写新的具体产品类，一定程度上增加了系统的复杂性

// 单例模式 class的实例个数为1，当需要一个对象去贯穿真个系统时，采取单例模式
// 注意：1、隐藏class的构造函数，避免多次实例化；2、通过暴露一个getInstance方法来创造/获取唯一实例
const FooServiceSingleton = function () {
  function FooService() {}
  let fooService;
  return {
    getInstance: function () {
      if (!fooService) {
        fooService = new FooService();
      }
      return fooService;
    }
  };
};
// 优点：划分全局空间，减少全局变量，将全局变量统一在一个变量下，便于维护
// 缺点：耦合性高     场景：vuex

// 行为型模式
// 策略模式 对象有某个行为，但在不同的场景中，该行为有不同的实现算法。比如交税，在美国税和中国税会有不同的算法
// 场景：表单校验，不同方式登录  优点：便于切换，代码更简洁，避免使用大量的条件判断

function LoginController() {
  this.strategy = null;
  this.setStrategy = function (strategy) {
    this.strategy = strategy;
    this.login = this.strategy.login;
  };
}
function LocalStrategy() {
  this.login = () => {};
}
function PhoneStrategy() {
  this.login = () => {};
}

const loginController = new LoginController();
loginController.setStrategy(new LocalStrategy());

// 迭代器模式 类似于es6中的iterator
// 提供一致的遍历各种数据结构的方式，而不用了解数据的内部结构；2、提供遍历集合的能力而无需改变容器接口
// 一个迭代器通常需要实现以下接口 1、hasNest（）：判断迭代是否结束，返回boolean；2、next（）：查找并返回下一个元素；

const item = [1, 23, 4, 4];
function Iterator(items) {
  this.items = items;
  this.index = 0;
}
Iterator.prototype = {
  hasNext: function () {
    return this.index < this.items.length;
  },
  next: function () {
    return this.items[this.index++];
  }
};
// 观察者模式 又称发布订阅模式
// 被观察对象subject维护一组观察者observer，当被观察对象状态改变时，通过调用观察者的某个方法通知给观察者
// 比如dom绑定事件的addEventListener方法
target.addEventListener(type, listener);
// target是被观察者subject，listener就是观察者observer，观察者模式中subject对象一般需要实现以下api：
// 1.subscribe 接受一个观察者observer独享，使其订阅自己
// 2.unsubscribe 接受一个观察者observer对象，使其取消订阅自己
// 3.fire 触发事件，通知到所有观察者

function Subject() {
  this.observers = [];
}

Subject.prototype = {
  subscribe: function(observer) {
    this.observers.push(observe)
  },
  unsubscribe: function(observer) {

  },
  fire() {
    this.observers.forEach((item) => {
      item.call();
    })
  }
}
// 场景 vue响应式 优点：解耦了观察者和被观察者，降低依赖 缺点：过度使用会导致对象之间联系弱化，程序难以追踪、维护和理解

// 中介者模式 类似聊天室
function Member(name) {
  this.name = name;
  this.chatroom = null;
}

Member.prototype = {
  send(message, toMember) {
    this.chatroom.send(message, this, toMember);
  },
  receive(message, fromMember) {}
}
function Chatroom() {
  this.members = {};
}

Chatroom.prototype = {
  addMember: function(member) {
    this.members[member.name] = member;
    member.chatroom = this;
  },
  send(message, fromMember, toMember) {
    toMember.receive(message, fromMember)
  }
}
// 访问者模式

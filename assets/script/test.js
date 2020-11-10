// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        //10 秒移动到100,100
        this.m_duration = 10;//总时间
        this.m_destination = cc.v2(100, 100);
        var action = cc.moveTo(this.m_duration, this.m_destination);
        this.m_action = action;
        //var newAction = cc.speed(action, 10);//让动作快10倍（也就是原来10秒完成现在只要1秒  明白吗哦 所以你原来的时间啊什么的都不用变 只要用这个把动作加快 就行了）
        this.m_fruit = cc.find('fruit', this.node);
        this.m_fruit.runAction(action);
        //动作一开始运行的时候计时
        this.m_start_time = new Date().getTime();
    },

    jiashu() {
        //点击按钮的时候加速动作

        //1.停止当前动作
        this.m_fruit.stopAction(this.m_action);

        //2.算出新的加速动作

        //点击的时候再获取一下时间, 看看走了多少时间(也就是运行的时候) 毫秒是很小的, 一般人是不可能操作这么快的
        var now = new Date().getTime();
        // 已经运行了的时间
        var passed_time = now - this.m_start_time;
        //2.1 剩下多少时间 = 总时间 - 已经运行了的时间
        var left_time = (this.m_duration * 1000 - passed_time) / 1000;//换成毫秒计算
        //判断一下剩下的时间是不是大于0 
        if (left_time > 0) {
            var action = cc.moveTo(left_time, this.m_destination);
            var newAction = cc.speed(action, 10);
            this.m_action = action;
            this.m_fruit.runAction(newAction);
        }


    }

    // update (dt) {},
});

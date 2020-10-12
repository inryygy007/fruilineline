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

        tupian: {
            type: cc.SpriteFrame,
            default: []
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    //对于这个水果类

    //有设置水果类型的方法 传进来1 就设置为西瓜 其它类似
    setType(number) {
        //根据传进来的number 拿到对应的sprite frame(精灵帧)
        let sf = this.tupian[number - 1];
        //this.sf = sf;
        this.lei_xing = number - 1;
        //设置类型 首先只设置一下相应 的图片就行
        //这里是node 上放的是Sprite 组件而不是SpriteFrame组件
        cc.find("iconRoot/tupian", this.node).getComponent(cc.Sprite).spriteFrame = sf;
    },
    dian_ji_button() {
        //console.log(this.lei_xing);
        //this.focus(true);
        //点击这个水果块就设置一个变量为true
        //要在这里能调用 lianliankan_youxi 的脚本 所以 要把 lianliankan_youxi 传进来
        this.wo_bei_dian_zhong_le = true;
        //调用脚本的方法
        this.lianliankan_jiao_ben.you_shuiguo_bei_dianzhongle();
        this.Zooming();
        //点击的时候设置移动焦点到自己这个块上来
        //this.lianliankan_jiao_ben.set_move_focus_with_fruit(this.node, false);
        //this.lianliankan_jiao_ben.bei_dian_ji_de_hang_lie(this.hang, this.lie);
    },
    //放大缩小
    Zooming() {
        //this.scaling = cc.v2(fruit_node.width - 30, fruit_node.height - 30);
        //let act = cc.scaleTo(0.5, cc.v2(fruit_node.width + 30, fruit_node.height + 30));
        let act1 = cc.scaleTo(0.5, 0.7).easing(cc.easeElasticIn(3.0));
        let act2 = cc.scaleBy(0.7, 1.3).easing(cc.easeElasticOut(2.0));

        //旋转动画
        let act1_1 = cc.rotateTo(0.25, 20).easing(cc.easeBounceIn());
        let act2_1 = cc.rotateTo(0.35, 0).easing(cc.easeBounceOut());//

        let zoom_act = cc.sequence(act1, act2);
        let rotate_act = cc.repeat(cc.sequence(act1_1, act2_1), 2);
        //同时播放
        //fruit_node.runAction(act).repeatForever();
        //let act3 = cc.sequence(act1, act2);
        let act3 = cc.repeatForever(cc.spawn(zoom_act, rotate_act));

        //谁执行的动作 谁去停止
        this.action = cc.find("iconRoot/tupian", this.node).runAction(act3);
    },
    //停止动作
    Stop_action() {
        cc.find("iconRoot/tupian", this.node).stopAction(this.action);

        //停止动作后要把 缩放,旋转 调成初始值, 不然动作执行了一半 改变的值不会个性回来
        //我们执行了 缩放动作, 所以停止后把缩放调为1
        //我们执行了 旋转动作, 所以停止后把旋转调为0
        //
        cc.find("iconRoot/tupian", this.node).scale = 1;
        cc.find("iconRoot/tupian", this.node).angle = 0;
    },
    //把连连看游戏的脚本传进来
    ba_lianlian_kan_youxi_jiaoben_chuanjinlai(jiao_ben, i, j) {
        this.lianliankan_jiao_ben = jiao_ben;
        this.hang = i;
        this.lie = j;
    },
    //外框显示与否
    focus(no_off) {
        cc.find("focus", this.node).active = no_off;
    },
    //隐藏
    ying_chang() {
        //如果是隐藏了 自然 "我被点中了" 的标识就应该清除提
        this.wo_bei_dian_zhong_le = false;
        this.node.active = false;
        this.focus = false;
    },
    // update (dt) {},
});

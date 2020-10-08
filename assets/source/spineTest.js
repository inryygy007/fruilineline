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
        //动作列表
        let dong_zuo = ["die", "attack", "lie", "stand", "hitted", "skill"];
        this.dong_zuo = dong_zuo;

        //找到骨骼动画放置的结点
        let yutu = this.node.getChildByName("Hero_YuTu");

        //从结点上拿到动画组件
        let sk_comp = yutu.getComponent(sp.Skeleton);

        this.sk_comp = sk_comp;

        this.startIdx = 0;

        //一开始的动画, 第三个参数是 是否循环动画的标识 true 就是循环 false 就是只播放一次
        sk_comp.setAnimation(0, this.dong_zuo[this.startIdx], true);
    },

    btnClick() {
        //每点击一次播放下一个动作 明白了吗?为
        this.startIdx = (this.startIdx + 1) % this.dong_zuo.length;
        this.sk_comp.setAnimation(0, this.dong_zuo[this.startIdx], true);
    }

    // update (dt) {},
});

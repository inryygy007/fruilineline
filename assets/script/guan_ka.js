
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    //关卡按钮
    guan_ka_button() {
        cc.director.loadScene("lianliankan");
    },
    //关卡上的数字
    guan_ka_label(number) {
        this.node.getChildByName("label").getComponent('cc.Label').string = number;
        this.guan_ka_lock(number);
    },
    //管卡锁
    guan_ka_lock(number) {
        if (number > 1) {
            this.node.getChildByName("lock").active = true;
            this.node.getChildByName("lock_button").getComponent('cc.Button').interactable = false;
        }
    }

    // update (dt) {},
});

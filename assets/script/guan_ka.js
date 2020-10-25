
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
    //关卡锁
    guan_ka_lock(number) {
        let guan_ka = cc.sys.localStorage.getItem('class');
        if (guan_ka === null) {
            cc.sys.localStorage.setItem('class', 1);
        }
        let m_guan_ka = parseInt(guan_ka);
        if (number > m_guan_ka) {
            this.node.getChildByName("lock").active = true;
            this.node.getChildByName("lock_button").getComponent('cc.Button').interactable = false;
        }
    },
    //关卡成绩
    guan_ka_chengji(cheng_ji) {

    }
    // update (dt) {},
});

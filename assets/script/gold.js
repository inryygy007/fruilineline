

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    set_original_gold(m_gold) {
        cc.find("gold/gold_label", this.node).getComponent('cc.Label').string = m_gold;
    },
    //测试
    test_button() {
        console.log('1000');
    },
    // update (dt) {},
});

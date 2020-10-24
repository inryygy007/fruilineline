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

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    //返回按钮
    backtrack() {

    },
    //炫耀一下按钮
    flaunt() {

    },
    //下一关按钮
    next() {

    },
    //游戏时间
    game_time(time) {
        this.node.getChildByName('bg').getChildByName('time').getComponent('cc.Label').string = time;
        //cc.find("bg/time", this.node).getComponent("cc.Label").string = time;
    },
    ba_lianlian_kan_youxi_jiaoben_chuanjinlai(jiao_ben) {
        this.lianliankan_jiao_ben = jiao_ben;
    }
    // update (dt) {},
});

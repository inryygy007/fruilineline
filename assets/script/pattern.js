
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    backtrack() {
        // this.node.active = false;
        // this.game_jiao_ben.getComponent('game').hide_relaxation(false);
        //打开开始的界面
        cc.director.loadScene("game");
    },
    //把game的脚本传进来
    ba_game_jiaoben_chuanjinlai(jiao_ben) {
        this.game_jiao_ben = jiao_ben;
    },
    // update (dt) {},
});

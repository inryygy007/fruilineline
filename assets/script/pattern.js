
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    backtrack() {
        this.node.active = false;
        //删除创建关卡的节点
        this.game_jiao_ben.getComponent('game').shan_chu_jie_dian();
        //打开开始的界面
        cc.director.loadScene("game");
    },
    //把game的脚本传进来
    ba_game_jiaoben_chuanjinlai(jiao_ben) {
        this.game_jiao_ben = jiao_ben;
    },
    // update (dt) {},
});


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
        this.hide(false);
        this.lianlian_kan_youxi_jiaoben.hide();
        //删除节点
        //this.game.getComponent('game').shan_chu_jie_dian();
        //创造休闲模式预制物
        this.game.getComponent('game').creation_relaxation_prefabs();
        this.game.guan_ka_hide(true);
        this.game.gold_hide(false);

    },
    //继续按钮
    go_on() {
        this.hide();
        this.lianlian_kan_youxi_jiaoben.hide_shui_guo(true);
        this.lianlian_kan_youxi_jiaoben.stop_timer(false);
    },
    //隐藏与否
    hide(no_off) {
        this.node.active = no_off;
    },
    ba_lianlian_kan_youxi_jiaoben_chuanjinlai(jiao_ben) {
        this.lianlian_kan_youxi_jiaoben = jiao_ben;
    },
    ba_game_youxi_jiaoben_chuanjinlai(jiao_ben) {
        this.game = jiao_ben;
    }
    // update (dt) {},
});

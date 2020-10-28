
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    //返回游戏等级选择
    abandon() {
        //隐藏游戏失败窗口
        this.hide(false);
        //删除节点
        this.game.getComponent('game').shan_chu_jie_dian();
        //隐藏游戏界面背景
        this.lianliankan_jiao_ben.getComponent('lianliankan_youxi').hide();
        //创造休闲模式预制物
        this.game.getComponent('game').creation_relaxation_prefabs();
    },
    //重新开始
    restart() {
        //this.lianliankan_jiao_ben.getComponent('lianliankan_youxi').shan_chu_jie_dian();
        this.hide(false);
        this.lianliankan_jiao_ben.getComponent('lianliankan_youxi').game_start();
    },
    //隐藏与否游戏失败窗口
    hide(no_off) {
        this.node.active = no_off;
    },
    //看视频+20秒
    time_adds() {

    },
    //把lianlian_kan_youxi_jiaoben脚本传进来
    ba_lianlian_kan_youxi_jiaoben_chuanjinlai(jiao_ben) {
        this.lianliankan_jiao_ben = jiao_ben;
    },
    //把game脚本传进来
    ba_game_jiaoben_chuanjinlai(jiao_ben) {
        this.game = jiao_ben;
    }
    // update (dt) {},
});

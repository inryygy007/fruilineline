
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
        console.log(100);
    },
    //重新开始
    restart() {
        this.lianliankan_jiao_ben.getComponent('lianliankan_youxi').shan_chu_jie_dian();
        this.lianliankan_jiao_ben.getComponent('lianliankan_youxi').game_start();
    },
    //看视频+20秒
    time_adds() {

    },
    ba_lianlian_kan_youxi_jiaoben_chuanjinlai(jiao_ben) {
        this.lianliankan_jiao_ben = jiao_ben;
    }
    // update (dt) {},
});

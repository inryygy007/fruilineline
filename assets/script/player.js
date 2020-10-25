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
        //cc.find("bg/score_c", this.node).active = false;
        //this.node.getChildByName('bg').getChildByName('score_a').active = true;
    },
    //返回按钮
    backtrack() {

    },
    //炫耀一下按钮
    flaunt() {

    },
    //下一关按钮
    next() {
        cc.director.loadScene("lianliankan");
    },
    //游戏时间
    game_time(time) {
        this.time = parseInt(time);
        this.node.getChildByName('bg').getChildByName('time').getComponent('cc.Label').string = this.time;
        //cc.find("bg/time", this.node).getComponent("cc.Label").string = time;
    },
    //分数
    score() {
        if (this.time <= 30) {
            this.node.getChildByName('bg').getChildByName('score_c').active = false;
            //cc.find("bg/score_c", this.node).active = false;
            this.node.getChildByName('bg').getChildByName('score_a').active = true;
        } else if (this.time <= 60 && this.time > 30) {

            this.node.getChildByName('bg').getChildByName('score_c').active = false;
            this.node.getChildByName('bg').getChildByName('score_b').active = true;
        }

    },
    ba_lianlian_kan_youxi_jiaoben_chuanjinlai(jiao_ben) {
        this.lianliankan_jiao_ben = jiao_ben;
    }
    // update (dt) {},
});

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
    //隐藏与否
    hide(no_off) {
        this.node.active = no_off;
    },
    //返回按钮
    backtrack() {
        this.hide(false);
        this.lianliankan_jiao_ben.hide();
        //删除节点
        //this.game.getComponent('game').shan_chu_jie_dian();
        //创造休闲模式预制物
        this.game.getComponent('game').creation_relaxation_prefabs();

    },
    //金币
    gold_label(gold) {
        this.node.getChildByName('bg').getChildByName(' gold_label').getComponent('cc.Label').string = '金币 +' + gold;
        let read_gold = cc.sys.localStorage.getItem('gold');
        let m_gold = parseInt(read_gold);
        cc.sys.localStorage.setItem('gold', m_gold + gold);
    },
    //炫耀一下按钮
    flaunt() {
    },
    //下一关按钮
    next() {
        //cc.director.loadScene("lianliankan");
        this.node.active = false;//隐藏通关窗口
        this.game.getComponent('game').creation_game_prefabs(this.guan_ka, this.hang, this.lie, this.pageIndex);
        this.lianliankan_jiao_ben.game_start();//重新计时
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
    ba_lianlian_kan_youxi_jiaoben_chuanjinlai(jiao_ben, guan_ka, pageIndex) {
        this.lianliankan_jiao_ben = jiao_ben;
        this.guan_ka = guan_ka;
        this.pageIndex = pageIndex;
        //this.
    },
    ba_game_jiaoben_chuanjinlai(jiao_ben, guan_ka_shu, hang, lie, guan_ka_amount_arr) {
        this.game = jiao_ben;
        this.guan_ka = ++guan_ka_shu;
        this.guan_ka_amount_arr = guan_ka_amount_arr;
        this.lie = ++lie;
        if (this.lie > this.guan_ka_amount_arr[0].length - 1) {
            this.lie = 0;
            hang++;//如果行大于最大的数的时候
        }
        this.hang = hang;
        if (this.hang > this.guan_ka_amount_arr.length - 1) {
            this.hang = 0;
            this.pageIndex++;
        }
    },
    //记录的显示与否
    record_show(no_off) {
        this.node.getChildByName('bg').getChildByName('record').active = no_off;
    }
    // update (dt) {},
});

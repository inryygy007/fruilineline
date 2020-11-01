
cc.Class({
    extends: cc.Component,

    properties: {
        // game_prefabs: {
        //     type: cc.Prefab,
        //     default: null
        // }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    //关卡按钮
    guan_ka_button() {
        //cc.director.loadScene("lianliankan");
        this.game.hide_relaxation(false);
        this.game.creation_game_prefabs(this.number, this.hang, this.lie, this.pageIndex);
    },
    //关卡上的数字
    guan_ka_label(number, hang, lie, guan_ka_amount_arr) {
        //这
        this.number = number;
        this.hang = hang;
        this.lie = lie;
        this.guan_ka_amount_arr = guan_ka_amount_arr;
        this.node.getChildByName("label").getComponent('cc.Label').string = this.number;
        this.guan_ka_lock(this.number);
    },
    //关卡锁
    guan_ka_lock(number) {
        let guan_ka = cc.sys.localStorage.getItem('class');
        if (guan_ka === null) {
            cc.sys.localStorage.setItem('class', 1);
        }
        let m_guan_ka = parseInt(guan_ka);
        if (number > m_guan_ka) {//如果这一关大于 已解锁的关卡, 那么显示锁 对吧嗯,显示锁 的同时
            //那之前的数字和星星呢?要不要隐藏? ??

            //显示锁
            this.node.getChildByName("lock").active = true;
            this.node.getChildByName("lock_button").getComponent('cc.Button').interactable = false;
            //隐藏数字
            this.node.getChildByName("label").active = false;
            //隐藏星星
            this.node.getChildByName("guan_ka_chengji").active = false;
        } else { //这一关在解锁(包括解锁那关)
            //要做什么? 是不是跟上面反过来
            //这里隐藏锁不就锁没用了啊 这里不需要要锁啊, 不是判断了不用锁吗, 当需要锁的时候它会走上面的if
            //隐藏锁
            this.node.getChildByName("lock").active = false;
            this.node.getChildByName("lock_button").getComponent('cc.Button').interactable = true;
            //显示数字
            this.node.getChildByName("label").active = true;
            //显示星星 明白吗 为什么要那么做了 不能是在结束的时候再去把星星显示与否吗
            this.node.getChildByName("guan_ka_chengji").active = true;
        }
    },
    //关卡成绩
    guan_ka_chengji(cheng_ji) {
        let grade = parseInt(cheng_ji);
        if (grade <= 30) {
            this.node.getChildByName('guan_ka_chengji').active = false;
            this.node.getChildByName("A").active = true;
        } else if (grade > 30 && grade <= 60) {
            this.node.getChildByName('guan_ka_chengji').active = false;
            this.node.getChildByName("B").active = true;
        } else if (grade > 60 && grade <= 90) {
            this.node.getChildByName('guan_ka_chengji').active = false;
            this.node.getChildByName("C").active = true;
        }
    },
    ba_game_jiaoben_chuanjinlai(jiao_ben, pageIndex) {
        this.game = jiao_ben;
        this.pageIndex = pageIndex;
    }
    // update (dt) {},
});

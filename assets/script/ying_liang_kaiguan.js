

cc.Class({
    extends: cc.Component,

    properties: {
        ying_liang_kai_sprite: {
            default: null,
            type: cc.Sprite
        },
        ying_liang_guan_sprite: {
            default: null,
            type: cc.Sprite
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    //音量开关
    ying_liang_kaiguan() {
        this.off_on++;
        if (this.off_on % 2 === 0) {
            this.ying_liang_kai_sprite.node.active = true;
            this.ying_liang_guan_sprite.node.active = false;
        } else {
            this.ying_liang_kai_sprite.node.active = false;
            this.ying_liang_guan_sprite.node.active = true;
        }
    },
    start() {
        this.off_on = 0;
    },

    // update (dt) {},
});


cc.Class({
    extends: cc.Component,

    properties: {
        ying_liang_node: {
            default: null,
            type: cc.Node
        },
        kai_shi_node: {
            default: null,
            type: cc.Node
        },
        fan_hui_node: {
            default: null,
            type: cc.Node
        },
        nan_du_node: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    //隐蔽音量，分享，开始图标
    kai_shi() {
        this.ying_liang_node.active = false;
        this.kai_shi_node.active = false;
        this.fan_hui_node.active = true;
        this.nan_du_node.active = true;
    },
    //返回,显示音量，分享，开始图标并且隐蔽返回图标
    fan_hui() {
        this.ying_liang_node.active = true;
        this.kai_shi_node.active = true;
        this.fan_hui_node.active = false;
    },
    start() {

    },

    // update (dt) {},
});

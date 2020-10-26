
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
        },
        relaxation_node: {
            default: null,
            type: cc.Node
        },
        //休闲模式预制物
        relaxation_prefabs: {
            type: cc.Prefab,
            default: null
        },
        //关卡预制物
        guan_ka_prefabs: {
            type: cc.Prefab,
            default: null
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
        this.nan_du_node.active = false;
    },
    //休闲模式
    relaxation_pattern() {
        this.creation_relaxation_prefabs();
    },
    start() {
    },
    //游戏开始界面
    star_interface(no_off) {
        cc.find('bg_node', this.node).active = no_off;
    },
    //创建休闲模式预制物
    creation_relaxation_prefabs() {
        this.star_interface(false);
        if (!this.relaxation) {
            this.relaxation = new cc.Node();
            this.relaxation.parent = this.relaxation_node
            let relaxation = cc.instantiate(this.relaxation_prefabs);
            relaxation.getComponent('pattern').ba_game_jiaoben_chuanjinlai(this);
            this.relaxation.addChild(relaxation);
        }
        this.arr = [];
        for (let i = 0; i < 5; i++) {
            this.arr[i] = [];
            for (let j = 0; j < 5; j++) {
                this.arr[i][j] = this.creation_guan_ka();
            }
        }
        this.alter();
    },
    //关卡预制物创建
    creation_guan_ka() {
        if (!this.xing_jie_dian) {
            this.xing_jie_dian = new cc.Node();
            this.xing_jie_dian.parent = this.relaxation;
        }
        let guan_ka = cc.instantiate(this.guan_ka_prefabs);
        this.xing_jie_dian.addChild(guan_ka);
        return guan_ka;
    },
    //改变位置
    alter() {
        let beginning = -260;//上面的起点
        let destination = -240;//下面的终点
        let m_width = this.arr[0][0].getChildByName('guan_ka_bg').width;
        let m_heigth = this.arr[0][0].getChildByName('guan_ka_bg').height;
        let right_interval = 20;//往右的间隔
        let down_interval = 50;//往下的间隔
        let number = 0;
        for (let i = this.arr.length - 1; i >= 0; i--) {
            for (let j = this.arr[i].length - 1; j >= 0; j--) {
                let x = beginning + j * (m_width + right_interval);
                let y = destination + i * (m_heigth + down_interval);
                this.arr[i][j].position = cc.v2(-x, y);
                this.arr[i][j].getComponent('guan_ka').guan_ka_label(++number);
            }
        }
    },
    //删除节点
    shan_chu_jie_dian() {
        this.xing_jie_dian.destroy();
        this.relaxation.destroy();
    },
    // update (dt) {},
});


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
        //放休闲模式预制物的node
        relaxation_node: {
            default: null,
            type: cc.Node
        },
        //放游戏界面预制物的node
        game_node: {
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
        },
        //游戏界面
        game_prefabs: {
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
        this.star_interface(false);
        this.creation_relaxation_prefabs();
    },
    //删除记录表
    shan_chu_ji_lv() {
        cc.sys.localStorage.removeItem('score');
        cc.sys.localStorage.removeItem('class');
    },
    start() {
        //this.shan_chu_ji_lv();
    },
    //游戏开始界面
    star_interface(no_off) {
        cc.find('bg_node', this.node).active = no_off;
    },
    //创建休闲模式预制物
    creation_relaxation_prefabs() {
        if (this.relaxation) {
            this.xing_jie_dian.removeFromParent(false);
            this.xing_jie_dian = null;
        }
        this.relaxation = new cc.Node();
        this.relaxation.parent = this.relaxation_node;
        this.relaxation_pattern = cc.instantiate(this.relaxation_prefabs);
        this.relaxation_pattern.getComponent('pattern').ba_game_jiaoben_chuanjinlai(this);
        this.relaxation.addChild(this.relaxation_pattern);
        this.guan_ka_arr = [];
        for (let i = 0; i < 5; i++) {
            this.guan_ka_arr[i] = [];
            for (let j = 0; j < 5; j++) {
                this.guan_ka_arr[i][j] = this.creation_guan_ka();
            }
        }
        this.deposit_score_arr();
        this.alter();
    },
    //创建一个存分数的数组
    deposit_score_arr() {
        let grade = cc.sys.localStorage.getItem('score');
        if (grade === null) {
            this.guan_ka_amount_arr = [];
            for (let i = 0; i < this.guan_ka_arr.length; i++) {
                this.guan_ka_amount_arr[i] = [];
                for (let j = 0; j < this.guan_ka_arr[i].length; j++) {
                    this.guan_ka_amount_arr[i][j] = null;
                }
            }
            let jieguo = JSON.stringify(this.guan_ka_amount_arr);
            cc.sys.localStorage.setItem('score', jieguo);
        } else {
            let m_grade = cc.sys.localStorage.getItem('score');
            this.guan_ka_amount_arr = JSON.parse(m_grade);
        }
    },
    //创建游戏界面 附加一个关卡数
    creation_game_prefabs(guan_ka_shu, hang, lie) {
        if (this.game_interface) {
            this.game_interface.removeFromParent(false);
            this.game_interface = null;
        }
        this.game_interface = new cc.Node();
        this.game_interface.parent = this.game_node;
        let game_interface = cc.instantiate(this.game_prefabs);
        game_interface.getComponent('lianliankan_youxi').ba_game_jiaoben_chuanjinlai(this);
        game_interface.getComponent('lianliankan_youxi').set_dangqian_guanka(guan_ka_shu, hang, lie, this.guan_ka_amount_arr);
        this.game_interface.addChild(game_interface);
        game_interface.getComponent('lianliankan_youxi').show_now_guan_ka();



    },
    //关卡预制物创建
    creation_guan_ka() {
        if (!this.xing_jie_dian) {
            this.xing_jie_dian = new cc.Node();
            this.xing_jie_dian.parent = this.relaxation;
        }
        let guan_ka = cc.instantiate(this.guan_ka_prefabs);
        this.xing_jie_dian.addChild(guan_ka);
        guan_ka.getComponent('guan_ka').ba_game_jiaoben_chuanjinlai(this);
        return guan_ka;
    },
    //改变位置
    alter() {
        let beginning = -260;//上面的起点
        let destination = 340;//下面的终点
        let m_width = this.guan_ka_arr[0][0].getChildByName('guan_ka_bg').width;//110
        let m_heigth = this.guan_ka_arr[0][0].getChildByName('guan_ka_bg').height;//110
        let right_interval = 20;//往右的间隔
        let down_interval = 50;//往下的间隔
        let number = 0;//cc.sys.localStorage.getItem('class');
        // if (number === null) {
        //     cc.sys.localStorage.setItem('class', 0);
        // }
        // parseInt(number);
        for (let i = 0; i < this.guan_ka_arr.length; i++) {
            for (let j = 0; j < this.guan_ka_arr[i].length; j++) {
                let x = beginning + j * (m_width + right_interval);
                let y = destination - i * (m_heigth + down_interval);
                this.guan_ka_arr[i][j].position = cc.v2(x, y);
                let grade = cc.sys.localStorage.getItem('score');
                let m_grade = JSON.parse(grade);
                if (m_grade != null) {
                    let cheng_ji = m_grade[i][j];
                    this.guan_ka_arr[i][j].getComponent('guan_ka').guan_ka_chengji(cheng_ji);
                }
                this.guan_ka_arr[i][j].getComponent('guan_ka').guan_ka_label(++number, i, j, this.guan_ka_amount_arr);
            }
        }
        // for (let i = this.guan_ka_arr.length - 1; i >= 0; i--) {
        //     for (let j = this.guan_ka_arr[i].length - 1; j >= 0; j--) {
        //         let x = beginning + j * (m_width + right_interval);
        //         let y = destination + i * (m_heigth + down_interval);
        //         this.guan_ka_arr[i][j].position = cc.v2(-x, y);
        //         let grade = cc.sys.localStorage.getItem('score');
        //         let m_grade = JSON.parse(grade);
        //         if (m_grade != null) {
        //             let cheng_ji = m_grade[i][j];
        //             this.guan_ka_arr[i][j].getComponent('guan_ka').guan_ka_chengji(cheng_ji);
        //         }
        //         this.guan_ka_arr[i][j].getComponent('guan_ka').guan_ka_label(++number, i, j, this.guan_ka_amount_arr);
        //     }
        // }
    },
    //隐藏休闲模式背景
    hide_relaxation(no_off) {
        this.relaxation_pattern.active = no_off;
        this.fan_hui_node.active = false;
        this.nan_du_node.active = false;
        //this.shan_chu_jie_dian();
    },
    //删除节点
    shan_chu_jie_dian() {
        if (this.xing_jie_dian) {
            this.xing_jie_dian.removeFromParent(false);
            this.xing_jie_dian = null;
        }
        //this.xing_jie_dian.destroy();
        //this.relaxation.destroy();
        if (this.relaxation) {
            this.relaxation.removeFromParent(false);
            this.relaxation = null;
        }
    },
    // update (dt) {},
});

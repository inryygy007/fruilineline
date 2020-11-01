
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
        },
        //关卡页
        page_prefab: {
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
        this.fan_hui_node.active = false;
        this.nan_du_node.active = false;
        this.star_interface(false);
        this.creation_relaxation_prefabs();
    },
    //删除记录表
    shan_chu_ji_lv() {
        let score_str = 'score0';
        cc.sys.localStorage.removeItem(score_str);
        cc.sys.localStorage.removeItem('class');
        cc.sys.localStorage.removeItem('number');
    },
    start() {
        // this.shan_chu_ji_lv();
    },
    //游戏开始界面
    star_interface(no_off) {
        cc.find('bg_node', this.node).active = no_off;
    },
    //创建休闲模式预制物
    creation_relaxation_prefabs() {
        this.guan_ka_amount_arr = [];
        if (this.relaxation) {
            this.relaxation.removeFromParent(false);
            this.relaxation = null;
        }
        this.relaxation = new cc.Node();
        this.relaxation.parent = this.relaxation_node;
        let t_page_num = 10;
        let t_pg = cc.find('page_node', this.node).getComponent(cc.PageView)
        for (let i = 0; i < t_page_num; i++) {
            let t_page = cc.instantiate(this.page_prefab);
            //t_page.parent = this.relaxation;
            t_pg.addPage(t_page);
            t_page.getComponent('page').set_page_index(i);
            t_page.getComponent('page').setGamejs(this);
            t_page.x = i * 720;
            this.guan_ka_amount_arr[i] = t_page.getComponent('page').deposit_score_arr();
        }
        this.relaxation_node.width = t_page_num * 720;
        this.relaxation_node.heigth = 1280;

        // this.relaxation_pattern = cc.instantiate(this.relaxation_prefabs);
        // this.relaxation_pattern.getComponent('pattern').ba_game_jiaoben_chuanjinlai(this);
        // this.relaxation.addChild(this.relaxation_pattern);
        // this.guan_ka_arr = [];
        // for (let i = 0; i < 5; i++) {
        //     this.guan_ka_arr[i] = [];
        //     for (let j = 0; j < 5; j++) {
        //         this.guan_ka_arr[i][j] = this.creation_guan_ka();
        //     }
        // }
        // this.deposit_score_arr();
        // this.alter();
    },
    //创建游戏界面 附加一个关卡数
    creation_game_prefabs(guan_ka_shu, hang, lie, pageIndex) {
        this.pageIndex = pageIndex;
        if (this.game_interface) {
            this.game_interface.removeFromParent(false);
            this.game_interface = null;
        }
        this.game_interface = new cc.Node();
        this.game_interface.parent = this.game_node;
        let game_interface = cc.instantiate(this.game_prefabs);
        game_interface.getComponent('lianliankan_youxi').ba_game_jiaoben_chuanjinlai(this, this.pageIndex);
        game_interface.getComponent('lianliankan_youxi').set_dangqian_guanka(guan_ka_shu, hang, lie, this.guan_ka_amount_arr[this.pageIndex]);
        this.game_interface.addChild(game_interface);
        game_interface.getComponent('lianliankan_youxi').show_now_guan_ka();



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

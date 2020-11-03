
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
        },
        page_node: {
            type: cc.Node,
            default: null
        },
        shui_guo_zhong_lei: 24,//水果的种类
        original_gold: 1000,//开始的金币
        gold: 50//通关后获得的金币
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    //隐蔽音量，分享，开始图标
    kai_shi() {
        //this.stop_action();
        //this.ying_liang_node.active = false;
        this.kai_shi_node.active = false;
        this.fan_hui_node.active = true;
        this.nan_du_node.active = true;
        this.node_motion(this.ying_liang_node, 0, 550, true);
        //this.node_motion(this.kai_shi_node, 500, 0);
        // this.pattern_motion();
        this.node_motion(this.nan_du_node, 500, 0);
    },
    //返回,显示音量，分享，开始图标并且隐蔽返回图标
    fan_hui() {
        this.ying_liang_node.active = true;
        this.kai_shi_node.active = true;
        this.star_button_motion();
        // this.fan_hui_node.active = false;
        // this.nan_du_node.active = false;
        //this.pattern_motion(true);
        this.node_motion(this.nan_du_node, 500, 0, true);
        this.node_motion(this.ying_liang_node, 0, 500);
        //this.node_motion(this.kai_shi_node, 500, 0, true);
        //this.node_motion(this.ying_liang_node, 0, 550, true);
    },
    //休闲模式
    relaxation_pattern() {
        // this.fan_hui_node.active = false;
        // this.nan_du_node.active = false;
        this.star_interface(false);
        this.creation_relaxation_prefabs();
    },
    //删除记录表
    shan_chu_ji_lv() {
        let score_str = 'score0';
        cc.sys.localStorage.removeItem(score_str);
        cc.sys.localStorage.removeItem('class');
        cc.sys.localStorage.removeItem('number');
        cc.sys.localStorage.removeItem('gold');
    },
    start() {
        //this.shan_chu_ji_lv();
        this.star_button_motion();
        this.node_motion(this.ying_liang_node, 0, 500);
    },
    //游戏开始界面
    star_interface(no_off) {
        cc.find('bg_node', this.node).active = no_off;
    },
    //开始按钮的移动动作
    star_button_move_motion() {

    },
    //开始按钮的动作
    star_button_motion() {
        let act1 = cc.scaleTo(1, 0.8).easing(cc.easeElasticIn(100.0));
        let act2 = cc.scaleBy(2, 1.2).easing(cc.easeElasticOut(100.0));
        let combination = cc.sequence(act1, act2);//组合放大缩小动作
        this.star_button_action = cc.find("bg_node/kai_shi_node/kai_shi", this.node).runAction(cc.repeatForever(combination));
    },//音量的动作
    node_motion(name, x, y, no_off) {
        let node_name = name; //cc.find("bg_node/ying_linag_node", this.node);
        if (!this.m_node_pos) {
            this.m_node_pos = cc.v2(node_name.x, node_name.y);
        }
        if (!this.m_node_start_pos) {
            this.m_node_start_pos = cc.v2(0, 0);
        }
        let node_pos = null;
        if (no_off) {//移到不可见
            //先设置到0,0
            node_name.x = this.m_node_start_pos.x;//这的位置应该是0
            node_name.y = this.m_node_start_pos.y;
            node_pos = cc.v2(this.m_node_start_pos.x + x, this.m_node_start_pos.y - y);
            this.m_node_pos = null;
        } else {
            node_name.x = this.m_node_pos.x;//这的位置应该是0
            node_name.y = this.m_node_pos.y;
            node_pos = cc.v2(this.m_node_pos.x - x, this.m_node_pos.y + y);
        }
        if (this.action) {
            this.action_2 = cc.moveTo(0.5, cc.v2(node_pos.x, node_pos.y));
            this.action_2.easing(cc.easeOut(2.0));
            node_name.runAction(this.action_2);
            node_name.stopAction(this.action);
            this.action = null;
        } else {
            this.action = cc.moveTo(0.5, cc.v2(node_pos.x, node_pos.y));
            this.action.easing(cc.easeOut(2.0));//创建 easeOut 缓动对象，由快到慢。
            //act.easing(cc.easeIn(2.0));//创建 easeIn 缓动对象，由慢到快。
            //让焦点 运行动作
            node_name.runAction(this.action);
            this.action_2 = null;
            node_name.stopAction(this.action_2);
        }
    },
    //模式的动作
    pattern_motion(no_off) {
        let pattern = cc.find("nan_du_node", this.node);
        if (!this.m_pattern_pos) {
            this.m_pattern_pos = cc.v2(pattern.x, pattern.y);
        }
        if (!this.m_pattern_start_pos) {
            this.m_pattern_start_pos = cc.v2(0, 0);
        }
        let pattern_pos = null;
        if (no_off) {//移到不可见
            //先设置到0,0
            pattern.x = this.m_pattern_start_pos.x;//这的位置应该是0
            pattern.y = this.m_pattern_start_pos.y;
            pattern_pos = cc.v2(this.m_pattern_pos.x + 500, this.m_pattern_pos.y);
        } else {
            pattern.x = this.m_pattern_pos.x;//这的位置应该是0
            pattern.y = this.m_pattern_pos.y;
            pattern_pos = cc.v2(this.m_pattern_pos.x - 500, this.m_pattern_pos.y);
        }
        if (this.act) {
            //pattern.stopAction(this.act);
            pattern.stopAction(this.act);
            this.act = null;
        }
        this.act = cc.moveTo(0.8, cc.v2(pattern_pos.x, pattern_pos.y));
        this.act.easing(cc.easeOut(2.0));//创建 easeOut 缓动对象，由快到慢。
        //act.easing(cc.easeIn(2.0));//创建 easeIn 缓动对象，由慢到快。
        //让焦点 运行动作
        pattern.runAction(this.act);
    },
    //创建休闲模式预制物
    creation_relaxation_prefabs() {
        this.guan_ka_amount_arr = [];
        if (this.relaxation) {
            //this.relaxation.removeFromParent(false);
            this.relaxation.destroy();
            this.relaxation = null;
        }
        this.relaxation = new cc.Node();
        this.relaxation.parent = this.relaxation_node;
        let t_page_num = 10;
        let t_pg = cc.find('page_node', this.node).getComponent(cc.PageView);
        for (let i = 0; i < t_page_num; i++) {
            let t_page = cc.instantiate(this.page_prefab);
            //t_page.zIndex = 1000;
            //t_page.parent = this.relaxation;
            t_pg.addPage(t_page);
            t_page.getComponent('page').set_page_index(i);
            t_page.getComponent('page').setGamejs(this);
            t_page.x = i * 720;
            this.guan_ka_amount_arr[i] = t_page.getComponent('page').deposit_score_arr();
        }
        this.relaxation_node.width = t_page_num * 720;
        this.relaxation_node.heigth = 1280;

        this.relaxation_pattern = cc.instantiate(this.relaxation_prefabs);
        this.relaxation_pattern.getComponent('pattern').ba_game_jiaoben_chuanjinlai(this);
        //t_pg.addPage(this.relaxation_pattern);
        this.relaxation_pattern.zIndex = -1000;
        this.page_node.addChild(this.relaxation_pattern);
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
            //this.game_interface.removeFromParent(false);
            this.game_interface.destroy();
            this.game_interface = null;
        }
        this.game_interface = new cc.Node();
        this.game_interface.parent = this.game_node;
        let game_interface = cc.instantiate(this.game_prefabs);
        let m_gold = cc.sys.localStorage.getItem('gold');
        if (m_gold === null) {
            cc.sys.localStorage.setItem('gold', 1000);
        }
        m_gold = cc.sys.localStorage.getItem('gold');
        game_interface.getComponent('lianliankan_youxi').set_original_gold(m_gold);
        game_interface.getComponent('lianliankan_youxi').ba_game_jiaoben_chuanjinlai(this, this.pageIndex, this.shui_guo_zhong_lei, this.gold);
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

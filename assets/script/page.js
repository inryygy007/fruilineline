
cc.Class({
    extends: cc.Component,

    properties: {
        //关卡预制物
        guan_ka_prefabs: {
            type: cc.Prefab,
            default: null
        },
        pageIndex: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start() {
        //this.shan_chu_ji_lv();
        this.creation_relaxation_prefabs();
    },
    set_page_index(idx) {
        this.pageIndex = idx;
    },
    //创建休闲模式预制物
    creation_relaxation_prefabs() {
        if (this.xing_jie_dian) {
            this.xing_jie_dian.removeFromParent(false);
            this.xing_jie_dian = null;
        }
        this.xing_jie_dian = new cc.Node();
        this.xing_jie_dian.parent = this.node;
        if (!this.guan_ka_arr) {
            this.guan_ka_arr = [];
        }
        for (let i = 0; i < 5; i++) {
            this.guan_ka_arr[i] = [];
            for (let j = 0; j < 5; j++) {
                this.guan_ka_arr[i][j] = this.creation_guan_ka();
            }
        }
        this.deposit_score_arr();
        this.alter_position();
    },
    //创建一个存分数的数组
    deposit_score_arr() {
        let score_str = 'score' + this.pageIndex;
        let grade = cc.sys.localStorage.getItem(score_str);
        if (grade === null) {
            this.guan_ka_amount_arr = [];
            for (let i = 0; i < this.guan_ka_arr.length; i++) {
                this.guan_ka_amount_arr[i] = [];
                for (let j = 0; j < this.guan_ka_arr[i].length; j++) {
                    this.guan_ka_amount_arr[i][j] = null;
                }
            }
            let jieguo = JSON.stringify(this.guan_ka_amount_arr);
            cc.sys.localStorage.setItem(score_str, jieguo);
        } else {
            let m_grade = cc.sys.localStorage.getItem(score_str);
            this.guan_ka_amount_arr = JSON.parse(m_grade);
        }
        return this.guan_ka_amount_arr;
    },
    setGamejs(game_js) {
        this.game = game_js;
    },
    //关卡预制物创建
    creation_guan_ka() {
        let guan_ka = cc.instantiate(this.guan_ka_prefabs);
        this.xing_jie_dian.addChild(guan_ka);
        guan_ka.getComponent('guan_ka').ba_game_jiaoben_chuanjinlai(this.game, this.pageIndex);
        return guan_ka;
    },
    //改变位置
    alter_position() {
        let beginning = 100;//上面的起点
        let destination = 340;//下面的终点
        let m_width = this.guan_ka_arr[0][0].getChildByName('guan_ka_bg').width;//110
        let m_heigth = this.guan_ka_arr[0][0].getChildByName('guan_ka_bg').height;//110
        let right_interval = 20;//往右的间隔
        let down_interval = 50;//往下的间隔
        let number = this.pageIndex * (25 + 1);
        // let guan_ka = cc.sys.localStorage.getItem('number');
        // if (guan_ka === null) {  
        //     cc.sys.localStorage.setItem('number', 0);
        // }
        // guan_ka = cc.sys.localStorage.getItem('number');
        // let m_guan_ka = parseInt(guan_ka);
        //m_guan_ka += 1;
        for (let i = 0; i < this.guan_ka_arr.length; i++) {
            for (let j = 0; j < this.guan_ka_arr[i].length; j++) {
                let x = beginning + j * (m_width + right_interval);
                let y = destination - i * (m_heigth + down_interval);
                this.guan_ka_arr[i][j].position = cc.v2(x, y);
                let score_str = 'score' + this.pageIndex;
                let grade = cc.sys.localStorage.getItem(score_str);
                let m_grade = JSON.parse(grade);
                if (m_grade != null) {
                    let cheng_ji = m_grade[i][j];
                    this.guan_ka_arr[i][j].getComponent('guan_ka').guan_ka_chengji(cheng_ji);
                }
                ++number;
                //m_guan_ka++;
                this.guan_ka_arr[i][j].getComponent('guan_ka').guan_ka_label(number, i, j, this.guan_ka_amount_arr);
                //cc.sys.localStorage.setItem('number', m_guan_ka);
            }
        }
    },
});

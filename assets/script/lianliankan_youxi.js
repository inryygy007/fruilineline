// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const ditu_shengchengqi = require("./ditu_shengchengqi");

cc.Class({
    extends: cc.Component,

    properties: {

        shuiguo: {
            type: cc.Prefab,
            default: null
        },
        focus: {
            type: cc.Prefab,
            default: null
        },
        thread: {
            type: cc.Prefab,
            default: null
        },
        fail: {
            type: cc.Prefab,
            default: null
        },
        player: {
            type: cc.Prefab,
            default: null
        },
        stop_prefabs: {
            type: cc.Prefab,
            default: null
        },
        //shui_guo_zhong_lei: 24
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    //计时器, 我们想要的是什么? 调用一个函数 传进一个时间 进度条就可以在这个时间内从最大到最小值变动对不对?嗯
    //期望的结果: 调用this.timer(6,1,0); 就能在 6秒内 进度条从1 到 0 缓慢变化
    //6 秒从最大到最小 算出每一秒是多少
    //结束之后调用一下传进来的回调函数
    //把主脚本传进来
    ba_game_jiaoben_chuanjinlai(jiao_ben, pageIndex, shui_guo_zhong_lei, gold) {
        this.game = jiao_ben;
        this.pageIndex = pageIndex;
        this.shui_guo_zhong_lei = shui_guo_zhong_lei;
        this.gold = gold;
    },
    set_dangqian_guanka(guan_ka_shu, hang, lie, arr) {
        this.guan_ka = guan_ka_shu;
        this.hang = hang;
        this.lie = lie;
        this.guan_ka_amount_arr = arr;
    },
    //显示当前关卡
    show_now_guan_ka() {
        this.node.getChildByName("bg").getChildByName("guan_ka_label").getComponent('cc.Label').string = '关卡   ' + this.guan_ka;
    },
    //游戏开始
    game_start() {
        this.m_progressBar = cc.find("bg/time_schedule_bg/time_schedule", this.node).getComponent(cc.ProgressBar);
        this.timer(9000000, 1, 0, function () {
            this.shi_bai = true;
        }.bind(this));
        this.di_tu_arr = this.di_tu();
        this.a = '开始的时候';
        //console.log(this.di_tu_arr);
        //this.line.getComponent('thread').set_line(this.di_tu_arr);
        // this.di_tu_arr = this.di_tu_arr[0][0] = 0;
        // let k = this.di_tu_arr.length;
        this.shua_xing_ditu(this.di_tu_arr);
        //this.show_now_guan_ka();
        // //测试下函数好不好用
        // let qidian = { hang: 3, lie: 0 };
        // let zhongdian = { hang: 0, lie: 5 };

        // // let flag = this.shui_ping_jiance(qidian, zhongdian, this.di_tu_arr);
        // // let flag1 = this.shu_zhi_jiance(qidian, zhongdian, this.di_tu_arr);
        // let flag2 = this.yige_guaidian_jiance(qidian, zhongdian, this.di_tu_arr);
    },
    start() {
        this.game_start();
    },
    //暂停按钮
    stop_button() {
        //暂停计时器
        this.stop_timer(true);
        this.hide_shui_guo(false);
        let stop = cc.instantiate(this.stop_prefabs);
        this.node.addChild(stop);
        stop.getComponent('stop').ba_lianlian_kan_youxi_jiaoben_chuanjinlai(this);
        stop.getComponent('stop').ba_game_youxi_jiaoben_chuanjinlai(this.game);
    },
    //
    randomsort(a, b) {
        return Math.random() > .5 ? -1 : 1;
        //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    },
    shuffle(arr) {//arr 是一个二维数组
        let arr_new = [];
        for (let i = 0; i < arr.length; i++) {
            arr_new[i] = [];
            for (let j = 0; j < arr[i].length; j++) {
                arr_new[i][j] = {
                    p1: cc.v2(i, j),
                    e: arr[i][j]
                }
            }
        }

        let arr1 = [];
        for (let i = 0; i < arr_new.length; i++) {
            for (let j = 0; j < arr_new[i].length; j++) {
                arr1.push(arr_new[i][j]);
            }
        }
        arr1.sort(this.randomsort);

        //放回二维数组
        // let yihang_youduoshaoge = arr[0].length;
        // for (let i = 0; i < arr1.length; i++) {
        //     let hang = Math.floor(i / yihang_youduoshaoge);
        //     let lie = i % yihang_youduoshaoge;
        //     arr[hang][lie] = arr1[i];
        // }

        let k = 0;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                arr1[k].p2 = cc.v2(i, j);
                arr[i][j] = arr1[k].e;
                k++;
            }
        }

        //6
        return arr1;
    },
    //花金币刷新当前关卡
    shua_xin_buntton() {
        if (this.shuaxin_zhong) {//如果正处于刷新中, 点击按钮就直接返回
            return;
        }
        this.a = '刷新后';
        let read_gold = cc.sys.localStorage.getItem('gold');
        let m_gold = parseInt(read_gold);
        if (m_gold >= 300) {//一般这样的结构 if 里是不会带return 的因为这个if 里的return 没有用 < 的反面是 >= 
            this.shuaxin_zhong = true;
            m_gold -= 300;
            cc.sys.localStorage.setItem('gold', m_gold);
            let yidong_guocheng = this.shuffle(this.di_tu_arr);
            //
            this.game.getComponent('game').m_gold();
            let yidong_time = 1;
            //

            //这里不移动
            for (let i = 0; i < yidong_guocheng.length; i++) {
                this.move_fruit(yidong_guocheng[i].p1, yidong_guocheng[i].p2, yidong_time);
            }

            this.node.runAction(cc.sequence(cc.delayTime(yidong_time + 0.01), cc.callFunc(function () {
                for (let i = 0; i < this.shuiguo_arr.length; i++) {
                    for (let j = 0; j < this.shuiguo_arr[i].length; j++) {
                        if (this.shuiguo_arr[i][j].m_init_pos) {
                            this.shuiguo_arr[i][j].x = this.shuiguo_arr[i][j].m_init_pos.x;
                            this.shuiguo_arr[i][j].y = this.shuiguo_arr[i][j].m_init_pos.y;
                        }
                    }
                }
                this.shua_xing_ditu(this.di_tu_arr);
                //刷新完了把状态重置回来
                this.shuaxin_zhong = false;

            }.bind(this))))
            if (this.shuiguo1) {
                this.m_move_focus.active = false;

                //没有点击水果也就没有焦点, 所以你这儿要判断下有没有 this.shuiguo1
                this.shuiguo1.getComponent('shuiguo').Stop_action();//read property 'getComponent' of undefined //这句话的间断是 从一个undefined变量身上读取getComponent方法
                //所以谁是 undefine d?是不是 this.shuiguo1, 而this.shuiguo1 为什么会是个空的, 注意我的操作
                this.shuiguo1.getComponent('shuiguo').wo_bei_dian_zhong_le = false;
                this.shuiguo1 = null;
            }
        }
    },
    //水果(x行,y列)对应的具体在面板的坐标(node 的位置)
    convert_hanglie_to_zuobian(hang, lie) {
        let shuiguo = this.shuiguo_arr[hang][lie];
        return cc.v2(shuiguo.x, shuiguo.y);
    },
    //移动水果的方法 (0,0) => (1,1)
    move_fruit(kaishi, jieshu, dt) {
        let kaishi_hang = kaishi.x;
        let kaishi_lie = kaishi.y;
        let jieshu_hang = jieshu.x;
        let jieshu_lie = jieshu.y;

        let shuiguo = this.shuiguo_arr[kaishi_hang][kaishi_lie];
        if (!shuiguo) {
            console.error('这个水果不存在', kaishi_hang, kaishi_lie);
            return;
        }

        if (kaishi_hang == jieshu_hang && kaishi_lie == jieshu_lie) {

            return;
        }

        let zhong_dian = this.convert_hanglie_to_zuobian(jieshu_hang, jieshu_lie);

        if (!shuiguo.m_init_pos) {
            shuiguo.m_init_pos = cc.v2(shuiguo.x, shuiguo.y);
        }
        shuiguo.runAction(cc.moveTo(dt, zhong_dian));
    },
    di_tu() {
        //这个地图就代表 了水果的分布对不对?
        //要让这里生成  成双的水果
        //也就是需要一个能生成 成双水果的方法 怎么写?不知道 先生成一半, 另一半复制先前的一半就先了
        //比如 先生成 0,1,2,3  0,1,2,3
        //那把一半生成两遍 就是成双了
        //那我的需求就是 传进地图的大小 你能生成一个能消除干净的二维数组
        //比如 我传 3,2 你要生成
        //0,1
        //0,1 ????位置什么的
        //0,0
        //所以这里的2 其它是[0,2) 左闭右开 也就是 [0,1] 不包含2
        let di_tu_arr = ditu_shengchengqi.gen_rand2_arr(this.shui_guo_zhong_lei + 1, 4, 3);//2种水果,8行6列
        //let di_tu_arr = [[2, 3, 7, 5, 7, 4], [5, 4, 4, 4, 6, 3], [3, 0, 1, 4, 7, 5], [4, 4, 1, 1, 8, 6], [4, 4, 6, 8, 4, 8], [6, 7, 2, 5, 5, 8], [2, 5, 8, 0, 3, 5], [0, 0, 5, 1, 2, 8]]

        //ditu_shengchengqi.gen_rand2_arr(9, 8, 6);
        // ditu_shengchengqi.gen_rand2_arr(9, 4, 3);
        // [[5, 0, 5], [5, 0, 6], [5, 4, 4], [6, 5, 5]];
        //
        //console.log(JSON.stringify(di_tu_arr));
        // let di_tu_arr = [
        //     [1, 0, 0, 0, 0, 1],
        //     [2, 0, 4, 8, 5, 0],
        //     [0, 4, 5, 6, 8, 0],
        //     [1, 0, 2, 3, 5, 2]];

        // let hang = 3;
        // let lie = 2;
        // let arr = this.gen_2dimension_arr(hang, lie);
        // // [hang][lie];
        // arr[0][0] = [0, 1, 0];
        // let h = arr[0][0];
        return di_tu_arr;
    },
    //产生一个二维数组给我
    gen_2dimension_arr(hang, lie) {
        let arr = [];
        for (var i = 0; i < hang; i++) {
            arr[i] = [];
            for (var j = 0; j < lie; j++) {
                arr[i][j] = null;
            }
        }
        return arr;
    },
    //刷新地图
    shua_xing_ditu(di_tu_arr) {
        console.log(this.a, di_tu_arr);
        let origin_y = -400;
        let origin_x = -270;
        //别人只知道用这个方法就能显示地图, 你不能把删除原结点的任务交给别人 
        //别人又不知道你是怎么做的 所以你要自己处理旧结点

        //这条规则适用所有情况
        //1. 先清除
        //2. 再创建 永远都成立
        //第二次进来要怎么处理？这里只生成一次啊
        if (!this.xing_jie_dian) {
            // this.xing_jie_dian.destroy();
            // this.xing_jie_dian = null;
            //所有水果块都是放在这个新结点上的 
            //所以如果需要放一个焦点 在 水果块上面 就需要把这个焦点放在这个结点上
            this.xing_jie_dian = new cc.Node();
            this.xing_jie_dian.parent = this.node;
            //let di_tu_arr = this.di_tu();
            //this.di_tu_arr = di_tu_arr;
            this.shuiguo_arr = [];
            let a = di_tu_arr.length;
            for (let i = 0; i < di_tu_arr.length; i++) {
                this.shuiguo_arr[i] = [];
                for (let j = 0; j < di_tu_arr[i].length; j++) {
                    let shuiguo = cc.instantiate(this.shuiguo);
                    //每生成一个块的时候把连连看游戏的脚本传进去 this 就是指连连看游戏的脚本
                    shuiguo.getComponent('shuiguo').ba_lianlian_kan_youxi_jiaoben_chuanjinlai(this, i, j);
                    this.shuiguo_arr[i][j] = shuiguo;
                    this.xing_jie_dian.addChild(shuiguo);
                    shuiguo.y = origin_y + i * 120;
                    shuiguo.x = origin_x + j * 110;
                    shuiguo.getComponent('shuiguo').setType(di_tu_arr[i][j]);
                }
            }

        } else {
            //创建之后调用刷新走else
            for (let i = 0; i < di_tu_arr.length; i++) {
                for (let j = 0; j < di_tu_arr[i].length; j++) {
                    let shuiguo = this.shuiguo_arr[i][j];
                    shuiguo.getComponent('shuiguo').setType(di_tu_arr[i][j]);
                }
            }
        }


        //因为xin_jiedian 每次都是重新创建的 所以 这个焦点的位置要记录一下
        //添加焦点
        // if (this.xian_jie_dian) {
        //     this.xian_jie_dian.destroy();
        //     this.xian_jie_dian = null;
        // }
        // this.xian_jie_dian = new cc.Node();
        // this.xian_jie_dian.parent = this.node;
        //添加一条线
        this.create_focus();

        //创建线 测试用 一会儿要删除
        let line = cc.instantiate(this.thread);
        this.xing_jie_dian.addChild(line);
        this.m_line_node = line;
        // this.m_line_node.getComponent('thread').set_line(this.di_tu_arr);
        //设置它停在第一个水果块上
        //this.set_move_focus_with_fruit(this.shuiguo_arr[0][1]);
    },
    //创建焦点
    create_focus() {
        //如果没有新结点 返回
        if (!this.xing_jie_dian) {
            return;
        }

        //已经有了返回
        if (this.m_move_focus) {
            return;
        }
        let focus_node = cc.instantiate(this.focus);//这不是进来一次进创建一次？所以弄成删除啊 要的是复用 不需要不断地删除创建
        focus_node.zIndex = 1000;
        this.xing_jie_dian.addChild(focus_node);
        this.m_move_focus = focus_node;

        //所以这个位置的传递就不再需要了
        // if (this.m_move_focus_pos) {//因为焦点一直是这个焦点所以这个位置的传递(之前是删除旧焦点, 把旧焦点的位置用m_move_focus_pos 传给新创建的焦点)
        //     this.m_move_focus.x = this.m_move_focus_pos.x;
        //     this.m_move_focus.y = this.m_move_focus_pos.y;
        // } else {
        //     this.m_move_focus_pos = cc.v2(this.m_move_focus.x, this.m_move_focus.y);
        // }
    },

    //设置那个移动焦点在哪个水果块上
    set_move_focus_with_fruit(fruit_node, use_act) {
        //因为水果块和 移动焦点的 父结点都是一样的(this.xing_jie_dian) 即它们在同个坐标系下, 所以不需要做坐标转换
        //换句话说, 设置移动焦点到 水果的位置 就会是 焦点到水果
        //焦点原来的位置
        // let prev_x = this.m_move_focus.x;
        // let prev_y = this.m_move_focus.y;
        this.m_move_focus_pos = cc.v2(fruit_node.x, fruit_node.y);
        //如果使用动作慢慢移动
        //是不是这个动作没停止啊 差不多， 这个函数被调用， 前一次动作还在做
        if (use_act) {
            //移动 动作
            //动作加上 ease(缓冲的意思)
            this.m_move_focus.stopAllActions();
            let act = cc.moveTo(0.3, cc.v2(fruit_node.x, fruit_node.y));
            act.easing(cc.easeOut(2.0));//创建 easeOut 缓动对象，由快到慢。
            //act.easing(cc.easeIn(2.0));//创建 easeIn 缓动对象，由慢到快。
            //让焦点 运行动作
            this.m_move_focus.runAction(act);
        }
        else {//立即设置到指定点
            this.m_move_focus.x = fruit_node.x;
            this.m_move_focus.y = fruit_node.y;
        }



    },
    //被点击的行列
    bei_dian_ji_de_hang_lie(hang, lie) {
        if (this.shuiguo_arr[hang][lie].getComponent('shuiguo').wo_bei_dian_zhong_le) {
            if (this.shuiguo1 == null) {
                this.shuiguo1 = this.shuiguo_arr[hang][lie];
                this.hang = hang;
                this.lie = lie;
                return;
            } else if (this.shuiguo_arr[hang][lie] !== this.shuiguo1) {
                if (this.shuiguo1.getComponent('shuiguo').lei_xing === this.shuiguo_arr[hang][lie].getComponent('shuiguo').lei_xing) {
                    // for (let i = 0; i < this.di_tu_arr.length; i++) {
                    //     for (let j = 0; j < this.di_tu_arr[i].length; j++) {
                    //         if ((i == hang || i == this.hang) && (j == lie || j == this.lie)) {
                    //             this.di_tu_arr[i][j] = 0;
                    //         }
                    //     }
                    // }
                    this.di_tu_arr[this.hang][this.lie] = 0;
                    this.di_tu_arr[hang][lie] = 0;
                    //this.shan_chu_jie_dian();
                    this.shua_xing_ditu(this.di_tu_arr);
                }
                this.shuiguo_arr[this.hang][this.lie].getComponent('shuiguo').wo_bei_dian_zhong_le = false;
                this.shuiguo_arr[hang][lie].getComponent('shuiguo').wo_bei_dian_zhong_le = false;
                this.shuiguo1 = null;
            }
        }
    },
    get_arr(arr, hang, lie) {
        //如果同是行超出了和列超出了 这个不考虑 因为我们只考虑边界方向的延伸
        //不考虑对角线上的延伸

        if ((hang < 0 || hang > arr.length - 1) && (lie < 0 || lie > arr[0].length - 1)) {
            return 0;
        }
        // if (hang < 0 && lie < 0) {
        //     return 0;
        // }
        let lie_zuo_bian = 0;
        let lie_you_bian = arr[0].length - 1;
        let hang_shang_bian = 0;
        let hang_xia_bian = arr.length - 1;

        //如果lie 超出(右边) 范围
        if (lie > lie_you_bian) {
            //返回边界上的元素+ 超出多少
            //这里的超出多少个总是为1  因为我们在添加虚拟的拐点时就只是加1 
            let chao_chu_duo_shao = lie - lie_you_bian;
            //边界元素是多少
            let you_bianjie_yuanshu = arr[hang][lie_you_bian];
            //这个结果变为 边界元素的位置
            let jie_guo = cc.v2(you_bianjie_yuanshu.x + chao_chu_duo_shao * 70, you_bianjie_yuanshu.y);
            //you_bianjie_yuanshu + chao_chu_duo_shao;

            return jie_guo;
        }
        //如果lie 超出(左边) 范围
        if (lie < lie_zuo_bian) {
            //返回边界上的元素+ 超出多少
            let chao_chu_duo_shao = lie - lie_zuo_bian;
            //边界元素是多少
            let zuo_bianjie_yuanshu = arr[hang][lie_zuo_bian];
            let jie_guo = cc.v2(zuo_bianjie_yuanshu.x + chao_chu_duo_shao * 70, zuo_bianjie_yuanshu.y);
            // zuo_bianjie_yuanshu + chao_chu_duo_shao;

            return jie_guo;
        }
        //如果hang 超出(下边) 范围
        if (hang > hang_xia_bian) {
            //返回边界上的元素+ 超出多少
            let chao_chu_duo_shao = hang - hang_xia_bian;
            //边界元素是多少
            let xia_bianjie_yuanshu = arr[hang_xia_bian][lie];
            let jie_guo = cc.v2(xia_bianjie_yuanshu.x, xia_bianjie_yuanshu.y + chao_chu_duo_shao * 70);
            //xia_bianjie_yuanshu + chao_chu_duo_shao;


            return jie_guo;
        }
        //如果hang 超出(上边) 范围
        if (hang < hang_shang_bian) {
            //返回边界上的元素+ 超出多少
            let chao_chu_duo_shao = hang - hang_shang_bian;
            //边界元素是多少
            let shang_bianjie_yuanshu = arr[hang_shang_bian][lie];
            let jie_guo = cc.v2(shang_bianjie_yuanshu.x, shang_bianjie_yuanshu.y + chao_chu_duo_shao * 70);
            //shang_bianjie_yuanshu + chao_chu_duo_shao;

            return jie_guo;
        }
        //这里取数组对应位置的水果(超出范围的会处理成边界水果)
        return cc.v2(arr[hang][lie].x, arr[hang][lie].y);
    },
    //隐藏与否
    hide() {
        //this.shan_chu_jie_dian();
        this.node.active = false;
    },
    //隐藏所有水果
    hide_shui_guo(no_off) {
        for (let i = 0; i < this.shuiguo_arr.length; i++) {
            for (let j = 0; j < this.shuiguo_arr[i].length; j++) {
                this.shuiguo_arr[i][j].active = no_off;
            }
        }
    },
    //删除节点
    shan_chu_jie_dian() {
        this.xing_jie_dian.removeFromParent(false);
    },
    //写个方法 用于处理有水果块被点中了
    you_shuiguo_bei_dianzhongle() {
        //遍历水果数组 看里面哪个块的 wo_bei_dian_zhong_le 变量为true

        /**
         * 
         */

        //所以 只需要处理两个水果块的情况
        //不用找了
        let buyong_zhaole = false;
        for (let i = 0; i < this.shuiguo_arr.length; i++) {
            for (let j = 0; j < this.shuiguo_arr[i].length; j++) {
                let k = this.shuiguo_arr[i][j].getComponent('shuiguo').wo_bei_dian_zhong_le;
                if (k) {
                    /**
                     * 这个块被点中了,,   要处理是不是有两一样的块
                     */

                    //1.如果之前没有点击水果块, 那这次点击的水果块就记为 点击的水果块1
                    //如果是这种情况 拉下来就不用再循环了
                    if (this.shuiguo1 == null) {
                        this.shuiguo1 = this.shuiguo_arr[i][j];
                        buyong_zhaole = true;
                        this.m_move_focus.active = true;
                        this.set_move_focus_with_fruit(this.shuiguo1, false);
                        break;
                    }
                    //2.如果之前有点击水果块那么 在？
                    //这里有个问题 就是水果1 可能和 shuiguo_arr[i][j] 是同一个水果块
                    //所以在这里我们只判断跟水果1 不同的块 所以这里进来消除的 必然是第二个块引起的
                    else if (this.shuiguo_arr[i][j] !== this.shuiguo1) {
                        this.shuiguo_focus = this.shuiguo_arr[i][j];
                        if (this.shuiguo1.getComponent('shuiguo').lei_xing === this.shuiguo_arr[i][j].getComponent('shuiguo').lei_xing) {
                            //先改数据 再通过数据刷新界面 不是直接操作水果块 水果块的显隐完全由地图数据控制
                            let i1 = this.shuiguo1.getComponent('shuiguo').hang;
                            let j1 = this.shuiguo1.getComponent('shuiguo').lie;
                            //要检测能否消除后再消除
                            let check_result = this.jiance({ hang: i1, lie: j1 }, { hang: i, lie: j }, this.di_tu_arr);
                            if (check_result[0]) {
                                //第一个的行列
                                let pos_arr = [];
                                for (let k = 0; k < check_result[1].length; k++) {
                                    let hang_lie = check_result[1][k];
                                    //获取任意位置(哪怕超出数组范围)
                                    let t_pos = this.get_arr(this.shuiguo_arr, hang_lie.hang, hang_lie.lie);
                                    pos_arr.push(t_pos);
                                }
                                this.m_line_node.getComponent('thread').set_line(pos_arr);
                                this.di_tu_arr[i][j] = 0;//消除的水果位置置为空
                                this.di_tu_arr[i1][j1] = 0;//消除的水果位置置为空
                                let time = this.shuiguo1.getComponent('shuiguo').ying_chang();
                                this.shuiguo_arr[i][j].getComponent('shuiguo').ying_chang();
                                // if (this.a) {
                                //     this.m_line_node.getComponent('thread').jiashu();
                                //     this.shuiguo1.getComponent('shuiguo').jiashu();
                                //     this.shuiguo_arr[i][j].getComponent('shuiguo').jiashu();
                                // }
                                let slef = this;
                                this.node.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(function () {
                                    slef.shua_xing_ditu(slef.di_tu_arr);//这 为啥?刷新地图的时候是把节点删除掉之前做的都没用了啊
                                    slef.player_condition();//通关条件
                                })))
                                //这只改了一个s
                                //this.shua_xing_ditu(this.di_tu_arr);
                                this.m_move_focus.active = false;
                                this.m_line_node.getComponent('thread').yin_cang();
                                //消除的这一组水果的第一个水果 身上的 wo_bei_dian_zhong_le 要清除
                                this.shuiguo1.getComponent('shuiguo').wo_bei_dian_zhong_le = false;
                                this.shuiguo1 = null;
                                // for (let i = 0; i < this.shuiguo_arr.length; i++) {
                                //     for (let j = 0; j < this.shuiguo_arr[i].length; j++) {
                                //         //禁用所有水果按钮
                                //         this.shuiguo_arr[i][j].getComponent('shuiguo').forbid_click(false);
                                //     }
                                // }

                            } else {
                                //检测完不能消除 要把它们的状态置回来
                                this.shuiguo1.getComponent('shuiguo').wo_bei_dian_zhong_le = false;
                                this.shuiguo_arr[i][j].getComponent('shuiguo').wo_bei_dian_zhong_le = false;
                                //this.set_move_focus_with_fruit(this.shuiguo_arr[i][j], true);
                                this.set_move_focus_with_fruit(this.shuiguo_focus, true);
                                this.shuiguo1.getComponent('shuiguo').Stop_action();
                                this.shuiguo1 = this.shuiguo_focus;
                            }
                            //如果消除了 那存的 shuiguo1 要清除掉
                            //如果消除了 就不用找了
                        } else {
                            this.shuiguo1.getComponent('shuiguo').wo_bei_dian_zhong_le = false;
                            this.shuiguo_arr[i][j].getComponent('shuiguo').wo_bei_dian_zhong_le = false;
                            //this.shuiguo1.getComponent('shuiguo').focus(false);
                            this.set_move_focus_with_fruit(this.shuiguo_arr[i][j], true);
                            this.shuiguo1.getComponent('shuiguo').Stop_action();
                            this.shuiguo1 = this.shuiguo_focus;
                            // 如果两不同 那存的 shuiguo1 要清除掉
                            //如果两都消除了 不用找了
                        }

                        //所以 反正都要清除掉 shuiguo1 

                        //this.shuiguo1 = null;
                        //2.1 如果两个水果块相同 消除掉

                        //2.2 如果两个水果块不同  那么取消两个水果块的点击状态

                        //所以 反正都是不要找了
                        buyong_zhaole = true;
                        break;
                    }
                    //不存在 else 3
                    //3. 点了两个水果块, 要么都消除了, 要么都取消了 , 不存在三个水果块被点中的情况
                }
            }
            if (buyong_zhaole) {
                break;
            }
        }
    },
    //测试
    // dian_ji(a) {
    //     this.a = true;
    //     console.log("被点击了");
    // },
    //接下来处理 能删除的规则 是连线的转角最多两个 这样是不能删除的


    //第一种情况


    //水平检测
    //需要,传入 起点, 终点,  还有地图
    //水平 就是行相同, 列不相同
    //返回为true 表示 可以消除,成立
    //再加个边界检测
    shui_ping_jiance(qidian, zhongdiang, di_tu_arr, out_arr) {
        //如果行不相同就不用看了 直接返回false
        if (qidian.hang !== zhongdiang.hang) {
            return false;
        }
        let liangge_doubushi_guaidian = !qidian.shi_guai_dian && !zhongdiang.shi_guai_dian;
        //如果是不同的水果块 也不用看了
        if ((di_tu_arr[qidian.hang][qidian.lie] !==
            di_tu_arr[zhongdiang.hang][zhongdiang.lie]) && liangge_doubushi_guaidian) {
            return false;
        }
        //行相同 水果也相同  还要看它们中间有没有别的水果块
        //从小的列 到大的列看
        //两者中比较小的列
        let liang_zhe_zhong_bijiao_xiao_de_lie = Math.min(qidian.lie, zhongdiang.lie);
        //两者中比较大的列
        let liang_zhe_zhong_bijiao_da_de_lie = Math.max(qidian.lie, zhongdiang.lie);
        //如果两个块都不是拐点 且处理边界上 那中间的块不算
        if (liangge_doubushi_guaidian) {
            //是边界
            if (qidian.hang === 0 || qidian.hang === di_tu_arr.length - 1) {
                if (out_arr) {
                    out_arr[0] = qidian.hang === 0;
                }
                return true;
            }
        }

        for (let i = liang_zhe_zhong_bijiao_xiao_de_lie + 1; i < liang_zhe_zhong_bijiao_da_de_lie; i++) {
            //只要有一个水果块就返回false
            if (di_tu_arr[qidian.hang][i] !== 0) {
                return false;
            }
        }
        //所有其它情况都没有返回false  说明这个水平规则是成立的
        return true;

    },

    shu_zhi_jiance(qidian, zhongdiang, di_tu_arr, out_arr) {
        //如果列不相同就不用看了 直接返回false
        if (qidian.lie !== zhongdiang.lie) {
            return false;
        }

        //如果是不同的水果块(且两个点中没有一个是拐点) 也不用看了
        //

        let liangge_doubushi_guaidian = !qidian.shi_guai_dian && !zhongdiang.shi_guai_dian;
        if ((di_tu_arr[qidian.hang][qidian.lie] !==
            di_tu_arr[zhongdiang.hang][zhongdiang.lie]) && liangge_doubushi_guaidian) {
            return false;
        }

        //行相同 水果也相同  还要看它们中间有没有别的水果块
        //从小的列 到大的列看
        //两者中比较小的列
        let liang_zhe_zhong_bijiao_xiao_de_hang = Math.min(qidian.hang, zhongdiang.hang);
        //两者中比较大的列
        let liang_zhe_zhong_bijiao_da_de_hang = Math.max(qidian.hang, zhongdiang.hang);

        //如果两个块都不是拐点 且是理边界上 那中间的块不算
        if (liangge_doubushi_guaidian) {
            //是边界
            if (qidian.lie === 0 || qidian.lie === di_tu_arr[0].length - 1) {
                if (out_arr) {
                    out_arr[0] = qidian.lie === 0;
                }
                return true;
            }
        }
        for (let i = liang_zhe_zhong_bijiao_xiao_de_hang + 1; i < liang_zhe_zhong_bijiao_da_de_hang; i++) {
            //只要有一个水果块就返回false 行在前 还是列在前? 行是变数 列是固定
            if (di_tu_arr[i][qidian.lie] !== 0) {
                return false;
            }
        }


        //所有其它情况都没有返回false  说明这个水平规则是成立的
        return true;
    },

    //一个拐点的检测

    yige_guaidian_jiance(A, B, di_tu_arr) {
        //注意这里的水果检测和竖直检测里面已经包括了有没有其它水果块的检测
        //所以不用再判断它们中间有没有别的水果果块

        //假设先看 A->C-B 这条线
        //找到C点 C点就是 B.hang  A.lie 组成的新点
        //如果满足 A->C 的竖直检测 且 满足C->B的水平检测 则通过

        //找到C点 有问题吗?mei 有问题吗?mei
        let C = { lie: A.lie, hang: B.hang };
        //只有是空格的时候才能是拐点
        C.shi_guai_dian = di_tu_arr[C.hang][C.lie] === 0;
        if (C.shi_guai_dian) {
            if (this.shu_zhi_jiance(A, C, di_tu_arr) && this.shui_ping_jiance(C, B, di_tu_arr)) {
                return [true, C];
            }
        }

        //如果上面的没返回true 出去
        //说明上面那条A->C-B 不通

        //这时候按同样的方法检测 A->D->B 你自己试试
        //如果C 点没通过 就要看D点
        //找到D 点 D就是 A.hang  B.lie 组成的新点
        //如果满足A->D 的检测 且满足 D->B 的竖直检测 则通过
        let D = { hang: A.hang, lie: B.lie };
        D.shi_guai_dian = di_tu_arr[D.hang][D.lie] === 0;
        if (D.shi_guai_dian) {
            if (this.shu_zhi_jiance(B, D, di_tu_arr) && this.shui_ping_jiance(A, D, di_tu_arr)) {
                return [true, D];
            }
        }

        //如果 C,D 都不通过 那么 这个拐点不通过
        return [false];
    },

    //两个拐点的检测
    liangge_guaidian_jiance(A, B, di_tu_arr) {
        //四条线上的所有点
        let suo_youdian = [];

        let hangshu = di_tu_arr.length;
        let lieshu = di_tu_arr[0].length;
        //1. A 所在行的 所有点
        for (let i = 0; i < lieshu; i++) {
            //非A 的空点才加入
            if (i != A.lie && di_tu_arr[A.hang][i] === 0) {
                suo_youdian.push({ hang: A.hang, lie: i, shi_guai_dian: true });
            }
        }
        //2. A 所在列的 所有点
        for (let i = 0; i < hangshu; i++) {
            //非A 的空点才加入
            if (i != A.hang && di_tu_arr[i][A.lie] === 0) {
                suo_youdian.push({ hang: i, lie: A.lie, shi_guai_dian: true });
            }
        }
        //3. B 所在行的 所有点
        for (let i = 0; i < lieshu; i++) {
            //非A 的空点才加入
            if (i != B.lie && di_tu_arr[B.hang][i] === 0) {
                suo_youdian.push({ hang: B.hang, lie: i, shi_guai_dian: true });
            }
        }

        //4. B 所在列的 所有点
        for (let i = 0; i < hangshu; i++) {
            //非A 的空点才加入
            if (i != B.hang && di_tu_arr[i][B.lie] === 0) {
                suo_youdian.push({ hang: i, lie: B.lie, shi_guai_dian: true });
            }
        }

        for (let j = 0; j < suo_youdian.length; j++) {
            let C = suo_youdian[j];

            // A 点至 C 点通过水平或垂直检测，C 点至 B 点可通过一个拐角连接
            let A_C_shuiping = this.shui_ping_jiance(A, C, di_tu_arr);
            let A_C_shuzhi = this.shu_zhi_jiance(A, C, di_tu_arr);
            if (A_C_shuiping || A_C_shuzhi) {
                let C_B_guaidian = this.yige_guaidian_jiance(C, B, di_tu_arr)
                if (C_B_guaidian[0]) {
                    return [true, [C, C_B_guaidian[1]]];
                }
            }

            // A 点至 C 点可通过一个拐角连接，C 点至 B 点通过水平或垂直连接
            let C_B_shuiping = this.shui_ping_jiance(C, B, di_tu_arr);
            let C_B_shuzhi = this.shu_zhi_jiance(C, B, di_tu_arr);
            if (C_B_shuiping || C_B_shuzhi) {
                let A_C_guaidian = this.yige_guaidian_jiance(A, C, di_tu_arr);
                if (A_C_guaidian[0]) {
                    return [true, [A_C_guaidian[1], C]];
                }
            }
        }

        return [false];
    },

    //到边界上一否有水果的方法
    // dri: {hang: 1,lie: 0} 方向 是向上
    // dri: {hang: 0,lie: 1} 方向 是向右
    // dri: {hang: -1,lie: 0} 方向 是向下
    // dri: {hang: 0,lie: -1} 方向 是向左
    has_fruit_to_edge(A, dir_str, di_tu_arr) {
        let lie_zuo_bian = 0;
        let lie_you_bian = di_tu_arr[0].length - 1;
        let hang_shang_bian = di_tu_arr.length - 1;
        let hang_xia_bian = 0;
        //找到边界点
        let edge_point = null;
        if (dir_str == "up") {
            if (A.hang === hang_shang_bian) {
                return false;//没有水果
            } else {
                edge_point = { hang: hang_shang_bian, lie: A.lie };
            }
        }
        else if (dir_str == "right") {
            if (A.lie === lie_you_bian) {
                return false;//没有水果
            } else {
                edge_point = { lie: lie_you_bian, hang: A.hang };
            }
        } else if (dir_str == "down") {
            if (A.hang === hang_xia_bian) {
                return false;//没有水果
            } else {
                edge_point = { hang: hang_xia_bian, lie: A.lie };
            }
        }
        else if (dir_str == "left") {
            if (A.lie === lie_zuo_bian) {
                return false;//没有水果
            } else {
                edge_point = { lie: lie_zuo_bian, hang: A.hang };
            }
        }
        //连界是不是就是一个水果块
        if (di_tu_arr[edge_point.hang][edge_point.lie] !== 0) {
            return true;//有水果
        } else {
            return this.has_fruit_between(A, edge_point, di_tu_arr);
        }
    },

    //获取一个点 对应的边界范围之外的点
    get_dot_outside_map(A, dir_str, di_tu_arr) {
        let lie_zuo_bian = -1;
        let lie_you_bian = di_tu_arr[0].length;
        let hang_shang_bian = di_tu_arr.length;
        let hang_xia_bian = -1;
        //找到边界点
        let edge_point = null;
        if (dir_str == "up") {
            edge_point = { hang: hang_shang_bian, lie: A.lie };
        } else if (dir_str == "right") {
            edge_point = { hang: A.hang, lie: lie_you_bian };
        } else if (dir_str == "down") {
            edge_point = { hang: hang_xia_bian, lie: A.lie };//lie?
        } else if (dir_str == "left") {
            edge_point = { hang: A.hang, lie: lie_zuo_bian };
        }
        return edge_point;
    },

    //两个点是否可以通过从外面绕 连能
    can_two_dot_connect_outside(A, B, di_tu_arr) {
        let arr = ["up", "right", "down", "left"];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == "up" || arr[i] == "down") {
                if (A.lie == B.lie) {
                    continue;
                }
            } else if (arr[i] == "left" || arr[i] == "right") {
                if (A.hang == B.hang) {
                    continue;
                }
            }
            let A_dao_bianjie_you_shuiguo = this.has_fruit_to_edge(A, arr[i], di_tu_arr);
            if (A_dao_bianjie_you_shuiguo) {
                continue;
            }
            let B_dao_bianjie_you_shuiguo = this.has_fruit_to_edge(B, arr[i], di_tu_arr);
            if (!B_dao_bianjie_you_shuiguo) {
                let A_duiying_bianjie_waidedian = this.get_dot_outside_map(A, arr[i], di_tu_arr);
                let B_duiying_bianjie_waidedian = this.get_dot_outside_map(B, arr[i], di_tu_arr);
                return [A_duiying_bianjie_waidedian, B_duiying_bianjie_waidedian];
            }
        }
        return false;
    },

    //抽出来作为一个方法, 方便下次可以再次用
    //一条直线上的两个点之间是否有水果
    has_fruit_between(A, B, di_tu_arr) {
        let zhong_jian_youshui_guo = false;
        //先判断是水平还是竖直
        //水平就看两者之间的各列是否有水果
        //竖直就看两者之间的各行是否有水果
        //行相同就是水平
        let is_shuiping = A.hang === B.hang;
        let dir = is_shuiping ? "lie" : "hang";

        //注意对于js的object 而言 A.lie === A["lie"]
        let min = A[dir] > B[dir] ? B[dir] : A[dir];
        let max = A[dir] > B[dir] ? A[dir] : B[dir];
        if (max - min > 1) {
            //min 这个地方必然有水果啊
            for (let i = min + 1; i < max; i++) {
                //水平就行不动 i代表列是动的
                //竖直就列不动 i代表行是动的
                if (di_tu_arr[is_shuiping ? A.hang : i][is_shuiping ? i : A.lie] !== 0) {
                    zhong_jian_youshui_guo = true;
                    break;
                }
            }
        } else if (max - min == 1) {
            return false;
        }
        return zhong_jian_youshui_guo;
    },
    //完整的检测算法
    jiance(A, B, di_tu_arr) {
        //水平检测成功返回
        let out_arr = [];
        if (this.shui_ping_jiance(A, B, di_tu_arr, out_arr)) {
            if (out_arr.length === 1) {
                //代表是边界上的两个水果块
                //如果中间有水果块
                //那只要处理好这个 zhong_jian_youshui_guo 就行
                let zhong_jian_youshui_guo = this.has_fruit_between(A, B, di_tu_arr);
                if (zhong_jian_youshui_guo) {//中间有水果块才这么绕过去
                    let xia_bian_jie = out_arr[0] === true;

                    let dir = xia_bian_jie ? -1 : 1;//要么边界+ 1 要么 -1 所以那个超出元素总是为1
                    return [true, [A, { hang: A.hang + dir, lie: A.lie }, { hang: B.hang + dir, lie: B.lie }, B]];
                }
            }
            //如果前面没有返回 那直接返回这个(A-B 之间连线 不管是不是边界都可以)
            return [true, [A, B]];
        }

        //竖直检测成功返回
        if (this.shu_zhi_jiance(A, B, di_tu_arr, out_arr)) {
            if (out_arr.length === 1) {
                //代表是边界上的两个水果块
                //如果中间有水果块
                //那只要处理好这个 zhong_jian_youshui_guo 就行
                let zhong_jian_youshui_guo = this.has_fruit_between(A, B, di_tu_arr);
                if (zhong_jian_youshui_guo) {//中间有水果块才这么绕过去
                    let zuo_bian_jie = out_arr[0] === true;
                    let dir = zuo_bian_jie ? -1 : 1;
                    return [true, [A, { hang: A.hang, lie: A.lie + dir }, { hang: B.hang, lie: B.lie + dir }, B]];
                }
            }
            return [true, [A, B]];
        }

        //有一个拐点
        let yige_res = this.yige_guaidian_jiance(A, B, di_tu_arr);
        if (yige_res[0]) {
            return [true, [A, yige_res[1], B]];
        }


        //有两个拐点
        let two_res = this.liangge_guaidian_jiance(A, B, di_tu_arr);
        if (two_res[0]) {
            return [true, [A, two_res[1][0], two_res[1][1], B]];
        }

        //要加上地图范围外的点组成两个拐点的情况
        let connect_jieguo = this.can_two_dot_connect_outside(A, B, di_tu_arr);
        if (connect_jieguo !== false) {
            return [true, [A, connect_jieguo[0], connect_jieguo[1], B]];
        }

        return [false];
    },
    timer(duration, max, min, call_back) {
        max = max || 1;
        min = min || 0;
        //因为这个函数可以多次调用 所以还是那个思想  先清除 再操作
        //清除部分
        this.m_total_time = 0;
        this.m_progress_duration = duration;
        this.m_progress_max_val = max;
        this.m_progress_min_val = min;
        this.m_progressBar.progress = max;
        this.m_unit_pro = (max - min) / duration;
        this.m_current_pro = this.m_progress_max_val;
        this.m_progress_callback = call_back;
        //操作部分
        //let progressbar = cc.find("bg/time_schedule_bg/time_schedule", this.node).getComponent(cc.ProgressBar).progress = 0;
        //progressbar - 0.9;
        //let a = 100;
    },
    //暂停时间
    stop_timer(is_stop) {
        this.m_pause = is_stop;
    },
    //游戏结束
    game_over() {
        for (let i = 0; i < this.di_tu_arr.length; i++) {
            for (let j = 0; j < this.di_tu_arr[i].length; j++) {
                this.di_tu_arr[i][j] = 0;
            }
        }
        this.shua_xing_ditu(this.di_tu_arr);
        if (this.xing_jie_dian_fail) {
            this.xing_jie_dian_fail.removeFromParent(false);
            this.xing_jie_dian_fail = null;
        }
        this.xing_jie_dian_fail = new cc.Node();
        this.xing_jie_dian_fail.parent = this.node;
        let fail = cc.instantiate(this.fail);
        fail.getComponent('fail').ba_lianlian_kan_youxi_jiaoben_chuanjinlai(this);
        fail.getComponent('fail').ba_game_jiaoben_chuanjinlai(this.game);
        //this.fail_node.zIndex = 1000000;
        this.xing_jie_dian_fail.addChild(fail);
    },
    //通关条件
    player_condition() {

        let ji_shu = 0;
        for (let i = 0; i < this.di_tu_arr.length; i++) {
            for (let j = 0; j < this.di_tu_arr[i].length; j++) {
                if (this.di_tu_arr[i][j] != 0) {
                    ji_shu++;
                    break;
                }
            }
        }
        if (ji_shu == 0) {
            this.game_player();
        }
    },
    //游戏通关
    game_player() {
        this.xing_jie_dian_player = new cc.Node();
        this.xing_jie_dian_player.parent = this.node;
        let player = cc.instantiate(this.player);
        player.getComponent('player').ba_lianlian_kan_youxi_jiaoben_chuanjinlai(this, this.guan_ka, this.pageIndex);
        player.getComponent('player').ba_game_jiaoben_chuanjinlai(this.game, this.guan_ka, this.hang, this.lie, this.guan_ka_amount_arr);
        player.getComponent('player').gold_label(this.gold);
        this.stop_timer(true);
        let time = this.m_total_time.toFixed(2);//四舍五入保留两位小数
        player.getComponent('player').game_time(time);
        player.getComponent('player').score();
        //通关了就存上通关次数+1
        let guan_ka = cc.sys.localStorage.getItem('class');
        //读取分数文件
        let score_str = 'score' + this.pageIndex;
        if (!this.guan_ka_amount_arr[this.hang][this.lie]) {
            this.guan_ka_amount_arr[this.hang][this.lie] = time;
            player.getComponent('player').record_show(true);
        } else {
            let front_time = this.guan_ka_amount_arr[this.hang][this.lie];
            front_time = parseInt(front_time);
            time = parseInt(time);
            if (time < front_time) {
                this.guan_ka_amount_arr[this.hang][this.lie] = time;
                player.getComponent('player').record_show(true);
            } else {
                player.getComponent('player').record_show(false);
            }
        }
        let jieguo = JSON.stringify(this.guan_ka_amount_arr);
        cc.sys.localStorage.setItem(score_str, jieguo);
        //this.calculate_score(this.guan_ka_amount_arr);
        //判断当前关卡是否需呀解锁下一关
        if (this.guan_ka == guan_ka) {
            guan_ka++;
            cc.sys.localStorage.setItem('class', guan_ka);
        }
        this.xing_jie_dian_player.addChild(player);
        this.game.getComponent('game').m_gold();

    },
    update(dt) {
        //如果是停止的标识设置了这个函数 就直接返回就行了
        if (this.m_pause) {
            return;
        }
        //每一都会调用这个函数 看到了吗?抽
        //console.log("hhahahha");
        if (this.m_current_pro !== undefined && this.m_progress_max_val !== undefined) {
            if (this.m_total_time <= this.m_progress_duration && this.m_current_pro >= this.m_progress_min_val) {
                //算出当前进度
                let cur_pro = Math.max(this.m_progress_min_val, this.m_progress_max_val - this.m_unit_pro * this.m_total_time);
                this.m_current_pro = cur_pro;
                this.m_progressBar.progress = cur_pro;
                this.m_total_time += dt;
                //当减少到最小值时调用回调函数
                if (this.m_total_time > this.m_progress_duration) {
                    if (this.m_progress_callback) {
                        this.m_progress_callback();
                        this.game_over();
                    }
                }
            }
        }
    },
});


cc.Class({
    extends: cc.Component,

    properties: {
        whiteImage: {
            type: cc.SpriteFrame,
            default: null
        },

        interval: 30,
        lineTime: 0.8
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.m_whitedot_arr = [];

        // this.set_start_and_end(cc.v2(0, 0), cc.v2(100, 100));
        //this.set_line([cc.v2(0, 0), cc.v2(100, 0), cc.v2(100, -100), cc.v2(200, -100)]);
        // let qidian = cc.v2(3, 100);
        // let zhongdian = cc.v2(100, 5);
        // let guaidian = cc.v2(1, 50);
        // this.set_line([qidian, guaidian, zhongdian]);
    },

    //产生一个白点
    create_white_dot() {
        let white_dot = new cc.Node;
        white_dot.scale = 0.5;
        white_dot.active = false;
        let spr_comp = white_dot.addComponent(cc.Sprite);
        spr_comp.spriteFrame = this.whiteImage;

        this.node.addChild(white_dot);
        this.m_whitedot_arr.push(white_dot);
        return white_dot;
    },

    set_line(pos_arr) {
        let line_start = pos_arr[0];
        this.node.x = line_start.x;
        this.node.y = line_start.y;

        for (var i = 1; i < pos_arr.length; i++) {
            pos_arr[i] = pos_arr[i].sub(line_start);
        }
        pos_arr[0] = cc.v2(0, 0);

        for (let i = 0; i < pos_arr.length; i++) {
            let start_p = pos_arr[i];
            let end_p = pos_arr[i + 1];
            if (end_p) {
                this.set_start_and_end(start_p, end_p);
            }
        }

        this.draw_line_dt = this.lineTime / this.m_whitedot_arr.length;
        this.seq = [];
        for (let i = 0; i < this.m_whitedot_arr.length; i++) {
            this.seq.push(cc.callFunc(function () {
                this.m_whitedot_arr[i].active = true;
            }.bind(this)));
            this.seq.push(cc.delayTime(this.draw_line_dt));
        }
        this.node.runAction(cc.sequence(this.seq));
        this.m_start_time = new Date().getTime();
    },
    //加速
    jiashu() {
        //点击按钮的时候加速动作

        //1.停止当前动作
        this.node.stopAction(this.m_action);

        //2.算出新的加速动作

        //点击的时候再获取一下时间, 看看走了多少时间(也就是运行的时候) 毫秒是很小的, 一般人是不可能操作这么快的
        var now = new Date().getTime();
        // 已经运行了的时间
        var passed_time = now - this.m_start_time;
        //2.1 剩下多少时间 = 总时间 - 已经运行了的时间
        var left_time = (this.lineTime * 1000 - passed_time) / 1000;//换成毫秒计算
        //判断一下剩下的时间是不是大于0 
        if (left_time > 0) {
            var action = this.node.runAction(cc.sequence(this.seq));
            var newAction = cc.speed(action, 10);
            this.m_action = action;
            this.node.runAction(newAction);
        }


    },
    //设置起点和终点的方法
    set_start_and_end(start_p, end_p) {
        let distance = start_p.sub(end_p).mag();
        //

        let x_dis = end_p.x - start_p.x;
        let y_dis = end_p.y - start_p.y;

        let dot_num = Math.floor(distance / this.interval) + 1;

        for (let i = 0; i < dot_num; i++) {
            let t_dot = this.create_white_dot();
            t_dot.x = start_p.x + (i / dot_num) * x_dis;
            t_dot.y = start_p.y + (i / dot_num) * y_dis;

        }
        let a = 100;
    }

    // update (dt) {},
});

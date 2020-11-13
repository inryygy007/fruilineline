
cc.Class({
    extends: cc.Component,

    properties: {

        tupian: {
            type: cc.SpriteFrame,
            default: []
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
    },


    //对于这个水果类
    //禁止点击
    forbid_click(state) {
        this.node.getChildByName("New Button").getComponent('cc.Button').interactable = state;
    },
    //有设置水果类型的方法 传进来1 就设置为西瓜 其它类似
    setType(number) {
        //处理0 类型
        let tupian = cc.find("iconRoot/tupian", this.node);
        //设置可见
        this.node.active = true;//下次不是0 先显示 如果那个位置本来就没东西了
        cc.find('New Button', this.node).active = true;
        //这就是一个坑 用动作隐藏的 竟然设置可见 不起作用 只能用相反的动作设置回来
        this.node.runAction(cc.show());//明白了吗哦 这个在面试的时候可以说一说, 比如面试官会问你做项目的时候遇到哪些坑, 你可以把这个说上明白?
        //设置缩放为1
        this.node.scale = 1;
        this.node.angle = 0;
        if (number == 0) {//0就返回了啊
            this.node.active = false;//0隐藏
            //这个水果是不可见了, 但它身上的各种状态还存在
            this.wo_bei_dian_zhong_le = false;
            this.Stop_action();
            //动作呢？怎么没处理
            return;
        }

        //根据传进来的number 拿到对应的sprite frame(精灵帧)
        //如果传进来 1 number - 1 就是0 对应的就是数组里的0号元素哦
        let sf = this.tupian[number - 1];//这里如果传进来是个0会怎么样
        //this.sf = sf;
        this.lei_xing = number - 1;
        //设置类型 首先只设置一下相应 的图片就行
        //这里是node 上放的是Sprite 组件而不是SpriteFrame组件
        tupian.getComponent(cc.Sprite).spriteFrame = sf;
    },
    dian_ji_button() {
        //console.log(this.lei_xing);
        //this.focus(true);
        //点击这个水果块就设置一个变量为true
        //要在这里能调用 lianliankan_youxi 的脚本 所以 要把 lianliankan_youxi 传进来
        if (this.wo_bei_dian_zhong_le) {
            return;
        }
        this.wo_bei_dian_zhong_le = true;
        //调用脚本的方法
        this.lianliankan_jiao_ben.you_shuiguo_bei_dianzhongle();
        //那不是 因为多次点击 调用这个zooming 函数创建了多个动作吗
        this.Zooming();
        //点击的时候设置移动焦点到自己这个块上来
        //this.lianliankan_jiao_ben.set_move_focus_with_fruit(this.node, false);
        //this.lianliankan_jiao_ben.bei_dian_ji_de_hang_lie(this.hang, this.lie);
    },
    //放大缩小
    Zooming() {
        //是空的就赋值 不是就不赋值? 我跟你说过的一个万能的方法是什么还记得吗?部 先清除 再创建!
        //你tm 这种复制粘贴也会出错吗 多复制了一个 我以为我单词写错了
        if (this.action != null) {
            //先停止动作
            this.Stop_action();

            this.action = null;
        }
        //this.scaling = cc.v2(fruit_node.width - 30, fruit_node.height - 30);
        //let act = cc.scaleTo(0.5, cc.v2(fruit_node.width + 30, fruit_node.height + 30));
        //每进来一次就创建一个动作 并运行
        //第一次进来, 创建动作并运行了 并且该动作保存在 this.action里
        //再点一次进来, 又创建并运行了去拿 又保存在 this.action里(那之前那个动作呢,this.action 里存的是新的动作,旧动作呢?新的不会覆盖旧的吗,会, )
        let act1 = cc.scaleTo(0.5, 0.7).easing(cc.easeElasticIn(3.0));
        let act2 = cc.scaleBy(0.7, 1.3).easing(cc.easeElasticOut(2.0));

        //旋转动画
        let act1_1 = cc.rotateTo(0.25, 20).easing(cc.easeBounceIn());
        let act2_1 = cc.rotateTo(0.35, 0).easing(cc.easeBounceOut());//

        let zoom_act = cc.sequence(act1, act2);
        let rotate_act = cc.repeat(cc.sequence(act1_1, act2_1), 2);
        //同时播放
        //fruit_node.runAction(act).repeatForever();
        //let act3 = cc.sequence(act1, act2);
        let act3 = cc.repeatForever(cc.spawn(zoom_act, rotate_act));

        //谁执行的动作 谁去停止
        this.action = cc.find("iconRoot/tupian", this.node).runAction(act3);
    },
    //停止动作
    Stop_action() {
        let tupian = cc.find("iconRoot/tupian", this.node);
        tupian.stopAction(this.action);
        this.action = null;

        //停止动作后要把 缩放,旋转 调成初始值, 不然动作执行了一半 改变的值不会个性回来
        //我们执行了 缩放动作, 所以停止后把缩放调为1
        //我们执行了 旋转动作, 所以停止后把旋转调为0
        //
        tupian.scale = 1;
        tupian.angle = 0;
    },
    //把连连看游戏的脚本传进来
    ba_lianlian_kan_youxi_jiaoben_chuanjinlai(jiao_ben, i, j) {
        this.lianliankan_jiao_ben = jiao_ben;
        this.hang = i;
        this.lie = j;
    },
    //外框显示与否
    // focus(no_off) {
    //     cc.find("focus", this.node).active = no_off;
    // },
    //隐藏
    ying_chang() {
        //自定义一个时间
        this.time = 0.4;
        //隐藏背景框
        cc.find('New Button', this.node).active = false;
        //旋转隐藏动作组合 原因在node 使用 cc.hide()动作后 单纯地使node 的active = true 并不能把结点设置为可见, 要用相反的动作cc.show 才能设置可见
        let act1 = cc.sequence(cc.rotateBy(this.time, 300), cc.hide());
        //缩小 
        let act2 = cc.scaleTo(this.time, 0.2);
        //组合同时进行旋转隐藏,缩小动作
        this.zoom_act = cc.spawn(act1, act2);
        this.node.runAction(this.zoom_act);
        this.m_start_time = new Date().getTime();
        return this.time + 0.01;
    },
    //加速
    jiashu() {
        //点击按钮的时候加速动作

        //1.停止当前动作
        this.node.stopAction(this.zoom_act);

        //2.算出新的加速动作

        //点击的时候再获取一下时间, 看看走了多少时间(也就是运行的时候) 毫秒是很小的, 一般人是不可能操作这么快的
        var now = new Date().getTime();
        // 已经运行了的时间
        var passed_time = now - this.m_start_time;
        //2.1 剩下多少时间 = 总时间 - 已经运行了的时间
        var left_time = (this.time * 1000000 - passed_time) / 1000000;//换成毫秒计算
        //判断一下剩下的时间是不是大于0 
        if (left_time > 0) {
            var action = this.node.runAction(this.zoom_act);
            var newAction = cc.speed(action, 10);
            this.m_action = action;
            this.node.runAction(newAction);
        }


    }
    // update (dt) {},
});

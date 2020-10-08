
let AnimaName = cc.Enum({
    None: 0
});

//这个脚本就是加载从它这个游戏拿到的帧动画资源用的
//也就是把它的格式 转换成 cocos creator 能用的
cc.Class({
    extends: cc.Component,

    properties: {
        //帖图
        text: {
            default: null,
            type: cc.Texture2D
        },
        //json文件
        json: {
            default: null,
            type: cc.JsonAsset,
            notify() {
                let mc = this.json.json.mc;

                let obj = { None: 0 };
                let ti = 0;
                for (let x in mc) {
                    obj[x] = ++ti;
                }

                this.enum_obj = obj;

                cc.Class.attr(this, 'act', {
                    type: 'Enum',
                    enumList: cc.Enum.getList(cc.Enum(obj))
                });
            }
        },
        act: {
            type: cc.Enum(AnimaName),
            default: AnimaName.None,
            visible() {
                return this.json != null;
            }
        },
        playOnLoad: {
            default: true
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //根据json文件的内容去拿图片ree
        let fame_res = this.json.json.res;
        let mc = this.json.json.mc;

        let root = new cc.Node();
        root.parent = this.node;
        this.animaRoot = root;

        let sprite = root.addComponent(cc.Sprite);
        let animation = root.addComponent(cc.Animation);
        let self = this;
        var InnerEvent = cc.Class({
            extends: cc.Component,
            frameEvent: function (...args) {
                self.frameEvent.call(self, ...args);
            }
        })
        root.addComponent(InnerEvent);
        this.m_animation = animation;
        // sprite.spriteFrame = new cc.SpriteFrame(this.text,cc.rect(177,73,59,141),false,cc.v2(-38,-117))

        //这里处理拿图片
        let frames = {};
        for (let x in fame_res) {
            let fd = fame_res[x];
            frames[x] = new cc.SpriteFrame(this.text, cc.rect(fd.x, fd.y, fd.w, fd.h));
        }

        //然后根据json里面的动作数据 把小图组装成动作
        let animas = {};
        for (let y in mc) {
            let tfs = [];
            let pos = [];
            let fi = 0;
            let fr = mc[y].frameRate;
            for (let z in mc[y].frames) {
                let zd = mc[y].frames[z];
                let tf = frames[zd.res];
                let tr = tf._rect;
                tfs.push(tf);

                pos.push({
                    frame: (++fi) / fr,
                    func: "frameEvent",
                    params: [zd.x + tr.width / 2, zd.y + tr.height / 2]
                })
            }
            let clip = cc.AnimationClip.createWithSpriteFrames(tfs, mc[y].frameRate);
            clip.name = y;
            animas[y] = clip;
            animation.addClip(clip);

            for (let p in pos) {
                clip.events.push(pos[p]);
            }
        }

        this.m_animas = animas;

        if (this.act !== 0) {
            let ti = 0;
            for (let x in mc) {
                ++ti;
                if (ti == this.act) {
                    this.play(x, this.playOnLoad);
                    break;
                }
            }
        }
    },

    frameEvent(x, y) {
        this.animaRoot.x = x;
        this.animaRoot.y = y;
    },

    start() {

    },

    play(animaName, isLoop) {
        let clip = this.m_animas[animaName];
        if (!clip) {
            return;
        }
        clip.wrapMode = isLoop ? cc.WrapMode.Loop : cc.WrapMode.Default;
        this.m_animation.play(animaName);
    }


    // update (dt) {},
});

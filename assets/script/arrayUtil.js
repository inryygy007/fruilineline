/*
* author: tangyiyi
* 数组操作的工具
*/

var arrayUtil = {};

/*
{
    p1: 原始点
    p2: 目标点
    e: 值
}
*/


//数据移位-- 一维数组 isLeft=true: 向左否则向右 isHang=true: 行 否则就是列
arrayUtil.shu_ju_yiwei_onedimension = function (arr, isLeft, isHang) {
    let temp = [];
    //把0移到后面去
    if (isLeft) {
        let cnt = 0;
        //不等于0的加到尾部 第一遍for
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].e != 0) {
                arr[i].p2 = isHang ? cc.v2(arr[i].p1.x, cnt) : cc.v2(cnt, arr[i].p1.y);
                cnt++;
                temp.push(arr[i]);//push 是从数组尾部加元素
            }
        }
        //等于0的加到尾部 第二遍for
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].e == 0) {
                arr[i].p2 = isHang ? cc.v2(arr[i].p1.x, cnt) : cc.v2(cnt, arr[i].p1.y);
                cnt++;
                temp.push(arr[i]);
            }
        }
    }
    //把0移到前面去
    else {
        let cnt = arr.length - 1;
        //不等于0加到头部 第一遍for
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].e != 0) {
                arr[i].p2 = isHang ? cc.v2(arr[i].p1.x, cnt) : cc.v2(cnt, arr[i].p1.y);
                cnt--;
                temp.unshift(arr[i])//unshift 是从数组头部加元素
            }
        }
        //等于0的加到头部 第二遍for
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].e == 0) {
                arr[i].p2 = isHang ? cc.v2(arr[i].p1.x, cnt) : cc.v2(cnt, arr[i].p1.y);
                cnt--;
                temp.unshift(arr[i]);
            }
        }
    }
    for (let i = 0; i < temp.length; i++) {
        arr[i] = temp[i];
    }
}

//取/或者更新 二维数组 一行或者一列的方法
//arr: 原二维数组
//is_hang: 是行还是列
//number: 具体的行数或者列数
//dst_arr: 一个一维数组如果不为null 则用这个数组来更二维数组里的哪行或者哪行
arrayUtil.access_twodimension_arr = function (arr, is_hang, number, dst_arr) {
    //拿到 指的行或者列
    let ori_arr = null;
    if (is_hang) {
        ori_arr = arr[number];
    } else {
        ori_arr = [];
        for (let i = 0; i < arr.length; i++) {
            ori_arr.push(arr[i][number]);//每一行的第几个存进数组 拿到的就是一列
        }
    }

    if (dst_arr) {//如果传了这个 说明要用dst_arr 来更新二维数组的行列
        for (let i = 0; i < dst_arr.length; i++) {
            ori_arr[i] = dst_arr[i];
        }

        //更新到二维数组
        if (is_hang) {
            for (let i = 0; i < ori_arr.length; i++) {
                arr[number][i] = ori_arr[i];
            }
        } else {
            for (let i = 0; i < ori_arr.length; i++) {
                arr[i][number] = ori_arr[i];
            }
        }
    }
    return ori_arr;
}

//把一个单纯含数字的二维数组变成一个元素是对象的二维数组
/*
[                                               [
    [0,1],                  ------>                 [{p1:cc.v2(0,0),p2:y,e:0},]
    [2,3]                   ------>
]                                               }

*/
arrayUtil.zhuanhua_yidongguocheng_shuzhu = function (arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        res[i] = [];
        for (let j = 0; j < arr[i].length; j++) {
            res[i][j] = {
                p1: cc.v2(i, j),
                p2: null,
                e: arr[i][j]
            }
        }
    }
    return res;
}


//二维数组的移动
//yidong_arr 也是一个数组 里面含有这样的元素
/*
{
    hang: true,                 //是行还是列
    number: 1,                  //具体的行数或者列数
    fangxiang: true             //isLeft:true ,否则就是向右
}
*/
arrayUtil.shu_ju_yiwei_twodimension = function (arr, yidong_arr) {
    if (!yidong_arr) {
        return;
    }

    let yidong_guocheng = this.zhuanhua_yidongguocheng_shuzhu(arr);
    for (let i = 0; i < yidong_arr.length; i++) {
        let yidong = yidong_arr[i];
        let hang = yidong.hang;
        let number = yidong.number;
        let fangxiang = yidong.fangxiang;
        //拿出二维数组里的一行/列
        let one_arr = this.access_twodimension_arr(yidong_guocheng, hang, number);
        //按一维数组的方式移动数据
        this.shu_ju_yiwei_onedimension(one_arr, fangxiang, hang);
        //移位后的一维数据更新到指定的二维数组中
        this.access_twodimension_arr(yidong_guocheng, hang, number, one_arr);
    }

    for (let i = 0; i < yidong_guocheng.length; i++) {
        for (let j = 0; j < yidong_guocheng[i].length; j++) {
            arr[i][j] = yidong_guocheng[i][j].e;
        }
    }

    let res = [];
    for (let i = 0; i < yidong_guocheng.length; i++) {
        for (let j = 0; j < yidong_guocheng[i].length; j++) {
            let t = yidong_guocheng[i][j];
            let p1 = t.p1;
            let p2 = t.p2;
            if (p2 != null && (p1.x != p2.x || p1.y != p2.y)) {
                res.push(t);
            }
        }
    }

    return res;
}

module.exports = arrayUtil;
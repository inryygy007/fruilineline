

//获取[0~number] 不包含number 的随机数
function gen_random_number(number) {
    return Math.floor(Math.random() * number);
}


//产生一半的随机数
function gen_origin_half_number(number_num, max_number) {
    let res = [];
    for (var i = 0; i < number_num; i++) {
        res.push(gen_random_number(max_number));
    }
    return res;
}

//复制生成另一半数
function copy_half_number(arr) {
    let res = [];
    for (var i = 0; i < arr.length; i++) {
        //对于每一个数 都复制一个
        res.push(arr[i]);
        res.push(arr[i]);
    }
    return res;
}

function randomsort(a, b) {
    return Math.random() > .5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}


//随机打乱数组
function shuffle(arr) {
    arr.sort(randomsort);
}

//生成随机的二维数组
function gen_rand2_arr(max_number, hang, lie) {
    //根据 hang * lie 算出总数
    let zong_shu = hang * lie;
    if (zong_shu % 2 != 0) {
        console.error("元素总数不能为奇数");
        return [];
    }

    //zong_shu 的一半 就是要随机生成的
    let res = gen_origin_half_number(zong_shu / 2, max_number);
    let copy_res = copy_half_number(res);
    //打乱顺序
    shuffle(copy_res);

    //产生一个维数组
    let result = [];
    for (let i = 0; i < hang; i++) {
        result[i] = [];
        for (let j = 0; j < lie; j++) {
            result[i].push(copy_res[i * lie + j]);
        }
    }
    return result;
}

//导出方法
module.exports.gen_rand2_arr = gen_rand2_arr;

$(function () {
    getUserInfo();

    // 退出按钮添加点击事件
    const layer = layui.layer;
    $('.btnLogoout').on('click', () => {
        layer.confirm('请确认是否退出?', { icon: 3, title: '提示' }, index => {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token');
            // 2. 重新跳转到登录页面
            location.href = './login.html';

            // 关闭 confirm 询问框
            layer.close(index);
        });

    })

})



// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: res => {

            // console.log(res);
            if (res.status !== 0) return layui.layer.msg('用户登录失败');

            renderAvatar(res.data);
        }
    })
}



// 渲染用户的头像
function renderAvatar(user) {

    // 1. 获取用户的名称
    const name = user.nickname || user.username;

    // 2. 设置欢迎的文本
    $('.welcome').html('欢迎&nbsp;&nbsp' + name);

    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avater').hide();
    } else {

        // 3.2 渲染文本头像
        $('.layui-nav-img').hide();

        // 获取name的第一个值,转换为大写
        const first = name[0].toUpperCase();
        $('.text-avater').html(first).show();
    }
}
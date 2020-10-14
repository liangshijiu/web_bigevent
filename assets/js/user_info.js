$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: value => {
            // console.log(1);
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo();

    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: res => {
                if (res.status !== 0) return layer.msg('获取用户信息失败!');
                // console.log(res);

                // 调用用户信息
                form.val('formUserInfo', res.data);
            }
        })
    }

    // 设置重置按钮
    $('#btnReset').on('click', e => {
        // 阻止默认行为
        e.preventDefault();
        // 重新获取本地用户信息
        initUserInfo();
    })


    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg('更新用户信息失败！');
                console.log(res);
                layer.msg('更新用户信息成功！');

                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            }
        })
    })
})
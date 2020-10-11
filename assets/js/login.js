$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // const { form } = layui;
    var form = layui.form;
    // layui 的提示框
    var layer = layui.layer
    form.verify({
        // 自定义规则
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],

        repwd(value) {
            const pwd = $('.reg-box [name=password]').val()

            if (pwd != value) {
                return '两次输入密码不一致';
            }
        }
    })


    // 注册事件
    $('#form_reg').on('submit', function (e) {

        // 阻止默认行为
        e.preventDefault();

        // 发起Ajax的post请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            // 快速获取表单内容
            data: $(this).serialize(),
            // 返回值
            success: res => {
                // 比较响应状态 不为0则注册失败 return回msg的值
                if (res !== 0) return layer.msg(res.message);
                layer.msg('注册成功,请登录!');

                // 默认点击事件(注册成功页面跳转登陆界面)
            }
        })
        $('#link_login').click();


    })


    // 登录事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: res => {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('登录成功!');

                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })

})
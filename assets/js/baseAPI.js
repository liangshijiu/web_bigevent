$.ajaxPrefilter(options => {

    // 设置地址接口
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // console.log(options.url);

    // 设置请求头配置接口
    if (options.url.indexOf('/my/') !== 1) {
        // headers 就是请求头配置对象
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局挂载complete方法
    options.complete = res => {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            console.log(1);

            // 1. 强制清空 token
            localStorage.removeItem('token');

            // 2. 强制跳转到登录页面
            location.href = './login.html';
        }
    }
})
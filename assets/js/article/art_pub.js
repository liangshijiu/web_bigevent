$(function () {
    const layer = layui.layer;
    const form = layui.form;

    initCate();
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) return layer.msg('初始化文章分类失败！');
                const htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }

    // 初始化富文本编辑器
    initEditor();

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    $('#btnChooseImage').on('click', () => {
        $('#coverFile').click();

        $('#coverFile').on('change', function (e) {
            const files = e.target.files;
            if (files.length === 0) return;
            // 根据文件，创建对应的 URL 地址
            var newImgURL = URL.createObjectURL(files[0])
            // 为裁剪区域重新设置图片
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
    })

    var art_state = '已发布';

    // 获取保存状态
    $('#btnSave2').on('click', () => {
        art_state = '草稿';
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        // 将form-pub里的值(内容)转换成Dom放入formData里面
        var fd = new FormData($(this)[0]);
        // 向fd添加state状态
        fd.append('state', art_state);
        // 遍历打印
        // fd.forEach(function (v, k) {
        //     console.log(k,v);
        // })
        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中

                fd.append('cover_img', blob)
                publishArticle(fd)
            })
    })

    // 上传文章
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: res => {
                if (res.status !== 0) return layer.msg('发布文章失败！');
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = '/article/art_list.html';
            }
        })
    }

})
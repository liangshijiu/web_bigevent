$(function () {
    const layer = layui.layer;
    const form = layui.form;
    initArtCataList();


    // 获取文章分类的列表
    function initArtCataList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                // console.log('ok');
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr);
            }
        })

    }

    // 为添加类别按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', () => {
        indexAdd = layer.open({
            area: ['500px', '250px'],
            type: 1,
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: res => {
                // console.log('ok');
                if (res.status !== 0) return layer.msg('新增分类失败！');
                initArtCataList();
                layer.msg('新增分类成功！');
                // 根据索引，关闭对应的弹出层 
                layer.close(indexAdd)
            }
        })
    })

    // 通过代理的形式，为 btn-edit 表单绑定 click 事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function (e) {
        e.preventDefault();
        indexEdit = layer.open({
            area: ['500px', '250px'],
            type: 1,
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });

        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过事件代理的形式为,为 form-edit 表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        console.log('ok');
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg('更新分类数据失败！');
                layer.msg('更新分类数据成功！');
                layer.close(indexEdit)
                // 获取文章分类的列表
                initArtCataList();
            }
        })
    })

    // 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        const id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: res => {
                    // console.log('ok');
                    if (res.status !== 0) return layer.msg('删除分类失败！');
                    layer.msg('删除分类成功！');
                    initArtCataList();
                }
            })
            layer.close(index);
        });
    })

    
})

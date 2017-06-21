$.get('/get_projects', function (data) {
    // 显示地图
    map = new AMap.Map('map_container', {
        zoom: 11,
        center: [118.8, 32.1]
    });

    // 显示标记
    AMapUI.loadUI(['overlay/SvgMarker'], function (SvgMarker) {
        var i;
        if (!SvgMarker.supportSvg) {
            //当前环境并不支持SVG，此时SvgMarker会回退到父类，即SimpleMarker
        }

        // 定义几个不同颜色的shape
        var shape = [];
        var colors = ['darkred', 'darkblue', 'purple', 'green'];
        for (i = 0; i < colors.length; i += 1) {
            shape[i] = new SvgMarker.Shape.WaterDrop({
                height: 32, //高度
                fillColor: colors[i]//填充色

            });
        }

        // 定义每一个标记
        var markers = [];
        for (i = 0; i < data.length; i += 1) {
            var each = data[i];
            // shape 下标为 each['color']
            var marker = new SvgMarker(shape[parseInt(each['color'])], {
                // 文字
                iconLabel: {
                    innerHTML: each['no'],
                    style: {color: 'white'}
                },
                // 坐标
                position: [each['lng'], each['lat']],
                map: map
            });
            markers.push(marker)
        }
    });
});

function refreshStyle(style) {
    map.setMapStyle('amap://styles/' + style);
}

function refreshContent() {
    var boxes = document.getElementsByName('chk_content');
    var features = [];
    for (var i = 0; i < boxes.length; i += 1) {
        if (boxes[i].checked === true) {
            features.push(boxes[i].value);
        }
    }
    map.setFeatures(features);
}

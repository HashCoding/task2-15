(function() {
    var _ = {
        addHandle: function(element, type, handler) {
            if(element.addEventListener) {
                element.addEventListener(type, handler, false)
            } else if(element.attachEvent) {
                element.attachEvent('on'+type, handler)
            } else {
                element['on'+type] = handler;
            }
        }
    }

    var getData = function() {
        // console.log('getData is ok');
        var sourceChild = document.getElementById("source").getElementsByTagName('li');
        var data = [];
        for(var i = 0, l = sourceChild.length; i < l; i++) {
            var city = sourceChild[i].textContent.substring(0, sourceChild[i].textContent.indexOf("空气质量"));
            var aqi = sourceChild[i].children[0].textContent;

            var tep = [];
            tep.push(city);
            tep.push(aqi);

            data.push(tep);
        }
        return data;
    }

    var sortData = function(data) {
        return data.sort(function(n1, n2) {
            return n1[1] < n2[1];
        });
    }

    var render = function(data) {
        var resortUl = document.getElementById("resort");

        var gradeArray = [
            '一', '二', '三', '四', '五', '六', '七', '八', 
        ];

        resortUl.innerHTML = "";
        var tepFragments = document.createDocumentFragment();

        for(var i = 0, l = data.length; i < l; i++) {
            var liNode = document.createElement("li");
            var tepContent = '第' + gradeArray[i] + '名:' + data[i][0] + '空气质量<b>' + data[i][1] + '</b>';
            liNode.innerHTML = tepContent;

            tepFragments.appendChild(liNode);
        }

        resortUl.appendChild(tepFragments);
    }

    var btnHandle = function(){
        // console.log('btn handle ok')
        var aqiData = getData();
        // console.log(aqiData);
        aqiData = sortData(aqiData);
        // console.log(aqiData);
        render(aqiData);
    }

    var init = function() {
        // console.log('init ok')
        var sortBtn = document.getElementById('sort-btn');
        _.addHandle(sortBtn, 'click', btnHandle);
    }

    init();
})();
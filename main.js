var yyy = document.getElementById('ccc');
var context = yyy.getContext('2d');
// 获取页面宽高并应用
pagesize()
window.onresize = function () {
  pagesize()
}

var using = false
// 点击Eraser按钮改变状态
var eraserEnabled = false

eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  brush.classList.remove('active')
}
brush.onclick = function () {
  eraserEnabled = false
  brush.classList.add('active')
  eraser.classList.remove('active')
}

if (document.body.ontouchstart !== undefined) {
  // 触屏设备
  // 开始触摸
  yyy.ontouchstart = function (AAA) {
    console.log(AAA)
    var x = AAA.touches[0].clientX
    var y = AAA.touches[0].clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      lastPoint = { 'x': x, 'y': y }
    }
  }
  // 移动
  yyy.ontouchmove = function (BBB) {
    var x = BBB.touches[0].clientX
    var y = BBB.touches[0].clientY
    if (!using) { return } // 如果using为false，直接退出函数
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      var newPoint = { 'x': x, 'y': y }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }
  // 松开
  yyy.ontouchend = function (ccc) {
    using = false
  }
} else {
  // 非触屏设备
  // 按下鼠标
  yyy.onmousedown = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      lastPoint = { 'x': x, 'y': y }
    }
  }
  // 移动鼠标
  yyy.onmousemove = function (bbb) {
    var x = bbb.clientX
    var y = bbb.clientY

    if (!using) { return } // 如果using为false，直接退出函数

    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      var newPoint = { 'x': x, 'y': y }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }

  // 松开鼠标
  yyy.onmouseup = function (ccc) {
    using = false
  }

}




// 工具函数
function pagesize() {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  yyy.width = pageWidth;
  yyy.height = pageHeight;
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()//填充
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.strokeStyle = 'black'
  context.moveTo(x1, y1)//起点
  context.lineWidth = 5
  context.lineTo(x2, y2)//终点
  context.stroke()//绘制边框
  context.closePath()
}
var yyy = document.getElementById('ccc');
var context = yyy.getContext('2d');
var lineWidth = 3;
// 获取页面宽高并应用
pagesize()
window.onresize = function () {
  pagesize()
}

var using = false
// 点击顶部按钮改变状态
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
clear.onclick = function () {
  context.clearRect(0, 0, yyy.width, yyy.height)
}
// 按下颜色按钮
onBlack()
onRed()
onYellow()
onBlue()

// 按下粗细按钮
thin.onclick = function () {
  lineWidth = 3
}
thick.onclick = function () {
  lineWidth = 6
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
  context.lineWidth = lineWidth
  context.moveTo(x1, y1)//起点
  context.lineTo(x2, y2)//终点
  context.stroke()//绘制边框
  context.closePath()
}

function onBlack() {
  black.onclick = function () {
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
  }
}

function onRed() {
  red.onclick = function () {
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
  }
}

function onYellow() {
  yellow.onclick = function () {
    context.strokeStyle = 'yellow'
    yellow.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
  }
}

function onBlue() {
  blue.onclick = function () {
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
  }
}
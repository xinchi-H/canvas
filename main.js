var yyy = document.getElementById('ccc');
var context = yyy.getContext('2d');
var painting = false
// 按下鼠标
yyy.onmousedown = function (aaa) {
  painting = true
  var x = aaa.clientX
  var y = aaa.clientY
  lastPoint = { 'x': x, 'y': y }
  drawCircle(x, y, 1)
}
// 移动鼠标
yyy.onmousemove = function (bbb) {
  if (painting) {
    var x = bbb.clientX
    var y = bbb.clientY
    var newPoint = { 'x': x, 'y': y }
    drawCircle(x, y, 1)
    console.log(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
    lastPoint = newPoint
  }
}

// 松开鼠标
yyy.onmouseup = function (ccc) {
  painting = false
}

// 工具函数
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
/*把code写到#code和style标签里*/
function writeCode(prefix, code, fn) {
  let domCode = document.querySelector("#code");
  let n = 0;
  let id = setInterval(() => {
    n += 1;
    domCode.innerHTML = Prism.highlight(
      prefix + code.substring(0, n),
      Prism.languages.css
    );
    styleTag.innerHTML = prefix + code.substring(0, n);
    domCode.scrollTop = domCode.scrollHeight;
    if (n >= code.length) {
      window.clearInterval(id);
      fn && fn.call();
    }
  }, 50);
}
function writeMardown(markdown, fn) {
  let domPaper = document.querySelector("#paper>.content");
  let n = 0;
  let id = setInterval(() => {
    n += 1;
    domPaper.innerHTML = markdown.substring(0, n);
    domPaper.scrollTop = domPaper.scrollHeight;
    if (n >= markdown.length) {
      window.clearInterval(id);
      fn && fn.call();
    }
  }, 50);
}

var result = `/*
*面试官你好，我是王文峰
*我将以动画的形式来介绍我自己
*只用文字介绍太单调了
*我就用代码来介绍吧
*首先准备一些样式
*/

*{
  transition: all 1s;
}
html{
  background: rgb(222,222,222);
  font-size: 16px;
}
#code{
  border: 1px solid black;
  padding: 16px;
}

/*我需要一点高亮*/

.token.selector{
  color: #690;
}
.token.property{
  color: #905;
}
.token.function{
  color: #DD4A68;
}

/* 加一个呼吸效果 */

#code{
  animation: breath 1s infinite alternate-reverse;
}

/*现在开始，我来介绍一下我自己*/
/*我需要一张白纸*/

#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}

#paper > .content {
 display: block;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`

var result2 = `
/*
* 接下来把 Markdown 变成 HTML 并且加样式 
*/
`

var md = `
# 自我介绍

我叫王文峰
1991 年 10 月出生
黑龙江科技大学毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

#项目介绍

1. xxx 轮播
2. xxx 简历
3. xxx 画板

# 联系方式

- QQ 865475679
- Email 865475679@qq.con
- 手机 18666666666
`

let result3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`
writeCode("", result, () => {
  createPaper(() => {
    writeMardown(md, () => {
      writeCode(result, result2, () => {
        MarkdownToHtml(() => {
          writeCode(result + result2, result3);
        });
      });
    });
  });
});

function createPaper(fn) {
  var paper = document.createElement("div");
  paper.id = "paper";
  var content = document.createElement("pre");
  content.className = "content";
  paper.appendChild(content);
  document.body.appendChild(paper);
  fn && fn.call();
}

function MarkdownToHtml(fn){
  var div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}

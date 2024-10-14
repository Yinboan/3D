// 加载动画
const loadingTime = 5000;
const showContent = () => {
  // 去掉loading
  document.querySelector(".loadingContainer").style.display = "none";
  // 展示模型
  document.querySelector(".contentContainer").style.opacity = 1;
};
// 去掉动画dom
setTimeout(() => {
  showContent();
}, loadingTime);
// 初始化背景
setTimeout(() => {
  animate();
  init();
}, 100);

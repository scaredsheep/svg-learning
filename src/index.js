// import svgContent from './svg/group.svg'; // 外部引入的svg文件
import Topology from '@/basic/001-topology.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  // 通过外部引入，展示svg文件
  // app.innerHTML = svgContent;

  // 通过js的方式创建元素
  const topo = new Topology(app, {
    centerNode: { text: '科鲁兹' },
    otherNode: [
      { x: 100, y: 100, text: '易车网' }
    ]
  });
  topo.render();
});
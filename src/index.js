// import svgContent from './svg/group.svg'; // 外部引入的svg文件
import Topology from '@/basic/001-topology.js';
import Calendar from '@/basic/002-circle-calendar.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  // 通过外部引入，展示svg文件
  // app.innerHTML = svgContent;

  // 拓扑结构图
  /* const topo = new Topology(app, {
    centerNode: { text: '科鲁兹' },
    otherNode: [
      { text: '易车网' },
      { text: '妙味' },
      { text: 'svg' }
    ]
  });
  topo.render(); */

  // 环形日期选择
  new Calendar(600, 600, app).render();
});
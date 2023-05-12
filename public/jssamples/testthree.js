  /**
   * 该示例演示 Radial 布局的参数及其使用，以及布局参数的切换
   * Radial 算法原文：http://jgaa.info/accepted/2011/BrandesPich2011.15.1.pdf
   * by 十吾
   */
   var data = {
    nodes: [{
      id: "0",
      label: "0"
  }, {
      id: "1",
      label: "1"
  }, {
      id: "2",
      label: "2"
  }, {
      id: "3",
      label: "3"
  }, {
      id: "4",
      label: "4"
  }, {
      id: "5",
      label: "5"
  }, {
      id: "6",
      label: "6"
  }, {
      id: "7",
      label: "7"
  }, {
      id: "8",
      label: "8"
  }, {
      id: "9",
      label: "9"
  }, {
      id: "10",
      label: "10"
  }, {
      id: "11",
      label: "11"
  }, {
      id: "12",
      label: "12"
  }, {
      id: "13",
      label: "13"
  }, {
      id: "14",
      label: "14"
  }, {
      id: "15",
      label: "15"
  }, {
      id: "16",
      label: "16"
  }, {
      id: "17",
      label: "17"
  }, {
      id: "18",
      label: "18"
  }, {
      id: "19",
      label: "19"
  }, {
      id: "20",
      label: "20"
  }, {
      id: "21",
      label: "21"
  }, {
      id: "22",
      label: "22"
  }, {
      id: "23",
      label: "23"
  }, {
      id: "24",
      label: "24"
  }, {
      id: "25",
      label: "25"
  }, {
      id: "26",
      label: "26"
  }, {
      id: "27",
      label: "27"
  }, {
      id: "28",
      label: "28"
  }, {
      id: "29",
      label: "29"
  }, {
      id: "30",
      label: "30"
  }, {
      id: "31",
      label: "31"
  }, {
      id: "32",
      label: "32"
  }, {
      id: "33",
      label: "33"
  }],
    edges: [{
      source: "0",
      target: "1",
      label: "0 to 1"
  },{
    source: "1",
    target: "0",
    label: "1 to 0"
  }, {
      source: "0",
      target: "2",
      label: "0 to 2"
  }, {
      source: "0",
      target: "3",
      label: "0 to 3"
  }, {
      source: "0",
      target: "4",
      label: "0 to 4"
  }, {
      source: "0",
      target: "5",
      label: "0 to 5"
  }, {
      source: "0",
      target: "7",
      label: "0 to 7"
  }, {
      source: "0",
      target: "8",
      label: "0 to 8"
  }, {
      source: "0",
      target: "9",
      label: "0 to 9"
  }, {
      source: "0",
      target: "10",
      label: "0 to 10"
  }, {
      source: "0",
      target: "11",
      label: "0 to 11"
  }, {
      source: "0",
      target: "13",
      label: "0 to 13"
  }, {
      source: "0",
      target: "14",
      label: "0 to 14"
  }, {
      source: "0",
      target: "15",
      label: "0 to 15"
  }, {
      source: "0",
      target: "16",
      label: "0 to 16"
  }, {
      source: "2",
      target: "3",
      label: "2 to 3"
  }, {
      source: "4",
      target: "5",
      label: "4 to 5"
  }, {
      source: "4",
      target: "6",
      label: "4 to 6"
  }, {
      source: "5",
      target: "6",
      label: "5 to 6"
  }, {
      source: "7",
      target: "13",
      label: "7 to 13"
  }, {
      source: "8",
      target: "14",
      label: "8 to 14"
  }, {
      source: "9",
      target: "10",
      label: "9 to 10"
  }, {
      source: "10",
      target: "22",
      label: "10 to 22"
  }, {
      source: "10",
      target: "14",
      label: "10 to 14"
  }, {
      source: "10",
      target: "12",
      label: "10 to 12"
  }, {
      source: "10",
      target: "24",
      label: "10 to 24"
  }, {
      source: "10",
      target: "21",
      label: "10 to 21"
  }, {
      source: "10",
      target: "20",
      label: "10 to 20"
  }, {
      source: "11",
      target: "24",
      label: "11 to 24"
  }, {
      source: "11",
      target: "22",
      label: "11 to 22"
  }, {
      source: "11",
      target: "14",
      label: "11 to 14"
  }, {
      source: "12",
      target: "13",
      label: "12 to 13"
  }, {
      source: "16",
      target: "17",
      label: "16 to 17"
  }, {
      source: "16",
      target: "18",
      label: "16 to 18"
  }, {
      source: "16",
      target: "21",
      label: "16 to 21"
  }, {
      source: "16",
      target: "22",
      label: "16 to 22"
  }, {
      source: "17",
      target: "18",
      label: "17 to 18"
  }, {
      source: "17",
      target: "20",
      label: "17 to 20"
  }, {
      source: "18",
      target: "19",
      label: "18 to 19"
  }, {
      source: "19",
      target: "20",
      label: "19 to 20"
  }, {
      source: "19",
      target: "33",
      label: "19 to 33"
  }, {
      source: "19",
      target: "22",
      label: "19 to 22"
  }, {
      source: "19",
      target: "23",
      label: "19 to 23"
  }, {
      source: "20",
      target: "21",
      label: "20 to 21"
  }, {
      source: "21",
      target: "22",
      label: "21 to 22"
  }, {
      source: "22",
      target: "24",
      label: "22 to 24"
  }, {
      source: "22",
      target: "25",
      label: "22 to 25"
  }, {
      source: "22",
      target: "26",
      label: "22 to 26"
  }, {
      source: "22",
      target: "23",
      label: "22 to 23"
  }, {
      source: "22",
      target: "28",
      label: "22 to 28"
  }, {
      source: "22",
      target: "30",
      label: "22 to 30"
  }, {
      source: "22",
      target: "31",
      label: "22 to 31"
  }, {
      source: "22",
      target: "32",
      label: "22 to 32"
  }, {
      source: "22",
      target: "33",
      label: "22 to 33"
  }, {
      source: "23",
      target: "28",
      label: "23 to 28"
  }, {
      source: "23",
      target: "27",
      label: "23 to 27"
  }, {
      source: "23",
      target: "29",
      label: "23 to 29"
  }, {
      source: "23",
      target: "30",
      label: "23 to 30"
  }, {
      source: "23",
      target: "31",
      label: "23 to 31"
  }, {
      source: "23",
      target: "33",
      label: "23 to 33"
  }, {
      source: "32",
      target: "33",
      label: "32 to 33"
  }]
  };

  const toolbar = new G6.ToolBar();

  var graph = new G6.Graph({
    container: 'mountNode',
    width: window.innerWidth,
    height: window.innerHeight,
    fitView: true,
    modes: {
      default: ['zoom-canvas', 'drag-canvas']
    },
    // layout: {
    //   type: 'radial',
    //   unitRadius: 50
    // },
    layout: {
        type: 'force',
        linkDistance: 150,
        nodeSize: 42,
        // nodeStrength: 1,
        preventOverlap: true,
        nodeSpacing: 20
    },
    // animate: true,
    defaultNode: {
      size: 42,
      color: 'steelblue',
      style: {
        lineWidth: 2,
        fill: '#fff'
      }
    },
    defaultEdge: {
      type: 'quadratic',
      size: 4,
      color: '#e2e2e2',
      style: {
        // endArrow: {
        //   path: 'M 4,0 L -4,-4 L -4,4 Z',
        //   d: 4
        // }
        endArrow: true
      },
      labelCfg: {
        autoRotate: true
      }
    },
    plugins: [toolbar]
  });
  graph.data(data);
  graph.render();

    graph.on('node:dragstart', function(e) {
        graph.layout();
        refreshDragedNodePosition(e);
    });
    graph.on('node:drag', function(e) {
        refreshDragedNodePosition(e);
    });
    graph.on('node:dragend', function(e) {
        e.item.get('model').fx = null;
        e.item.get('model').fy = null;
    });

    
function refreshDragedNodePosition(e) {
    var model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
}


//   var descriptionDiv = document.createElement("div");
//   descriptionDiv.innerHTML = 'Radial 布局，中心点 = 0，单元半径 = 50，未防止重叠';
//   var graphDiv = document.getElementById("mountNode");
//   document.body.insertBefore(descriptionDiv, graphDiv);

//   layoutConfigTranslation();

//   setInterval(function() {
//     layoutConfigTranslation();
//   }, 7000);

  function layoutConfigTranslation() {
    setTimeout(function() {
      descriptionDiv.innerHTML = 'Radial 布局，中心点 = 0，单元半径 = 50，防止重叠';
      graph.updateLayout({
        preventOverlap: true,
        nodeSize: 20
      });
    }, 1000);

    setTimeout(function() {
      descriptionDiv.innerHTML = 'Radial 布局，中心点 = 0，单元半径 = 80，防止重叠';
      graph.updateLayout({
        unitRadius: 80
      });
    }, 2500);

    setTimeout(function() {
      descriptionDiv.innerHTML = 'Radial 布局，中心点 = 10，单元半径 = 80，防止重叠';
      graph.updateLayout({
        focusNode: '10'
      });
    }, 4000);

    setTimeout(function() {
      descriptionDiv.innerHTML = 'Radial 布局，中心点 = 20，单元半径 = 80，防止重叠';
      graph.updateLayout({
        focusNode: '20'
      });
    }, 5500);

    setTimeout(function() {
      descriptionDiv.innerHTML = 'Radial 布局，中心点 = 0，单元半径 = 50，未防止重叠';
      graph.updateLayout({
        focusNode: '0',
        preventOverlap: false,
        unitRadius: 50
      });
    }, 5500);
  }
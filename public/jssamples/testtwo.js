var graph = new G6.Graph({
    container: 'mountNode',
    width: window.innerWidth,
    height: window.innerHeight,
    fitView: true,
    layout: {
      type: 'force'
    },
    defaultNode: {
      size: [26, 26],
      color: 'steelblue',
      style: {
        lineWidth: 2,
        fill: '#fff'
      }
    },
    defaultEdge: {
    //   type: 'arc',
      size: 2,
      color: '#e2e2e2',
      style: {
        endArrow: true
      }
    }
});
$.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json', function(data) {
    graph.data({
    nodes: data.nodes,
    edges: data.edges.map(function(edge, i) {
        edge.id = 'edge' + i;
        return Object.assign({}, edge);
    })
    });
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
});

function refreshDragedNodePosition(e) {
    var model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
}
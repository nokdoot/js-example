const lines = require("fs").readFileSync(__dirname + '/tinyG').toString().split('\n');

const V = parseInt(lines[0]);
const E = parseInt(lines[1]);

const search = (graph, v) => {
  const vMarked = Array(graph.V()).fill(false);
  let count = 0;

  const mark = (v2) => {
    if (vMarked[v2]) return;
    vMarked[v2] = true;
    count++;
    for (const v3 of graph.adj(v2)) {
      mark(v3);
    }
  }

  mark(v);

  return {
    marked: (v) => vMarked[v],
    count: () => count
  };
}

const testSearch = (graph, v) => {
  const s = search(graph, v);

  const chars = [];
  for (let i = 0; i < graph.V(); i++) {
    if (s.marked(i)){
      chars.push(i);
    }
  }
  
  console.log(chars.toString());
  
  if (s.count() != graph.V()) {
    console.log('not');
  }
  
  console.log('connected');
}

const depthFirstSearch = (graph, v, trace = false) => {
  const marked = Array.from(Array(graph.V()), () => false);
  let count = 0;

  const dfs = (graph, v) => {
    if (trace) console.log(v);
    marked[v] = true;
    count++;
    for (const v2 of graph.adj(v)) {
      if (!marked[v2]) dfs(graph, v2);
    }
  }

  dfs(graph, v);

  return {
    marked: (v) => marked[v],
    count: () => count
  }
}

const depthFirstPath = (graph, v, trace = false) => {
  const marked = Array.from(Array(graph.V()), () => false);
  const edgeTo = Array.from(Array(graph.V()), () => 0);
  const s = v;

  const dfs = (graph, v) => {
    if (trace) console.log(v);
    marked[v] = true;
    for (const v2 of graph.adj(v)) {
      if (!marked[v2]) {
        edgeTo[v2] = v;
        dfs(graph, v2);
      }
    }
  }

  const hasPath = (v) => marked[v];

  dfs(graph, v);

  // console.log(marked)

  return {
    hasPath,
    pathTo: (v) => {
      if (!hasPath(v)) return null;
      const path = [];
      for (let x = v; x != s; x = edgeTo[x])
        path.unshift(x);
      path.unshift(s);
      return path;
    },
  }
}

const makeGraph = (V) => {
  const _V = V;
  let _E = 0;
  let _adj = Array.from(Array(V), () => [])
  return {
    V: () => _V,
    E: () => _E,
    addEdge: (v, w) => {
      _adj[v].unshift(w);
      _adj[w].unshift(v);
    },
    adj: (v) => _adj[v]
  }
};

const graph = makeGraph(V);
for (const line of lines.slice(2)) {
  const [v1, v2] = line.split(' ').map((value) => parseInt(value));
  graph.addEdge(v1, v2);
}

// testSearch(graph, 0);

depthFirstSearch(graph, 0);
const path = depthFirstPath(graph, 0);
console.log(path.pathTo(4));
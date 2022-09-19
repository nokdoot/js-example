const lines = require("fs").readFileSync('/dev/stdin').toString().split('\n');

const V = parseInt(lines[0]);
const E = parseInt(lines[1]);

const adjList = [];

const addEdge = (adjList, v1, v2) => {
  if (!adjList[v1]) adjList[v1] = [];
  if (!adjList[v2]) adjList[v2] = [];
  adjList[v1].unshift(v2);
  adjList[v2].unshift(v1);
}

const adj = (adjList, v) => {
  return adjList[v];
}

for (const line of lines.slice(2)) {
  const [v1, v2] = line.split(' ').map((value) => parseInt(value));
  addEdge(adjList, v1, v2);
}

console.log(adjList);

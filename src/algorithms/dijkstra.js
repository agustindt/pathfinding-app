export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

// This line exports a function named dijkstra that takes in a grid, startNode, and finishNode as parameters.
// The function returns an array named visitedNodesInOrder.
// The startNode's distance is set to 0, and all the nodes in the grid are marked as unvisitedNodes.

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}
// This while loop continues until there are no more unvisited nodes in the unvisitedNodes array.
// sortNodesByDistance function sorts the unvisitedNodes array in ascending order based on their distance property.
// The closest node is retrieved from the unvisitedNodes array and assigned to the closestNode variable.
// If the closestNode is a wall, it is skipped, and the loop continues. If the closestNode's distance is Infinity, it means that the algorithm cannot continue and should return the visitedNodesInOrder array.
// The closestNode is marked as visited and added to the visitedNodesInOrder array. If the closestNode is the finishNode, the function should return the visitedNodesInOrder array.
// The updateUnvisitedNeighbors function is called to update the distances of the closestNode's unvisited neighbors.

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// This function takes in an array of unvisited nodes and sorts them in ascending order based on their distance property.

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

// This function takes in a node and a grid and updates the distances and previous nodes of the node's unvisited neighbors. 
// The getUnvisitedNeighbors function is called to retrieve the unvisited neighbors of the node.

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}


// The getUnvisitedNeighbors(node, grid) function returns an array of unvisited neighboring nodes of a given node object in a grid array.
// It looks for neighboring nodes in four directions: north, south, west, and east. 
// If a neighboring node exists in any of these directions and has not been visited yet (based on the isVisited property of the node), it is added to an array called neighbors.
// Finally, the function returns an array of unvisited neighbors nodes.
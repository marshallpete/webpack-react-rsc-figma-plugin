figma.showUI(__html__, { themeColors: true, height: 720, width: 1200 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "insert-chart") {
    // everything added to the current page
    // select and focus all nodes at the end
    const nodes = [];

    // create the chart
    const svg = figma.createNodeFromSvg(msg.svg);
    // add it to the page
    figma.currentPage.appendChild(svg);
    // add it to the selection
    nodes.push(svg);

    // select and focus chart
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin();
};

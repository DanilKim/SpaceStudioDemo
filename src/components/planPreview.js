import React, { useState, useEffect, useRef } from 'react';
import * as SharedStyle from '../shared-style';

const VERTEX_STYLE = {fill: "#0096fd", stroke: SharedStyle.COLORS.white, cursor: "move"};

const localStorage = window.hasOwnProperty('localStorage') ? window.localStorage : false;

const getPlannerState = function (buildingName) {
    if (!localStorage) return;
    let json;

    if (localStorage.getItem(buildingName) !== null) {
        let data = localStorage.getItem(buildingName);
        json = JSON.parse(data);
    }
    else {
        return;
    }
    return json;
}

const getLayer = function(plannerState) {
  let selectedLayer = plannerState.layers[plannerState.selectedLayer];
  return selectedLayer;
}

const getVertex = function(selectedLayer, widthRatio, heightRatio, height) {
  const vertexComponent = [];
  for (var vertex in selectedLayer.vertices) {
    vertexComponent.push(
      <g
      transform={`translate(${selectedLayer.vertices[vertex].x * widthRatio}, ${height - selectedLayer.vertices[vertex].y * heightRatio})`}
      data-id={vertex.id}>
        <circle cx="0" cy="0" r="3" style={VERTEX_STYLE}/>
      </g>
    );
  }
  return vertexComponent;
}

export default function PlanPreview(props) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [widthRatio, setWidthRatio] = useState(0);
  const [heightRatio, setHeightRatio] = useState(0);

  let plannerState = getPlannerState(props.buildingName);
  let selectedLayer = getLayer(plannerState);

  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
    setWidthRatio(ref.current.clientWidth / plannerState.width);
    setHeightRatio(ref.current.clientHeight / plannerState.height);
  })
  
  return (
    <div ref={ref}>
      <svg>
        <defs>
          <pattern id="diagonalFill" patternUnits="userSpaceOnUse" width="4" height="4" fill="#FFF">
            <rect x="0" y="0" width="4" height="4" fill="#FFF" />
            <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style={{ stroke: '#8E9BA2', strokeWidth: 1 }} />
          </pattern>
        </defs>
        <g>
          {getVertex(selectedLayer, widthRatio, heightRatio, height)}
        </g>
      </svg>
    </div>
  )
  }
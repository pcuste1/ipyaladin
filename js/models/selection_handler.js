export function SelectorToJson(aladin) {
  let selector = aladin.view.selector.select;
  switch (selector.constructor.name) {
    case "lg":
      return CircleSelectorToJson(selector, aladin);
    case "rg":
      return RectangleSelectorToJson(selector, aladin);
    case "Sg":
      return PolySelectorToJson(selector, aladin);
    default:
      return;
  }
}

export function CircleSelectorToJson(selector, aladin) {
  let startCooWorld = aladin.pix2world(
    selector.startCoo.x,
    selector.startCoo.y,
    0,
  );

  let endCooWorld = aladin.pix2world(selector.coo.x, selector.coo.y, 0);

  return {
    type: "circle",
    startCoo: {
      x: startCooWorld[0],
      y: startCooWorld[1],
    },
    endCoo: {
      x: endCooWorld[0],
      y: endCooWorld[1],
    },
  };
}

export function RectangleSelectorToJson(selector, aladin) {
  let startCooWorld = aladin.pix2world(
    selector.startCoo.x,
    selector.startCoo.y,
    0,
  );

  let endCooWorld = aladin.pix2world(selector.coo.x, selector.coo.y, 0);

  return {
    type: "rect",
    startCoo: {
      x: startCooWorld[0],
      y: startCooWorld[1],
    },
    endCoo: {
      x: endCooWorld[0],
      y: endCooWorld[1],
    },
  };
}

export function PolySelectorToJson(selector, aladin) {
  return {
    type: "poly",
    coos: selector.coos.map((coo) => {
      let cooWorld = aladin.pix2world(coo.x, coo.y, 0);
      return {
        x: cooWorld[0],
        y: cooWorld[1],
      };
    }),
  };
}

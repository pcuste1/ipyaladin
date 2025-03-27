/**
 * Converts the current aladin selector object to a json representation of the
 * selector with coordinates in world coordinates.
 * @param aladin - The aladin-lite instance
 * @returns A json representation of the selector object w
 */
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

/**
 * Converts a CircleSelector object to a json representation of the
 * selector with coordinates in world coordinates.
 * @param selector - CircleSelect object
 * @param aladin - The aladin-lite instance
 * @returns A json representation of a CircleSelect object
 */
function CircleSelectorToJson(selector, aladin) {
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

/**
 * Converts a RectSelector object to a json representation of the
 * selector with coordinates in world coordinates.
 * @param selector - RectSelect object
 * @param aladin - The aladin-lite instance
 * @returns A json representation of a CircleSelect object
 */
function RectangleSelectorToJson(selector, aladin) {
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

/**
 * Converts a PolySelector object to a json representation of the
 * selector with coordinates in world coordinates.
 * @param selector - PolySelect object
 * @param aladin - The aladin-lite instance
 * @returns A json representation of a CircleSelect object
 */
function PolySelectorToJson(selector, aladin) {
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

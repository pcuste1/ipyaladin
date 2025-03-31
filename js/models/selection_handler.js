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

  let radius = aladin.angularDist(
    selector.startCoo.x,
    selector.startCoo.y,
    selector.coo.x,
    selector.coo.y,
  );

  return {
    type: "circle",
    startCoo: {
      ra: startCooWorld[0],
      dec: startCooWorld[1],
    },
    radius: radius,
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
  let coos = [
    [
      Math.min(selector.startCoo.x, selector.coo.x),
      Math.min(selector.startCoo.y, selector.coo.y),
    ],
    [
      Math.max(selector.startCoo.x, selector.coo.x),
      Math.min(selector.startCoo.y, selector.coo.y),
    ],
    [
      Math.max(selector.startCoo.x, selector.coo.x),
      Math.max(selector.startCoo.y, selector.coo.y),
    ],
    [
      Math.min(selector.startCoo.x, selector.coo.x),
      Math.max(selector.startCoo.y, selector.coo.y),
    ],
  ];

  return {
    type: "rect",
    coos: coos.map((coo) => {
      let cooWorld = aladin.pix2world(coo[0], coo[1], 0);
      return {
        ra: cooWorld[0],
        dec: cooWorld[1],
      };
    }),
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
        ra: cooWorld[0],
        dec: cooWorld[1],
      };
    }),
  };
}

export function SelectRegion(msg, aladin) {
  let selector = aladin.view.selector;
  let type = msg["selection_type"];
  switch (type) {
    case "circle":
      SelectCircleRegion(msg, selector, aladin);
      return;
    case "rect":
      SelectRectRegion(msg, selector, aladin);
      return;
    case "poly":
      SelectPolyRegion(msg, selector, aladin);
      return;
    default:
      return;
  }
}

function SelectCircleRegion(msg, selector, aladin) {
  selector.setMode("circle");

  let startCoo = msg["startCoo"];
  let endCoo = msg["endCoo"];

  let startCooPix = aladin.world2pix(startCoo["ra"], startCoo["dec"], 0);
  let endCooPix = aladin.world2pix(endCoo["ra"], endCoo["dec"], 0);

  selector.dispatch("start", {});
  selector.dispatch("mousedown", {
    coo: {
      x: startCooPix[0],
      y: startCooPix[1],
    },
  });
  selector.dispatch("mousemove", {});
  selector.dispatch("mouseup", {
    coo: {
      x: endCooPix[0],
      y: endCooPix[1],
    },
  });
}

function SelectRectRegion(msg, selector, aladin) {
  selector.setMode("rect");

  let startCoo = msg["startCoo"];
  let endCoo = msg["endCoo"];

  let startCooPix = aladin.world2pix(startCoo["ra"], startCoo["dec"], 0);
  let endCooPix = aladin.world2pix(endCoo["ra"], endCoo["dec"], 0);

  selector.dispatch("start", {});
  selector.dispatch("mousedown", {
    coo: {
      x: startCooPix[0],
      y: startCooPix[1],
    },
  });
  selector.dispatch("mousemove", {});
  selector.dispatch("mouseup", {
    coo: {
      x: endCooPix[0],
      y: endCooPix[1],
    },
  });
}

function SelectPolyRegion(msg, selector, aladin) {
  selector.setMode("poly");

  selector.dispatch("start", {});

  let coos = msg["coos"];

  coos.forEach((coo) => {
    let cooPix = aladin.world2pix(coo["ra"], coo["dec"], 0);
    selector.dispatch("click", {
      coo: {
        x: cooPix[0],
        y: cooPix[1],
      },
    });
    selector.dispatch("mousemove", {});
  });

  selector.dispatch("finish");
}

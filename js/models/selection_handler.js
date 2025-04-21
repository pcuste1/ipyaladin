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

  let startCooPix = aladin.world2pix(startCoo["ra"], startCoo["dec"]);
  let endCooPix = aladin.world2pix(endCoo["ra"], endCoo["dec"]);

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

  let startCooPix = aladin.world2pix(startCoo["ra"], startCoo["dec"]);
  let endCooPix = aladin.world2pix(endCoo["ra"], endCoo["dec"]);

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
    let cooPix = aladin.world2pix(coo["ra"], coo["dec"]);
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

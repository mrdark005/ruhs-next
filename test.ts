import * as ruhs from "./";

ruhs.eventHandlers.ready = (() => {
  console.log("açıldım");
});

(async () => {
  await ruhs.setupClient("", {
    "encoding": "etf"
  });
})();

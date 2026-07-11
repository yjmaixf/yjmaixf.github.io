export const installCanvasReadbackHint = () => {
  if (typeof HTMLCanvasElement === "undefined") return;

  const prototype = HTMLCanvasElement.prototype;
  if (prototype.__openlayers2dReadbackHintInstalled) return;

  const originalGetContext = prototype.getContext;
  Object.defineProperty(prototype, "__openlayers2dReadbackHintInstalled", {
    value: true,
    configurable: true
  });

  prototype.getContext = function getContext(type, options) {
    if (type === "2d") {
      options = { ...(options || {}), willReadFrequently: true };
    }
    return originalGetContext.call(this, type, options);
  };
};

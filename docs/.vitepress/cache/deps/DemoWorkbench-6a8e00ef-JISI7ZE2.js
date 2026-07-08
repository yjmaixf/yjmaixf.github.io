import {
  Bh,
  DS,
  Vh,
  aE,
  iE,
  lE,
  ui,
  xE
} from "./chunk-J2SAADDG.js";
import {
  Fragment,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  isRef,
  normalizeClass,
  onMounted,
  onUnmounted,
  openBlock,
  reactive,
  ref,
  renderList,
  toDisplayString,
  unref,
  watch,
  withCtx,
  withKeys,
  withModifiers
} from "./chunk-YRNSJHMG.js";

// node_modules/openlayers2dsceneeditor/DemoWorkbench-6a8e00ef.js
var Ft = () => {
  var p;
  const m = (p = xE().getMapApp()) == null ? void 0 : p.store;
  if (!m)
    throw new Error("useDemoState requires an editor with a scene store.");
  return {
    batchUpdateModelsInScene: m.batchUpdateModelsInScene,
    addModelToScene: m.addModelToScene,
    createDefaultEffectForModel: m.createDefaultEffectForModel,
    createModelFromTemplate: m.createModelFromTemplate,
    exportScenePayload: m.exportScenePayload,
    generateSceneUniqueName: m.generateSceneUniqueName,
    loadSceneData: m.loadSceneData,
    modelList: m.modelList,
    redoSceneChange: m.redoSceneChange,
    redModelList: m.redModelList,
    removeAnnotationFromScene: m.removeAnnotationFromScene,
    removeMountFromModel: m.removeMountFromModel,
    removeModelsFromScene: m.removeModelsFromScene,
    sceneState: m.sceneState,
    sceneStatistics: m.sceneStatistics,
    setSceneMode: m.setSceneMode,
    setSelectedModelUID: m.setSelectedModelUID,
    undoSceneChange: m.undoSceneChange,
    updateModelInScene: m.updateModelInScene,
    upsertEffectsInScene: m.upsertEffectsInScene,
    upsertRelationsInScene: m.upsertRelationsInScene,
    validateScene: m.validateScene,
    selectedModel: m.selectedModel,
    blueModelList: m.blueModelList
  };
};
var ue = ref(false);
var g = ref({});
var Et = (x, m, p) => {
  g.value = JSON.parse(JSON.stringify(x)), g.value.lat = Number(m.toFixed(5)), g.value.lon = Number(p.toFixed(5)), g.value.num = 1, g.value.height = Number(g.value.height || 0), g.value.speed = Number(g.value.speed || 0), g.value.heading = Number(g.value.heading || 0), g.value.time = 0, g.value.nation = g.value.nation || "red", ue.value = true;
};
var Al = { class: "button-group" };
var Zl = {
  __name: "index",
  setup(x) {
    const m = xE(), {
      addModelToScene: p,
      createDefaultEffectForModel: se,
      createModelFromTemplate: I,
      generateSceneUniqueName: L,
      modelList: B,
      upsertEffectsInScene: K
    } = Ft(), {
      ElButton: P,
      ElCol: O,
      ElDialog: $,
      ElForm: me,
      ElFormItem: F,
      ElInput: De,
      ElInputNumber: le,
      ElOption: G,
      ElRadioButton: r,
      ElRadioGroup: xe,
      ElRow: Fe,
      ElSelect: Ie
    } = iE;
    watch(
      () => g.value.NodeType,
      (A) => {
        const f = B.value.find((U) => U.NodeType === A);
        f && (g.value = {
          ...f,
          ...g.value,
          NodeType: f.NodeType,
          modelType: f.modelType,
          iconKey: f.iconKey || f.NodeType,
          templateIcon: f.templateIcon || f.NodeType,
          templateCategory: f.templateCategory,
          mountable: f.mountable ?? false
        });
      }
    );
    const Re = async () => {
      const { name: A, num: f, nation: U, lon: Be, lat: Pe, NodeType: Se } = g.value;
      if (!A || !U || Be === void 0 || Pe === void 0 || !Se) {
        ui.warning("请先填写完整的部署参数");
        return;
      }
      const Oe = Number(f) || 1, ce = [];
      for (let Z = 0; Z < Oe; Z += 1) {
        const pe = I(g.value, {
          showName: L(A),
          name: A
        });
        p(pe, { recordHistory: true });
        const Q = se(pe);
        Q && K(Q), ce.push(pe);
      }
      for (const Z of ce)
        await m.updateModelPosition(Z.UID, {
          lon: Z.lon,
          lat: Z.lat,
          height: Z.height,
          heading: Z.heading,
          speed: Z.speed
        }, { sync: false });
      await m.sync(), ue.value = false, ui.success(`已部署 ${ce.length} 个模型`);
    };
    return (A, f) => (openBlock(), createBlock(unref($), {
      modelValue: unref(ue),
      "onUpdate:modelValue": f[10] || (f[10] = (U) => isRef(ue) ? ue.value = U : null),
      "append-to-body": "",
      "lock-scroll": false,
      width: "760px",
      title: `新增 ${unref(g).name || "模型"}`
    }, {
      footer: withCtx(() => [
        createBaseVNode("div", Al, [
          createVNode(unref(P), {
            onClick: f[9] || (f[9] = (U) => ue.value = false)
          }, {
            default: withCtx(() => [...f[13] || (f[13] = [
              createTextVNode("取消", -1)
            ])]),
            _: 1
          }),
          createVNode(unref(P), {
            type: "primary",
            onClick: Re
          }, {
            default: withCtx(() => [...f[14] || (f[14] = [
              createTextVNode("确认", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: withCtx(() => [
        createVNode(unref(me), { "label-position": "top" }, {
          default: withCtx(() => [
            createVNode(unref(Fe), { gutter: 16 }, {
              default: withCtx(() => [
                createVNode(unref(O), { span: 8 }, {
                  default: withCtx(() => [
                    createVNode(unref(F), { label: "模板名称" }, {
                      default: withCtx(() => [
                        createVNode(unref(De), {
                          modelValue: unref(g).name,
                          "onUpdate:modelValue": f[0] || (f[0] = (U) => unref(g).name = U)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(O), { span: 8 }, {
                  default: withCtx(() => [
                    createVNode(unref(F), { label: "模型类型" }, {
                      default: withCtx(() => [
                        createVNode(unref(Ie), {
                          modelValue: unref(g).NodeType,
                          "onUpdate:modelValue": f[1] || (f[1] = (U) => unref(g).NodeType = U)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(G), {
                              label: "车辆",
                              value: "car"
                            }),
                            createVNode(unref(G), {
                              label: "舰船",
                              value: "ship"
                            }),
                            createVNode(unref(G), {
                              label: "飞机",
                              value: "b2"
                            }),
                            createVNode(unref(G), {
                              label: "导弹",
                              value: "missile"
                            }),
                            createVNode(unref(G), {
                              label: "干扰机",
                              value: "jammer"
                            }),
                            createVNode(unref(G), {
                              label: "雷达",
                              value: "radar"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(O), { span: 8 }, {
                  default: withCtx(() => [
                    createVNode(unref(F), { label: "阵营" }, {
                      default: withCtx(() => [
                        createVNode(unref(xe), {
                          modelValue: unref(g).nation,
                          "onUpdate:modelValue": f[2] || (f[2] = (U) => unref(g).nation = U)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(r), { label: "red" }, {
                              default: withCtx(() => [...f[11] || (f[11] = [
                                createTextVNode("红方", -1)
                              ])]),
                              _: 1
                            }),
                            createVNode(unref(r), { label: "blue" }, {
                              default: withCtx(() => [...f[12] || (f[12] = [
                                createTextVNode("蓝方", -1)
                              ])]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(O), { span: 8 }, {
                  default: withCtx(() => [
                    createVNode(unref(F), { label: "数量" }, {
                      default: withCtx(() => [
                        createVNode(unref(le), {
                          modelValue: unref(g).num,
                          "onUpdate:modelValue": f[3] || (f[3] = (U) => unref(g).num = U),
                          min: 1,
                          "controls-position": "right"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(O), { span: 8 }, {
                  default: withCtx(() => [
                    createVNode(unref(F), { label: "经度" }, {
                      default: withCtx(() => [
                        createVNode(unref(le), {
                          modelValue: unref(g).lon,
                          "onUpdate:modelValue": f[4] || (f[4] = (U) => unref(g).lon = U),
                          precision: 5,
                          step: 0.01,
                          "controls-position": "right"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(O), { span: 8 }, {
                  default: withCtx(() => [
                    createVNode(unref(F), { label: "纬度" }, {
                      default: withCtx(() => [
                        createVNode(unref(le), {
                          modelValue: unref(g).lat,
                          "onUpdate:modelValue": f[5] || (f[5] = (U) => unref(g).lat = U),
                          precision: 5,
                          step: 0.01,
                          "controls-position": "right"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(O), { span: 8 }, {
                  default: withCtx(() => [
                    createVNode(unref(F), { label: "高度(m)" }, {
                      default: withCtx(() => [
                        createVNode(unref(le), {
                          modelValue: unref(g).height,
                          "onUpdate:modelValue": f[6] || (f[6] = (U) => unref(g).height = U),
                          step: 100,
                          "controls-position": "right"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(O), { span: 8 }, {
                  default: withCtx(() => [
                    createVNode(unref(F), { label: "速度" }, {
                      default: withCtx(() => [
                        createVNode(unref(le), {
                          modelValue: unref(g).speed,
                          "onUpdate:modelValue": f[7] || (f[7] = (U) => unref(g).speed = U),
                          step: 10,
                          "controls-position": "right"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(O), { span: 8 }, {
                  default: withCtx(() => [
                    createVNode(unref(F), { label: "航向" }, {
                      default: withCtx(() => [
                        createVNode(unref(le), {
                          modelValue: unref(g).heading,
                          "onUpdate:modelValue": f[8] || (f[8] = (U) => unref(g).heading = U),
                          step: 5,
                          "controls-position": "right"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue", "title"]));
  }
};
var Ql = DS(Zl, [["__scopeId", "data-v-9485b724"]]);
var Wl = { class: "workbench" };
var ql = { class: "topbar" };
var Gl = { class: "title-group" };
var Xl = { class: "toolbar" };
var Yl = { class: "left-panel" };
var eo = { class: "summary-card" };
var to = { class: "summary-item" };
var lo = { class: "summary-item" };
var oo = { class: "summary-item warning" };
var no = { class: "panel-block" };
var ao = { class: "display-config" };
var so = { class: "display-config" };
var io = { class: "display-config" };
var ro = { class: "display-config" };
var uo = { class: "display-config" };
var mo = { class: "display-config target-style-config" };
var co = { class: "display-config target-style-config" };
var po = { class: "display-config target-style-config" };
var fo = { class: "display-config target-style-config" };
var yo = { class: "display-config" };
var go = { class: "display-config" };
var vo = { class: "panel-block" };
var bo = { class: "effect-test-grid" };
var ko = { class: "template-desc" };
var wo = { class: "panel-block" };
var Mo = { class: "template-grid" };
var Co = ["onDragstart"];
var Uo = ["src"];
var Do = { class: "template-name" };
var Io = { class: "template-desc" };
var So = { class: "panel-block" };
var Vo = { class: "block-header" };
var No = { class: "block-actions" };
var $o = {
  key: 0,
  class: "model-list"
};
var To = ["onClick"];
var Eo = { class: "name-line" };
var Lo = { class: "meta-line" };
var ho = {
  key: 2,
  class: "model-list"
};
var xo = ["onClick"];
var Fo = { class: "name-line" };
var Ro = { class: "meta-line" };
var Bo = { class: "panel-block" };
var Po = { class: "block-header" };
var Oo = { class: "block-actions" };
var Ho = { class: "batch-toolbar" };
var jo = { class: "batch-form" };
var Jo = { class: "batch-actions" };
var zo = { class: "batch-form" };
var _o = { class: "batch-actions" };
var Ko = { class: "batch-form" };
var Ao = { class: "batch-actions" };
var Zo = { class: "batch-form" };
var Qo = { class: "batch-actions" };
var Wo = { class: "panel-block" };
var qo = { class: "plot-grid" };
var Go = { class: "panel-block" };
var Xo = { class: "block-header" };
var Yo = { class: "plot-grid" };
var en = { class: "panel-block" };
var tn = { class: "plot-grid" };
var ln = { class: "measure-result" };
var on = { class: "panel-block" };
var nn = {
  key: 0,
  class: "annotation-list"
};
var an = { class: "name-line" };
var sn = { class: "meta-line" };
var dn = { class: "panel-block" };
var rn = { class: "block-header" };
var un = {
  key: 0,
  class: "issue-list"
};
var mn = { class: "right-panel" };
var cn = { class: "inspector-card" };
var pn = { class: "block-header" };
var fn = { class: "block-actions" };
var yn = { class: "form-grid" };
var gn = { class: "route-section" };
var vn = { class: "form-grid compact" };
var bn = { class: "waypoint-list" };
var kn = { class: "waypoint-info" };
var wn = { class: "waypoint-actions" };
var Mn = { class: "route-section" };
var Cn = { class: "waypoint-list" };
var Un = { class: "waypoint-info" };
var Dn = { class: "waypoint-actions" };
var In = { class: "inspector-actions" };
var Sn = { class: "playback-bar" };
var Vn = { class: "playback-left" };
var Nn = { class: "playback-center" };
var $n = { class: "playback-right" };
var Tn = {
  __name: "index",
  setup(x) {
    const m = xE(), p = m.getMapApp(), {
      batchUpdateModelsInScene: se,
      addModelToScene: I,
      createDefaultEffectForModel: L,
      createModelFromTemplate: B,
      exportScenePayload: K,
      generateSceneUniqueName: P,
      loadSceneData: O,
      modelList: $,
      redoSceneChange: me,
      redModelList: F,
      removeAnnotationFromScene: De,
      removeMountFromModel: le,
      removeModelsFromScene: G,
      sceneState: r,
      sceneStatistics: xe,
      setSceneMode: Fe,
      setSelectedModelUID: Ie,
      undoSceneChange: Re,
      updateModelInScene: A,
      upsertEffectsInScene: f,
      upsertRelationsInScene: U,
      validateScene: Be,
      selectedModel: Pe,
      blueModelList: Se
    } = Ft(), Oe = () => m.cancelTool(), ce = async (l, e) => {
      e != null && e.UID && await m.removeModel(e.UID, { recordHistory: true });
    }, Z = (l, e) => m.setTemplateDragData(l, e), pe = (l) => m.exportMapScreenshot(l), Q = (l) => m.focusModel(l), Rt = () => m.endMeasure(), Bt = (l, e) => {
      var c;
      const o = {
        ready: "onReady",
        selectionChange: "onSelectionChange",
        routeSaved: "onRouteSaved",
        measure: "onMeasure",
        annotationCreated: "onAnnotationCreated",
        templateDrop: "onTemplateDrop"
      }[l];
      return o ? ((c = m[o]) == null ? void 0 : c.call(m, e)) || (() => {
      }) : () => {
      };
    }, Pt = () => m.startRouteEdit(r.selectionModelUID), ot = () => m.pausePlayback(), Ot = (l) => m.seekPlayback(l), nt = (l, e = {}, i = null) => m.startAnnotationMode(l, e, i), Ht = (l, e = {}) => m.startBatchMoveMode(l, e), jt = (l, e = {}) => m.startBatchRotateMode(l, e), Jt = (l) => m.startBoxSelectionMode(l), zt = (l, e = null) => m.startMeasureMode(l, e), at = () => m.startPlayback(), He = () => m.stopBatchTransformMode(), _t = () => m.stopBoxSelectionMode(), Kt = () => m.stopPlayback(), je = (l) => m.setBatchSelection(l), T = () => m.sync(), At = (l) => {
      var e;
      m.selectModel(l == null ? void 0 : l.UID), (e = p == null ? void 0 : p.treeClick) == null || e.call(p, l);
    }, st = () => T(), it = ref("models");
    let fe = null;
    const {
      ElButton: u,
      ElCheckbox: dt,
      ElColorPicker: rt,
      ElEmpty: ne,
      ElForm: Pn,
      ElFormItem: E,
      ElIcon: Zt,
      ElInput: Ve,
      ElInputNumber: R,
      ElOption: w,
      ElSelect: ae,
      ElSegmented: ut,
      ElSlider: Qt,
      ElSwitch: ye,
      ElTabPane: Je,
      ElTabs: Wt,
      ElTag: Ne,
      Search: qt
    } = iE, $e = ref(""), ze = ref("尚未测量"), mt = ref(null), H = reactive({}), ge = ref(false), X = ref(false), Y = ref(false), _e = ref("custom"), Gt = [
      { label: "自定义", value: "custom" },
      { label: "矩形", value: "rectangle" },
      { label: "圆形", value: "circle" }
    ], Xt = [
      { label: "编辑", value: "edit" },
      { label: "态势", value: "view" },
      { label: "回放", value: "playback" }
    ], M = Pe, ie = xe, V = reactive({
      moveLon: 0,
      moveLat: 0,
      heading: 0,
      rotateAngle: 0,
      spacing: 0.1,
      formation: "row",
      columns: 3
    }), b = reactive({
      UID: null,
      showName: "",
      NodeType: "car",
      nation: "red",
      status: "normal",
      lon: 116.39493,
      lat: 39.9125,
      height: 0,
      speed: 0,
      heading: 0,
      targetUID: null,
      routeMeta: {
        name: "",
        speed: 0,
        altitude: 0
      }
    }), Ke = computed(
      () => F.value.filter((l) => ct(l, $e.value))
    ), Ae = computed(
      () => Se.value.filter((l) => ct(l, $e.value))
    ), h = computed(
      () => r.models.filter((l) => H[l.UID])
    ), Yt = computed(
      () => r.models.filter((l) => String(l.UID) !== String(b.UID))
    ), ve = computed(() => h.value.map((l) => String(l.UID))), ct = (l, e) => {
      if (!e)
        return true;
      const i = e.trim().toLowerCase();
      return [l.showName, l.NodeType, l.status].filter(Boolean).some((o) => String(o).toLowerCase().includes(i));
    }, pt = (l) => aE(l), ft = (l, e) => `${Number(l).toFixed(2)}, ${Number(e).toFixed(2)}`, el = (l) => {
      const e = [l.type];
      return l.shape && l.shape !== l.type && e.push(l.shape), l.category && e.push(l.category), e.filter(Boolean).join(" · ");
    }, yt = (l) => {
      const e = Number(l) % 360;
      return e >= 0 ? e : e + 360;
    }, gt = () => {
      const l = new Set(r.models.map((e) => String(e.UID)));
      Object.keys(H).forEach((e) => {
        l.has(String(e)) || delete H[e];
      }), r.models.forEach((e) => {
        H[e.UID] === void 0 && (H[e.UID] = false);
      });
    }, be = () => {
      _t(), ge.value = false;
    }, j = () => {
      He(), X.value = false;
    }, J = () => {
      He(), Y.value = false;
    }, ee = () => {
      be(), j(), J();
    }, vt = (l) => {
      gt();
      const e = new Set((l || []).map((i) => String(i)));
      r.models.forEach((i) => {
        H[i.UID] = e.has(String(i.UID));
      });
    }, tl = () => {
      vt([]);
    }, bt = (l) => {
      if (!l.length)
        return { lon: 0, lat: 0 };
      const e = l.reduce(
        (i, o) => ({
          lon: i.lon + Number(o.lon),
          lat: i.lat + Number(o.lat)
        }),
        { lon: 0, lat: 0 }
      );
      return {
        lon: e.lon / l.length,
        lat: e.lat / l.length
      };
    }, de = async (l, e) => {
      if (!l.length)
        return [];
      const i = se(l, {
        recordHistory: true,
        label: e
      });
      return await T(), je(ve.value), i;
    }, ke = () => {
      M.value && Object.assign(b, JSON.parse(JSON.stringify(M.value)));
    };
    watch(
      () => r.models.map((l) => String(l.UID)),
      () => {
        gt();
      },
      { immediate: true, deep: true }
    ), watch(
      M,
      (l) => {
        l && ke();
      },
      { immediate: true, deep: true }
    ), watch(
      () => [
        r.mode,
        r.display.showPopup,
        r.display.showModelName,
        r.display.showTargetLine,
        r.display.targetLineStyle.redColor,
        r.display.targetLineStyle.blueColor,
        r.display.targetLineStyle.width,
        r.display.targetLineStyle.lineType,
        r.display.headingVisible.red,
        r.display.headingVisible.blue
      ],
      async () => {
        Fe(r.mode), await T();
      }
    ), watch(
      ve,
      (l, e) => {
        (X.value || Y.value) && JSON.stringify(l) !== JSON.stringify(e || []) && (He(), X.value = false, Y.value = false), je(l);
      },
      { deep: true }
    );
    const ll = (l) => {
      var o, c;
      if (r.mode !== "edit") {
        ui.info("态势显示模式下会直接部署模型并展示默认态势效果"), Ze(l);
        return;
      }
      const [e, i] = ((c = (o = p == null ? void 0 : p.core) == null ? void 0 : o.getCenter) == null ? void 0 : c.call(o)) || [116.394926, 39.9125];
      Et(l, i, e);
    }, ol = (l) => {
      var o;
      if (!l || l.targetFeature || l.targetModel)
        return;
      const { lon: e, lat: i } = l.coordinate || {};
      Et(l.template, i, e), (o = l.preventDefault) == null || o.call(l);
    }, Ze = async (l, e = {}) => {
      var D, N;
      const [i, o] = ((N = (D = p == null ? void 0 : p.core) == null ? void 0 : D.getCenter) == null ? void 0 : N.call(D)) || [116.394926, 39.9125], c = B(l, {
        lon: i,
        lat: o,
        showName: P(l.name || l.showName || l.NodeType),
        name: l.name || l.showName || l.NodeType
      });
      I(c, { recordHistory: true });
      const C = L(c, e);
      return C && f(C), await T(), Q(c.UID), ui.success(`${r.mode === "edit" ? "编辑" : "态势"}模式已部署 ${c.showName}`), c;
    }, nl = {
      radar: {
        template: "radar",
        effect: {
          type: "radar",
          geometry: { shape: "sector", radius: 12e4, angle: 100 },
          style: { animation: "scan" },
          label: "雷达扫描"
        }
      },
      jammer: {
        template: "jammer",
        effect: {
          type: "jammer",
          geometry: { shape: "circle", radius: 8e4 },
          style: { animation: "pulse" },
          label: "干扰范围"
        }
      },
      warning: {
        template: "radar",
        effect: {
          type: "warning",
          geometry: { shape: "circle", radius: 9e4 },
          style: { animation: "pulse" },
          label: "预警范围"
        }
      },
      detect: {
        template: "radar",
        effect: {
          type: "detect",
          geometry: { shape: "circle", radius: 1e5 },
          style: { animation: "pulse" },
          label: "探测范围"
        }
      },
      weapon: {
        template: "missile",
        effect: {
          type: "weapon",
          geometry: { shape: "circle", radius: 7e4 },
          style: { animation: "none" },
          label: "武器射程"
        }
      }
    }, we = async (l) => {
      const e = nl[l];
      if (!e)
        return;
      const i = $.value.find((o) => o.NodeType === e.template);
      i && await Ze(i, e.effect);
    }, Qe = async (l) => {
      var N, z;
      const [e, i] = ((z = (N = p == null ? void 0 : p.core) == null ? void 0 : N.getCenter) == null ? void 0 : z.call(N)) || [116.394926, 39.9125], o = $.value.find((W) => W.NodeType === "radar") || $.value[0], c = $.value.find((W) => W.NodeType === "ship") || $.value[1] || o;
      if (!o || !c)
        return;
      const C = B(o, {
        lon: e - 0.25,
        lat: i,
        name: o.name,
        showName: P(`${o.name || "source"}_${l}`),
        nation: "red"
      }), D = B(c, {
        lon: e + 0.25,
        lat: i,
        name: c.name,
        showName: P(`${c.name || "target"}_${l}`),
        nation: "blue"
      });
      return I(C, { recordHistory: true }), I(D, { recordHistory: true }), U({
        id: `${l}_${C.UID}_${D.UID}`,
        type: l,
        sourceUID: C.UID,
        targetUID: D.UID,
        label: l
      }), await T(), Q(C.UID), ui.success(`已部署 ${l} 关系线示例`), { sourceModel: C, targetModel: D };
    }, kt = async () => {
      var D, N;
      const [l, e] = ((N = (D = p == null ? void 0 : p.core) == null ? void 0 : D.getCenter) == null ? void 0 : N.call(D)) || [116.394926, 39.9125];
      if (r.models.length >= 2)
        return { sourceModel: r.models[0], targetModel: r.models[1] };
      const i = $.value.find((z) => z.NodeType === "radar") || $.value[0], o = $.value.find((z) => z.NodeType === "ship") || $.value[1] || i;
      if (!i || !o)
        return {};
      const c = B(i, {
        lon: l - 0.25,
        lat: e,
        name: i.name,
        showName: P("效果源"),
        nation: "red"
      }), C = B(o, {
        lon: l + 0.25,
        lat: e,
        name: o.name,
        showName: P("效果目标"),
        nation: "blue"
      });
      return I(c, { recordHistory: true }), I(C, { recordHistory: true }), { sourceModel: c, targetModel: C };
    }, wt = async (l, e = "good") => {
      const { sourceModel: i, targetModel: o } = await kt();
      !i || !o || (f({
        id: `${l}_${i.UID}_${o.UID}_${e}`,
        type: l,
        sourceUID: i.UID,
        targetUID: o.UID,
        geometry: { shape: "line", targetUID: o.UID },
        style: {
          animation: "flow",
          quality: e,
          width: l === "missileFlight" ? 5 : e === "broken" ? 2 : 3
        },
        label: l === "missileFlight" ? "导弹飞行" : al[e] || "通信链路",
        meta: { quality: e }
      }), await T(), Q(i.UID));
    }, al = {
      good: "通信正常",
      weak: "通信受限",
      broken: "通信中断"
    }, sl = async () => {
      const l = await Me();
      l && (f({
        id: `lock_${l}`,
        type: "lock",
        sourceUID: l,
        geometry: { shape: "box", size: 64 },
        style: { animation: "pulse" },
        label: "锁定"
      }), await T());
    }, We = async (l) => {
      await wt("linkQuality", l);
    }, il = async () => {
      await wt("missileFlight", "good");
    }, Te = async (l) => {
      const e = await Me();
      if (!e)
        return;
      const i = {
        damaged: "毁伤",
        lost: "失联",
        discovered: "目标发现",
        tracking: "目标跟踪"
      };
      f({
        id: `${l}_${e}`,
        type: l,
        sourceUID: e,
        geometry: {
          shape: "circle",
          radius: l === "damaged" ? 3e4 : l === "lost" ? 26e3 : l === "tracking" ? 24e3 : 18e3
        },
        style: { animation: "pulse", width: l === "tracking" ? 3 : 2 },
        label: i[l] || l
      }), await T();
    }, qe = async (l) => {
      const e = await Me();
      if (!e)
        return;
      const i = {
        sensorSearch: {
          geometry: { shape: "sector", radius: 11e4, angle: 120 },
          style: { animation: "scan" },
          label: "传感器搜索"
        },
        sensorOff: {
          geometry: { shape: "circle", radius: 5e4 },
          style: { animation: "none" },
          label: "传感器关机"
        },
        sensorSuppressed: {
          geometry: { shape: "circle", radius: 7e4 },
          style: { animation: "pulse" },
          label: "传感器压制"
        }
      }[l];
      f({
        id: `${l}_${e}`,
        type: l,
        sourceUID: e,
        ...i
      }), await T();
    }, Ge = async (l) => {
      var C, D;
      const { sourceModel: e, targetModel: i } = await kt();
      if (!e || !i)
        return;
      const o = l === "launch" ? "missileFlight" : l, c = {
        launch: "发射：弹体飞向目标",
        intercept: "拦截：目标点命中爆破",
        miss: "脱靶：弹道偏离目标"
      };
      f({
        id: `${o}_${e.UID}_${i.UID}`,
        type: o,
        sourceUID: e.UID,
        targetUID: i.UID,
        geometry: { shape: "line", targetUID: i.UID },
        style: {
          animation: "flow",
          quality: l === "miss" ? "broken" : "good",
          width: l === "launch" ? 5 : l === "intercept" ? 4 : 2,
          strokeColor: l === "miss" ? "rgba(180,180,180,0.9)" : void 0
        },
        label: c[l]
      }), l === "intercept" && ((C = p == null ? void 0 : p.playEventEffect) == null || C.call(p, i.UID, { type: "realistic", duration: 1500 }), A(i.UID, { status: "destroyed" }, { recordHistory: true }), f({
        id: `damaged_${i.UID}`,
        type: "damaged",
        sourceUID: i.UID,
        geometry: { shape: "circle", radius: 3e4 },
        style: { animation: "pulse", width: 4, color: "rgba(255,80,40,0.18)", strokeColor: "rgba(255,80,40,1)" },
        label: "命中毁伤"
      })), l === "miss" && ((D = p == null ? void 0 : p.playEventEffect) == null || D.call(p, i.UID, { type: "flash", duration: 800, color: "rgba(180,180,180,1)" }), f({
        id: `miss_warning_${i.UID}`,
        type: "lost",
        sourceUID: i.UID,
        geometry: { shape: "circle", radius: 22e3 },
        style: { animation: "pulse", width: 2, color: "rgba(180,180,180,0.08)", strokeColor: "rgba(210,210,210,0.85)" },
        label: "未命中"
      })), await T(), Q(e.UID);
    }, dl = async () => {
      var C, D;
      const [l, e] = ((D = (C = p == null ? void 0 : p.core) == null ? void 0 : C.getCenter) == null ? void 0 : D.call(C)) || [116.394926, 39.9125], i = $.value.find((N) => N.NodeType === "radar") || $.value[0];
      if (!i)
        return;
      const o = B(i, {
        lon: l - 0.12,
        lat: e,
        name: i.name,
        showName: P("覆盖源A"),
        nation: "red"
      }), c = B(i, {
        lon: l + 0.12,
        lat: e,
        name: i.name,
        showName: P("覆盖源B"),
        nation: "blue"
      });
      I(o, { recordHistory: true }), I(c, { recordHistory: true }), f([
        {
          id: `detect_${o.UID}`,
          type: "detect",
          sourceUID: o.UID,
          geometry: { shape: "circle", radius: 85e3 },
          style: { color: "rgba(76, 217, 100, 0.045)", strokeColor: "rgba(76, 217, 100, 0.28)", width: 1, animation: "none" },
          label: "覆盖A"
        },
        {
          id: `detect_${c.UID}`,
          type: "detect",
          sourceUID: c.UID,
          geometry: { shape: "circle", radius: 85e3 },
          style: { color: "rgba(64, 200, 255, 0.045)", strokeColor: "rgba(64, 200, 255, 0.28)", width: 1, animation: "none" },
          label: "覆盖B"
        },
        {
          id: `overlap_${o.UID}_${c.UID}`,
          type: "overlap",
          sourceUID: o.UID,
          geometry: { shape: "circle", radius: 38e3, lon: l, lat: e },
          style: { color: "rgba(255, 235, 80, 0.28)", strokeColor: "rgba(255, 235, 80, 1)", width: 3, animation: "pulse" },
          label: "重叠区"
        }
      ]), await T(), Q(o.UID);
    }, rl = () => {
      var l, e;
      (l = p == null ? void 0 : p.setContextMenuHandler) == null || l.call(p, (i) => {
      }), (e = p == null ? void 0 : p.setContextMenuItems) == null || e.call(p, [
        {
          id: "detail",
          label: ({ model: i }) => i ? `查看：${i.showName || i.name || i.UID}` : "查看地图坐标",
          action: ({ model: i, coordinate: o }) => {
            if (i) {
              ui.info(`模型：${i.showName || i.name || i.UID}`);
              return;
            }
            ui.info(`坐标：${o.lon.toFixed(5)}, ${o.lat.toFixed(5)}`);
          }
        },
        {
          id: "focus",
          label: "聚焦模型",
          visible: ({ model: i }) => !!i,
          action: ({ model: i }) => Q(i.UID)
        },
        {
          id: "set-target",
          label: "设为第一个模型的目标",
          visible: ({ model: i }) => !!(i && r.models[0] && String(r.models[0].UID) !== String(i.UID)),
          action: async ({ model: i }) => {
            const o = r.models[0];
            o && (A(o.UID, { targetUID: i.UID }, { recordHistory: true }), await T(), ui.success(`${o.showName || o.name} 已指向 ${i.showName || i.name}`));
          }
        },
        {
          id: "copy-coordinate",
          label: "打印坐标到控制台",
          action: ({ coordinate: i }) => {
            ui.success(`坐标：${i.lon.toFixed(5)}, ${i.lat.toFixed(5)}`);
          }
        },
        {
          id: "remove",
          label: "删除模型",
          danger: true,
          visible: ({ model: i }) => !!i,
          action: async ({ model: i }) => {
            G([i.UID], { recordHistory: true }), await T(), ui.success("模型已删除");
          }
        }
      ], { enabled: true }), ui.success("右键菜单测试已启用：请在模型或地图空白处右键");
    }, Me = async () => {
      var e, i;
      if ((e = M.value) != null && e.UID)
        return M.value.UID;
      if ((i = r.models[0]) != null && i.UID)
        return r.models[0].UID;
      const l = await Ze($.value.find((o) => o.NodeType === "radar") || $.value[0]);
      return l == null ? void 0 : l.UID;
    }, ul = async () => {
      var e;
      const l = await Me();
      l && ((e = p == null ? void 0 : p.playEventEffect) == null || e.call(p, l, {
        type: "flash",
        duration: 1200,
        color: "rgba(255, 40, 40, 1)"
      }));
    }, ml = async () => {
      var e;
      const l = await Me();
      l && ((e = p == null ? void 0 : p.playEventEffect) == null || e.call(p, l, {
        type: "realistic",
        duration: 1800
      }));
    }, cl = async () => {
      r.effects = [], r.relations = [], await T(), ui.success("已清除态势特效和关系线");
    }, Xe = (l) => {
      j(), J(), Ie(l.UID), At(l);
    }, pl = () => {
      j(), J(), M.value && Q(M.value.UID);
    }, Mt = (l) => {
      j(), J(), Q(l);
    }, fl = async () => {
      j(), J(), !(!M.value || !A(M.value.UID, {
        ...b,
        line: M.value.line,
        routeMeta: {
          ...M.value.routeMeta,
          ...b.routeMeta
        }
      }, { recordHistory: true })) && (ke(), await st(), ui.success("Model updated"));
    }, Ct = async () => {
      ee(), M.value && (await lE.confirm(`Delete ${M.value.showName}?`, "Confirm", {
        type: "warning"
      }), await ce(null, M.value));
    }, yl = () => {
      ee(), Pt();
    }, gl = async (l) => {
      if (!M.value || l <= 0)
        return;
      const e = (M.value.line || []).filter((o, c) => c !== l);
      A(
        M.value.UID,
        {
          line: e,
          routeMeta: {
            ...M.value.routeMeta
          }
        },
        { recordHistory: true }
      ) && (ke(), await T(), ui.success("Waypoint removed"));
    }, vl = async (l) => {
      if (!M.value)
        return;
      const e = le(M.value.UID, l, { recordHistory: true });
      e != null && e.host && (ke(), await st(e.host), ui.success("Unmounted"));
    }, Ut = (l) => {
      j(), J(), (l === "red" ? F.value : Se.value).forEach((i) => {
        H[i.UID] = true;
      });
    }, bl = () => {
      j(), J(), je(ve.value), h.value[0] && Ie(h.value[0].UID);
    }, kl = () => {
      if (ge.value) {
        be();
        return;
      }
      j(), J(), Jt(({ uids: l }) => {
        vt(l), be(), l.length ? ui.success(`已框选 ${l.length} 个模型`) : ui.warning("框选区域内没有模型");
      }), ge.value = true, ui.info("拖拽地图进行框选");
    }, wl = () => {
      if (X.value) {
        j();
        return;
      }
      if (!h.value.length) {
        ui.warning("Select models first");
        return;
      }
      if (be(), J(), !Ht(ve.value, {
        onCommit: async (e) => {
          X.value = false, await de(e, "Batch Move Models"), ui.success("批量移动完成");
        },
        onCancel: () => {
          X.value = false;
        }
      })) {
        ui.warning("未找到可移动的模型");
        return;
      }
      X.value = true, ui.info("按住鼠标左键拖拽进行整体移动，松开后完成");
    }, Ml = () => {
      if (Y.value) {
        J();
        return;
      }
      if (!h.value.length) {
        ui.warning("Select models first");
        return;
      }
      if (be(), j(), !jt(ve.value, {
        onCommit: async (e) => {
          Y.value = false, await de(e, "Batch Rotate Models"), ui.success("批量旋转完成");
        },
        onCancel: () => {
          Y.value = false;
        }
      })) {
        ui.warning("未找到可旋转的模型");
        return;
      }
      Y.value = true, ui.info("按住鼠标左键拖拽进行旋转，松开后完成");
    }, Cl = async () => {
      if (j(), J(), !h.value.length) {
        ui.warning("Select models first");
        return;
      }
      const l = Number(V.moveLon) || 0, e = Number(V.moveLat) || 0;
      if (!l && !e) {
        ui.warning("请输入平移偏移量");
        return;
      }
      await de(
        h.value.map((i) => ({
          uid: i.UID,
          patch: {
            lon: Number(i.lon) + l,
            lat: Number(i.lat) + e
          }
        })),
        "Batch Move Models"
      ), ui.success("批量移动完成");
    }, Ul = async () => {
      if (j(), J(), !h.value.length) {
        ui.warning("Select models first");
        return;
      }
      const l = yt(V.heading);
      await de(
        h.value.map((e) => ({
          uid: e.UID,
          patch: { heading: l }
        })),
        "Batch Update Heading"
      ), ui.success("批量航向已更新");
    }, Dl = async () => {
      j(), J();
      const l = h.value;
      if (!l.length) {
        ui.warning("Select models first");
        return;
      }
      const e = Math.max(0.01, Number(V.spacing) || 0.1), i = bt(l), o = V.formation, c = Math.max(2, Number(V.columns) || 2), C = [];
      l.forEach((D, N) => {
        let z = 0, W = 0;
        if (o === "row")
          z = (N - (l.length - 1) / 2) * e;
        else if (o === "column")
          W = ((l.length - 1) / 2 - N) * e;
        else if (o === "grid") {
          const Ee = Math.floor(N / c), Le = N % c, Ol = Math.ceil(l.length / c);
          z = (Le - (c - 1) / 2) * e, W = ((Ol - 1) / 2 - Ee) * e;
        } else if (o === "circle") {
          const Ee = Math.max(e, l.length * e / (2 * Math.PI)), Le = Math.PI * 2 * N / l.length;
          z = Math.cos(Le) * Ee, W = Math.sin(Le) * Ee;
        }
        C.push({
          uid: D.UID,
          patch: {
            lon: i.lon + z,
            lat: i.lat + W
          }
        });
      }), await de(C, "Batch Layout Formation"), ui.success("阵形布局已应用");
    }, Il = async () => {
      j(), J();
      const l = h.value;
      if (!l.length) {
        ui.warning("Select models first");
        return;
      }
      const e = Number(V.rotateAngle) || 0;
      if (!e) {
        ui.warning("请输入旋转角度");
        return;
      }
      const i = e * Math.PI / 180, o = bt(l), c = l.map((C) => {
        const D = Number(C.lon) - o.lon, N = Number(C.lat) - o.lat, z = D * Math.cos(i) - N * Math.sin(i), W = D * Math.sin(i) + N * Math.cos(i);
        return {
          uid: C.UID,
          patch: {
            lon: o.lon + z,
            lat: o.lat + W,
            heading: yt(Number(C.heading || 0) + e)
          }
        };
      });
      await de(c, "Batch Rotate Models"), ui.success("批量旋转完成");
    }, Sl = async () => {
      ee();
      const l = Object.keys(H).filter((e) => H[e]);
      if (!l.length) {
        ui.warning("Select models first");
        return;
      }
      await lE.confirm(`Delete ${l.length} selected models?`, "Batch Delete", {
        type: "warning"
      }), G(l, { recordHistory: true }), await T(), l.forEach((e) => {
        H[e] = false;
      });
    }, re = (l, e, i = "basic", o = "custom") => {
      ee(), nt(l, { name: e, category: i, drawShape: o }, () => {
        ui.success("Annotation created");
      });
    }, Vl = () => re("arrow", "Arrow", "basic"), Ye = (l, e, i = "military") => re(l, e, i, _e.value), Nl = () => {
      ee();
      const l = window.prompt("Enter annotation text", "Task Area");
      l && nt("text", { name: "文本标注", text: l, category: "basic" }, () => {
        ui.success("Text annotation created");
      });
    }, Dt = (l) => {
      ee(), zt(l, (e) => {
        ze.value = e.label;
      });
    }, $l = () => {
      ee(), Oe();
    }, Tl = () => {
      ee(), Rt(), ze.value = "尚未测量";
    }, El = async (l) => {
      De(l, { recordHistory: true }), await T();
    }, Ll = () => {
      Be(), r.validation.length || ui.success("No validation issues");
    }, It = async () => {
      if (!Re()) {
        ui.warning("Nothing to undo");
        return;
      }
      await T();
    }, St = async () => {
      if (!me()) {
        ui.warning("Nothing to redo");
        return;
      }
      await T();
    }, hl = () => {
      var l;
      (l = mt.value) == null || l.click();
    }, xl = async (l) => {
      var c;
      const e = (c = l.target.files) == null ? void 0 : c[0];
      if (!e)
        return;
      const i = await e.text(), o = JSON.parse(i);
      O(o, "Import Scene"), await T(), ui.success("Scene imported"), l.target.value = "";
    }, Vt = (l, e, i = "application/json") => {
      const o = new Blob([l], { type: i }), c = document.createElement("a");
      c.href = URL.createObjectURL(o), c.download = e, c.click(), URL.revokeObjectURL(c.href);
    }, Fl = () => {
      Vt(
        JSON.stringify(K(), null, 2),
        `${r.metadata.name || "scenario"}.json`
      );
    }, Rl = () => {
      const l = [
        `Scene: ${r.metadata.name}`,
        `Models: ${ie.value.modelCount}`,
        `Annotations: ${ie.value.annotationCount}`,
        `Issues: ${ie.value.issueCount}`,
        "",
        "Issue List:",
        ...r.validation.length ? r.validation.map((e) => `- [${e.level}] ${e.message}`) : ["- none"]
      ].join(`
`);
      Vt(l, `${r.metadata.name || "scenario"}-report.txt`, "text/plain;charset=utf-8");
    }, Bl = () => {
      pe(`${r.metadata.name || "scenario"}-map.png`);
    }, Pl = () => {
      const l = [...Ke.value, ...Ae.value][0];
      if (!l) {
        ui.warning("No matching model");
        return;
      }
      Xe(l);
    }, Nt = async (l) => {
      if ((l.ctrlKey || l.metaKey) && l.key.toLowerCase() === "z") {
        l.preventDefault(), await It();
        return;
      }
      if ((l.ctrlKey || l.metaKey) && l.key.toLowerCase() === "y") {
        l.preventDefault(), await St();
        return;
      }
      l.key === "Delete" && M.value && (l.preventDefault(), await Ct()), l.code === "Space" && (l.preventDefault(), r.playback.playing ? ot() : at());
    };
    return onMounted(() => {
      fe = Bt("templateDrop", ol), window.addEventListener("keydown", Nt);
    }), onUnmounted(() => {
      fe == null || fe(), fe = null, ee(), window.removeEventListener("keydown", Nt);
    }), (l, e) => {
      var i;
      return openBlock(), createElementBlock("div", Wl, [
        createBaseVNode("header", ql, [
          createBaseVNode("div", Gl, [
            e[68] || (e[68] = createBaseVNode("div", { class: "eyebrow" }, "Scenario Editor", -1)),
            createVNode(unref(Ve), {
              modelValue: unref(r).metadata.name,
              "onUpdate:modelValue": e[0] || (e[0] = (o) => unref(r).metadata.name = o),
              class: "scene-title",
              placeholder: "场景名称"
            }, null, 8, ["modelValue"])
          ]),
          createBaseVNode("div", Xl, [
            createVNode(unref(Ve), {
              modelValue: $e.value,
              "onUpdate:modelValue": e[1] || (e[1] = (o) => $e.value = o),
              class: "search-input",
              clearable: "",
              placeholder: "Search and focus model",
              onKeyup: withKeys(Pl, ["enter"])
            }, {
              prefix: withCtx(() => [
                createVNode(unref(Zt), null, {
                  default: withCtx(() => [
                    createVNode(unref(qt))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode(unref(u), { onClick: It }, {
              default: withCtx(() => [...e[69] || (e[69] = [
                createTextVNode("撤销", -1)
              ])]),
              _: 1
            }),
            createVNode(unref(u), { onClick: St }, {
              default: withCtx(() => [...e[70] || (e[70] = [
                createTextVNode("重做", -1)
              ])]),
              _: 1
            }),
            createVNode(unref(u), { onClick: hl }, {
              default: withCtx(() => [...e[71] || (e[71] = [
                createTextVNode("导入 JSON", -1)
              ])]),
              _: 1
            }),
            createVNode(unref(u), { onClick: Fl }, {
              default: withCtx(() => [...e[72] || (e[72] = [
                createTextVNode("导出 JSON", -1)
              ])]),
              _: 1
            }),
            createVNode(unref(u), { onClick: Rl }, {
              default: withCtx(() => [...e[73] || (e[73] = [
                createTextVNode("导出报表", -1)
              ])]),
              _: 1
            }),
            createVNode(unref(u), {
              type: "primary",
              onClick: Bl
            }, {
              default: withCtx(() => [...e[74] || (e[74] = [
                createTextVNode("截图", -1)
              ])]),
              _: 1
            })
          ]),
          createBaseVNode("input", {
            ref_key: "fileInputRef",
            ref: mt,
            class: "hidden-input",
            type: "file",
            accept: ".json",
            onChange: xl
          }, null, 544)
        ]),
        createBaseVNode("aside", Yl, [
          createBaseVNode("section", eo, [
            createBaseVNode("div", to, [
              e[75] || (e[75] = createBaseVNode("span", null, "模型", -1)),
              createBaseVNode("strong", null, toDisplayString(unref(ie).modelCount), 1)
            ]),
            createBaseVNode("div", lo, [
              e[76] || (e[76] = createBaseVNode("span", null, "标绘", -1)),
              createBaseVNode("strong", null, toDisplayString(unref(ie).annotationCount), 1)
            ]),
            createBaseVNode("div", oo, [
              e[77] || (e[77] = createBaseVNode("span", null, "校验", -1)),
              createBaseVNode("strong", null, toDisplayString(unref(ie).issueCount), 1)
            ])
          ]),
          createBaseVNode("section", no, [
            e[89] || (e[89] = createBaseVNode("div", { class: "block-title" }, "显示配置", -1)),
            createBaseVNode("div", ao, [
              e[78] || (e[78] = createBaseVNode("span", null, "运行模式", -1)),
              createVNode(unref(ut), {
                modelValue: unref(r).mode,
                "onUpdate:modelValue": e[2] || (e[2] = (o) => unref(r).mode = o),
                options: Xt
              }, null, 8, ["modelValue"])
            ]),
            createBaseVNode("div", so, [
              e[79] || (e[79] = createBaseVNode("span", null, "红方航向", -1)),
              createVNode(unref(ye), {
                modelValue: unref(r).display.headingVisible.red,
                "onUpdate:modelValue": e[3] || (e[3] = (o) => unref(r).display.headingVisible.red = o)
              }, null, 8, ["modelValue"])
            ]),
            createBaseVNode("div", io, [
              e[80] || (e[80] = createBaseVNode("span", null, "模型弹窗", -1)),
              createVNode(unref(ye), {
                modelValue: unref(r).display.showPopup,
                "onUpdate:modelValue": e[4] || (e[4] = (o) => unref(r).display.showPopup = o)
              }, null, 8, ["modelValue"])
            ]),
            createBaseVNode("div", ro, [
              e[81] || (e[81] = createBaseVNode("span", null, "模型名称", -1)),
              createVNode(unref(ye), {
                modelValue: unref(r).display.showModelName,
                "onUpdate:modelValue": e[5] || (e[5] = (o) => unref(r).display.showModelName = o)
              }, null, 8, ["modelValue"])
            ]),
            createBaseVNode("div", uo, [
              e[82] || (e[82] = createBaseVNode("span", null, "目标连线", -1)),
              createVNode(unref(ye), {
                modelValue: unref(r).display.showTargetLine,
                "onUpdate:modelValue": e[6] || (e[6] = (o) => unref(r).display.showTargetLine = o)
              }, null, 8, ["modelValue"])
            ]),
            createBaseVNode("div", mo, [
              e[83] || (e[83] = createBaseVNode("span", null, "红方目标线", -1)),
              createVNode(unref(rt), {
                modelValue: unref(r).display.targetLineStyle.redColor,
                "onUpdate:modelValue": e[7] || (e[7] = (o) => unref(r).display.targetLineStyle.redColor = o),
                "show-alpha": ""
              }, null, 8, ["modelValue"])
            ]),
            createBaseVNode("div", co, [
              e[84] || (e[84] = createBaseVNode("span", null, "蓝方目标线", -1)),
              createVNode(unref(rt), {
                modelValue: unref(r).display.targetLineStyle.blueColor,
                "onUpdate:modelValue": e[8] || (e[8] = (o) => unref(r).display.targetLineStyle.blueColor = o),
                "show-alpha": ""
              }, null, 8, ["modelValue"])
            ]),
            createBaseVNode("div", po, [
              e[85] || (e[85] = createBaseVNode("span", null, "目标线宽", -1)),
              createVNode(unref(R), {
                modelValue: unref(r).display.targetLineStyle.width,
                "onUpdate:modelValue": e[9] || (e[9] = (o) => unref(r).display.targetLineStyle.width = o),
                min: 1,
                max: 10,
                step: 1,
                "controls-position": "right"
              }, null, 8, ["modelValue"])
            ]),
            createBaseVNode("div", fo, [
              e[86] || (e[86] = createBaseVNode("span", null, "目标线型", -1)),
              createVNode(unref(ae), {
                modelValue: unref(r).display.targetLineStyle.lineType,
                "onUpdate:modelValue": e[10] || (e[10] = (o) => unref(r).display.targetLineStyle.lineType = o)
              }, {
                default: withCtx(() => [
                  createVNode(unref(w), {
                    label: "流动虚线",
                    value: "flowDash"
                  }),
                  createVNode(unref(w), {
                    label: "静态虚线",
                    value: "dash"
                  }),
                  createVNode(unref(w), {
                    label: "实线",
                    value: "solid"
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            createBaseVNode("div", yo, [
              e[87] || (e[87] = createBaseVNode("span", null, "蓝方航向", -1)),
              createVNode(unref(ye), {
                modelValue: unref(r).display.headingVisible.blue,
                "onUpdate:modelValue": e[11] || (e[11] = (o) => unref(r).display.headingVisible.blue = o)
              }, null, 8, ["modelValue"])
            ]),
            createBaseVNode("div", go, [
              e[88] || (e[88] = createBaseVNode("span", null, "Trail Limit", -1)),
              createVNode(unref(R), {
                modelValue: unref(r).playback.maxTrailPoints,
                "onUpdate:modelValue": e[12] || (e[12] = (o) => unref(r).playback.maxTrailPoints = o),
                min: 100,
                max: 2e4,
                step: 100,
                "controls-position": "right"
              }, null, 8, ["modelValue"])
            ])
          ]),
          createVNode(unref(Wt), {
            modelValue: it.value,
            "onUpdate:modelValue": e[53] || (e[53] = (o) => it.value = o),
            class: "editor-tabs"
          }, {
            default: withCtx(() => [
              createVNode(unref(Je), {
                label: "模型",
                name: "models"
              }, {
                default: withCtx(() => [
                  createBaseVNode("section", vo, [
                    e[118] || (e[118] = createBaseVNode("div", { class: "block-title" }, "态势测试", -1)),
                    createBaseVNode("div", bo, [
                      createVNode(unref(u), {
                        type: "primary",
                        onClick: e[13] || (e[13] = (o) => we("radar"))
                      }, {
                        default: withCtx(() => [...e[90] || (e[90] = [
                          createTextVNode("部署雷达效果", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "warning",
                        onClick: e[14] || (e[14] = (o) => we("jammer"))
                      }, {
                        default: withCtx(() => [...e[91] || (e[91] = [
                          createTextVNode("部署干扰效果", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "success",
                        onClick: e[15] || (e[15] = (o) => we("warning"))
                      }, {
                        default: withCtx(() => [...e[92] || (e[92] = [
                          createTextVNode("部署预警范围", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "info",
                        onClick: e[16] || (e[16] = (o) => we("detect"))
                      }, {
                        default: withCtx(() => [...e[93] || (e[93] = [
                          createTextVNode("部署探测范围", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "danger",
                        plain: "",
                        onClick: e[17] || (e[17] = (o) => we("weapon"))
                      }, {
                        default: withCtx(() => [...e[94] || (e[94] = [
                          createTextVNode("部署射程范围", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        onClick: e[18] || (e[18] = (o) => Qe("attack"))
                      }, {
                        default: withCtx(() => [...e[95] || (e[95] = [
                          createTextVNode("攻击关系线", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        onClick: e[19] || (e[19] = (o) => Qe("detect"))
                      }, {
                        default: withCtx(() => [...e[96] || (e[96] = [
                          createTextVNode("探测关系线", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        onClick: e[20] || (e[20] = (o) => Qe("communication"))
                      }, {
                        default: withCtx(() => [...e[97] || (e[97] = [
                          createTextVNode("通信链路", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "danger",
                        onClick: ul
                      }, {
                        default: withCtx(() => [...e[98] || (e[98] = [
                          createTextVNode("告警闪烁", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "danger",
                        plain: "",
                        onClick: ml
                      }, {
                        default: withCtx(() => [...e[99] || (e[99] = [
                          createTextVNode("命中爆炸", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "danger",
                        onClick: sl
                      }, {
                        default: withCtx(() => [...e[100] || (e[100] = [
                          createTextVNode("目标锁定", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "success",
                        onClick: e[21] || (e[21] = (o) => We("good"))
                      }, {
                        default: withCtx(() => [...e[101] || (e[101] = [
                          createTextVNode("通信正常", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "warning",
                        onClick: e[22] || (e[22] = (o) => We("weak"))
                      }, {
                        default: withCtx(() => [...e[102] || (e[102] = [
                          createTextVNode("通信受限", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "danger",
                        plain: "",
                        onClick: e[23] || (e[23] = (o) => We("broken"))
                      }, {
                        default: withCtx(() => [...e[103] || (e[103] = [
                          createTextVNode("通信中断", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "warning",
                        plain: "",
                        onClick: il
                      }, {
                        default: withCtx(() => [...e[104] || (e[104] = [
                          createTextVNode("导弹飞行动画", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "danger",
                        onClick: e[24] || (e[24] = (o) => Te("damaged"))
                      }, {
                        default: withCtx(() => [...e[105] || (e[105] = [
                          createTextVNode("毁伤状态", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        onClick: e[25] || (e[25] = (o) => Te("lost"))
                      }, {
                        default: withCtx(() => [...e[106] || (e[106] = [
                          createTextVNode("失联状态", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "success",
                        plain: "",
                        onClick: e[26] || (e[26] = (o) => Te("discovered"))
                      }, {
                        default: withCtx(() => [...e[107] || (e[107] = [
                          createTextVNode("目标发现", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "success",
                        onClick: e[27] || (e[27] = (o) => Te("tracking"))
                      }, {
                        default: withCtx(() => [...e[108] || (e[108] = [
                          createTextVNode("目标跟踪", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "primary",
                        plain: "",
                        onClick: e[28] || (e[28] = (o) => qe("sensorSearch"))
                      }, {
                        default: withCtx(() => [...e[109] || (e[109] = [
                          createTextVNode("传感器搜索", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        onClick: e[29] || (e[29] = (o) => qe("sensorOff"))
                      }, {
                        default: withCtx(() => [...e[110] || (e[110] = [
                          createTextVNode("传感器关机", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "warning",
                        onClick: e[30] || (e[30] = (o) => qe("sensorSuppressed"))
                      }, {
                        default: withCtx(() => [...e[111] || (e[111] = [
                          createTextVNode("传感器压制", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "danger",
                        onClick: e[31] || (e[31] = (o) => Ge("launch"))
                      }, {
                        default: withCtx(() => [...e[112] || (e[112] = [
                          createTextVNode("发射链路", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "success",
                        onClick: e[32] || (e[32] = (o) => Ge("intercept"))
                      }, {
                        default: withCtx(() => [...e[113] || (e[113] = [
                          createTextVNode("拦截效果", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        onClick: e[33] || (e[33] = (o) => Ge("miss"))
                      }, {
                        default: withCtx(() => [...e[114] || (e[114] = [
                          createTextVNode("脱靶效果", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "warning",
                        onClick: dl
                      }, {
                        default: withCtx(() => [...e[115] || (e[115] = [
                          createTextVNode("覆盖重叠", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "primary",
                        plain: "",
                        onClick: rl
                      }, {
                        default: withCtx(() => [...e[116] || (e[116] = [
                          createTextVNode("启用右键菜单测试", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), { onClick: cl }, {
                        default: withCtx(() => [...e[117] || (e[117] = [
                          createTextVNode("清除态势特效", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    createBaseVNode("div", ko, " 当前：" + toDisplayString(unref(r).mode === "edit" ? "编辑模式，可拖拽和编辑模型" : "态势显示模式，只显示模型和范围效果"), 1)
                  ]),
                  createBaseVNode("section", wo, [
                    e[120] || (e[120] = createBaseVNode("div", { class: "block-title" }, "Template Library", -1)),
                    createBaseVNode("div", Mo, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref($), (o) => (openBlock(), createElementBlock("div", {
                        key: o.NodeType,
                        class: "template-card",
                        draggable: "true",
                        onDragstart: (c) => Z(c, o)
                      }, [
                        pt(o) ? (openBlock(), createElementBlock("img", {
                          key: 0,
                          class: "template-icon",
                          draggable: "false",
                          src: pt(o)
                        }, null, 8, Uo)) : createCommentVNode("", true),
                        createBaseVNode("div", Do, toDisplayString(o.name), 1),
                        createBaseVNode("div", Io, toDisplayString(o.description), 1),
                        createVNode(unref(u), {
                          text: "",
                          type: "primary",
                          onClick: (c) => ll(o)
                        }, {
                          default: withCtx(() => [...e[119] || (e[119] = [
                            createTextVNode("Quick Deploy", -1)
                          ])]),
                          _: 1
                        }, 8, ["onClick"])
                      ], 40, Co))), 128))
                    ])
                  ]),
                  createBaseVNode("section", So, [
                    createBaseVNode("div", Vo, [
                      e[124] || (e[124] = createBaseVNode("div", { class: "block-title" }, "模型列表", -1)),
                      createBaseVNode("div", No, [
                        createVNode(unref(u), {
                          text: "",
                          onClick: e[34] || (e[34] = (o) => Ut("red"))
                        }, {
                          default: withCtx(() => [...e[121] || (e[121] = [
                            createTextVNode("Select Red", -1)
                          ])]),
                          _: 1
                        }),
                        createVNode(unref(u), {
                          text: "",
                          onClick: e[35] || (e[35] = (o) => Ut("blue"))
                        }, {
                          default: withCtx(() => [...e[122] || (e[122] = [
                            createTextVNode("Select Blue", -1)
                          ])]),
                          _: 1
                        }),
                        createVNode(unref(u), {
                          text: "",
                          type: "danger",
                          onClick: Sl
                        }, {
                          default: withCtx(() => [...e[123] || (e[123] = [
                            createTextVNode("批量删除", -1)
                          ])]),
                          _: 1
                        })
                      ])
                    ]),
                    e[127] || (e[127] = createBaseVNode("div", { class: "group-title red" }, "红方", -1)),
                    Ke.value.length ? (openBlock(), createElementBlock("div", $o, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(Ke.value, (o) => (openBlock(), createElementBlock("div", {
                        key: o.UID,
                        class: normalizeClass(["model-row", { active: o.UID === unref(r).selectionModelUID }])
                      }, [
                        createVNode(unref(dt), {
                          modelValue: H[o.UID],
                          "onUpdate:modelValue": (c) => H[o.UID] = c
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createBaseVNode("div", {
                          class: "row-main",
                          onClick: (c) => Xe(o)
                        }, [
                          createBaseVNode("div", Eo, [
                            createBaseVNode("span", null, toDisplayString(o.showName), 1),
                            createVNode(unref(Ne), {
                              size: "small",
                              effect: "plain"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(o.status), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createBaseVNode("div", Lo, toDisplayString(o.NodeType) + " · " + toDisplayString(ft(o.lon, o.lat)), 1)
                        ], 8, To),
                        createVNode(unref(u), {
                          text: "",
                          onClick: withModifiers((c) => Mt(o.UID), ["stop"])
                        }, {
                          default: withCtx(() => [...e[125] || (e[125] = [
                            createTextVNode("定位", -1)
                          ])]),
                          _: 1
                        }, 8, ["onClick"])
                      ], 2))), 128))
                    ])) : (openBlock(), createBlock(unref(ne), {
                      key: 1,
                      description: "暂无红方模型",
                      "image-size": 48
                    })),
                    e[128] || (e[128] = createBaseVNode("div", { class: "group-title blue" }, "蓝方", -1)),
                    Ae.value.length ? (openBlock(), createElementBlock("div", ho, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(Ae.value, (o) => (openBlock(), createElementBlock("div", {
                        key: o.UID,
                        class: normalizeClass(["model-row", { active: o.UID === unref(r).selectionModelUID }])
                      }, [
                        createVNode(unref(dt), {
                          modelValue: H[o.UID],
                          "onUpdate:modelValue": (c) => H[o.UID] = c
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createBaseVNode("div", {
                          class: "row-main",
                          onClick: (c) => Xe(o)
                        }, [
                          createBaseVNode("div", Fo, [
                            createBaseVNode("span", null, toDisplayString(o.showName), 1),
                            createVNode(unref(Ne), {
                              size: "small",
                              effect: "plain"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(o.status), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createBaseVNode("div", Ro, toDisplayString(o.NodeType) + " · " + toDisplayString(ft(o.lon, o.lat)), 1)
                        ], 8, xo),
                        createVNode(unref(u), {
                          text: "",
                          onClick: withModifiers((c) => Mt(o.UID), ["stop"])
                        }, {
                          default: withCtx(() => [...e[126] || (e[126] = [
                            createTextVNode("定位", -1)
                          ])]),
                          _: 1
                        }, 8, ["onClick"])
                      ], 2))), 128))
                    ])) : (openBlock(), createBlock(unref(ne), {
                      key: 3,
                      description: "暂无蓝方模型",
                      "image-size": 48
                    }))
                  ]),
                  createBaseVNode("section", Bo, [
                    createBaseVNode("div", Po, [
                      e[130] || (e[130] = createBaseVNode("div", { class: "block-title" }, "批量编组", -1)),
                      createBaseVNode("div", Oo, [
                        createVNode(unref(Ne), {
                          size: "small",
                          effect: "plain"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(h.value.length) + " selected", 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(u), {
                          text: "",
                          onClick: tl
                        }, {
                          default: withCtx(() => [...e[129] || (e[129] = [
                            createTextVNode("清空", -1)
                          ])]),
                          _: 1
                        })
                      ])
                    ]),
                    createBaseVNode("div", Ho, [
                      createVNode(unref(u), {
                        type: ge.value ? "danger" : "primary",
                        onClick: kl
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(ge.value ? "退出框选" : "框选模型"), 1)
                        ]),
                        _: 1
                      }, 8, ["type"]),
                      createVNode(unref(u), { onClick: bl }, {
                        default: withCtx(() => [...e[131] || (e[131] = [
                          createTextVNode("同步高亮", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    createBaseVNode("div", jo, [
                      createVNode(unref(E), { label: "整体平移经度" }, {
                        default: withCtx(() => [
                          createVNode(unref(R), {
                            modelValue: V.moveLon,
                            "onUpdate:modelValue": e[36] || (e[36] = (o) => V.moveLon = o),
                            step: 0.01,
                            precision: 5,
                            "controls-position": "right"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(E), { label: "整体平移纬度" }, {
                        default: withCtx(() => [
                          createVNode(unref(R), {
                            modelValue: V.moveLat,
                            "onUpdate:modelValue": e[37] || (e[37] = (o) => V.moveLat = o),
                            step: 0.01,
                            precision: 5,
                            "controls-position": "right"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    createBaseVNode("div", Jo, [
                      createVNode(unref(u), {
                        onClick: Cl,
                        disabled: !h.value.length
                      }, {
                        default: withCtx(() => [...e[132] || (e[132] = [
                          createTextVNode("批量移动", -1)
                        ])]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode(unref(u), {
                        type: X.value ? "danger" : "primary",
                        disabled: !h.value.length,
                        onClick: wl
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(X.value ? "退出鼠标移动" : "鼠标拖拽移动"), 1)
                        ]),
                        _: 1
                      }, 8, ["type", "disabled"])
                    ]),
                    createBaseVNode("div", zo, [
                      createVNode(unref(E), { label: "统一航向" }, {
                        default: withCtx(() => [
                          createVNode(unref(R), {
                            modelValue: V.heading,
                            "onUpdate:modelValue": e[38] || (e[38] = (o) => V.heading = o),
                            step: 5,
                            "controls-position": "right"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(E), { label: "布局间隔" }, {
                        default: withCtx(() => [
                          createVNode(unref(R), {
                            modelValue: V.spacing,
                            "onUpdate:modelValue": e[39] || (e[39] = (o) => V.spacing = o),
                            min: 0.01,
                            step: 0.01,
                            precision: 3,
                            "controls-position": "right"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    createBaseVNode("div", _o, [
                      createVNode(unref(u), {
                        onClick: Ul,
                        disabled: !h.value.length
                      }, {
                        default: withCtx(() => [...e[133] || (e[133] = [
                          createTextVNode("设置航向", -1)
                        ])]),
                        _: 1
                      }, 8, ["disabled"])
                    ]),
                    createBaseVNode("div", Ko, [
                      createVNode(unref(E), { label: "阵形类型" }, {
                        default: withCtx(() => [
                          createVNode(unref(ae), {
                            modelValue: V.formation,
                            "onUpdate:modelValue": e[40] || (e[40] = (o) => V.formation = o)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(w), {
                                label: "横队",
                                value: "row"
                              }),
                              createVNode(unref(w), {
                                label: "纵队",
                                value: "column"
                              }),
                              createVNode(unref(w), {
                                label: "网格",
                                value: "grid"
                              }),
                              createVNode(unref(w), {
                                label: "环形",
                                value: "circle"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(E), { label: "网格列数" }, {
                        default: withCtx(() => [
                          createVNode(unref(R), {
                            modelValue: V.columns,
                            "onUpdate:modelValue": e[41] || (e[41] = (o) => V.columns = o),
                            min: 2,
                            max: 12,
                            "controls-position": "right"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    createBaseVNode("div", Ao, [
                      createVNode(unref(u), {
                        onClick: Dl,
                        disabled: !h.value.length
                      }, {
                        default: withCtx(() => [...e[134] || (e[134] = [
                          createTextVNode("应用阵形", -1)
                        ])]),
                        _: 1
                      }, 8, ["disabled"])
                    ]),
                    createBaseVNode("div", Zo, [
                      createVNode(unref(E), { label: "旋转角度" }, {
                        default: withCtx(() => [
                          createVNode(unref(R), {
                            modelValue: V.rotateAngle,
                            "onUpdate:modelValue": e[42] || (e[42] = (o) => V.rotateAngle = o),
                            step: 5,
                            "controls-position": "right"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    createBaseVNode("div", Qo, [
                      createVNode(unref(u), {
                        onClick: Il,
                        disabled: !h.value.length
                      }, {
                        default: withCtx(() => [...e[135] || (e[135] = [
                          createTextVNode("围绕中心旋转", -1)
                        ])]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode(unref(u), {
                        type: Y.value ? "danger" : "primary",
                        disabled: !h.value.length,
                        onClick: Ml
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(Y.value ? "退出鼠标旋转" : "鼠标旋转"), 1)
                        ]),
                        _: 1
                      }, 8, ["type", "disabled"])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(Je), {
                label: "标绘",
                name: "plots"
              }, {
                default: withCtx(() => [
                  createBaseVNode("section", Wo, [
                    e[142] || (e[142] = createBaseVNode("div", { class: "block-title" }, "基础标绘", -1)),
                    createBaseVNode("div", qo, [
                      createVNode(unref(u), {
                        onClick: e[43] || (e[43] = (o) => re("point", "Point"))
                      }, {
                        default: withCtx(() => [...e[136] || (e[136] = [
                          createTextVNode("Point", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        onClick: e[44] || (e[44] = (o) => re("line", "Line"))
                      }, {
                        default: withCtx(() => [...e[137] || (e[137] = [
                          createTextVNode("Line", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        onClick: e[45] || (e[45] = (o) => re("polygon", "Polygon"))
                      }, {
                        default: withCtx(() => [...e[138] || (e[138] = [
                          createTextVNode("Polygon", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        onClick: e[46] || (e[46] = (o) => re("circle", "Circle", "basic", "circle"))
                      }, {
                        default: withCtx(() => [...e[139] || (e[139] = [
                          createTextVNode("Circle", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), { onClick: Vl }, {
                        default: withCtx(() => [...e[140] || (e[140] = [
                          createTextVNode("箭头", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), { onClick: Nl }, {
                        default: withCtx(() => [...e[141] || (e[141] = [
                          createTextVNode("文本", -1)
                        ])]),
                        _: 1
                      })
                    ])
                  ]),
                  createBaseVNode("section", Go, [
                    createBaseVNode("div", Xo, [
                      e[143] || (e[143] = createBaseVNode("div", { class: "block-title" }, "军事标绘", -1)),
                      createVNode(unref(ut), {
                        modelValue: _e.value,
                        "onUpdate:modelValue": e[47] || (e[47] = (o) => _e.value = o),
                        options: Gt
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", Yo, [
                      createVNode(unref(u), {
                        type: "warning",
                        onClick: e[48] || (e[48] = (o) => Ye("noFlyZone", "No-Fly Zone", "noFlyZone"))
                      }, {
                        default: withCtx(() => [...e[144] || (e[144] = [
                          createTextVNode("No-Fly Zone", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "danger",
                        onClick: e[49] || (e[49] = (o) => Ye("attackRoute", "攻击路线", "military"))
                      }, {
                        default: withCtx(() => [...e[145] || (e[145] = [
                          createTextVNode("攻击路线", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        type: "success",
                        onClick: e[50] || (e[50] = (o) => Ye("polygon", "作战区域", "military"))
                      }, {
                        default: withCtx(() => [...e[146] || (e[146] = [
                          createTextVNode("作战区域", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), { onClick: $l }, {
                        default: withCtx(() => [...e[147] || (e[147] = [
                          createTextVNode("取消工具", -1)
                        ])]),
                        _: 1
                      })
                    ])
                  ]),
                  createBaseVNode("section", en, [
                    e[151] || (e[151] = createBaseVNode("div", { class: "block-title" }, "测量工具", -1)),
                    createBaseVNode("div", tn, [
                      createVNode(unref(u), {
                        onClick: e[51] || (e[51] = (o) => Dt("distance"))
                      }, {
                        default: withCtx(() => [...e[148] || (e[148] = [
                          createTextVNode("距离测量", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), {
                        onClick: e[52] || (e[52] = (o) => Dt("area"))
                      }, {
                        default: withCtx(() => [...e[149] || (e[149] = [
                          createTextVNode("面积测量", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(unref(u), { onClick: Tl }, {
                        default: withCtx(() => [...e[150] || (e[150] = [
                          createTextVNode("结束测量", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    createBaseVNode("div", ln, toDisplayString(ze.value), 1)
                  ]),
                  createBaseVNode("section", on, [
                    e[153] || (e[153] = createBaseVNode("div", { class: "block-title" }, "标绘清单", -1)),
                    unref(r).annotations.length ? (openBlock(), createElementBlock("div", nn, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(r).annotations, (o) => (openBlock(), createElementBlock("div", {
                        key: o.id,
                        class: "annotation-row"
                      }, [
                        createBaseVNode("div", null, [
                          createBaseVNode("div", an, toDisplayString(o.name), 1),
                          createBaseVNode("div", sn, toDisplayString(el(o)), 1)
                        ]),
                        createVNode(unref(u), {
                          text: "",
                          type: "danger",
                          onClick: (c) => El(o.id)
                        }, {
                          default: withCtx(() => [...e[152] || (e[152] = [
                            createTextVNode("删除", -1)
                          ])]),
                          _: 1
                        }, 8, ["onClick"])
                      ]))), 128))
                    ])) : (openBlock(), createBlock(unref(ne), {
                      key: 1,
                      description: "暂无标绘",
                      "image-size": 48
                    }))
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(Je), {
                label: "校验",
                name: "validation"
              }, {
                default: withCtx(() => [
                  createBaseVNode("section", dn, [
                    createBaseVNode("div", rn, [
                      e[155] || (e[155] = createBaseVNode("div", { class: "block-title" }, "校验结果", -1)),
                      createVNode(unref(u), {
                        text: "",
                        onClick: Ll
                      }, {
                        default: withCtx(() => [...e[154] || (e[154] = [
                          createTextVNode("重新校验", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    unref(r).validation.length ? (openBlock(), createElementBlock("div", un, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(r).validation, (o, c) => (openBlock(), createElementBlock("div", {
                        key: c,
                        class: normalizeClass(["issue-item", o.level])
                      }, [
                        createBaseVNode("strong", null, toDisplayString(o.level), 1),
                        createBaseVNode("span", null, toDisplayString(o.message), 1)
                      ], 2))), 128))
                    ])) : (openBlock(), createBlock(unref(ne), {
                      key: 1,
                      description: "当前没有发现问题",
                      "image-size": 56
                    }))
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("aside", mn, [
          createBaseVNode("section", cn, [
            createBaseVNode("div", pn, [
              e[158] || (e[158] = createBaseVNode("div", { class: "block-title" }, "Model Details", -1)),
              createBaseVNode("div", fn, [
                createVNode(unref(u), {
                  text: "",
                  onClick: pl,
                  disabled: !unref(M)
                }, {
                  default: withCtx(() => [...e[156] || (e[156] = [
                    createTextVNode("定位", -1)
                  ])]),
                  _: 1
                }, 8, ["disabled"]),
                createVNode(unref(u), {
                  text: "",
                  onClick: yl,
                  disabled: !unref(M)
                }, {
                  default: withCtx(() => [...e[157] || (e[157] = [
                    createTextVNode("编辑航路", -1)
                  ])]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ]),
            unref(M) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createBaseVNode("div", yn, [
                createVNode(unref(E), { label: "显示名称" }, {
                  default: withCtx(() => [
                    createVNode(unref(Ve), {
                      modelValue: b.showName,
                      "onUpdate:modelValue": e[54] || (e[54] = (o) => b.showName = o)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(unref(E), { label: "模型类型" }, {
                  default: withCtx(() => [
                    createVNode(unref(ae), {
                      modelValue: b.NodeType,
                      "onUpdate:modelValue": e[55] || (e[55] = (o) => b.NodeType = o)
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(w), {
                          label: "车辆",
                          value: "car"
                        }),
                        createVNode(unref(w), {
                          label: "舰船",
                          value: "ship"
                        }),
                        createVNode(unref(w), {
                          label: "Aircraft",
                          value: "b2"
                        }),
                        createVNode(unref(w), {
                          label: "导弹",
                          value: "missile"
                        }),
                        createVNode(unref(w), {
                          label: "Jammer",
                          value: "jammer"
                        }),
                        createVNode(unref(w), {
                          label: "Radar",
                          value: "radar"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(unref(E), { label: "阵营" }, {
                  default: withCtx(() => [
                    createVNode(unref(ae), {
                      modelValue: b.nation,
                      "onUpdate:modelValue": e[56] || (e[56] = (o) => b.nation = o)
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(w), {
                          label: "红方",
                          value: "red"
                        }),
                        createVNode(unref(w), {
                          label: "蓝方",
                          value: "blue"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(unref(E), { label: "Status" }, {
                  default: withCtx(() => [
                    createVNode(unref(ae), {
                      modelValue: b.status,
                      "onUpdate:modelValue": e[57] || (e[57] = (o) => b.status = o)
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(w), {
                          label: "正常",
                          value: "normal"
                        }),
                        createVNode(unref(w), {
                          label: "隐藏",
                          value: "hidden"
                        }),
                        createVNode(unref(w), {
                          label: "损毁",
                          value: "destroyed"
                        }),
                        createVNode(unref(w), {
                          label: "失联",
                          value: "lost"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(unref(E), { label: "经度" }, {
                  default: withCtx(() => [
                    createVNode(unref(R), {
                      modelValue: b.lon,
                      "onUpdate:modelValue": e[58] || (e[58] = (o) => b.lon = o),
                      step: 0.01,
                      precision: 5,
                      "controls-position": "right"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(unref(E), { label: "纬度" }, {
                  default: withCtx(() => [
                    createVNode(unref(R), {
                      modelValue: b.lat,
                      "onUpdate:modelValue": e[59] || (e[59] = (o) => b.lat = o),
                      step: 0.01,
                      precision: 5,
                      "controls-position": "right"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(unref(E), { label: "高度(m)" }, {
                  default: withCtx(() => [
                    createVNode(unref(R), {
                      modelValue: b.height,
                      "onUpdate:modelValue": e[60] || (e[60] = (o) => b.height = o),
                      step: 100,
                      "controls-position": "right"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(unref(E), { label: "速度" }, {
                  default: withCtx(() => [
                    createVNode(unref(R), {
                      modelValue: b.speed,
                      "onUpdate:modelValue": e[61] || (e[61] = (o) => b.speed = o),
                      step: 10,
                      "controls-position": "right"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(unref(E), { label: "航向" }, {
                  default: withCtx(() => [
                    createVNode(unref(R), {
                      modelValue: b.heading,
                      "onUpdate:modelValue": e[62] || (e[62] = (o) => b.heading = o),
                      step: 5,
                      "controls-position": "right"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(unref(E), { label: "目标" }, {
                  default: withCtx(() => [
                    createVNode(unref(ae), {
                      modelValue: b.targetUID,
                      "onUpdate:modelValue": e[63] || (e[63] = (o) => b.targetUID = o),
                      clearable: "",
                      filterable: "",
                      placeholder: "选择目标模型"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(Yt.value, (o) => (openBlock(), createBlock(unref(w), {
                          key: o.UID,
                          label: `${o.showName} (${o.nation === "blue" ? "蓝方" : "红方"})`,
                          value: o.UID
                        }, null, 8, ["label", "value"]))), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              createBaseVNode("div", gn, [
                e[163] || (e[163] = createBaseVNode("div", { class: "block-title small" }, "航路参数", -1)),
                createBaseVNode("div", vn, [
                  createVNode(unref(E), { label: "航路名称" }, {
                    default: withCtx(() => [
                      createVNode(unref(Ve), {
                        modelValue: b.routeMeta.name,
                        "onUpdate:modelValue": e[64] || (e[64] = (o) => b.routeMeta.name = o)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(E), { label: "速度" }, {
                    default: withCtx(() => [
                      createVNode(unref(R), {
                        modelValue: b.routeMeta.speed,
                        "onUpdate:modelValue": e[65] || (e[65] = (o) => b.routeMeta.speed = o),
                        step: 10,
                        "controls-position": "right"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(E), { label: "高度" }, {
                    default: withCtx(() => [
                      createVNode(unref(R), {
                        modelValue: b.routeMeta.altitude,
                        "onUpdate:modelValue": e[66] || (e[66] = (o) => b.routeMeta.altitude = o),
                        step: 100,
                        "controls-position": "right"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                createBaseVNode("div", bn, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(M).line, (o, c) => (openBlock(), createElementBlock("div", {
                    class: "waypoint-row",
                    key: c
                  }, [
                    createBaseVNode("div", kn, [
                      createBaseVNode("span", null, "航点 " + toDisplayString(c + 1), 1),
                      createBaseVNode("span", null, toDisplayString(Number(o.lon).toFixed(3)) + ", " + toDisplayString(Number(o.lat).toFixed(3)), 1)
                    ]),
                    createBaseVNode("div", wn, [
                      c === 0 ? (openBlock(), createBlock(unref(Ne), {
                        key: 0,
                        size: "small",
                        effect: "plain"
                      }, {
                        default: withCtx(() => [...e[159] || (e[159] = [
                          createTextVNode("起点", -1)
                        ])]),
                        _: 1
                      })) : (openBlock(), createBlock(unref(u), {
                        key: 1,
                        text: "",
                        type: "danger",
                        onClick: (C) => gl(c)
                      }, {
                        default: withCtx(() => [...e[160] || (e[160] = [
                          createTextVNode(" 删除 ", -1)
                        ])]),
                        _: 1
                      }, 8, ["onClick"]))
                    ])
                  ]))), 128)),
                  (i = unref(M).line) != null && i.length ? createCommentVNode("", true) : (openBlock(), createBlock(unref(ne), {
                    key: 0,
                    description: "暂无航路节点",
                    "image-size": 40
                  }))
                ]),
                createBaseVNode("div", Mn, [
                  e[162] || (e[162] = createBaseVNode("div", { class: "block-title small" }, "Mounted", -1)),
                  createBaseVNode("div", Cn, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(M).mounts || [], (o) => (openBlock(), createElementBlock("div", {
                      class: "waypoint-row",
                      key: o.UID
                    }, [
                      createBaseVNode("div", Un, [
                        createBaseVNode("span", null, toDisplayString(o.showName), 1),
                        createBaseVNode("span", null, toDisplayString(o.modelType), 1)
                      ]),
                      createBaseVNode("div", Dn, [
                        createVNode(unref(u), {
                          text: "",
                          type: "danger",
                          onClick: (c) => vl(o.UID)
                        }, {
                          default: withCtx(() => [...e[161] || (e[161] = [
                            createTextVNode(" Remove ", -1)
                          ])]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ]))), 128)),
                    (unref(M).mounts || []).length ? createCommentVNode("", true) : (openBlock(), createBlock(unref(ne), {
                      key: 0,
                      description: "No Mounts",
                      "image-size": 40
                    }))
                  ])
                ])
              ]),
              createBaseVNode("div", In, [
                createVNode(unref(u), {
                  type: "primary",
                  onClick: fl
                }, {
                  default: withCtx(() => [...e[164] || (e[164] = [
                    createTextVNode("保存修改", -1)
                  ])]),
                  _: 1
                }),
                createVNode(unref(u), { onClick: ke }, {
                  default: withCtx(() => [...e[165] || (e[165] = [
                    createTextVNode("重置表单", -1)
                  ])]),
                  _: 1
                }),
                createVNode(unref(u), {
                  type: "danger",
                  plain: "",
                  onClick: Ct
                }, {
                  default: withCtx(() => [...e[166] || (e[166] = [
                    createTextVNode("删除模型", -1)
                  ])]),
                  _: 1
                })
              ])
            ], 64)) : (openBlock(), createBlock(unref(ne), {
              key: 1,
              description: "Select a model to inspect",
              "image-size": 72
            }))
          ])
        ]),
        createBaseVNode("footer", Sn, [
          createBaseVNode("div", Vn, [
            e[167] || (e[167] = createBaseVNode("span", { class: "eyebrow" }, "Playback", -1)),
            createBaseVNode("strong", null, toDisplayString(unref(r).playback.currentTimeLabel), 1)
          ]),
          createBaseVNode("div", Nn, [
            createVNode(unref(u), { onClick: at }, {
              default: withCtx(() => [...e[168] || (e[168] = [
                createTextVNode("播放", -1)
              ])]),
              _: 1
            }),
            createVNode(unref(u), { onClick: ot }, {
              default: withCtx(() => [...e[169] || (e[169] = [
                createTextVNode("暂停", -1)
              ])]),
              _: 1
            }),
            createVNode(unref(u), { onClick: Kt }, {
              default: withCtx(() => [...e[170] || (e[170] = [
                createTextVNode("停止", -1)
              ])]),
              _: 1
            }),
            createVNode(unref(ae), {
              modelValue: unref(r).playback.speed,
              "onUpdate:modelValue": e[67] || (e[67] = (o) => unref(r).playback.speed = o),
              class: "speed-select"
            }, {
              default: withCtx(() => [
                createVNode(unref(w), {
                  label: "0.5x",
                  value: 0.5
                }),
                createVNode(unref(w), {
                  label: "1x",
                  value: 1
                }),
                createVNode(unref(w), {
                  label: "2x",
                  value: 2
                }),
                createVNode(unref(w), {
                  label: "4x",
                  value: 4
                }),
                createVNode(unref(w), {
                  label: "16x",
                  value: 16
                }),
                createVNode(unref(w), {
                  label: "32x",
                  value: 32
                }),
                createVNode(unref(w), {
                  label: "64x",
                  value: 64
                }),
                createVNode(unref(w), {
                  label: "100x",
                  value: 100
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          createBaseVNode("div", $n, [
            createVNode(unref(Qt), {
              "model-value": unref(r).playback.progress,
              min: 0,
              max: 1,
              step: 0.01,
              onInput: Ot
            }, null, 8, ["model-value"])
          ])
        ]),
        createVNode(Ql)
      ]);
    };
  }
};
var En = DS(Tn, [["__scopeId", "data-v-da0565d6"]]);
var Ln = {
  VEHICLE: ["JAMMER", "RADAR"],
  SHIP: ["JAMMER", "RADAR"],
  AIRCRAFT: ["MISSILE", "JAMMER", "RADAR"]
};
var hn = [
  {
    NodeType: "car",
    name: "car",
    description: "Ground platform for road deployment and patrol.",
    num: 1,
    height: 0,
    speed: 40,
    time: 0,
    nation: "red",
    isControl: 1,
    isLive: 1,
    heading: 0,
    modelType: "CAR",
    templateCategory: "platform"
  },
  {
    NodeType: "ship",
    name: "Ship",
    description: "Sea platform that can patrol along a route.",
    num: 1,
    height: 0,
    speed: 25,
    time: 0,
    nation: "blue",
    isControl: 1,
    isLive: 1,
    heading: 0,
    modelType: "SHIP",
    templateCategory: "platform"
  },
  {
    NodeType: "b2",
    name: "B2",
    description: "High speed air platform for long-range strike and rehearsal.",
    num: 1,
    height: 9e3,
    speed: 500,
    time: 0,
    nation: "red",
    isControl: 1,
    isLive: 1,
    heading: 270,
    modelType: "B2",
    templateCategory: "platform"
  },
  {
    NodeType: "missile",
    name: "Missile",
    description: "Can be deployed independently or mounted on an aircraft.",
    num: 1,
    height: 3e3,
    speed: 700,
    time: 0,
    nation: "blue",
    isControl: 1,
    isLive: 1,
    heading: 90,
    modelType: "MISSILE",
    templateCategory: "payload",
    mountable: true
  },
  {
    NodeType: "jammer",
    iconKey: "default",
    templateIcon: "bomber",
    name: "Jammer",
    description: "Can be deployed independently or mounted on a ship.",
    num: 1,
    height: 0,
    speed: 0,
    time: 0,
    nation: "blue",
    isControl: 1,
    isLive: 1,
    heading: 0,
    modelType: "JAMMER",
    templateCategory: "payload",
    mountable: true
  },
  {
    NodeType: "radar",
    iconKey: "default",
    templateIcon: "car",
    name: "Radar",
    description: "Can be deployed independently or mounted on a platform.",
    num: 1,
    height: 0,
    speed: 0,
    time: 0,
    nation: "blue",
    isControl: 1,
    isLive: 1,
    heading: 0,
    modelType: "RADAR",
    templateCategory: "payload",
    mountable: true
  }
];
var xn = {
  radar: {
    type: "radar",
    geometry: { shape: "sector", radius: 12e4, angle: 100 },
    style: { animation: "scan" },
    label: "锟阶达拷扫锟斤拷"
  },
  jammer: {
    type: "jammer",
    geometry: { shape: "circle", radius: 8e4 },
    style: { animation: "pulse" },
    label: "锟斤拷锟脚凤拷围"
  },
  detect: {
    type: "detect",
    geometry: { shape: "circle", radius: 1e5 },
    style: { animation: "pulse" },
    label: "探锟解范围"
  },
  warning: {
    type: "warning",
    geometry: { shape: "circle", radius: 9e4 },
    style: { animation: "pulse" },
    label: "预锟斤拷锟斤拷围"
  },
  weapon: {
    type: "weapon",
    geometry: { shape: "circle", radius: 7e4 },
    style: { animation: "none" },
    label: "weapon range"
  }
};
var Fn = {
  attack: {
    redColor: "#ff5252",
    blueColor: "#4aa3ff",
    width: 3,
    lineType: "flowDash"
  },
  detect: {
    redColor: "#ff8f40",
    blueColor: "#40d8ff",
    width: 2,
    lineType: "dash"
  },
  communication: {
    redColor: "#ffd166",
    blueColor: "#66e0ff",
    width: 2,
    lineType: "dash"
  }
};
var Rn = () => (x) => {
  const m = [], p = x.annotations.filter(
    (I) => {
      var L;
      return I.category === "noFlyZone" && ((L = I.geometry) == null ? void 0 : L.type) === "polygon";
    }
  ), se = (I, L) => {
    if (!Array.isArray(L) || L.length < 3)
      return false;
    let B = false;
    for (let K = 0, P = L.length - 1; K < L.length; P = K++) {
      const O = L[K][0], $ = L[K][1], me = L[P][0], F = L[P][1];
      $ > I[1] != F > I[1] && I[0] < (me - O) * (I[1] - $) / (F - $ || Number.EPSILON) + O && (B = !B);
    }
    return B;
  };
  return x.models.forEach((I) => {
    !Array.isArray(I.line) || I.line.length <= 1 || p.forEach((L) => {
      I.line.some(
        (K) => se([Number(K.lon), Number(K.lat)], L.geometry.coordinates)
      ) && m.push({
        level: "warning",
        code: "ROUTE_CONFLICT",
        message: `${I.showName} route enters no-fly zone ${L.name || L.id}`
      });
    });
  }), m;
};
var Bn = (x) => {
  const m = (x == null ? void 0 : x.configureSceneRuntime) || Vh, p = (x == null ? void 0 : x.setSceneValidators) || Bh;
  m({
    templates: hn,
    mountCompatibility: Ln,
    defaultEffectPresets: xn
  }), p([Rn()]);
};
var jn = {
  __name: "DemoWorkbench",
  setup(x) {
    const m = xE();
    return onMounted(async () => {
      await m.ready(), Bn(m), await m.setDisplayConfig({ relationLineStyles: Fn });
    }), (p, se) => (openBlock(), createBlock(En));
  }
};
export {
  jn as default
};
//# sourceMappingURL=DemoWorkbench-6a8e00ef-JISI7ZE2.js.map

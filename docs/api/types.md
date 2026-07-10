# API 类型定义

本页提供常用 TypeScript 类型草案，方便宿主项目建立类型约束。当前 npm 包未必直接发布完整 `.d.ts`，可以先在业务项目中按需声明。

## Editor

```ts
export interface ScenarioEditorController {
  init(options: MapInitOptions): Promise<unknown>;
  ready(): Promise<unknown>;
  destroy(): void;
  sync(): Promise<SceneState>;
  getContext(): unknown;
  getEngine(): unknown;
  getMapApp(): unknown;

  getSceneState(): SceneState;
  getSceneSnapshot(): SceneState;
  resetScene(): Promise<SceneState>;
  loadScene(snapshot: Partial<SceneState>, options?: SyncOptions): Promise<SceneState>;
  setMetadata(patch: Partial<SceneMetadata>): Promise<SceneMetadata>;
  getTemplates(): ScenarioTemplate[];
  setTemplates(templates: ScenarioTemplate[]): ScenarioTemplate[];
  configureSceneRuntime(config: SceneRuntimeConfig): unknown;
  setMountCompatibility(compatibility: MountCompatibility): MountCompatibility;
  setMountValidator(validator: MountValidator | null): MountValidator | null;
  setSceneValidators(validators: SceneValidator[]): SceneValidator[];
  setDefaultEffectPresets(presets: Record<string, Partial<SituationEffect>>): Record<string, Partial<SituationEffect>>;
  getHistoryState(): HistoryState;
  getStatistics(): SceneStatistics;
  getModelsBySide(side: string): ScenarioModel[];
  validateScene(): ValidationIssue[];
  undo(): Promise<boolean>;
  redo(): Promise<boolean>;

  getResourceOptions(): ResourceOptions;
  setResourceOptions(options: ResourceOptions): Promise<ResourceOptions>;
  setLocalTileRegions(regions: LocalTileRegion[]): LocalTileRegion[];
  addLocalTileRegion(region: LocalTileRegion): LocalTileRegion[];
  removeLocalTileRegion(id: string): boolean;
  clearLocalTileRegions(): LocalTileRegion[];
  getLocalTileRegions(): LocalTileRegion[];

  createModelFromTemplate(templateOrKey: string | ScenarioTemplate, overrides?: Partial<ScenarioModel>): ScenarioModel | null;
  canMountTemplateOnModel(templateOrKey: string | ScenarioTemplate, uidOrModel: string | ScenarioModel): boolean;
  setTemplateDragData(event: DragEvent, templateOrKey: string | ScenarioTemplate, extra?: Record<string, unknown>): void;
  deployModel(templateOrKey: string | ScenarioTemplate, overrides?: Partial<ScenarioModel>, options?: SyncOptions): Promise<ScenarioModel>;
  addModel(model: ScenarioModel, options?: SyncOptions): Promise<ScenarioModel>;
  updateModel(uid: string, patch: Partial<ScenarioModel>, options?: SyncOptions): Promise<ScenarioModel | null>;
  batchUpdateModels(updates: ModelUpdate[], options?: SyncOptions): Promise<ScenarioModel[]>;
  upsertModels(models: ScenarioModel | ScenarioModel[], options?: SituationFrameOptions): Promise<ScenarioModel[]>;
  updateModelPosition(uid: string, position: ModelPositionPatch, options?: SyncOptions): Promise<ScenarioModel | null>;
  removeModel(uid: string, options?: SyncOptions): Promise<ScenarioModel | null>;
  removeModels(uids: string[], options?: SyncOptions): Promise<ScenarioModel[]>;

  upsertRelations(relations: ScenarioRelation | ScenarioRelation[], options?: SyncOptions): Promise<ScenarioRelation[]>;
  removeRelations(ids: string | string[], options?: SyncOptions): Promise<string[]>;
  upsertEffects(effects: SituationEffect | SituationEffect[], options?: SyncOptions): Promise<SituationEffect[]>;
  removeEffects(ids: string | string[], options?: SyncOptions): Promise<string[]>;
  playEventEffect(target: string | EventEffectTarget, options?: EventEffectOptions): Promise<boolean>;
  applySituationFrame(frame: SituationFrame, options?: SituationFrameOptions): Promise<unknown>;
  setFrameMergerConfig(config: Partial<FrameMergerConfig>): FrameMergerConfig;
  getFrameMergerConfig(): FrameMergerConfig;
  flushFrameMerger(): Promise<unknown>;

  setDisplayConfig(patch: Partial<DisplayConfig>): Promise<DisplayConfig>;
  setPerformanceConfig(config: Partial<PerformanceConfig>): Promise<PerformanceConfig>;
  getPerformanceConfig(): PerformanceConfig;
  setMode(mode: SceneMode): Promise<SceneMode>;
  setContextMenuItems(items: ContextMenuItem[], options?: Record<string, unknown>): ContextMenuItem[];
  setContextMenuHandler(handler: ContextMenuHandler | null): ContextMenuHandler | null;

  selectModel(uid: string | null): string | null;
  setSelectedAnnotation(id: string | null): string | null;
  focusModel(uid: string): void;
  setBatchSelection(uids: string[]): string[];
  clearBatchSelection(): string[];
  getBatchSelection(): string[];
  isBatchTransformActive(): boolean;
  batchMoveModels(uids: string[], delta: BatchMoveDelta, options?: SyncOptions): Promise<ScenarioModel[]>;
  batchSetModelHeading(uids: string[], heading: number, options?: SyncOptions): Promise<ScenarioModel[]>;
  batchLayoutModels(uids: string[], layout: BatchLayoutOptions, options?: SyncOptions): Promise<ScenarioModel[]>;
  batchRotateModels(uids: string[], angleDegrees: number, options?: BatchRotateOptions): Promise<ScenarioModel[]>;
  startBoxSelectionMode(handler?: BoxSelectionHandler): unknown;
  stopBoxSelectionMode(): void;
  startBatchMoveMode(uids: string[], callbacks?: BatchTransformCallbacks): unknown;
  startBatchRotateMode(uids: string[], callbacks?: BatchTransformCallbacks): unknown;
  stopBatchTransformMode(): void;

  startRouteEdit(uid: string): Promise<boolean>;
  setModelRoute(uid: string, points: RoutePoint[], routeMeta?: Record<string, unknown>, options?: SyncOptions): Promise<ScenarioModel | null>;
  addMount(uid: string, mount: ScenarioMount, options?: MountOptions): Promise<MountResult | null>;
  removeMount(uid: string, mountUID: string, options?: SyncOptions): Promise<MountResult | null>;

  addAnnotation(annotation: ScenarioAnnotation, options?: SyncOptions): Promise<ScenarioAnnotation>;
  updateAnnotation(id: string, patch: Partial<ScenarioAnnotation>, options?: SyncOptions): Promise<ScenarioAnnotation | null>;
  removeAnnotation(id: string, options?: SyncOptions): Promise<ScenarioAnnotation | null>;
  startAnnotationMode(mode: AnnotationMode, options?: Record<string, unknown>, handler?: AnnotationCreatedHandler | null): unknown;
  startMeasureMode(mode: MeasureMode, handler?: MeasureHandler | null): unknown;
  endMeasure(): void;
  cancelTool(): void;

  setPlaybackConfig(patch: Partial<PlaybackConfig>): PlaybackConfig;
  startPlayback(): void;
  pausePlayback(): void;
  stopPlayback(): void;
  seekPlayback(progress: number): void;
  exportSceneJson(space?: number): string;
  downloadSceneJson(filename?: string): void;
  downloadReport(filename?: string): void;
  exportMapScreenshot(filename?: string): void;

  onReady(handler: EventHandler): Unsubscribe;
  onSelectionChange(handler: EventHandler): Unsubscribe;
  onRouteSaved(handler: EventHandler): Unsubscribe;
  onMeasure(handler: MeasureHandler): Unsubscribe;
  onAnnotationCreated(handler: AnnotationCreatedHandler): Unsubscribe;
  onTemplateDrop(handler: EventHandler): Unsubscribe;
}
```

## Scene

```ts
export type SceneMode = "edit" | "view" | "playback";
export type Nation = "red" | "blue" | "white" | string;
export type Unsubscribe = () => void;
export type EventHandler<T = unknown> = (payload: T) => void;
export type AnnotationMode = "point" | "line" | "polygon" | "text" | "arrow" | string;
export type MeasureMode = "distance" | "area" | string;

export interface SceneState {
  mode: SceneMode;
  metadata: SceneMetadata;
  models: ScenarioModel[];
  relations: ScenarioRelation[];
  effects: SituationEffect[];
  annotations: ScenarioAnnotation[];
  display: DisplayConfig;
  playback: PlaybackConfig;
  validation: ValidationIssue[];
}

export interface SceneMetadata {
  name: string;
  description?: string;
  author?: string;
  updatedAt?: string;
  [key: string]: unknown;
}
```

## Model

```ts
export interface ScenarioModel {
  id?: string | number;
  UID: string;
  name?: string;
  showName?: string;
  nation: Nation;
  NodeType: string;
  iconKey?: string;
  modelType?: string;
  templateCategory?: string;
  lon: number;
  lat: number;
  height?: number;
  speed?: number;
  heading?: number;
  targetUID?: string | null;
  status?: "normal" | "hidden" | "destroyed" | "lost" | string;
  line?: RoutePoint[];
  routeMeta?: Record<string, unknown>;
  mounts?: ScenarioMount[];
  meta?: Record<string, unknown>;
}

export interface RoutePoint {
  lon: number;
  lat: number;
  height?: number;
  speed?: number;
}

export interface ScenarioMount {
  UID: string;
  showName?: string;
  NodeType: string;
  modelType?: string;
  status?: string;
  mountable?: boolean;
  meta?: Record<string, unknown>;
}

export interface ScenarioTemplate {
  NodeType: string;
  name?: string;
  showName?: string;
  modelType?: string;
  templateCategory?: "platform" | "payload" | string;
  iconKey?: string;
  templateIcon?: string;
  mountable?: boolean;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
}
```

## Relation / Effect / Annotation

```ts
export interface ScenarioRelation {
  id: string;
  type: "target" | "attack" | "detect" | "communication" | string;
  sourceUID: string;
  targetUID: string;
  visible?: boolean;
  label?: string;
  style?: RelationLineStyle;
}

export interface RelationLineStyle {
  color?: string;
  redColor?: string;
  blueColor?: string;
  sideColors?: Record<string, string>;
  nationColors?: Record<string, string>;
  width?: number;
  lineType?: "solid" | "dash" | "flowDash" | string;
  lineDash?: "none" | "dash" | "dot" | "dashDot" | number[] | false;
}

export interface SituationEffect {
  id: string;
  type: string;
  sourceUID?: string;
  targetUID?: string;
  visible?: boolean;
  geometry?: Record<string, unknown>;
  style?: EffectStyle;
  label?: string;
  meta?: Record<string, unknown>;
}

export interface EffectStyle {
  color?: string;
  fillColor?: string;
  strokeColor?: string;
  width?: number;
  lineDash?: number[];
  animation?: "scan" | "pulse" | "flow" | "none" | string;
  labelColor?: string;
  labelStrokeColor?: string;
  labelStrokeWidth?: number;
  headColor?: string;
  headStrokeColor?: string;
  headStrokeWidth?: number;
  headRadius?: number;
  missileHeadColor?: string;
  interceptHeadColor?: string;
  missileColor?: string;
  interceptColor?: string;
  missColor?: string;
  quality?: "good" | "weak" | "broken" | string;
  qualityColors?: Record<string, string>;
  [key: string]: unknown;
}

export interface AnnotationStyle {
  strokeColor?: string;
  color?: string;
  fillColor?: string;
  strokeWidth?: number;
  width?: number;
  lineDash?: "none" | "dash" | "dot" | "dashDot" | number[] | false;
  pointRadius?: number;
  radius?: number;
  pointFillColor?: string;
  markerColor?: string;
  pointStrokeColor?: string;
  pointStrokeWidth?: number;
  iconScale?: number;
  iconOpacity?: number;
  labelColor?: string;
  labelBackgroundColor?: string;
  labelStrokeColor?: string;
  labelStrokeWidth?: number;
  labelOffsetY?: number;
}

export interface ScenarioAnnotation {
  id: string;
  name?: string;
  type: "point" | "line" | "polygon" | "circle" | "text" | "arrow" | string;
  shape?: "custom" | "circle" | "rectangle" | string;
  category?: "basic" | "military" | "noFlyZone" | string;
  text?: string;
  geometry: {
    type: "point" | "line" | "polygon";
    coordinates: number[] | number[][];
  };
  style?: AnnotationStyle;
}
```

## Config

```ts
export interface DisplayConfig {
  showPopup?: boolean;
  showModelName?: boolean;
  showTargetLine?: boolean;
  targetLineStyle?: {
    redColor?: string;
    blueColor?: string;
    width?: number;
    lineType?: "flowDash" | "dash" | "solid";
  };
  headingVisible?: Record<string, boolean>;
  relationLineStyles?: Record<string, RelationLineStyle>;
  effectVisible?: Record<string, boolean>;
  effectStyles?: Record<string, EffectStyle>;
  performance?: PerformanceConfig;
}

export interface PerformanceConfig {
  level?: "quality" | "balanced" | "performance";
  effectAnimationInterval?: number;
  relationAnimationInterval?: number;
  animationStep?: number;
  maxTrailPoints?: number;
  [key: string]: unknown;
}

export interface SituationFrame {
  models?: ScenarioModel[];
  updates?: ModelUpdate[];
  removals?: string[];
  relations?: ScenarioRelation[];
  removedRelations?: string[];
  effects?: SituationEffect[];
  removedEffects?: string[];
  display?: Partial<DisplayConfig>;
  mode?: SceneMode;
}

export interface ModelUpdate {
  uid: string;
  patch: Partial<ScenarioModel>;
}

export interface ModelPositionPatch {
  lon?: number;
  lat?: number;
  height?: number;
  heading?: number;
  speed?: number;
}

export interface ValidationIssue {
  level: "error" | "warning" | "info" | string;
  code?: string;
  message: string;
}

export interface SyncOptions {
  sync?: boolean;
  recordHistory?: boolean;
  label?: string;
}

export interface SituationFrameOptions extends SyncOptions {
  merge?: boolean;
  fullSync?: boolean;
  bypassFrameMerger?: boolean;
}

export interface MapInitOptions {
  target: HTMLElement;
  tileUrlTemplate?: string;
  projection?: string;
  center?: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  extent?: [number, number, number, number];
  multiWorld?: boolean;
  smoothExtentConstraint?: boolean;
  localTileRegions?: LocalTileRegion[];
}

export interface LocalTileRegion {
  id: string;
  urlTemplate: string;
  extent: [number, number, number, number];
  minZoom?: number;
  maxZoom?: number;
}

export interface ResourceOptions {
  tileUrlTemplate?: string;
  assetBaseUrl?: string;
  modelIconResolver?: (model: ScenarioModel) => string | null | undefined;
  templateIconResolver?: (template: ScenarioTemplate) => string | null | undefined;
  annotationPointIconUrl?: string;
}

export interface PlaybackConfig {
  playing?: boolean;
  speed?: number;
  progress?: number;
  duration?: number;
  elapsed?: number;
  maxTrailPoints?: number;
}

export interface FrameMergerConfig {
  enabled: boolean;
  interval: number;
  maxDelay: number;
}

export interface HistoryState {
  canUndo?: boolean;
  canRedo?: boolean;
  undoCount?: number;
  redoCount?: number;
  [key: string]: unknown;
}

export interface SceneStatistics {
  modelCount?: number;
  annotationCount?: number;
  issueCount?: number;
  [key: string]: unknown;
}

export type MountCompatibility = Record<string, string[]>;
export type MountValidator = (template: ScenarioTemplate, host: ScenarioModel, sceneState: SceneState) => boolean;
export type SceneValidator = (sceneState: SceneState) => ValidationIssue | ValidationIssue[] | null | undefined;

export interface SceneRuntimeConfig {
  templates?: ScenarioTemplate[];
  mountCompatibility?: MountCompatibility;
  mountValidator?: MountValidator | null;
  validators?: SceneValidator[];
  defaultEffectPresets?: Record<string, Partial<SituationEffect>>;
}

export interface MountOptions extends SyncOptions {
  force?: boolean;
}

export interface MountResult {
  host: ScenarioModel;
  mount: ScenarioMount;
}

export interface BatchMoveDelta {
  deltaLon?: number;
  deltaLat?: number;
  lon?: number;
  lat?: number;
}

export interface BatchLayoutOptions {
  formation?: "row" | "column" | "grid" | "circle" | string;
  spacing?: number;
  columns?: number;
  center?: { lon: number; lat: number };
}

export interface BatchRotateOptions extends SyncOptions {
  center?: { lon: number; lat: number };
}

export interface BatchTransformCallbacks extends SyncOptions {
  onCommit?: (updated: ScenarioModel[], meta?: unknown) => void | Promise<void>;
  onCancel?: () => void;
}

export type BoxSelectionHandler = (uids: string[], payload?: unknown) => void;
export type AnnotationCreatedHandler = (annotation: ScenarioAnnotation) => void;
export type MeasureHandler = (result: MeasureResult) => void;

export interface MeasureResult {
  type: MeasureMode;
  value: number;
  unit?: string;
  coordinates?: number[] | number[][];
}

export interface ContextMenuItem {
  id: string;
  label: string;
  visible?: (payload: ContextMenuPayload) => boolean;
  disabled?: (payload: ContextMenuPayload) => boolean;
  action?: (payload: ContextMenuPayload) => void | Promise<void>;
}

export interface ContextMenuPayload {
  coordinate?: [number, number];
  model?: ScenarioModel;
  annotation?: ScenarioAnnotation;
  [key: string]: unknown;
}

export type ContextMenuHandler = (payload: ContextMenuPayload) => void;

export interface EventEffectTarget {
  uid?: string;
  lon?: number;
  lat?: number;
  coordinate?: [number, number];
}

export interface EventEffectOptions {
  type?: string;
  duration?: number;
  [key: string]: unknown;
}
```

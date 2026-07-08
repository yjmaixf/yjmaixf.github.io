# API 类型定义

本页提供常用 TypeScript 类型草案，方便宿主项目建立类型约束。当前 npm 包未必直接发布完整 `.d.ts`，可以先在业务项目中按需声明。

## Editor

```ts
export interface ScenarioEditorController {
  init(options: MapInitOptions): Promise<unknown>;
  ready(): Promise<unknown>;
  destroy(): void;
  sync(): Promise<SceneState>;

  getSceneState(): SceneState;
  getSceneSnapshot(): SceneState;
  loadScene(snapshot: Partial<SceneState>, options?: SyncOptions): Promise<SceneState>;

  addModel(model: ScenarioModel, options?: SyncOptions): Promise<ScenarioModel>;
  updateModel(uid: string, patch: Partial<ScenarioModel>, options?: SyncOptions): Promise<ScenarioModel | null>;
  batchUpdateModels(updates: ModelUpdate[], options?: SyncOptions): Promise<ScenarioModel[]>;
  removeModel(uid: string, options?: SyncOptions): Promise<ScenarioModel | null>;

  upsertRelations(relations: ScenarioRelation | ScenarioRelation[], options?: SyncOptions): Promise<ScenarioRelation[]>;
  upsertEffects(effects: SituationEffect | SituationEffect[], options?: SyncOptions): Promise<SituationEffect[]>;
  applySituationFrame(frame: SituationFrame, options?: SituationFrameOptions): Promise<unknown>;

  setDisplayConfig(patch: Partial<DisplayConfig>): Promise<DisplayConfig>;
  setMode(mode: SceneMode): Promise<SceneMode>;
  validateScene(): ValidationIssue[];
  undo(): Promise<boolean>;
  redo(): Promise<boolean>;
}
```

## Scene

```ts
export type SceneMode = "edit" | "view" | "playback";
export type Nation = "red" | "blue" | "white" | string;

export interface SceneState {
  mode: SceneMode;
  metadata: {
    name: string;
    description?: string;
    author?: string;
    updatedAt?: string;
  };
  models: ScenarioModel[];
  relations: ScenarioRelation[];
  effects: SituationEffect[];
  annotations: ScenarioAnnotation[];
  display: DisplayConfig;
  playback: PlaybackConfig;
  validation: ValidationIssue[];
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
  meta?: Record<string, unknown>;
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
  style?: Record<string, unknown>;
}

export interface SituationEffect {
  id: string;
  type: string;
  sourceUID?: string;
  targetUID?: string;
  visible?: boolean;
  geometry?: Record<string, unknown>;
  style?: Record<string, unknown>;
  label?: string;
  meta?: Record<string, unknown>;
}

export interface ScenarioAnnotation {
  id: string;
  name?: string;
  type: "point" | "line" | "polygon" | "text" | "arrow" | string;
  category?: "basic" | "military" | "noFlyZone" | string;
  text?: string;
  geometry: {
    type: "point" | "line" | "polygon";
    coordinates: number[] | number[][];
  };
  style?: Record<string, unknown>;
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
  relationLineStyles?: Record<string, Record<string, unknown>>;
  effectStyles?: Record<string, Record<string, unknown>>;
  performance?: {
    level?: "quality" | "balanced" | "performance";
    effectAnimationInterval?: number;
    relationAnimationInterval?: number;
  };
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

export interface ValidationIssue {
  level: "error" | "warning" | "info" | string;
  code?: string;
  message: string;
}

export interface SyncOptions {
  sync?: boolean;
  recordHistory?: boolean;
}

export interface SituationFrameOptions extends SyncOptions {
  merge?: boolean;
  fullSync?: boolean;
}

export interface MapInitOptions {
  target: HTMLElement;
  tileUrlTemplate?: string;
  projection?: string;
  center?: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
}

export interface PlaybackConfig {
  playing?: boolean;
  speed?: number;
  progress?: number;
  duration?: number;
  elapsed?: number;
  maxTrailPoints?: number;
}
```

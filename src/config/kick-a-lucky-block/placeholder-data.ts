/**
 * Kick a Lucky Block — 占位数据说明（请用真实游戏内数值整体替换本文件）
 *
 * 需要你在游戏里核对或导出的数据：
 * 1. 各区域传送门 / 空气墙显示的「力量」或「腿属性」门槛 → 替换 `KALB_ZONE_ROWS` 的 `requiredPower` 与 `name`。
 * 2. 商店里各哑铃 / 训练器的标价与「+力量」→ 替换 `KALB_WEIGHT_ROWS` 的 `cost`、`powerGain`；若有多货币请扩展字段。
 * 3. 踢击距离与力量的真实公式（是否线性、是否有上限、是否受 buff 影响）→ 替换 `KickALuckyBlockCalculator` 中的估算逻辑与 `DEFAULT_KICK_DISTANCE_PER_POWER`。
 * 4. 若「力量」在游戏里不叫 power 或单位不同，请同步改 UI 文案与列名（messages 与各组件）。
 *
 * 下列数字仅为可运行的示例，不保证与 No More Flops 线上版本一致。
 */

export type KalbZoneRow = {
  id: string;
  name: string;
  /** 占位：区域解锁所需力量；请以游戏内门槛为准。 */
  requiredPower: number;
  /** 占位备注，可写真实区域掉落 / 机制摘要。 */
  note?: string;
};

export type KalbWeightRow = {
  id: string;
  name: string;
  /** 占位：游戏内货币价格。 */
  cost: number;
  /** 占位：购买后增加的力量（或等效训练进度）。 */
  powerGain: number;
};

/** 占位：每 1 点「力量」对应多少「距离单位」（虚构线性模型，待换成真实公式）。 */
export const DEFAULT_KICK_DISTANCE_PER_POWER = 0.014;

export const KALB_ZONE_ROWS: KalbZoneRow[] = [
  { id: 'spawn', name: 'Starter Pier', requiredPower: 0, note: 'Placeholder spawn / tutorial ring' },
  { id: 'beach', name: 'Sandy Lots', requiredPower: 120, note: 'Fictional first gate' },
  { id: 'hills', name: 'Hill Trail', requiredPower: 450, note: 'Placeholder mid-game zone' },
  { id: 'city', name: 'Neon Strip', requiredPower: 1200, note: 'Fictional high gate' },
  { id: 'volcano', name: 'Ash Rim', requiredPower: 3200, note: 'Placeholder endgame-style gate' },
];

export const KALB_WEIGHT_ROWS: KalbWeightRow[] = [
  { id: 'w1', name: 'Foam Ankle (demo)', cost: 250, powerGain: 8 },
  { id: 'w2', name: 'Rubber Plate (demo)', cost: 900, powerGain: 22 },
  { id: 'w3', name: 'Iron Boot (demo)', cost: 3200, powerGain: 55 },
  { id: 'w4', name: 'Tungsten Stack (demo)', cost: 12000, powerGain: 140 },
];

import type { Genre, Operator } from '../types/scenario';

export interface KpiCandidate {
  label: string;
  category: string;
  defaultOperator: Operator;
}

const EC: KpiCandidate[] = [
  // 流入
  { label: '訪問者数', category: '流入', defaultOperator: '×' },
  { label: '新規訪問者数', category: '流入', defaultOperator: '+' },
  { label: 'リピート訪問者数', category: '流入', defaultOperator: '+' },
  { label: '広告流入数', category: '流入', defaultOperator: '+' },
  { label: 'オーガニック流入数', category: '流入', defaultOperator: '+' },
  { label: 'SNS流入数', category: '流入', defaultOperator: '+' },
  // 転換
  { label: 'CVR', category: '転換', defaultOperator: '×' },
  { label: '流入CVR', category: '転換', defaultOperator: '×' },
  { label: '購入CVR', category: '転換', defaultOperator: '×' },
  { label: 'カート追加率', category: '転換', defaultOperator: '×' },
  { label: '決済完了率', category: '転換', defaultOperator: '×' },
  { label: 'カート離脱率', category: '転換', defaultOperator: '×' },
  // 収益
  { label: '客単価', category: '収益', defaultOperator: '×' },
  { label: '購入点数', category: '収益', defaultOperator: '×' },
  { label: '商品単価', category: '収益', defaultOperator: '×' },
  { label: 'LTV', category: '収益', defaultOperator: '×' },
  { label: 'リピート率', category: '収益', defaultOperator: '×' },
  { label: '月次売上', category: '収益', defaultOperator: '×' },
  // 広告
  { label: 'インプレッション数', category: '広告', defaultOperator: '×' },
  { label: 'CTR', category: '広告', defaultOperator: '×' },
  { label: 'CPC', category: '広告', defaultOperator: '×' },
  { label: '広告CVR', category: '広告', defaultOperator: '×' },
  { label: 'ROAS', category: '広告', defaultOperator: '÷' },
];

const SaaS: KpiCandidate[] = [
  // MRR
  { label: '新規MRR', category: 'MRR', defaultOperator: '+' },
  { label: '拡張MRR', category: 'MRR', defaultOperator: '+' },
  { label: 'チャーンMRR', category: 'MRR', defaultOperator: '-' },
  { label: '新規顧客数', category: 'MRR', defaultOperator: '×' },
  { label: '平均契約単価', category: 'MRR', defaultOperator: '×' },
  // チャーン
  { label: 'チャーンレート', category: 'チャーン', defaultOperator: '+' },
  { label: 'プロダクト起因チャーン', category: 'チャーン', defaultOperator: '+' },
  { label: 'ビジネス起因チャーン', category: 'チャーン', defaultOperator: '+' },
  { label: 'オンボーディング失敗率', category: 'チャーン', defaultOperator: '+' },
  { label: '機能不満足率', category: 'チャーン', defaultOperator: '+' },
  { label: 'バグ・障害遭遇率', category: 'チャーン', defaultOperator: '+' },
  { label: '競合乗り換え率', category: 'チャーン', defaultOperator: '+' },
  // エンゲージメント
  { label: 'DAU', category: 'エンゲージメント', defaultOperator: '×' },
  { label: 'MAU', category: 'エンゲージメント', defaultOperator: '×' },
  { label: 'NPS', category: 'エンゲージメント', defaultOperator: '+' },
  { label: 'アクティブ率', category: 'エンゲージメント', defaultOperator: '×' },
  { label: '継続率', category: 'エンゲージメント', defaultOperator: '×' },
];

const Marketing: KpiCandidate[] = [
  // 獲得
  { label: '広告費', category: '獲得コスト', defaultOperator: '÷' },
  { label: '獲得顧客数', category: '獲得コスト', defaultOperator: '÷' },
  { label: 'CAC', category: '獲得コスト', defaultOperator: '÷' },
  { label: 'CPM', category: '獲得コスト', defaultOperator: '÷' },
  // 広告効果
  { label: 'インプレッション数', category: '広告効果', defaultOperator: '×' },
  { label: 'CTR', category: '広告効果', defaultOperator: '×' },
  { label: 'CPC', category: '広告効果', defaultOperator: '×' },
  { label: 'クリック数', category: '広告効果', defaultOperator: '×' },
  { label: '広告CVR', category: '広告効果', defaultOperator: '×' },
  { label: 'ROAS', category: '広告効果', defaultOperator: '÷' },
  // 収益
  { label: '売上', category: '収益', defaultOperator: '÷' },
  { label: '客単価', category: '収益', defaultOperator: '×' },
  { label: 'LTV', category: '収益', defaultOperator: '×' },
];

const company: KpiCandidate[] = [
  // メルカリ
  { label: 'GMV', category: 'メルカリ', defaultOperator: '×' },
  { label: '月間取引数', category: 'メルカリ', defaultOperator: '×' },
  { label: '平均取引単価', category: 'メルカリ', defaultOperator: '×' },
  { label: 'MAU', category: 'メルカリ', defaultOperator: '×' },
  { label: '出品率', category: 'メルカリ', defaultOperator: '×' },
  { label: '成約率', category: 'メルカリ', defaultOperator: '×' },
  { label: '新規ユーザー数', category: 'メルカリ', defaultOperator: '+' },
  { label: '既存ユーザー継続数', category: 'メルカリ', defaultOperator: '+' },
  { label: '流入数', category: 'メルカリ', defaultOperator: '×' },
  { label: '登録CVR', category: 'メルカリ', defaultOperator: '×' },
  { label: '前月MAU', category: 'メルカリ', defaultOperator: '×' },
  { label: '継続率', category: 'メルカリ', defaultOperator: '×' },
  { label: 'Take Rate', category: 'メルカリ', defaultOperator: '×' },
  { label: '販売手数料率', category: 'メルカリ', defaultOperator: '+' },
  { label: '基本手数料率', category: 'メルカリ', defaultOperator: '×' },
  { label: '付加サービス収益率', category: 'メルカリ', defaultOperator: '+' },
  { label: '有料オプション利用率', category: 'メルカリ', defaultOperator: '×' },
  { label: '広告収益 / GMV', category: 'メルカリ', defaultOperator: '+' },
];

export const kpiCandidates: Record<Genre, KpiCandidate[]> = {
  EC,
  SaaS,
  Marketing,
  company,
};

export const getCandidates = (genre: Genre): KpiCandidate[] => {
  return kpiCandidates[genre] ?? EC;
};

import type { Scenario } from '../types/scenario';

export const scenarios: Scenario[] = [
  // EC - Easy
  {
    id: 'ec-001',
    genre: 'EC',
    difficulty: 'easy',
    title: '売上急落の原因を探れ',
    description: 'ECサイトの先月比売上が15%下落した。経営陣への報告に向けてKPIを分解し、原因仮説を構造化せよ。',
    rootKpi: '月次売上',
    timeLimit: 180,
    answerTree: {
      id: 'root',
      label: '月次売上',
      children: [
        {
          id: 'n1',
          label: '訪問者数',
          operator: '×',
        },
        {
          id: 'n2',
          label: 'CVR',
          operator: '×',
        },
        {
          id: 'n3',
          label: '客単価',
          operator: '×',
        },
      ],
    },
    feedback: {
      n1: '訪問者数はSEO流入・広告流入・直接流入などチャネル別に分解するとより原因特定が容易です',
      n2: 'CVRはカート追加率×購入完了率に分解でき、どのステップで離脱しているかを特定できます',
      n3: '客単価は購入点数×商品単価に分解でき、セール施策の影響を測定できます',
    },
  },
  // EC - Normal
  {
    id: 'ec-002',
    genre: 'EC',
    difficulty: 'normal',
    title: 'CVR急落の原因を探れ',
    description: 'ECサイトの先月比CVRが20%下落した。モバイルユーザーが増加傾向にある中での急落。原因を特定するためKPIを分解せよ。',
    rootKpi: 'CVR',
    timeLimit: 300,
    answerTree: {
      id: 'root',
      label: 'CVR',
      children: [
        {
          id: 'n1',
          label: '流入CVR',
          operator: '×',
          children: [
            { id: 'n1-1', label: '広告流入CVR', operator: '×' },
            { id: 'n1-2', label: 'オーガニック流入CVR', operator: '+' },
          ],
        },
        {
          id: 'n2',
          label: '購入CVR',
          operator: '×',
          children: [
            { id: 'n2-1', label: 'カート追加率', operator: '×' },
            { id: 'n2-2', label: '決済完了率', operator: '×' },
          ],
        },
      ],
    },
    feedback: {
      n1: '広告流入とオーガニック流入を分けて考えると原因特定しやすいです',
      n2: 'カート離脱率・決済エラー率も観点として有効です',
      'n1-1': '広告流入CVRは広告クリエイティブの品質やランディングページの整合性が影響します',
      'n1-2': 'SEO流入CVRはキーワードと商品の関連性が重要です',
      'n2-1': 'カート追加率を高めるには商品ページの改善（画像・説明・レビュー）が有効です',
      'n2-2': '決済完了率の低下は決済フローのUX問題やエラーが疑われます',
    },
  },
  // SaaS - Easy
  {
    id: 'saas-001',
    genre: 'SaaS',
    difficulty: 'easy',
    title: 'MRRを分解せよ',
    description: 'SaaSプロダクトのMRRが伸び悩んでいる。新規獲得は堅調だが、全体の成長が鈍化している原因を探るためKPIを分解せよ。',
    rootKpi: 'MRR',
    timeLimit: 180,
    answerTree: {
      id: 'root',
      label: 'MRR',
      children: [
        { id: 'n1', label: '新規MRR', operator: '+' },
        { id: 'n2', label: '拡張MRR', operator: '+' },
        { id: 'n3', label: 'チャーンMRR', operator: '-' },
      ],
    },
    feedback: {
      n1: '新規MRRは新規顧客数×平均契約単価で分解できます',
      n2: '拡張MRRはアップセル・クロスセルによる既存顧客からの追加収益です',
      n3: 'チャーンMRRが大きい場合は解約率（チャーンレート）の改善が優先課題です',
    },
  },
  // SaaS - Normal
  {
    id: 'saas-002',
    genre: 'SaaS',
    difficulty: 'normal',
    title: 'チャーン急増の原因を探れ',
    description: 'SaaSプロダクトの月間チャーンレートが先月の2%から4%に急増した。顧客サポートへの問い合わせも増加傾向にある。原因仮説を構造化せよ。',
    rootKpi: 'チャーンレート',
    timeLimit: 300,
    answerTree: {
      id: 'root',
      label: 'チャーンレート',
      children: [
        {
          id: 'n1',
          label: 'プロダクト起因チャーン',
          operator: '+',
          children: [
            { id: 'n1-1', label: '機能不満足率', operator: '+' },
            { id: 'n1-2', label: 'バグ・障害遭遇率', operator: '+' },
          ],
        },
        {
          id: 'n2',
          label: 'ビジネス起因チャーン',
          operator: '+',
          children: [
            { id: 'n2-1', label: '予算削減率', operator: '+' },
            { id: 'n2-2', label: '競合乗り換え率', operator: '+' },
          ],
        },
        {
          id: 'n3',
          label: 'オンボーディング失敗率',
          operator: '+',
        },
      ],
    },
    feedback: {
      n1: 'プロダクト起因のチャーンはNPSサーベイやカスタマーサクセスとの会話で把握できます',
      n2: '外部要因（予算・競合）のチャーンは解約時アンケートで分類が可能です',
      n3: 'オンボーディング失敗は早期チャーン（3ヶ月以内）に多く見られます。初期活性化率を確認しましょう',
      'n1-1': '機能不満足はroadmapとのギャップ分析が有効です',
      'n1-2': '障害起因チャーンはインシデント発生後30日以内の解約データで検出できます',
      'n2-1': '予算削減チャーンは経済環境の悪化時に増加する傾向があります',
      'n2-2': '競合への乗り換えは機能比較や価格競争力の見直しが必要です',
    },
  },
  // Marketing - Easy
  {
    id: 'mkt-001',
    genre: 'Marketing',
    difficulty: 'easy',
    title: 'CACを分解せよ',
    description: '広告経由の顧客獲得コスト（CAC）が先月比30%増加した。マーケティング予算の見直しに向けてKPIを分解せよ。',
    rootKpi: 'CAC',
    timeLimit: 180,
    answerTree: {
      id: 'root',
      label: 'CAC',
      children: [
        { id: 'n1', label: '広告費', operator: '÷' },
        { id: 'n2', label: '獲得顧客数', operator: '÷' },
      ],
    },
    feedback: {
      n1: '広告費はチャネル別（検索・SNS・ディスプレイ）に分解すると費用対効果を比較できます',
      n2: '獲得顧客数はインプレッション×CTR×CVRで分解でき、どのステップがボトルネックかを特定できます',
    },
  },
  // Marketing - Normal
  {
    id: 'mkt-002',
    genre: 'Marketing',
    difficulty: 'normal',
    title: 'ROAS低下の原因を探れ',
    description: '検索広告のROASが先月の400%から250%に低下した。広告費は同水準を維持しているが売上への貢献が減少している。',
    rootKpi: 'ROAS',
    timeLimit: 300,
    answerTree: {
      id: 'root',
      label: 'ROAS',
      children: [
        {
          id: 'n1',
          label: '売上',
          operator: '÷',
          children: [
            { id: 'n1-1', label: 'クリック数', operator: '×' },
            { id: 'n1-2', label: '広告CVR', operator: '×' },
            { id: 'n1-3', label: '客単価', operator: '×' },
          ],
        },
        {
          id: 'n2',
          label: '広告費',
          operator: '÷',
          children: [
            { id: 'n2-1', label: 'インプレッション数', operator: '×' },
            { id: 'n2-2', label: 'CPC', operator: '×' },
          ],
        },
      ],
    },
    feedback: {
      n1: '売上はクリック数×CVR×客単価に分解でき、どの要素が変化したかを特定できます',
      n2: '広告費の増加要因としてCPCの上昇（入札競争激化）が多いです',
      'n1-1': 'クリック数の減少はCTR低下かインプレッション数の減少が原因です',
      'n1-2': '広告CVRが下がっている場合はLPとキーワードの整合性を確認しましょう',
      'n1-3': '客単価の低下はセール商品へのトラフィック集中が考えられます',
      'n2-1': 'インプレッション数の変動は予算上限や品質スコアに影響されます',
      'n2-2': 'CPCの上昇は競合の入札強化や品質スコア低下が原因の場合があります',
    },
  },
];

// --- メルカリ（企業モード） ---
export const mercariScenarios: Scenario[] = [
  {
    id: 'mercari-001',
    genre: 'company',
    company: 'mercari',
    companyContext: 'フリマアプリ国内No.1。出品者と購入者をつなぐCtoC EC。',
    difficulty: 'easy',
    title: 'GMVを分解せよ',
    description: 'メルカリの流通総額（GMV）が伸び悩んでいる。GMVを構成する要素に分解し、どこに改善余地があるかを考えよ。',
    rootKpi: 'GMV',
    timeLimit: 180,
    answerTree: {
      id: 'root',
      label: 'GMV',
      children: [
        { id: 'n1', label: '月間取引数', operator: '×' },
        { id: 'n2', label: '平均取引単価', operator: '×' },
      ],
    },
    feedback: {
      n1: '月間取引数はMAU × 出品率 × 成約率に分解できます。どのステップで詰まっているかを探りましょう',
      n2: '平均取引単価はカテゴリミックスや高単価商品の流通量に影響されます',
    },
  },
  {
    id: 'mercari-002',
    genre: 'company',
    company: 'mercari',
    companyContext: 'フリマアプリ国内No.1。出品者と購入者をつなぐCtoC EC。',
    difficulty: 'normal',
    title: 'MAUの伸び悩みを分解せよ',
    description: 'メルカリのMAUが前年比横ばいで推移している。施策の優先度を決めるため、MAUを分解して原因仮説を立てよ。',
    rootKpi: 'MAU',
    timeLimit: 300,
    answerTree: {
      id: 'root',
      label: 'MAU',
      children: [
        {
          id: 'n1',
          label: '新規ユーザー数',
          operator: '+',
          children: [
            { id: 'n1-1', label: '流入数', operator: '×' },
            { id: 'n1-2', label: '登録CVR', operator: '×' },
          ],
        },
        {
          id: 'n2',
          label: '既存ユーザー継続数',
          operator: '+',
          children: [
            { id: 'n2-1', label: '前月MAU', operator: '×' },
            { id: 'n2-2', label: '継続率', operator: '×' },
          ],
        },
      ],
    },
    feedback: {
      n1: '新規ユーザーは流入数×登録CVRで分解。広告・口コミ・ASO（アプリストア最適化）が影響します',
      n2: '既存ユーザー継続は前月MAU×継続率（1−チャーン率）。エンゲージメント施策が鍵です',
      'n1-1': '流入数はチャネル別（TV/SNS/紹介）に分解するとCPA改善の優先度が見えます',
      'n1-2': '登録CVRはオンボーディングフローの改善で大きく変わります',
      'n2-1': '前月MAUは外部環境の影響を受けるため、コントロール可能な要因に注目しましょう',
      'n2-2': '継続率の低下は早期チャーン（初月離脱）と長期離脱を分けて分析すると有効です',
    },
  },
  {
    id: 'mercari-003',
    genre: 'company',
    company: 'mercari',
    companyContext: 'フリマアプリ国内No.1。売上 = GMV × Take Rate という構造で収益化している。',
    difficulty: 'hard',
    title: 'Take Rateの改善余地を探れ',
    description: 'メルカリの売上はGMV × Take Rateで表される。Take Rateが伸び悩む原因を分解し、改善可能な要素を特定せよ。',
    rootKpi: 'Take Rate',
    timeLimit: 420,
    answerTree: {
      id: 'root',
      label: 'Take Rate',
      children: [
        {
          id: 'n1',
          label: '販売手数料率',
          operator: '+',
          children: [
            { id: 'n1-1', label: '基本手数料率', operator: '×' },
            { id: 'n1-2', label: '成約率', operator: '×' },
          ],
        },
        {
          id: 'n2',
          label: '付加サービス収益率',
          operator: '+',
          children: [
            { id: 'n2-1', label: '有料オプション利用率', operator: '×' },
            { id: 'n2-2', label: '広告収益 / GMV', operator: '+' },
          ],
        },
      ],
    },
    feedback: {
      n1: '販売手数料率×成約率が基本収益の源泉。手数料率変更はGMVへの影響も考慮が必要です',
      n2: '付加サービス（送料オプション・クーポン）の浸透率を高めることでTake Rateを改善できます',
      'n1-1': '基本手数料率は競合との比較が重要。PayPayフリマ等との差別化要因を整理しましょう',
      'n1-2': '成約率の向上は価格提案機能や需要予測による出品補助が有効です',
      'n2-1': '有料オプション（梱包資材・匿名配送）の認知率と利用率を分けて分析しましょう',
      'n2-2': '広告収益はスポンサー枠の整備とターゲティング精度が収益率に直結します',
    },
  },
];

export const getScenariosByFilter = (genre?: string, difficulty?: string) => {
  return scenarios.filter((s) => {
    if (genre && genre !== 'random' && s.genre !== genre) return false;
    if (difficulty && s.difficulty !== difficulty) return false;
    return true;
  });
};

export const getRandomScenario = (genre?: string, difficulty?: string) => {
  const filtered = getScenariosByFilter(genre, difficulty);
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export const getRandomMercariScenario = (difficulty?: string) => {
  const filtered = difficulty
    ? mercariScenarios.filter((s) => s.difficulty === difficulty)
    : mercariScenarios;
  return filtered[Math.floor(Math.random() * filtered.length)];
};

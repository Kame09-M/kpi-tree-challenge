export interface GlossaryEntry {
  term: string;
  reading: string;
  definition: string;
  example?: string;
  related?: string[];
}

export const glossary: GlossaryEntry[] = [
  {
    term: 'ROAS',
    reading: 'ロアス',
    definition: '広告費用対効果（Return On Advertising Spend）。広告費1円あたりどれだけの売上を得られたかを示す指標。ROAS = 売上 ÷ 広告費 × 100（%）で計算する。',
    example: '広告費10万円で売上40万円なら ROAS = 400%',
    related: ['CAC', 'CPC', 'CTR', 'CVR'],
  },
  {
    term: 'MRR',
    reading: 'エムアールアール',
    definition: '月次経常収益（Monthly Recurring Revenue）。SaaSなどサブスクリプションビジネスで毎月安定的に得られる収益の合計。新規MRR・拡張MRR・チャーンMRRに分解される。',
    example: '月額1万円の契約者が100人いれば MRR = 100万円',
    related: ['チャーンレート', 'NPS', 'ARR'],
  },
  {
    term: 'CVR',
    reading: 'シーブイアール',
    definition: 'コンバージョン率（Conversion Rate）。サイト訪問者のうち購入・会員登録などの目標行動を完了した割合。CVR = コンバージョン数 ÷ 訪問者数 × 100（%）。',
    example: '100人来訪して3人購入なら CVR = 3%',
    related: ['CTR', 'LPO', '客単価'],
  },
  {
    term: 'CAC',
    reading: 'シーエーシー',
    definition: '顧客獲得コスト（Customer Acquisition Cost）。新規顧客1人を獲得するのにかかったコスト。CAC = 総獲得コスト ÷ 獲得顧客数。LTVと比較してビジネスの健全性を判断する。',
    example: '広告費100万円で50人獲得なら CAC = 2万円',
    related: ['LTV', 'ROAS', 'チャーンレート'],
  },
  {
    term: 'LTV',
    reading: 'エルティーブイ',
    definition: '顧客生涯価値（Life Time Value）。1人の顧客が取引期間全体を通じてもたらす収益の合計。LTV > CAC であることがビジネス継続の基本条件。',
    example: '月1万円 × 平均継続24ヶ月なら LTV = 24万円',
    related: ['CAC', 'チャーンレート', 'MRR'],
  },
  {
    term: 'CTR',
    reading: 'シーティーアール',
    definition: 'クリック率（Click-Through Rate）。広告や検索結果が表示された回数に対してクリックされた割合。CTR = クリック数 ÷ インプレッション数 × 100（%）。',
    example: '1000回表示されて30回クリックなら CTR = 3%',
    related: ['CPC', 'ROAS', 'インプレッション'],
  },
  {
    term: 'CPC',
    reading: 'シーピーシー',
    definition: 'クリック単価（Cost Per Click）。広告が1回クリックされるたびに発生するコスト。CPC = 広告費 ÷ クリック数。入札競争や品質スコアによって変動する。',
    example: '広告費10万円で2000クリックなら CPC = 50円',
    related: ['CTR', 'ROAS', 'インプレッション'],
  },
  {
    term: 'チャーンレート',
    reading: 'チャーンレート',
    definition: '解約率（Churn Rate）。一定期間内に解約・離脱した顧客の割合。SaaSビジネスでは月次チャーンレートが重要指標。低いほど顧客維持ができている。',
    example: '100社契約中2社解約でチャーンレート = 2%',
    related: ['MRR', 'LTV', 'NPS'],
  },
  {
    term: '客単価',
    reading: 'きゃくたんか',
    definition: '顧客1人あたりの平均購入金額。客単価 = 売上合計 ÷ 購入者数。購入点数と商品単価の掛け算で分解できる。セット販売やクロスセルで改善を図る。',
    example: '売上100万円 ÷ 購入者200人 = 客単価5000円',
    related: ['CVR', 'LTV', '訪問者数'],
  },
  {
    term: 'NPS',
    reading: 'エヌピーエス',
    definition: '顧客推奨度スコア（Net Promoter Score）。「この製品を友人・知人に勧める可能性は？」を0〜10点で聞き、推奨者（9〜10点）の割合から批判者（0〜6点）の割合を引いた値。',
    example: '推奨者60% - 批判者20% = NPS 40',
    related: ['チャーンレート', 'LTV', 'MRR'],
  },
  {
    term: '訪問者数',
    reading: 'ほうもんしゃすう',
    definition: 'サイトやアプリへのアクセス数（セッション数またはユニークユーザー数）。流入チャネル（SEO・広告・SNS・直接）別に分解して分析するのが基本。',
    example: '月間訪問者数10万UU',
    related: ['CVR', '客単価', 'CTR'],
  },
  {
    term: 'DAU',
    reading: 'ディーエーユー',
    definition: '日次アクティブユーザー数（Daily Active Users）。1日にサービスを利用したユニークユーザー数。DAU/MAUでエンゲージメント率を測る。',
    example: 'DAU 1万人 / MAU 10万人 = エンゲージメント率10%',
    related: ['MRR', 'チャーンレート', 'NPS'],
  },
  {
    term: 'インプレッション',
    reading: 'インプレッション',
    definition: '広告や投稿がユーザーの画面に表示された回数。リーチと異なり同一ユーザーへの複数回表示もカウントされる。広告効果測定の出発点となる指標。',
    example: '広告が100万回表示 = 100万インプレッション',
    related: ['CTR', 'CPC', 'ROAS'],
  },
];

export const findGlossaryEntries = (text: string): GlossaryEntry[] => {
  if (!text) return [];
  const lower = text.toLowerCase();
  return glossary.filter(
    (g) =>
      lower.includes(g.term.toLowerCase()) ||
      (g.reading && lower.includes(g.reading.toLowerCase()))
  );
};

export const searchGlossary = (query: string): GlossaryEntry[] => {
  if (!query.trim()) return glossary;
  const q = query.toLowerCase();
  return glossary.filter(
    (g) =>
      g.term.toLowerCase().includes(q) ||
      g.reading.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q)
  );
};

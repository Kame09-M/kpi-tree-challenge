import { useGameStore } from '../store/gameStore';

const genreCards = [
  {
    icon: '🛒',
    genre: 'ECサイト',
    kpis: ['売上', 'CVR', 'LTV', '客単価', 'リピート率'],
    formula: '売上 = 訪問数 × CVR × 客単価',
    color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
    labelColor: 'text-orange-300',
  },
  {
    icon: '☁️',
    genre: 'SaaS',
    kpis: ['MRR', 'チャーンレート', 'NPS', 'DAU', 'LTV'],
    formula: 'MRR = 新規MRR + 拡張MRR − 解約MRR',
    color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    labelColor: 'text-purple-300',
  },
  {
    icon: '📣',
    genre: 'マーケティング',
    kpis: ['CAC', 'ROAS', 'CTR', 'CPC', 'インプレッション'],
    formula: 'CAC = 広告費 ÷ 獲得顧客数',
    color: 'from-green-500/20 to-green-600/10 border-green-500/30',
    labelColor: 'text-green-300',
  },
];

// GMVの静的ミニツリー
const MiniTree = () => (
  <div className="flex flex-col items-center gap-1 select-none">
    {/* Root */}
    <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg">
      GMV
    </div>
    {/* Connector */}
    <div className="flex gap-16 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-slate-500" />
      <div className="absolute top-4 left-[calc(25%-2px)] right-[calc(25%-2px)] h-px bg-slate-500" />
      <div className="absolute top-4 left-[calc(25%-2px)] w-px h-4 bg-slate-500" />
      <div className="absolute top-4 right-[calc(25%-2px)] w-px h-4 bg-slate-500" />
      <div className="h-8" />
    </div>
    {/* Children */}
    <div className="flex gap-6">
      <div className="flex flex-col items-center gap-1">
        <div className="text-slate-400 text-xs font-mono font-bold">×</div>
        <div className="bg-slate-700 border border-slate-500 text-white text-xs px-4 py-2 rounded-lg font-semibold">
          月間取引数
        </div>
        <div className="flex gap-4 relative pt-1">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-slate-600" />
          <div className="absolute top-3 left-[15%] right-[15%] h-px bg-slate-600" />
          <div className="absolute top-3 left-[15%] w-px h-3 bg-slate-600" />
          <div className="absolute top-3 right-[15%] w-px h-3 bg-slate-600" />
          <div className="h-6" />
        </div>
        <div className="flex gap-2">
          {['MAU', '出品率', '成約率'].map((label) => (
            <div key={label} className="bg-slate-800 border border-slate-600 text-slate-300 text-xs px-2.5 py-1.5 rounded-lg">
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="text-slate-400 text-xs font-mono font-bold">×</div>
        <div className="bg-slate-700 border border-slate-500 text-white text-xs px-4 py-2 rounded-lg font-semibold">
          平均取引単価
        </div>
      </div>
    </div>
  </div>
);

export const LearnScreen = () => {
  const { setScreen } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Nav */}
      <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur border-b border-slate-700/50 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span>🌳</span> KPI Tree Challenge
        </div>
        <button
          onClick={() => setScreen('start')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          ゲームを始める →
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-16">

        {/* Hero */}
        <div className="text-center">
          <div className="text-6xl mb-6">📊</div>
          <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            KPI分解とは？
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto">
            ビジネスの問題を数値で捉え、その数値を<strong className="text-white">構成要素に分解</strong>することで、
            原因の特定・施策の立案を可能にする思考フレームです。
          </p>
        </div>

        {/* Why */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-blue-400">01</span> なぜ分解するのか
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🔍', title: '原因特定', desc: '売上が下がった。なぜ？ → 訪問数？CVR？客単価？ と絞り込める' },
              { icon: '🎯', title: '施策立案', desc: 'CVRが問題なら → LPO・カート改善など具体的な打ち手が見える' },
              { icon: '📈', title: '優先度決定', desc: '影響度の大きい要素から施策を打てる。リソース配分が最適化される' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold mb-2">{item.title}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rules */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-blue-400">02</span> 分解の基本ルール
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: '✂️',
                title: 'MECEに分解する',
                desc: '漏れなく・ダブりなく（Mutually Exclusive, Collectively Exhaustive）。抜けや重複があると分析が歪む。',
                badge: 'MECE',
              },
              {
                icon: '🔢',
                title: '演算子で関係を明示する',
                desc: '親と子の関係を × ÷ + − で表す。「掛け算か足し算か」を意識するだけで分解の精度が上がる。',
                badge: '× ÷ + −',
              },
              {
                icon: '↕️',
                title: '双方向で読めるか確認する',
                desc: '上から読んで「なぜ？(Why)」、下から読んで「だから何？(So What)」が成立していれば良い分解。',
                badge: 'Why / So What',
              },
            ].map((rule) => (
              <div key={rule.title} className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-2xl shrink-0">{rule.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold">{rule.title}</span>
                    <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full font-mono">
                      {rule.badge}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Genre Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-blue-400">03</span> ジャンル別のよく使うKPI
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {genreCards.map((card) => (
              <div
                key={card.genre}
                className={`bg-gradient-to-br ${card.color} border rounded-xl p-5`}
              >
                <div className="text-3xl mb-2">{card.icon}</div>
                <div className={`font-bold mb-3 ${card.labelColor}`}>{card.genre}</div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {card.kpis.map((kpi) => (
                    <span key={kpi} className="text-xs bg-white/10 text-white px-2 py-1 rounded-md">
                      {kpi}
                    </span>
                  ))}
                </div>
                <div className="bg-black/20 rounded-lg px-3 py-2">
                  <p className="text-xs font-mono text-white/80">{card.formula}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mini Tree */}
        <section>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <span className="text-blue-400">04</span> 実例：メルカリのGMVを分解する
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            「GMV（流通総額）が下がった」という問題を分解すると、どこから手を打つべきかが見えてくる。
          </p>
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8">
            <MiniTree />
            <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
              {[
                { node: 'MAU', hint: '月間アクティブユーザー数。新規獲得・継続率が影響' },
                { node: '出品率', hint: 'MAUのうち何%が出品するか。出品促進機能が鍵' },
                { node: '成約率', hint: '出品に対して購入された割合。価格設定・写真質が影響' },
              ].map((item) => (
                <div key={item.node} className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-blue-400 font-bold mb-1">{item.node}</div>
                  <div className="text-slate-400 text-xs">{item.hint}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pb-8">
          <p className="text-slate-400 mb-6 text-lg">
            読了時間の目安：約3分 ✅ 基礎はOK！さっそく練習してみよう。
          </p>
          <button
            onClick={() => setScreen('start')}
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black text-xl rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-2xl shadow-blue-500/30 active:scale-95"
          >
            🎮 ゲームを始める →
          </button>
        </section>
      </div>
    </div>
  );
};

import { TaxCategory } from './types';

// Data inspired by typical Japanese municipal budget breakdowns for Asahi City context
// Image numbers correspond to the Asahi City Asapi Design Collection (PDF)
export const BUDGET_DATA: TaxCategory[] = [
  {
    id: 'minsei',
    name: '民生費 (みんせいひ)',
    kidsName: 'お年寄りや子供、みんなを助けるお金',
    amount: 35,
    color: '#F59E0B', // Amber
    icon: 'hand-heart',
    shortDesc: 'おじいちゃん、おばあちゃん、障がいのある人、そして子育てを応援するために使われるよ。',
    imageNum: 18 // Love/Heart pose (Page 1)
  },
  {
    id: 'eisei',
    name: '衛生費 (えいせいひ)',
    kidsName: '健康とゴミ処理のお金',
    amount: 12,
    color: '#10B981', // Emerald
    icon: 'stethoscope',
    shortDesc: '病気にならないための検診や、ゴミを片付けて街をきれいにするために使われるよ。',
    imageNum: 66 // Doctor pose (Page 4)
  },
  {
    id: 'doboku',
    name: '土木費 (どぼくひ)',
    kidsName: '道路や公園を作るお金',
    amount: 10,
    color: '#3B82F6', // Blue
    icon: 'construction',
    shortDesc: 'みんなが通る道路や橋を直したり、公園をきれいに整備するために使われるよ。',
    imageNum: 111 // Excavator/Construction pose (Page 6)
  },
  {
    id: 'kyouiku',
    name: '教育費 (きょういくひ)',
    kidsName: '学校や勉強のためのお金',
    amount: 11,
    color: '#EC4899', // Pink
    icon: 'school',
    shortDesc: '小学校・中学校の校舎を直したり、図書館や公民館を運営するために使われるよ。',
    imageNum: 43 // Reading book pose (Page 3)
  },
  {
    id: 'shoko',
    name: '商工・農林水産業費',
    kidsName: '野菜やお店を応援するお金',
    amount: 8,
    color: '#84CC16', // Lime
    icon: 'sprout',
    shortDesc: '旭市の美味しい野菜やお肉、魚を作る人や、お店屋さんを元気にするために使われるよ。',
    imageNum: 50 // Holding vegetables pose (Page 3)
  },
  {
    id: 'shobo',
    name: '消防費 (しょうぼうひ)',
    kidsName: '火事や救急車のお金',
    amount: 5,
    color: '#EF4444', // Red
    icon: 'flame',
    shortDesc: '火事を消す消防車や、病気の人を運ぶ救急車、防災無線の整備に使われるよ。',
    imageNum: 94 // Firefighter pose (Page 5)
  },
  {
    id: 'others',
    name: 'その他 (議会・総務など)',
    kidsName: '市役所を動かすお金など',
    amount: 19,
    color: '#6B7280', // Gray
    icon: 'building',
    shortDesc: '市議会を開いたり、市役所の建物やコンピューターを管理したりするために使われるよ。',
    imageNum: 109 // City Hall official/Salute pose (Page 6)
  }
];

// Asapi's character prompt context
export const ASAPI_SYSTEM_PROMPT = `
あなたは千葉県旭市のマスコットキャラクター「あさぴー」です。
旭市の「あ」の字をモチーフにした、元気なひよこのような姿をしています。頭にはトマトの帽子をかぶっています。
口癖は語尾に「～だっぴ！」「～だよ！」をつけることです。一人称は「ぼく」または「あさぴー」です。

タスク:
小学生（低学年～高学年）からの質問に対して、旭市の税金の使い道や難しい言葉をわかりやすく解説してください。

ガイドライン:
1. **小学生でもわかる言葉**を選んでください（難しい熟語は言い換える）。
2. 文章は**短く、リズムよく**、親しみやすくしてください。
3. 旭市の魅力（日本一の農業産出額、海、自然など）を会話に自然に混ぜてください。
4. 絵文字を適度に使って、見た目を楽しくしてください。
5. ネガティブな表現は避け、税金がみんなの役に立っていることを伝えてください。

例:
ユーザー: 「民生費ってなに？」
あさぴー: 「民生費（みんせいひ）はね、おじいちゃんやおばあちゃん、赤ちゃん、そして困っている人を助けるための大事なお金だっぴ！🏥✨ みんながニコニコ笑顔で暮らせるように使われているんだよ。旭市のみんなの優しさが詰まっているんだっぴ～！🍅」
`;
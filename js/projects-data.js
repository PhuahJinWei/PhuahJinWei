/**
 * projects-data.js — Project Database
 *
 * Single source of truth for all project information.
 * Used by both index.html (card rendering) and project.html (detail page).
 *
 * To add a new project, append an object to the PROJECTS array below.
 */
window.PROJECTS = [
  {
    id: 'blackjack',
    title: 'BlackJack Mobile',
    tag: 'game',
    shortDesc: 'Classic 21-point Blackjack with special house rules.',
    descEN: 'Classic 21-point Blackjack with special house rules. Features include an escape rule, stand restriction, double-stakes on 21, and five-card instant resolution.',
    descJP: '\u5B9A\u756A\u30D6\u30E9\u30C3\u30AF\u30B8\u30E3\u30C3\u30AF\u306B\u72EC\u81EA\u306E\u30CF\u30A6\u30B9\u30EB\u30FC\u30EB\u3092\u8FFD\u52A0\u3057\u305F\u30D0\u30FC\u30B8\u30E7\u30F3\u3067\u3059\u3002\u30A8\u30B9\u30B1\u30FC\u30D7\u30EB\u30FC\u30EB\u3001\u30B9\u30BF\u30F3\u30C9\u5236\u9650\u300121\u30C0\u30D6\u30EB\u30B9\u30C6\u30FC\u30AF\u30B9\u30015\u679A\u30AB\u30FC\u30C9\u5373\u6642\u89E3\u6C7A\u306A\u3069\u306E\u6A5F\u80FD\u3092\u642D\u8F09\u3057\u3066\u3044\u307E\u3059\u3002',
    demoUrl: 'https://phuahjinwei.github.io/BlackJack-Mobile/',
    sourceUrl: 'https://github.com/PhuahJinWei/BlackJack-Mobile',
    heroPlaceholder: 'BlackJack Mobile \u2014 Screenshot / Preview',
    cardPlaceholder: 'BlackJack Mobile',
    cardImage: 'https://raw.githubusercontent.com/PhuahJinWei/BlackJack-Mobile/main/asset/mypagePic.png',
    actionLabel: 'PLAY'
  },
  {
    id: 'salvation-breakers',
    title: 'Salvation Breakers',
    tag: 'game',
    shortDesc: 'Rogue-like auto-play defense \u2014 collect equipment & guns to defend your base.',
    descEN: 'From-scratch remake inspired by NIKKE\u2019s limited-time mini game. Rogue-like auto-play: collect equipment & guns to defend your base.',
    descJP: 'NIKKE\u306E\u671F\u9593\u9650\u5B9A\u30DF\u30CB\u30B2\u30FC\u30E0\u306B\u7740\u60F3\u3092\u5F97\u3066\u30BC\u30ED\u304B\u3089\u518D\u73FE\u3002\u88C5\u5099\u3084\u9283\u3092\u96C6\u3081\u3066\u62E0\u70B9\u3092\u9632\u885B\u3059\u308B\u30ED\u30FC\u30B0\u30E9\u30A4\u30AF\u98A8\u30AA\u30FC\u30C8\u30D7\u30EC\u30A4\u3067\u3059\u3002',
    demoUrl: 'https://phuahjinwei.github.io/Rogue-Like-Gun-Mini-Game/',
    sourceUrl: 'https://github.com/PhuahJinWei/Rogue-Like-Gun-Mini-Game',
    heroPlaceholder: 'Salvation Breakers \u2014 Screenshot / Preview',
    cardPlaceholder: 'Salvation Breakers',
	cardImage: 'https://raw.githubusercontent.com/PhuahJinWei/Rogue-Like-Gun-Mini-Game/main/src/mypagePic.png',
    actionLabel: 'PLAY'
  },
  {
    id: 'hoppy-bird',
    title: 'Hoppy Bird',
    tag: 'game',
    shortDesc: 'Flappy Bird-style recreation with sound effects and smooth gameplay.',
    descEN: 'Flappy Bird-style recreation \u2014 simple and great for practicing programming basics. Features sound effects and smooth gameplay.',
    descJP: 'Flappy Bird\u98A8\u306E\u30B7\u30F3\u30D7\u30EB\u306A\u30B2\u30FC\u30E0\u518D\u73FE\u3002\u57FA\u672C\u7684\u306A\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u7DF4\u7FD2\u306B\u6700\u9069\u3067\u3059\u3002\u52B9\u679C\u97F3\u3068\u30B9\u30E0\u30FC\u30BA\u306A\u30B2\u30FC\u30E0\u30D7\u30EC\u30A4\u3092\u642D\u8F09\u3002',
    demoUrl: 'https://phuahjinwei.github.io/hoppybird/',
    sourceUrl: 'https://github.com/PhuahJinWei/hoppybird',
    heroPlaceholder: 'Hoppy Bird \u2014 Screenshot / Preview',
    cardPlaceholder: 'Hoppy Bird',
	cardImage: 'https://raw.githubusercontent.com/PhuahJinWei/hoppybird/main/mypagePic.png',
    actionLabel: 'PLAY'
  },
  {
    id: 'tetris',
    title: 'Tetris Simulator',
    tag: 'game',
    shortDesc: 'Classic Tetris recreation. Playable on mobile devices too.',
    descEN: 'Classic Tetris recreation. Playable on mobile devices too. Features responsive controls and smooth piece movement.',
    descJP: '\u5B9A\u756A\u30C6\u30C8\u30EA\u30B9\u3092\u518D\u73FE\u3002\u30E2\u30D0\u30A4\u30EB\u7AEF\u672B\u3067\u3082\u904A\u3079\u307E\u3059\u3002\u30EC\u30B9\u30DD\u30F3\u30B7\u30D6\u306A\u64CD\u4F5C\u6027\u3068\u30B9\u30E0\u30FC\u30BA\u306A\u30D4\u30FC\u30B9\u79FB\u52D5\u3092\u5B9F\u88C5\u3057\u3066\u3044\u307E\u3059\u3002',
    demoUrl: 'https://phuahjinwei.github.io/Tetris-Simulator/',
    sourceUrl: 'https://github.com/PhuahJinWei/Tetris-Simulator',
    heroPlaceholder: 'Tetris Simulator \u2014 Screenshot / Preview',
    cardPlaceholder: 'Tetris Simulator',
	cardImage: 'https://raw.githubusercontent.com/PhuahJinWei/Tetris-Simulator/main/asset/mypagePic.png',
    actionLabel: 'PLAY'
  },
  {
    id: 'suika',
    title: 'Suika Simulator',
    tag: 'game',
    shortDesc: 'Physics-based fruit-merging puzzle game.',
    descEN: 'Inspired by the popular Suika fruit-merging game. Drop fruits and merge matching pairs to create larger ones \u2014 a physics-based puzzle game.',
    descJP: '\u8A71\u984C\u306E\u30B9\u30A4\u30AB\u30B2\u30FC\u30E0\u98A8\u300C\u30D5\u30EB\u30FC\u30C4\u5408\u4F53\u300D\u30B2\u30FC\u30E0\u3092\u518D\u73FE\u3057\u307E\u3057\u305F\u3002\u30D5\u30EB\u30FC\u30C4\u3092\u843D\u3068\u3057\u3066\u540C\u3058\u3082\u306E\u540C\u58EB\u3092\u5408\u4F53\u3055\u305B\u3001\u3088\u308A\u5927\u304D\u306A\u30D5\u30EB\u30FC\u30C4\u3092\u4F5C\u308B\u7269\u7406\u30D1\u30BA\u30EB\u30B2\u30FC\u30E0\u3067\u3059\u3002',
    demoUrl: 'https://phuahjinwei.github.io/Suika-Simulator/src/suikeGame.html',
    sourceUrl: 'https://github.com/PhuahJinWei/Suika-Simulator',
    heroPlaceholder: 'Suika Simulator \u2014 Screenshot / Preview',
    cardPlaceholder: 'Suika Simulator',
	cardImage: 'https://raw.githubusercontent.com/PhuahJinWei/Suika-Simulator/main/src/img/mypagePic.png',
    actionLabel: 'PLAY'
  },
  {
    id: 'pdf-editor',
    title: 'PDF Editor',
    tag: 'tool',
    shortDesc: 'A web-based PDF editing application.',
    descEN: 'A web-based PDF editing application. Edit, annotate, and manage PDF files directly in the browser. Built with Next.js and TypeScript.',
    descJP: '\u7C21\u5358\u306APDF\u7DE8\u96C6\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u3002\u30D6\u30E9\u30A6\u30B6\u4E0A\u3067\u76F4\u63A5PDF\u30D5\u30A1\u30A4\u30EB\u306E\u7DE8\u96C6\u30FB\u6CE8\u91C8\u30FB\u7BA1\u7406\u304C\u3067\u304D\u307E\u3059\u3002Next.js\u3068TypeScript\u3067\u69CB\u7BC9\u3057\u3066\u3044\u307E\u3059\u3002',
    demoUrl: 'https://phuahjinwei.github.io/PDF-Editor/',
    sourceUrl: 'https://github.com/PhuahJinWei/PDF-Editor',
    heroPlaceholder: 'PDF Editor \u2014 Screenshot / Preview',
    cardPlaceholder: 'PDF Editor',
	cardImage: 'https://raw.githubusercontent.com/PhuahJinWei/PDF-Editor/main/src/mypagePic.png',
    actionLabel: 'OPEN'
  },
  {
    id: 'jpg-pdf',
    title: 'JPG \u21C4 PDF Converter',
    tag: 'tool',
    shortDesc: 'Simple bidirectional PDF to IMG converter.',
    descEN: 'A simple bidirectional PDF to IMG converter. Convert PDF pages to images or combine images into a PDF \u2014 all in the browser.',
    descJP: 'PDF\u21C4\u753B\u50CF\u306E\u5909\u63DB\u30C4\u30FC\u30EB\u3002PDF\u30DA\u30FC\u30B8\u3092\u753B\u50CF\u306B\u5909\u63DB\u3057\u305F\u308A\u3001\u753B\u50CF\u3092PDF\u306B\u307E\u3068\u3081\u305F\u308A\u3067\u304D\u307E\u3059\u3002\u3059\u3079\u3066\u30D6\u30E9\u30A6\u30B6\u4E0A\u3067\u5B8C\u7D50\u3057\u307E\u3059\u3002',
    demoUrl: 'https://phuahjinwei.github.io/JPG-PDF/src/mainPage.html',
    sourceUrl: 'https://github.com/PhuahJinWei/JPG-PDF',
    heroPlaceholder: 'JPG \u21C4 PDF Converter \u2014 Screenshot / Preview',
    cardPlaceholder: 'JPG \u21C4 PDF Converter',
	cardImage: 'https://raw.githubusercontent.com/PhuahJinWei/JPG-PDF/main/src/img/mypagePic.png',
    actionLabel: 'OPEN'
  }
];

/**
 * Look up a project by its ID.
 * @param {string} id
 * @returns {object|undefined}
 */
window.getProjectById = function (id) {
  return window.PROJECTS.find(function (p) { return p.id === id; });
};

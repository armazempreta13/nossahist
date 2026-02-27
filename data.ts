import { Post, SiteConfig } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  coupleName: "Philippe & Cristina",
  subtitle: "cada momento guardado, cada palavra sentida",
  avatarLetter: "♡",
  musicTitle: "Papoulas",
  musicArtist: "Yago Oproprio",
  musicLyric: "\"Eu vejo flores em você...\"",
  // Lista de Músicas Sugeridas (Copie a URL desejada para o soundcloudUrl):
  // 1. Yago oProprio - Papoulas: https://soundcloud.com/yagooproprio/papoulas
  // 2. The Neighbourhood - Sweater Weather: https://soundcloud.com/theneighbourhood/sweater-weather
  // 3. Usher - My Boo: https://soundcloud.com/usher-raymond-music/my-boo-1
  // 4. Deusa (não encontrado link oficial exato, usando placeholder): https://soundcloud.com/search?q=venere%20vai%20venus%20deusa
  soundcloudUrl: "https://soundcloud.com/yagooproprio/papoulas", 
  proposalText: "Cristina, você aceita escrever o resto da nossa história comigo? Quer casar comigo?"
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'comeco-sem-perceber',
    type: 'chat',
    emoji: '💜',
    title: 'o começo sem perceber',
    quote: '"não achei que uma conversa tão simples fosse bagunçar tanta coisa aqui dentro."',
    content: [
      'Parece tão simples agora. Um "oi" que mudou tudo. Mas naquele momento eu não sabia que aquela conversa seria o começo de algo que eu nem conseguia imaginar.',
      'Engraçado como as maiores histórias começam com as menores palavras. A gente nunca sabe quando um momento casual vai se transformar em algo inesquecível.'
    ],
    chatMessages: [
      { id: '1', text: 'oi, ainda lembra de mim?', time: '19:23', isRight: false },
    ],
    interludePhrase: "algumas histórias não têm aviso prévio, elas simplesmente acontecem."
  },
  {
    id: 'mensagens-madrugada',
    type: 'chat',
    emoji: '🌙',
    title: 'conversas de madrugada',
    quote: '"é estranho quando alguém aparece e você percebe que o tempo começa a passar mais rápido quando está falando com ela."',
    content: [
      'Começamos a conversar e simplesmente não paramos. Horas viravam minutos. Os assuntos nunca acabavam. Cada resposta sua me fazia querer saber mais.',
      'Eu olhava pro relógio e não acreditava — como já tinha passado tanto tempo? Parecia que tínhamos acabado de começar a falar.',
      'O sono perdeu completamente a graça perto de você.'
    ],
    chatMessages: [
      { id: 'c1', text: 'caramba, já é meia noite', time: '00:03', isRight: true },
      { id: 'c2', text: 'sério??? nem percebi', time: '00:04', isRight: false },
      { id: 'c3', text: 'eu também não', time: '00:04', isRight: true },
      { id: 'c4', text: 'mas eu não quero parar de conversar', time: '00:05', isRight: true },
      { id: 'c5', text: 'então não para...', time: '00:06', isRight: false },
    ],
    interludePhrase: "madrugadas que valeram mais que dias inteiros."
  },
  {
    id: 'primeiro-encontro',
    type: 'image',
    emoji: '✨',
    title: 'o sorriso que entregou tudo',
    quote: '"você é exatamente como eu imaginava… e ao mesmo tempo completamente diferente. melhor diferente."',
    content: [
      'Eu estava nervoso. Muito nervoso. Criei mil cenários na minha cabeça de como seria te ver pessoalmente.',
      'Mas aí eu te vi. E aquele sorriso desarmou qualquer defesa que eu pudesse ter.',
      'Foi como se tudo fizesse sentido de uma vez só. Como se todas aquelas horas de conversa tivessem sido apenas a preparação para esse momento.'
    ],
    imageCaption: 'o momento em que você sorriu\ne eu esqueci todo o meu nervosismo',
    imageUrl: 'https://i.imgur.com/hFj1rz8.png',
    interludePhrase: "o instante exato em que eu soube."
  },
  {
    id: 'maos-entrelacadas',
    type: 'image',
    emoji: '🤝',
    title: 'mãos entrelaçadas',
    quote: '"o encaixe perfeito que eu nem sabia que existia."',
    content: [
      'Não foi planejado. Estávamos andando e, de repente, nossas mãos se encontraram.',
      'Senti um choque elétrico e uma paz imensa ao mesmo tempo. Como se minha mão tivesse passado a vida inteira esperando pela sua.',
      'Tem gestos que são simples, mas carregam um universo inteiro de significado.'
    ],
    imageCaption: 'nossas mãos se encontraram\ne não quiseram mais se soltar',
    imageUrl: 'https://i.imgur.com/OBeXljE.png',
    interludePhrase: "linhas que se cruzaram pra ficar."
  },
  {
    id: 'primeiro-beijo',
    type: 'chat',
    emoji: '💋',
    title: 'o beijo que parou o tempo',
    quote: '"engraçado como um momento tão curto consegue dividir a vida em antes e depois."',
    content: [
      'Não foi só um beijo. Foi o momento em que o mundo ao redor desapareceu completamente.',
      'Não pensei "agora é a hora". Simplesmente aconteceu, como se fosse inevitável desde sempre.',
      'E quando nossos lábios se encontraram, eu entendi o que é estar exatamente onde você deveria estar.'
    ],
    chatMessages: [
      { id: 'b1', text: 'por que você tá me olhando assim?', time: '21:34', isRight: true },
      { id: 'b2', text: 'posso te beijar?', time: '21:35', isRight: false },
      { id: 'b3', text: '...', time: '21:35', isRight: true },
      { id: 'b4', text: 'eu achei que você nunca ia perguntar', time: '21:36', isRight: true },
    ],
    interludePhrase: "e o mundo ficou mudo por um segundo."
  },
  {
    id: 'a-despedida',
    type: 'text',
    emoji: '🥀',
    title: 'quando você precisou partir',
    quote: '"ver você ir embora foi como assistir o pôr do sol sabendo que a noite seria longa demais."',
    content: [
      'Houve aquele momento. Aquele momento difícil em que nossos caminhos precisaram se desencontrar temporariamente.',
      'Eu lembro da sensação física do vazio. Não era só saudade, era falta. Como se tivessem tirado uma parte vital de mim e eu tivesse que aprender a respirar de novo, só que com metade do ar.',
      'Você partiu, e as cores de tudo ficaram um pouco mais cinzas. Mas mesmo na distância, uma parte de você continuou aqui comigo.'
    ],
    interludePhrase: "tudo ficou cinza sem o teu riso."
  },
  {
    id: 'tempo-de-espera',
    type: 'image',
    emoji: '🌧️',
    title: 'os dias de espera',
    quote: '"eu te procurei em cada música, em cada memória, em cada esperança."',
    content: [
      'Os dias passaram arrastados. Eu tentava seguir em frente, tentava sorrir, mas no fundo estava sempre esperando.',
      'Esperando uma mensagem, um sinal, qualquer coisa que me dissesse que você também sentia essa falta absurda.',
      'Eu guardei o seu lugar. Mesmo sem saber se você voltaria a ocupá-lo, ninguém mais poderia sentar ali. Meu coração ficou teimoso, insistindo em te esperar.'
    ],
    imageUrl: 'https://i.imgur.com/8Lx35J7.png',
    imageCaption: 'o mundo continuou girando\nmas o meu estava parado em você',
    interludePhrase: "distância é só geografia quando o coração não esquece."
  },
  {
    id: 'o-retorno',
    type: 'chat',
    emoji: '❤️‍🩹',
    title: 'quando você voltou',
    quote: '"e de repente, a vida voltou a fazer sentido."',
    content: [
      'Eu nunca vou esquecer o momento em que você reapareceu. O coração disparou, as mãos tremeram, o mundo parou.',
      'Era uma mensagem simples — algo sobre devolver um terço que eu tinha te dado de presente. Mas nas entrelinhas, eu li tudo: você estava voltando pra mim.',
      'Você voltou. Não porque era fácil, mas porque o que a gente tem é maior que qualquer distância, maior que qualquer tempo.',
      'Naquele instante, eu entendi: algumas pessoas viajam o mundo inteiro só pra descobrir que o lar delas é o abraço de alguém.'
    ],
    chatMessages: [
      { id: 'r1', text: 'Oi, bom dia! Fiquei com a consciência um pouquinho pesada de estar com seu terço, quer que eu te devolva?', time: '09:12', isRight: false },
      { id: 'r2', text: 'Oi, Cris, bom dia.', time: '09:15', isRight: true },
      { id: 'r3', text: 'não precisa, foi um presente', time: '09:15', isRight: true },
      { id: 'r4', text: 'mas se você quiser me ver...', time: '09:16', isRight: true },
    ],
    interludePhrase: "o destino não erra o endereço."
  },
  {
    id: 'reconstruindo-nos',
    type: 'chat',
    emoji: '💝',
    title: 'reconstruindo nós',
    quote: '"obrigada por ter voltado pra mim. obrigada por não desistir de nós."',
    content: [
      'Ter você de volta me fez ter certeza de uma coisa: eu não quero viver nem mais um dia longe de você.',
      'Você voltou e trouxe a luz de volta. Trouxe a paz que eu tinha perdido, o sorriso que tinha ficado guardado.',
      'Cada conversa era uma peça sendo recolocada no lugar. Cada encontro era a certeza de que valeu a pena esperar.'
    ],
    chatMessages: [
      { id: 'a1', text: 'obrigada por não ter desistido de mim', time: '22:47', isRight: false },
      { id: 'a2', text: 'por ter ficado 🥹', time: '22:48', isRight: false },
      { id: 'a3', text: 'eu nunca vou desistir de você', time: '22:49', isRight: true },
      { id: 'a4', text: 'nunca', time: '22:49', isRight: true },
    ],
    interludePhrase: "meu lugar favorito no mundo é ao seu lado."
  },
  {
    id: 'declaracao-completa',
    type: 'chat',
    emoji: '💖',
    title: 'eu te amo (de verdade)',
    quote: '"com todo meu corpo, com toda a minha alma..."',
    content: [
      'E então você disse. Disse de um jeito que fez meu peito apertar e os olhos encherem.',
      'Não era mais apenas uma paixão passageira. Era amor. Aquele amor que resiste, que volta, que fica, que escolhe todos os dias.',
      'Eu reli essas mensagens mil vezes. A intensidade de cada palavra só cresce com o tempo.'
    ],
    chatMessages: [
      { id: 'd1', text: 'quero que saiba, que eu te amo', time: '22:25', isRight: false },
      { id: 'd2', text: 'de verdade mesmo', time: '22:25', isRight: false },
      { id: 'd3', text: 'com todo meu corpo', time: '22:26', isRight: false },
      { id: 'd4', text: 'com toda a minha alma', time: '22:26', isRight: false },
      { id: 'd5', text: 'tô com uma saudade imensa', time: '22:27', isRight: false },
      { id: 'd6', text: 'eu também te amo', time: '22:28', isRight: true },
      { id: 'd7', text: 'mais do que eu consigo colocar em palavras', time: '22:28', isRight: true },
    ],
    interludePhrase: "e então, éramos um. de verdade."
  },
  {
    id: 'nossa-historia-visual',
    type: 'image',
    emoji: '🎞️',
    title: 'nossa história em imagens',
    quote: '"fecho os olhos e agradeço por cada capítulo que vivemos juntos."',
    content: [
      'Olho para as nossas fotos e vejo a nossa jornada inteira. Os sorrisos, os abraços, os momentos roubados.',
      'Cada imagem conta uma história. Cada expressão guarda um sentimento. E todas elas me levam até você.',
      'Não existe passado sem você no meu futuro. Não existe eu sem nós.'
    ],
    imageUrl: 'https://i.imgur.com/60eCSMU.png',
    imageCaption: 'cada foto é uma prova\nde que a gente foi feito um pro outro',
    interludePhrase: "cada pedaço de mim ama cada pedaço seu."
  },
  {
    id: 'hoje-o-dia',
    type: 'text',
    emoji: '📅',
    title: 'hoje',
    quote: '"tudo o que passamos foi pra nos trazer até este exato momento."',
    content: [
      'Hoje eu acordei diferente. Com uma certeza que martelava no peito e não me deixava em paz.',
      'Não quero mais perder tempo. A vida é curta demais para não estar com quem faz a nossa alma vibrar.',
      'Você foi. Você voltou. E agora, eu quero garantir que você fique. Pra sempre, se você deixar.',
      'Cada despedida, cada lágrima, cada reencontro... tudo nos trouxe até aqui.'
    ],
    interludePhrase: "chegou a hora de transformar essa história em para sempre."
  },
  {
    id: 'proxima-pagina',
    type: 'text',
    emoji: '♾️',
    title: 'a próxima página',
    quote: '"talvez o sempre seja muito tempo. mas é exatamente o tempo que eu quero tentar com você."',
    content: [
      'Dizem que nada dura pra sempre. Mas eu quero provar que eles estão errados.',
      'Cristina, a gente já escreveu o começo dessa história. Sobrevivemos ao meio turbulento, ao tempo separados, à saudade.',
      'Agora só falta uma coisa pra essa história ficar completa...',

    ]
  }
];
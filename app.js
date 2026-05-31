const STORAGE_KEY = "brand-flow-state";

const archetypes = [
  {
    id: "innocent",
    name: "Inocente",
    shortDescription: "Marcas simples, otimistas e confiáveis, que prometem leveza e segurança.",
    keywords: ["simplicidade", "otimismo", "confiança"],
    summary: "O Inocente busca clareza, segurança e uma experiência livre de ruídos. É ideal para marcas que querem parecer acessíveis, honestas e fáceis de entender.",
    behavior: "Comunica com transparência, evita exageros e cria uma sensação de conforto imediato.",
    voice: "Leve, positiva, direta e acolhedora.",
    visualDirection: "Layouts limpos, muito espaço, formas suaves, luz e baixa complexidade visual.",
    recommendedColors: "Branco, bege, azul claro, amarelo suave e tons pastel.",
    recommendedFonts: "Sans-serif arredondadas e simples, como Nunito, Quicksand e DM Sans.",
    visualElements: "Ícones simples, círculos, ilustrações suaves, fundos claros e microinterações gentis.",
    whenToUse: "Produtos familiares, saúde leve, educação básica, marcas de bem-estar e soluções simples.",
    whenToAvoid: "Marcas que precisam parecer agressivas, rebeldes, complexas ou altamente técnicas.",
    examples: "Produtos naturais, apps de organização simples, marcas infantis e serviços de cuidado leve."
  },
  {
    id: "sage",
    name: "Sábio",
    shortDescription: "Marcas que educam, explicam e transmitem conhecimento com clareza.",
    keywords: ["clareza", "inteligência", "confiança"],
    summary: "O Sábio transforma informação em entendimento. Funciona muito bem para marcas que precisam transmitir autoridade, método e profundidade.",
    behavior: "Organiza ideias, explica decisões e prefere argumentos sólidos a promessas genéricas.",
    voice: "Racional, clara, analítica e precisa.",
    visualDirection: "Editorial, organizado, técnico, com grid forte e boa hierarquia de informação.",
    recommendedColors: "Azul, cinza, branco, tons frios e acentos discretos.",
    recommendedFonts: "Serifadas editoriais e sans-serif neutras, como Playfair Display, Merriweather, Inter e IBM Plex Sans.",
    visualElements: "Diagramas, linhas, tabelas, grids, cards informativos e ícones técnicos.",
    whenToUse: "Consultorias, educação, tecnologia, dados, pesquisa, finanças e negócios B2B.",
    whenToAvoid: "Marcas que dependem mais de diversão, impulso, rebeldia ou sensualidade.",
    examples: "Plataformas de dados, cursos, consultorias estratégicas e ferramentas profissionais."
  },
  {
    id: "explorer",
    name: "Explorador",
    shortDescription: "Marcas ligadas a liberdade, descoberta, autonomia e movimento.",
    keywords: ["liberdade", "descoberta", "autonomia"],
    summary: "O Explorador convida o público a sair do padrão. É útil para marcas que vendem independência, jornada, natureza ou expansão pessoal.",
    behavior: "Estimula escolhas próprias, movimento e descoberta de novas possibilidades.",
    voice: "Livre, corajosa, direta e inspiradora.",
    visualDirection: "Aberta, orgânica, com sensação de espaço, textura e movimento.",
    recommendedColors: "Verde, areia, azul profundo, marrom, terracota e tons naturais.",
    recommendedFonts: "Humanistas, orgânicas ou sans modernas como Alegreya Sans, Montserrat e Manrope.",
    visualElements: "Mapas, linhas de rota, texturas naturais, fotografias amplas e shapes orgânicos.",
    whenToUse: "Viagens, outdoor, lifestyle, educação livre, inovação e desenvolvimento pessoal.",
    whenToAvoid: "Marcas que precisam parecer rígidas, tradicionais ou altamente controladas.",
    examples: "Marcas de aventura, turismo, produtos outdoor e apps de descoberta."
  },
  {
    id: "hero",
    name: "Herói",
    shortDescription: "Marcas que prometem superação, performance e vitória.",
    keywords: ["coragem", "força", "performance"],
    summary: "O Herói atua em torno de desafio e conquista. Ele cria energia para ação, transformação e resultados mensuráveis.",
    behavior: "Mostra metas, evolução, provas de força e chamadas diretas para agir.",
    voice: "Forte, motivadora, objetiva e determinada.",
    visualDirection: "Alto contraste, formas fortes, composição direta e elementos de impacto.",
    recommendedColors: "Vermelho, preto, amarelo, azul intenso e tons metálicos.",
    recommendedFonts: "Bold, condensadas e impactantes como Oswald, Bebas Neue e Anton.",
    visualElements: "Setas, diagonais, barras, placares, medalhas, números grandes e gráficos de progresso.",
    whenToUse: "Fitness, esporte, vendas, performance, educação competitiva e marcas de desafio.",
    whenToAvoid: "Marcas que precisam parecer delicadas, contemplativas ou acolhedoras demais.",
    examples: "Academias, marcas esportivas, produtos de alta performance e campanhas de superação."
  },
  {
    id: "outlaw",
    name: "Fora da Lei",
    shortDescription: "Marcas que quebram padrões, provocam e desafiam o mercado.",
    keywords: ["ruptura", "atitude", "provocação"],
    summary: "O Fora da Lei existe para questionar regras. É ideal para marcas que querem criar contraste, atitude e senso de movimento contra o óbvio.",
    behavior: "Provoca, simplifica pela ruptura e assume opiniões fortes.",
    voice: "Direta, ácida, intensa e provocadora.",
    visualDirection: "Urbana, escura, crua, com contraste e elementos de tensão.",
    recommendedColors: "Preto, vermelho, cinza, roxo escuro e tons metálicos.",
    recommendedFonts: "Grotescas fortes, display pesadas e condensadas como Archivo Black, Space Grotesk e Bebas Neue.",
    visualElements: "Texturas urbanas, cortes, ruído controlado, stickers, selos e composições assimétricas.",
    whenToUse: "Moda urbana, música, tecnologia disruptiva, campanhas provocativas e marcas anti-status quo.",
    whenToAvoid: "Marcas que precisam passar segurança institucional, cuidado ou neutralidade.",
    examples: "Streetwear, produtos alternativos, comunidades rebeldes e lançamentos de ruptura."
  },
  {
    id: "magician",
    name: "Mago",
    shortDescription: "Marcas que prometem transformação, encantamento e visão de futuro.",
    keywords: ["transformação", "visão", "encanto"],
    summary: "O Mago cria uma sensação de possibilidade. Funciona para marcas que tornam algo complexo em uma experiência surpreendente ou quase mágica.",
    behavior: "Mostra antes e depois, revela processos e cria expectativa.",
    voice: "Visionária, magnética, elegante e inspiradora.",
    visualDirection: "Misteriosa, luminosa, futurista e aspiracional.",
    recommendedColors: "Roxo, azul elétrico, dourado, preto profundo e gradientes.",
    recommendedFonts: "Elegantes e tecnológicas como Cinzel, Syne e Cormorant Garamond.",
    visualElements: "Glows, partículas, gradientes, símbolos, círculos, constelações e efeitos de luz.",
    whenToUse: "IA, tecnologia, beleza premium, transformação pessoal, entretenimento e inovação.",
    whenToAvoid: "Marcas que precisam parecer extremamente simples, populares ou burocráticas.",
    examples: "Produtos de IA, marcas de beleza transformadora, apps criativos e experiências imersivas."
  },
  {
    id: "everyman",
    name: "Pessoa Comum",
    shortDescription: "Marcas próximas, acessíveis e humanas, que criam pertencimento.",
    keywords: ["proximidade", "simplicidade", "pertencimento"],
    summary: "A Pessoa Comum reduz distância. É ideal para marcas que querem parecer úteis, honestas e presentes no cotidiano.",
    behavior: "Fala sem pose, evita elitismo e cria identificação direta.",
    voice: "Simples, humana, próxima e objetiva.",
    visualDirection: "Funcional, cotidiano, acessível e sem excesso de sofisticação.",
    recommendedColors: "Azul médio, verde, bege, cinza suave e cores familiares.",
    recommendedFonts: "Sans-serif legíveis e universais como Inter, Lato e Open Sans.",
    visualElements: "Fotografia real, cards simples, ícones claros, listas e componentes práticos.",
    whenToUse: "Serviços locais, varejo, comunidades, produtos de massa e apps utilitários.",
    whenToAvoid: "Marcas que querem parecer luxuosas, mágicas ou extremamente exclusivas.",
    examples: "Mercados, apps de bairro, serviços populares e plataformas de comunidade."
  },
  {
    id: "lover",
    name: "Amante",
    shortDescription: "Marcas sensoriais, belas e emocionais, ligadas a desejo e conexão.",
    keywords: ["beleza", "desejo", "conexão"],
    summary: "O Amante trabalha desejo, estética e experiência sensorial. É indicado para marcas que querem criar vínculo emocional e percepção refinada.",
    behavior: "Valoriza detalhes, atmosfera, relacionamento e prazer na experiência.",
    voice: "Elegante, sensível, calorosa e envolvente.",
    visualDirection: "Refinada, quente, editorial, com foco em textura, detalhe e composição.",
    recommendedColors: "Vinho, rosa, nude, dourado suave, creme e tons quentes.",
    recommendedFonts: "Serifadas elegantes e humanistas como Cormorant Garamond, Playfair Display e Prata.",
    visualElements: "Fotografia sensorial, texturas suaves, curvas, luz quente, composições premium.",
    whenToUse: "Moda, beleza, gastronomia, relacionamento, luxo acessível e experiências premium.",
    whenToAvoid: "Marcas que precisam parecer frias, técnicas, rápidas ou agressivas.",
    examples: "Marcas de perfume, restaurantes, moda autoral e serviços de estética."
  },
  {
    id: "jester",
    name: "Bobo da Corte",
    shortDescription: "Marcas divertidas, leves e espontâneas, que geram energia social.",
    keywords: ["diversão", "leveza", "espontaneidade"],
    summary: "O Bobo da Corte usa humor e surpresa para criar conexão. Funciona quando a marca precisa ser lembrada por alegria e leveza.",
    behavior: "Quebra formalidades, usa timing e transforma interação em experiência divertida.",
    voice: "Bem-humorada, rápida, informal e criativa.",
    visualDirection: "Colorida, dinâmica, expressiva e com elementos lúdicos.",
    recommendedColors: "Amarelo, laranja, rosa, azul vibrante e combinações inesperadas.",
    recommendedFonts: "Display arredondadas e expressivas como Fredoka, Baloo 2 e Bricolage Grotesque.",
    visualElements: "Mascotes, stickers, emojis, formas orgânicas, microanimações e composições divertidas.",
    whenToUse: "Entretenimento, food, creators, comunidades, produtos jovens e redes sociais.",
    whenToAvoid: "Marcas que precisam parecer extremamente sérias, jurídicas ou institucionais.",
    examples: "Apps sociais, snack brands, criadores de conteúdo e campanhas virais."
  },
  {
    id: "caregiver",
    name: "Cuidador",
    shortDescription: "Marcas que protegem, acolhem e ajudam o público a se sentir seguro.",
    keywords: ["proteção", "acolhimento", "apoio"],
    summary: "O Cuidador coloca a necessidade do outro no centro. É ideal para marcas que vendem confiança, suporte e segurança emocional.",
    behavior: "Acompanha, explica com paciência e reduz ansiedade.",
    voice: "Gentil, clara, empática e confiável.",
    visualDirection: "Calma, suave, humana e com bastante respiro.",
    recommendedColors: "Verde claro, azul suave, creme, rosa pálido e tons naturais.",
    recommendedFonts: "Arredondadas e legíveis como Nunito, Lora e Quicksand.",
    visualElements: "Círculos, ilustrações humanas, checklists, cards de suporte e fotografia acolhedora.",
    whenToUse: "Saúde, educação, suporte, assistência, bem-estar, infância e serviços familiares.",
    whenToAvoid: "Marcas que precisam parecer radicais, luxuosas ou altamente competitivas.",
    examples: "Clínicas, produtos de cuidado, apps de saúde e serviços educacionais."
  },
  {
    id: "creator",
    name: "Criador",
    shortDescription: "Marcas autorais, expressivas e inovadoras, que transformam ideias em forma.",
    keywords: ["imaginação", "autoria", "originalidade"],
    summary: "O Criador valoriza construção, expressão e inovação. É perfeito para marcas que querem parecer autorais, estéticas e inventivas.",
    behavior: "Mostra processo, experimentação e resultado visual com ponto de vista.",
    voice: "Criativa, confiante, visual e inspiradora.",
    visualDirection: "Experimental, artística, flexível, com composições marcantes.",
    recommendedColors: "Roxo, magenta, laranja, off-white e combinações expressivas.",
    recommendedFonts: "Display criativas combinadas com sans limpas como Syne, Bricolage Grotesque e Fraunces.",
    visualElements: "Patterns, colagens, shapes, grids editoriais, mockups, selos e variações visuais.",
    whenToUse: "Design, conteúdo, moda, produto digital, agências, estúdios e marcas autorais.",
    whenToAvoid: "Marcas que precisam parecer totalmente neutras, burocráticas ou convencionais.",
    examples: "Estúdios criativos, portfólios, produtos digitais, marcas de design e creators."
  },
  {
    id: "ruler",
    name: "Governante",
    shortDescription: "Marcas de liderança, controle, prestígio e estrutura.",
    keywords: ["liderança", "prestígio", "ordem"],
    summary: "O Governante transmite segurança pela autoridade. É usado por marcas que querem liderar categoria, estabelecer padrão e parecer sólidas.",
    behavior: "Cria regras, organiza decisões e comunica domínio sobre o mercado.",
    voice: "Sofisticada, firme, institucional e segura.",
    visualDirection: "Premium, estruturada, elegante, com simetria e alto controle visual.",
    recommendedColors: "Preto, dourado, azul-marinho, branco e tons sóbrios.",
    recommendedFonts: "Serifadas clássicas e sans sofisticadas como Cinzel, Cormorant Garamond e Montserrat.",
    visualElements: "Brasões, monogramas, linhas finas, molduras, grids simétricos e fotografia premium.",
    whenToUse: "Luxo, finanças, advocacia, arquitetura, consultorias premium e marcas corporativas.",
    whenToAvoid: "Marcas que precisam parecer populares, engraçadas ou improvisadas.",
    examples: "Bancos, escritórios premium, marcas institucionais, luxo e liderança de mercado."
  }
];

const secondaryCompatibility = {
  innocent: ["caregiver", "everyman", "sage", "lover"],
  sage: ["creator", "ruler", "magician", "caregiver", "explorer"],
  explorer: ["sage", "hero", "creator", "outlaw", "everyman"],
  hero: ["ruler", "explorer", "sage", "magician", "outlaw"],
  outlaw: ["hero", "explorer", "magician", "creator", "jester"],
  magician: ["sage", "creator", "ruler", "hero", "lover"],
  everyman: ["innocent", "caregiver", "jester", "explorer", "lover"],
  lover: ["creator", "innocent", "caregiver", "ruler", "magician"],
  jester: ["everyman", "creator", "outlaw", "innocent", "lover"],
  caregiver: ["innocent", "everyman", "sage", "lover", "ruler"],
  creator: ["magician", "sage", "lover", "jester", "explorer"],
  ruler: ["sage", "hero", "magician", "caregiver", "lover"]
};

const typographyByArchetype = {
  innocent: [
    { font: "Nunito", feeling: "amigável, simples e otimista", pairings: [{ font: "Inter", feeling: "limpa e digital" }, { font: "Lato", feeling: "humana e acessível" }, { font: "Open Sans", feeling: "neutra e universal" }] },
    { font: "Quicksand", feeling: "leve, arredondada e acolhedora", pairings: [{ font: "Nunito Sans", feeling: "suave e legível" }, { font: "DM Sans", feeling: "moderna e simples" }, { font: "Manrope", feeling: "digital e organizada" }] },
    { font: "DM Sans", feeling: "minimalista, clara e positiva", pairings: [{ font: "Nunito", feeling: "amigável e leve" }, { font: "Source Sans 3", feeling: "editorial e limpa" }, { font: "Work Sans", feeling: "funcional e direta" }] }
  ],
  sage: [
    { font: "Playfair Display", feeling: "editorial, sofisticada e intelectual", pairings: [{ font: "Inter", feeling: "limpa, moderna e legível" }, { font: "Source Sans 3", feeling: "editorial e fluida" }, { font: "IBM Plex Sans", feeling: "técnica e confiável" }] },
    { font: "Merriweather", feeling: "confiável, profunda e clássica", pairings: [{ font: "Lato", feeling: "humana e clara" }, { font: "Open Sans", feeling: "neutra e universal" }, { font: "Nunito Sans", feeling: "leve e acessível" }] },
    { font: "Libre Baskerville", feeling: "clássica, séria e precisa", pairings: [{ font: "Montserrat", feeling: "estruturada e moderna" }, { font: "Work Sans", feeling: "funcional e clara" }, { font: "DM Sans", feeling: "minimalista e atual" }] }
  ],
  explorer: [
    { font: "Alegreya Sans", feeling: "orgânica, livre e humana", pairings: [{ font: "Lato", feeling: "acessível e equilibrada" }, { font: "Source Sans 3", feeling: "clara e editorial" }, { font: "Nunito Sans", feeling: "leve e amigável" }] },
    { font: "Montserrat", feeling: "aberta, moderna e confiante", pairings: [{ font: "Merriweather Sans", feeling: "natural e legível" }, { font: "Open Sans", feeling: "simples e funcional" }, { font: "Work Sans", feeling: "limpa e prática" }] },
    { font: "Manrope", feeling: "digital, livre e contemporânea", pairings: [{ font: "Inter", feeling: "neutra e precisa" }, { font: "DM Sans", feeling: "leve e moderna" }, { font: "Lora", feeling: "humana e narrativa" }] }
  ],
  hero: [
    { font: "Oswald", feeling: "forte, direta e determinada", pairings: [{ font: "Inter", feeling: "limpa e objetiva" }, { font: "Roboto", feeling: "funcional e clara" }, { font: "Source Sans 3", feeling: "legível e editorial" }] },
    { font: "Bebas Neue", feeling: "impactante, esportiva e energética", pairings: [{ font: "Montserrat", feeling: "forte e moderna" }, { font: "Manrope", feeling: "digital e controlada" }, { font: "Lato", feeling: "humana e direta" }] },
    { font: "Anton", feeling: "pesada, intensa e memorável", pairings: [{ font: "Open Sans", feeling: "simples e estável" }, { font: "DM Sans", feeling: "limpa e atual" }, { font: "Work Sans", feeling: "funcional e firme" }] }
  ],
  outlaw: [
    { font: "Archivo Black", feeling: "radical, pesada e provocativa", pairings: [{ font: "Inter", feeling: "neutra e legível" }, { font: "IBM Plex Sans", feeling: "técnica e precisa" }, { font: "Roboto", feeling: "funcional e direta" }] },
    { font: "Space Grotesk", feeling: "moderna, disruptiva e tecnológica", pairings: [{ font: "Manrope", feeling: "digital e refinada" }, { font: "DM Sans", feeling: "limpa e minimalista" }, { font: "Source Sans 3", feeling: "clara e editorial" }] },
    { font: "Bebas Neue", feeling: "urbana, intensa e direta", pairings: [{ font: "Montserrat", feeling: "estruturada e forte" }, { font: "Work Sans", feeling: "funcional e seca" }, { font: "Open Sans", feeling: "simples e estável" }] }
  ],
  magician: [
    { font: "Cinzel", feeling: "mística, elegante e transformadora", pairings: [{ font: "Inter", feeling: "moderna e limpa" }, { font: "Manrope", feeling: "digital e sofisticada" }, { font: "Source Sans 3", feeling: "clara e editorial" }] },
    { font: "Syne", feeling: "futurista, criativa e magnética", pairings: [{ font: "DM Sans", feeling: "minimalista e digital" }, { font: "Sora", feeling: "geométrica e tecnológica" }, { font: "IBM Plex Sans", feeling: "técnica e confiável" }] },
    { font: "Cormorant Garamond", feeling: "sofisticada, simbólica e encantadora", pairings: [{ font: "Montserrat", feeling: "moderna e estruturada" }, { font: "Work Sans", feeling: "clara e funcional" }, { font: "Lato", feeling: "humana e leve" }] }
  ],
  everyman: [
    { font: "Inter", feeling: "simples, acessível e confiável", pairings: [{ font: "Merriweather", feeling: "humana e editorial" }, { font: "Nunito Sans", feeling: "leve e amigável" }, { font: "Source Sans 3", feeling: "clara e objetiva" }] },
    { font: "Lato", feeling: "humana, próxima e equilibrada", pairings: [{ font: "Montserrat", feeling: "moderna e organizada" }, { font: "Open Sans", feeling: "universal e estável" }, { font: "Roboto", feeling: "funcional e direta" }] },
    { font: "Open Sans", feeling: "neutra, simples e popular", pairings: [{ font: "Lora", feeling: "humana e narrativa" }, { font: "DM Sans", feeling: "digital e limpa" }, { font: "Work Sans", feeling: "prática e clara" }] }
  ],
  lover: [
    { font: "Cormorant Garamond", feeling: "elegante, sensorial e refinada", pairings: [{ font: "Montserrat", feeling: "moderna e premium" }, { font: "Lato", feeling: "humana e suave" }, { font: "Manrope", feeling: "digital e elegante" }] },
    { font: "Playfair Display", feeling: "charmosa, editorial e emocional", pairings: [{ font: "Inter", feeling: "limpa e contemporânea" }, { font: "DM Sans", feeling: "minimalista e sofisticada" }, { font: "Source Sans 3", feeling: "editorial e legível" }] },
    { font: "Prata", feeling: "luxuosa, delicada e marcante", pairings: [{ font: "Open Sans", feeling: "simples e equilibrada" }, { font: "Work Sans", feeling: "moderna e discreta" }, { font: "Nunito Sans", feeling: "leve e acolhedora" }] }
  ],
  jester: [
    { font: "Fredoka", feeling: "divertida, arredondada e expressiva", pairings: [{ font: "Inter", feeling: "organizada e legível" }, { font: "Nunito Sans", feeling: "leve e amigável" }, { font: "DM Sans", feeling: "moderna e simples" }] },
    { font: "Baloo 2", feeling: "brincalhona, marcante e popular", pairings: [{ font: "Lato", feeling: "humana e clara" }, { font: "Open Sans", feeling: "simples e estável" }, { font: "Work Sans", feeling: "funcional e limpa" }] },
    { font: "Bricolage Grotesque", feeling: "criativa, expressiva e contemporânea", pairings: [{ font: "Manrope", feeling: "digital e organizada" }, { font: "Sora", feeling: "geométrica e moderna" }, { font: "Source Sans 3", feeling: "editorial e legível" }] }
  ],
  caregiver: [
    { font: "Nunito", feeling: "acolhedora, gentil e segura", pairings: [{ font: "Lato", feeling: "humana e clara" }, { font: "Open Sans", feeling: "simples e acessível" }, { font: "Source Sans 3", feeling: "editorial e limpa" }] },
    { font: "Lora", feeling: "sensível, humana e confiável", pairings: [{ font: "Inter", feeling: "clara e moderna" }, { font: "DM Sans", feeling: "leve e digital" }, { font: "Work Sans", feeling: "funcional e objetiva" }] },
    { font: "Quicksand", feeling: "suave, próxima e amigável", pairings: [{ font: "Nunito Sans", feeling: "acolhedora e legível" }, { font: "Manrope", feeling: "moderna e organizada" }, { font: "Roboto", feeling: "simples e funcional" }] }
  ],
  creator: [
    { font: "Syne", feeling: "autoral, experimental e contemporânea", pairings: [{ font: "Inter", feeling: "limpa e estável" }, { font: "DM Sans", feeling: "minimalista e digital" }, { font: "Sora", feeling: "geométrica e moderna" }] },
    { font: "Bricolage Grotesque", feeling: "expressiva, artística e flexível", pairings: [{ font: "Manrope", feeling: "digital e organizada" }, { font: "Source Sans 3", feeling: "editorial e clara" }, { font: "Work Sans", feeling: "funcional e contemporânea" }] },
    { font: "Fraunces", feeling: "criativa, elegante e autoral", pairings: [{ font: "Inter", feeling: "limpa e moderna" }, { font: "Nunito Sans", feeling: "leve e acessível" }, { font: "IBM Plex Sans", feeling: "técnica e precisa" }] }
  ],
  ruler: [
    { font: "Cinzel", feeling: "nobre, clássica e institucional", pairings: [{ font: "Inter", feeling: "moderna e objetiva" }, { font: "Source Sans 3", feeling: "editorial e clara" }, { font: "Manrope", feeling: "sofisticada e digital" }] },
    { font: "Cormorant Garamond", feeling: "elegante, premium e tradicional", pairings: [{ font: "Montserrat", feeling: "estruturada e moderna" }, { font: "Lato", feeling: "humana e equilibrada" }, { font: "Work Sans", feeling: "funcional e refinada" }] },
    { font: "Montserrat", feeling: "forte, corporativa e organizada", pairings: [{ font: "Libre Baskerville", feeling: "clássica e confiável" }, { font: "DM Sans", feeling: "minimalista e digital" }, { font: "Open Sans", feeling: "simples e estável" }] }
  ]
};

const baseColorOptions = {
  innocent: [{name:"Amarelo Claro",hex:"#FDE68A",meaning:"leveza e otimismo"},{name:"Azul Céu",hex:"#93C5FD",meaning:"confiança tranquila"},{name:"Creme Solar",hex:"#FEF3C7",meaning:"simplicidade acolhedora"}],
  sage: [{name:"Azul Estratégico",hex:"#2563EB",meaning:"clareza e inteligência"},{name:"Azul Profundo",hex:"#1E3A8A",meaning:"autoridade e profundidade"},{name:"Ciano Técnico",hex:"#0891B2",meaning:"precisão e análise"}],
  explorer: [{name:"Verde Rota",hex:"#15803D",meaning:"liberdade natural"},{name:"Areia Viva",hex:"#C2A66A",meaning:"jornada e natureza"},{name:"Azul Horizonte",hex:"#0369A1",meaning:"amplitude e descoberta"}],
  hero: [{name:"Vermelho Vitória",hex:"#DC2626",meaning:"ação e coragem"},{name:"Azul Impacto",hex:"#1D4ED8",meaning:"força controlada"},{name:"Laranja Energia",hex:"#EA580C",meaning:"movimento e performance"}],
  outlaw: [{name:"Vermelho Ruptura",hex:"#B91C1C",meaning:"provocação"},{name:"Roxo Urbano",hex:"#6D28D9",meaning:"subversão criativa"},{name:"Grafite Radical",hex:"#374151",meaning:"atitude seca"}],
  magician: [{name:"Roxo Transformação",hex:"#7C3AED",meaning:"visão e encanto"},{name:"Azul Elétrico",hex:"#2563EB",meaning:"futuro e tecnologia"},{name:"Dourado Ritual",hex:"#D97706",meaning:"valor e magia"}],
  everyman: [{name:"Azul Próximo",hex:"#3B82F6",meaning:"confiança acessível"},{name:"Verde Cotidiano",hex:"#16A34A",meaning:"utilidade e vida real"},{name:"Cinza Humano",hex:"#64748B",meaning:"simplicidade"}],
  lover: [{name:"Vinho Sensorial",hex:"#9F1239",meaning:"desejo e profundidade"},{name:"Rosa Elegante",hex:"#DB2777",meaning:"beleza emocional"},{name:"Nude Premium",hex:"#C08457",meaning:"calor e refinamento"}],
  jester: [{name:"Amarelo Energia",hex:"#FACC15",meaning:"diversão e presença"},{name:"Rosa Pop",hex:"#EC4899",meaning:"espontaneidade"},{name:"Laranja Brincante",hex:"#F97316",meaning:"alegria em movimento"}],
  caregiver: [{name:"Verde Cuidado",hex:"#22C55E",meaning:"acolhimento"},{name:"Azul Sereno",hex:"#60A5FA",meaning:"segurança"},{name:"Rosa Suave",hex:"#F9A8D4",meaning:"delicadeza"}],
  creator: [{name:"Roxo Autoral",hex:"#8B5CF6",meaning:"imaginação"},{name:"Magenta Criativo",hex:"#D946EF",meaning:"expressão"},{name:"Laranja Ideia",hex:"#F97316",meaning:"energia criativa"}],
  ruler: [{name:"Azul Marinho",hex:"#1E3A8A",meaning:"liderança"},{name:"Dourado Prestígio",hex:"#B45309",meaning:"valor e autoridade"},{name:"Preto Imperial",hex:"#111827",meaning:"controle e sofisticação"}]
};

const defaultState = {
  currentStep: "intro",
  primaryArchetype: null,
  secondaryArchetype: null,
  selectedHeadingFont: null,
  selectedBodyFont: null,
  selectedPrimaryColor: null,
  selectedSecondaryColor: null,
  selectedAccentColor: null,
  selectedBackgroundColor: null,
  selectedTextColor: null,
  colors: { primary: null, secondary: null, accent: null, background: null, text: null },
  brandName: "NOVA",
  tagline: "Uma marca criada com direção, personalidade e presença.",
  ctaText: "Conhecer marca"
};

let state = loadState();

function cloneData(value) {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  try {
    const raw = window.localStorage ? localStorage.getItem(STORAGE_KEY) : null;
    const saved = raw ? JSON.parse(raw) : null;
    return saved ? { ...cloneData(defaultState), ...saved, colors: { ...defaultState.colors, ...(saved.colors || {}) } } : cloneData(defaultState);
  } catch {
    return cloneData(defaultState);
  }
}

function saveState() {
  try {
    if (window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch {
    // O app continua funcionando mesmo quando o navegador bloqueia localStorage em arquivo local.
  }
}

function setStep(step) {
  state.currentStep = step;
  saveState();
  render();
}

function getArchetype(id) {
  return archetypes.find(a => a.id === id);
}

function applyBrandVars() {
  const root = document.documentElement;
  root.style.setProperty("--brand-primary", state.colors.primary || "#2563EB");
  root.style.setProperty("--brand-secondary", state.colors.secondary || "#64748B");
  root.style.setProperty("--brand-accent", state.colors.accent || "#F59E0B");
  root.style.setProperty("--brand-background", state.colors.background || "#F8FAFC");
  root.style.setProperty("--brand-text", state.colors.text || "#0F172A");
  root.style.setProperty("--brand-font-heading", `"${state.selectedHeadingFont || "Playfair Display"}", ${isSerif(state.selectedHeadingFont) ? "serif" : "sans-serif"}`);
  root.style.setProperty("--brand-font-body", `"${state.selectedBodyFont || "Inter"}", ${isSerif(state.selectedBodyFont) ? "serif" : "sans-serif"}`);
}

function isSerif(font) {
  return ["Playfair Display","Merriweather","Libre Baskerville","Lora","Cormorant Garamond","Prata","Cinzel","Fraunces"].includes(font);
}

function render() {
  applyBrandVars();
  const header = document.querySelector("[data-app-header]");
  if (header) header.hidden = state.currentStep === "intro";
  const view = document.getElementById("view");
  view.innerHTML = "";

  if (state.currentStep === "intro") renderIntro(view);
  if (state.currentStep === "primary-archetype") renderArchetypeStep(view, "primary");
  if (state.currentStep === "secondary-archetype") renderArchetypeStep(view, "secondary");
  if (state.currentStep === "heading-font") renderHeadingFont(view);
  if (state.currentStep === "body-font") renderBodyFont(view);
  if (state.currentStep === "primary-color") renderPrimaryColor(view);
  if (state.currentStep === "linked-colors") renderLinkedColors(view);
  if (state.currentStep === "brand-flow") renderFinalFlow(view);
  bindGlobal();
}

function renderIntro(view) {
  view.innerHTML = `
    <section class="screen intro-screen">
      <div class="intro-bg-flow" aria-hidden="true">
        <span class="intro-node intro-node-a">Archetype</span>
        <span class="intro-node intro-node-b">Fonts</span>
        <span class="intro-node intro-node-c">Colors</span>
        <span class="intro-node intro-node-d">Preview</span>
        <svg class="intro-lines" viewBox="0 0 920 430">
          <path d="M120 210 C290 70 440 70 570 210" />
          <path d="M120 210 C320 350 520 350 800 210" />
          <path d="M570 210 C650 150 720 150 800 210" />
        </svg>
      </div>
      <div class="intro-content">
        <span class="kicker">Branding Kit App</span>
        <h1>Brand Flow</h1>
        <p class="intro-lead">Crie um mini branding kit visual em poucos passos.</p>
        <p class="intro-copy">Escolha a personalidade da marca, combine fontes do Google Fonts e construa um sistema visual coerente em um fluxo de nodes.</p>
        <button class="primary-btn" type="button" data-start>Começar</button>
      </div>
    </section>
  `;
  view.querySelector("[data-start]").addEventListener("click", () => setStep("primary-archetype"));
}

function screenHead(title, subtitle, extra = "") {
  return `<div class="screen-head"><h1 class="screen-title">${title}</h1><p class="screen-subtitle">${subtitle}</p>${extra}</div>`;
}

function renderArchetypeStep(view, mode) {
  const isSecondary = mode === "secondary";
  const extra = isSecondary ? `<div class="step-actions"><button class="ghost-btn" data-skip-secondary type="button">Pular</button></div>` : "";
  view.innerHTML = `
    <section class="screen">
      ${screenHead(isSecondary ? "Escolha um arquétipo secundário" : "Escolha o arquétipo da sua marca",
        isSecondary ? "O arquétipo secundário adiciona nuances à personalidade da marca. Essa etapa é opcional." : "Cada arquétipo define uma direção visual, verbal e emocional para a identidade.",
        extra)}
      <div class="carousel-wrap" data-carousel-wrap>
        <div class="carousel" data-carousel>
          ${getVisibleArchetypes(mode).map((a, i) => archetypeCard(a, i, mode)).join("")}
        </div>
      </div>
    </section>
  `;
  const carousel = view.querySelector("[data-carousel]");
  const carouselWrap = view.querySelector("[data-carousel-wrap]");
  requestAnimationFrame(() => {
    centerCarouselCard(carousel, carousel.querySelector("[data-card]:not(.is-disabled)") || carousel.querySelector("[data-card]"));
    updateCarouselCenter(carousel);
  });
  carousel.addEventListener("scroll", () => requestAnimationFrame(() => updateCarouselCenter(carousel)));
  setupMouseGuidedCarousel(carouselWrap, carousel);
  view.querySelectorAll("[data-read]").forEach(btn => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      openArchetypeModal(btn.dataset.read, mode);
    });
  });


  view.querySelectorAll(".archetype-card:not(.is-disabled)").forEach(card => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      centerCarouselCard(carousel, card);
      updateCarouselCenter(carousel);
    });

    card.addEventListener("dblclick", (event) => {
      if (event.target.closest("button")) return;
      selectArchetype(card.dataset.id, mode);
    });
  });

  const skip = view.querySelector("[data-skip-secondary]");
  if (skip) skip.addEventListener("click", () => {
    state.secondaryArchetype = null;
    saveState();
    setStep("heading-font");
  });
}

function getVisibleArchetypes(mode) {
  if (mode !== "secondary") return archetypes;
  const allowed = secondaryCompatibility[state.primaryArchetype] || [];
  return archetypes.filter(a => allowed.includes(a.id));
}

function archetypeCard(a, i, mode) {
  const disabled = getArchetypeDisabled(a.id, mode);
  const badge = disabled === "primary" ? `<span class="card-badge">Arquétipo principal</span>` : disabled === "incompatible" ? `<span class="card-badge">Pouco compatível</span>` : "";
  return `
    <article class="archetype-card ${disabled ? "is-disabled" : ""}" data-card data-id="${a.id}">
      <div>
        <span class="card-index">${String(i + 1).padStart(2, "0")}</span>
        <h3>${a.name}</h3>
        <p>${a.shortDescription}</p>
        <div class="keywords">${a.keywords.map(k => `<span class="keyword">${k}</span>`).join("")}</div>
      </div>
      <div>
        ${badge}
        <div class="card-footer">
          <button class="node-btn" data-read="${a.id}" type="button" ${disabled ? "disabled" : ""}>Ler mais</button>
        </div>
      </div>
    </article>
  `;
}


function selectArchetype(id, mode) {
  if (getArchetypeDisabled(id, mode)) return;

  if (mode === "primary") {
    state.primaryArchetype = id;
    state.secondaryArchetype = null;
    resetAfterArchetypes();
    saveState();
    setStep("secondary-archetype");
    return;
  }

  state.secondaryArchetype = id;
  resetAfterArchetypes();
  saveState();
  setStep("heading-font");
}

function getArchetypeDisabled(id, mode) {
  if (mode !== "secondary") return null;
  if (id === state.primaryArchetype) return "primary";
  const allowed = secondaryCompatibility[state.primaryArchetype] || [];
  return allowed.includes(id) ? null : "incompatible";
}

function centerCarouselCard(carousel, card) {
  if (!carousel || !card) return;
  const left = card.offsetLeft - (carousel.clientWidth / 2) + (card.offsetWidth / 2);
  carousel.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
}

function setupMouseGuidedCarousel(wrap, carousel) {
  if (!wrap || !carousel) return;

  let raf = null;
  let speed = 0;

  const stop = () => {
    speed = 0;
    wrap.classList.remove("is-moving-left", "is-moving-right");
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  };

  const tick = () => {
    if (Math.abs(speed) < 0.1) {
      stop();
      return;
    }

    carousel.scrollLeft += speed;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    if (maxScroll > 0) {
      if (carousel.scrollLeft >= maxScroll - 4) carousel.scrollLeft = 4;
      if (carousel.scrollLeft <= 2) carousel.scrollLeft = maxScroll - 6;
    }

    updateCarouselCenter(carousel);
    raf = requestAnimationFrame(tick);
  };

  const updateSpeedFromPointer = (event) => {
    const rect = wrap.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const ratio = x / rect.width;
    const deadZone = 0.20;
    const maxSpeed = 8;

    if (ratio < 0.5 - deadZone) {
      speed = -maxSpeed * ((0.5 - deadZone - ratio) / (0.5 - deadZone));
      wrap.classList.add("is-moving-left");
      wrap.classList.remove("is-moving-right");
    } else if (ratio > 0.5 + deadZone) {
      speed = maxSpeed * ((ratio - 0.5 - deadZone) / (0.5 - deadZone));
      wrap.classList.add("is-moving-right");
      wrap.classList.remove("is-moving-left");
    } else {
      stop();
      return;
    }

    if (!raf) raf = requestAnimationFrame(tick);
  };

  wrap.addEventListener("mousemove", updateSpeedFromPointer);
  wrap.addEventListener("pointermove", updateSpeedFromPointer);

  wrap.addEventListener("mouseleave", stop);
  wrap.addEventListener("touchstart", stop, { passive: true });
}

function updateCarouselCenter(carousel) {
  const cards = [...carousel.querySelectorAll("[data-card]")];
  const center = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
  let closest = null;
  let min = Infinity;
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const c = rect.left + rect.width / 2;
    const d = Math.abs(center - c);
    if (d < min) { min = d; closest = card; }
  });
  cards.forEach(card => card.classList.toggle("is-center", card === closest));
}

function openArchetypeModal(id, mode) {
  const a = getArchetype(id);
  const root = document.getElementById("modal-root");
  root.innerHTML = `
    <div class="modal-layer" role="dialog" aria-modal="true">
      <div class="modal-card">
        <div class="modal-top">
          <div>
            <span class="kicker">Arquétipo de marca</span>
            <h2>${a.name}</h2>
          </div>
          <button class="modal-close" data-close-modal type="button">×</button>
        </div>
        <div class="modal-grid">
          ${modalSection("Resumo estratégico", a.summary)}
          ${modalSection("Comportamento", a.behavior)}
          ${modalSection("Tom de voz", a.voice)}
          ${modalSection("Direção visual", a.visualDirection)}
          ${modalSection("Cores recomendadas", a.recommendedColors)}
          ${modalSection("Fontes recomendadas", a.recommendedFonts)}
          ${modalSection("Elementos visuais", a.visualElements)}
          ${modalSection("Quando usar", a.whenToUse)}
          ${modalSection("Quando evitar", a.whenToAvoid)}
          ${modalSection("Exemplos", a.examples)}
        </div>
        <div class="modal-actions">
          <button class="primary-btn small" data-use-archetype="${a.id}" type="button">Usar este arquétipo</button>
          <button class="ghost-btn" data-close-modal type="button">Voltar</button>
        </div>
      </div>
    </div>
  `;
  root.querySelectorAll("[data-close-modal]").forEach(btn => btn.addEventListener("click", closeModal));
  root.querySelector("[data-use-archetype]").addEventListener("click", () => {
    closeModal();
    selectArchetype(id, mode);
  });
}

function closeModal() {
  document.getElementById("modal-root").innerHTML = "";
}

function modalSection(title, content) {
  return `<section class="modal-section"><h4>${title}</h4><p>${content}</p></section>`;
}

function resetAfterArchetypes() {
  state.selectedHeadingFont = null;
  state.selectedBodyFont = null;
  resetColors();
}

function resetColors() {
  state.selectedPrimaryColor = null;
  state.selectedSecondaryColor = null;
  state.selectedAccentColor = null;
  state.selectedBackgroundColor = null;
  state.selectedTextColor = null;
  state.colors = { primary: null, secondary: null, accent: null, background: null, text: null };
}

function renderHeadingFont(view) {
  const options = getHeadingOptions();
  view.innerHTML = `
    <section class="screen node-screen">
      ${screenHead("Escolha a fonte principal", "As sugestões combinam o arquétipo principal com a nuance do secundário.")}
      <div class="flow-canvas">
        <div class="node-grid">
          ${options.map(item => fontNode(item, "heading")).join("")}
        </div>
      </div>
    </section>
  `;
  view.querySelectorAll("[data-heading-font]").forEach(card => {
    card.addEventListener("dblclick", () => {
      state.selectedHeadingFont = card.dataset.headingFont;
      state.selectedBodyFont = null;
      resetColors();
      saveState();
      setStep("body-font");
    });
  });
}

function getHeadingOptions() {
  const primary = typographyByArchetype[state.primaryArchetype] || typographyByArchetype.sage;
  if (!state.secondaryArchetype) return primary;
  const secondary = typographyByArchetype[state.secondaryArchetype] || [];
  return [primary[0], primary[1], secondary[0] || primary[2]];
}

function fontNode(item, role) {
  const attr = role === "heading" ? "data-heading-font" : "data-body-font";
  const selected = role === "heading" ? state.selectedHeadingFont === item.font : state.selectedBodyFont === item.font;
  const headingFont = role === "heading" ? item.font : state.selectedHeadingFont;
  const bodyFont = role === "heading" ? "Inter" : item.font;
  return `
    <article class="option-node ${selected ? "is-selected" : ""}" ${attr}="${item.font}" tabindex="0" role="button">
      <h3 style="font-family:'${item.font}', ${isSerif(item.font) ? "serif" : "sans-serif"}">${item.font}</h3>
      <p>${item.feeling}</p>
      <div class="sample-text">
        <span class="sample-title" style="font-family:'${headingFont}', ${isSerif(headingFont) ? "serif" : "sans-serif"}">Marca com presença</span>
        <span class="sample-body" style="font-family:'${bodyFont}', ${isSerif(bodyFont) ? "serif" : "sans-serif"}">Sistema visual com clareza, ritmo e contraste.</span>
      </div>
    </article>
  `;
}

function renderBodyFont(view) {
  const heading = getSelectedHeadingObject();
  view.innerHTML = `
    <section class="screen node-screen">
      ${screenHead("Escolha a fonte secundária", `Fonte principal selecionada: ${state.selectedHeadingFont}. Agora escolha o par tipográfico.`)}
      <div class="flow-canvas">
        <div class="node-grid">
          ${heading.pairings.map(item => fontNode(item, "body")).join("")}
        </div>
      </div>
    </section>
  `;
  view.querySelectorAll("[data-body-font]").forEach(card => {
    card.addEventListener("dblclick", () => {
      state.selectedBodyFont = card.dataset.bodyFont;
      resetColors();
      saveState();
      setStep("primary-color");
    });
  });
}

function getSelectedHeadingObject() {
  return getHeadingOptions().find(f => f.font === state.selectedHeadingFont) || getHeadingOptions()[0];
}

function renderPrimaryColor(view) {
  const options = generatePrimaryColorOptions(state.primaryArchetype, state.secondaryArchetype, state.selectedHeadingFont, state.selectedBodyFont);
  view.innerHTML = `
    <section class="screen node-screen">
      ${screenHead("Escolha a cor principal", "A cor principal define a força visual da marca. As opções consideram arquétipos e fontes escolhidas.")}
      <div class="flow-canvas">
        <div class="node-grid">
          ${options.map(color => primaryColorNode(color)).join("")}
        </div>
      </div>
    </section>
  `;
  view.querySelectorAll("[data-primary-color]").forEach(card => {
    card.addEventListener("dblclick", () => {
      const color = options.find(c => c.hex === card.dataset.primaryColor);
      selectPrimaryColor(color);
    });
  });
}

function generatePrimaryColorOptions(primaryArchetype, secondaryArchetype, headingFont, bodyFont) {
  const primary = baseColorOptions[primaryArchetype] || baseColorOptions.sage;
  if (!secondaryArchetype) return primary.map(c => ({ ...c, reason: "Baseada no arquétipo principal e ajustada ao par tipográfico escolhido." }));
  const secondary = baseColorOptions[secondaryArchetype] || [];
  return [
    { ...primary[0], reason: "Mais fiel ao arquétipo principal, preservando clareza estratégica." },
    { ...primary[1], reason: "Mais madura e estruturada, equilibrando presença com legibilidade." },
    { ...(secondary[0] || primary[2]), reason: "Traz a nuance do arquétipo secundário sem perder coerência visual." }
  ];
}

function primaryColorNode(c) {
  return `
    <article class="option-node" data-primary-color="${c.hex}" tabindex="0" role="button">
      <div class="swatch" style="background:${c.hex}"></div>
      <div class="color-meta">
        <h3>${c.name}</h3>
        <span class="hex">${c.hex}</span>
        <p>${c.meaning}. ${c.reason}</p>
      </div>
    </article>
  `;
}

function selectPrimaryColor(color) {
  state.selectedPrimaryColor = color;
  state.colors.primary = color.hex;
  state.colors.secondary = null;
  state.colors.accent = null;
  state.colors.background = null;
  state.colors.text = null;
  saveState();
  setStep("linked-colors");
}

function renderLinkedColors(view) {
  const groups = generateLinkedColorOptions(state.selectedPrimaryColor, state.primaryArchetype, state.secondaryArchetype, state.selectedHeadingFont, state.selectedBodyFont);
  view.innerHTML = `
    <section class="screen node-screen linked-colors-screen">
      ${screenHead("Escolha as cores complementares", "As opções abaixo são geradas dinamicamente a partir da cor principal escolhida, mantendo contraste, coerência e equilíbrio visual.")}
      <div class="flow-canvas color-system-canvas">
        <div class="flow-node is-selected primary-color-anchor" style="--anchor-color:${state.colors.primary}">
          <div class="swatch" style="height:76px;background:${state.colors.primary}"></div>
          <h3>${state.selectedPrimaryColor.name}</h3>
          <span class="hex">${state.colors.primary}</span>
        </div>
        <div class="parallel-groups color-linked-groups">
          ${colorGroup("secondary", "Secundária", groups.secondary)}
          ${colorGroup("accent", "Destaque", groups.accent)}
          ${colorGroup("background", "Fundo", groups.background)}
          ${colorGroup("text", "Texto", groups.text)}
        </div>
        <div class="step-actions">
          <button class="primary-btn small" data-finish-colors type="button">Finalizar Brand Flow</button>
        </div>
      </div>
    </section>
  `;
  view.querySelectorAll("[data-color-role]").forEach(card => {
    card.addEventListener("dblclick", () => {
      if (card.dataset.low === "true") return;
      selectLinkedColor(card.dataset.colorRole, { name: card.dataset.colorName, hex: card.dataset.colorHex });
    });
  });
  view.querySelector("[data-finish-colors]").addEventListener("click", () => {
    if (!state.colors.secondary) state.colors.secondary = groups.secondary[0].hex;
    if (!state.colors.accent) state.colors.accent = groups.accent[0].hex;
    if (!state.colors.background) state.colors.background = groups.background[0].hex;
    if (!state.colors.text) state.colors.text = getReadableTextColor(state.colors.background);
    saveState();
    setStep("brand-flow");
  });
}

function generateLinkedColorOptions(primaryColor, primaryArchetype, secondaryArchetype, headingFont, bodyFont) {
  const primaryHex = primaryColor?.hex || state.colors.primary || "#2563EB";
  const primaryHsl = hexToHsl(primaryHex);
  const primaryName = primaryColor?.name || "Cor Principal";
  const readableDark = "#0F172A";
  const readableLight = "#F8FAFC";

  const secondaryOptions = [
    {
      name: "Tom Complementar",
      hex: hslToHex(primaryHsl.h, clamp(primaryHsl.s * 0.46, 18, 54), clamp(primaryHsl.l + (primaryHsl.l < 45 ? 28 : -18), 24, 78)),
      reason: `derivado de ${primaryName}`
    },
    {
      name: "Profundidade",
      hex: hslToHex(primaryHsl.h, clamp(primaryHsl.s * 0.72, 24, 70), clamp(primaryHsl.l * 0.46, 14, 34)),
      reason: "reforça presença"
    },
    {
      name: "Variação Clara",
      hex: hslToHex(primaryHsl.h, clamp(primaryHsl.s * 0.38, 12, 42), clamp(primaryHsl.l + 34, 62, 90)),
      reason: "cria respiro"
    }
  ];

  const accentHueA = rotateHue(primaryHsl.h, 34);
  const accentHueB = rotateHue(primaryHsl.h, 156);
  const accentHueC = rotateHue(primaryHsl.h, 212);
  const accentOptions = [
    {
      name: "Ação Quente",
      hex: hslToHex(accentHueA, clamp(primaryHsl.s + 12, 58, 88), clamp(primaryHsl.l + 2, 44, 62)),
      reason: "contraste para CTA"
    },
    {
      name: "Contraste Vivo",
      hex: hslToHex(accentHueB, clamp(primaryHsl.s + 8, 52, 86), clamp(primaryHsl.l + 4, 42, 64)),
      reason: "ponto focal"
    },
    {
      name: "Acento Gráfico",
      hex: hslToHex(accentHueC, clamp(primaryHsl.s + 4, 48, 82), clamp(primaryHsl.l + 8, 46, 68)),
      reason: "variação editorial"
    }
  ];

  const lightBackground = hslToHex(primaryHsl.h, clamp(primaryHsl.s * 0.20, 5, 24), 94);
  const tintedBackground = hslToHex(primaryHsl.h, clamp(primaryHsl.s * 0.28, 8, 30), 88);
  const darkBackground = hslToHex(primaryHsl.h, clamp(primaryHsl.s * 0.44, 12, 44), 8);
  const backgroundOptions = [
    { name: "Papel Claro", hex: lightBackground, reason: "máxima leitura" },
    { name: "Base Tonal", hex: tintedBackground, reason: "conecta com a principal" },
    { name: "Fundo Profundo", hex: darkBackground, reason: "contraste editorial" }
  ];

  const chosenBg = state.colors.background || backgroundOptions[0].hex;
  const tonalDarkText = hslToHex(primaryHsl.h, clamp(primaryHsl.s * 0.36, 10, 34), 13);
  const tonalLightText = hslToHex(primaryHsl.h, clamp(primaryHsl.s * 0.18, 6, 22), 92);
  const textOptions = [
    { name: "Texto Escuro", hex: tonalDarkText, reason: "para fundos claros" },
    { name: "Texto Claro", hex: tonalLightText, reason: "para fundos escuros" },
    { name: "Alto Contraste", hex: getReadableTextColor(chosenBg), reason: "opção segura" }
  ];

  return {
    secondary: dedupeColors(secondaryOptions),
    accent: dedupeColors(accentOptions),
    background: dedupeColors(backgroundOptions),
    text: dedupeColors(textOptions)
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function rotateHue(h, deg) {
  return (h + deg + 360) % 360;
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    if (max === g) h = (b - r) / d + 2;
    if (max === b) h = (r - g) / d + 4;
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsl(r, g, b);
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  const toHex = v => Math.round((v + m) * 255).toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function dedupeColors(colors) {
  const used = new Set();
  return colors.map((color, index) => {
    let hex = color.hex.toUpperCase();
    while (used.has(hex)) {
      const hsl = hexToHsl(hex);
      hex = hslToHex(rotateHue(hsl.h, 18 + index * 9), hsl.s, clamp(hsl.l + 4, 8, 94));
    }
    used.add(hex);
    return { ...color, hex };
  });
}

function colorGroup(role, label, colors) {
  const bg = role === "text" ? (state.colors.background || "#F8FAFC") : null;
  return `
    <section class="color-group">
      <h3>${label}</h3>
      ${colors.map(c => {
        const low = role === "text" && getContrastRatio(c.hex, bg) < 4.5;
        const selected = state.colors[role] === c.hex;
        return `
          <article class="color-mini ${selected ? "is-selected" : ""} ${low ? "is-low" : ""}" data-color-role="${role}" data-color-hex="${c.hex}" data-color-name="${c.name}" data-low="${low}" tabindex="0" role="button">
            <span class="mini-swatch" style="background:${c.hex}"></span>
            <strong>${c.name}</strong><br>
            <span class="hex">${c.hex}</span>
            <small>${c.reason}</small>
            ${low ? `<span class="low-badge">baixo contraste</span>` : ""}
          </article>
        `;
      }).join("")}
    </section>
  `;
}

function selectLinkedColor(role, color) {
  state[`selected${capitalize(role)}Color`] = color;
  state.colors[role] = color.hex;
  if (role === "background" && (!state.colors.text || getContrastRatio(state.colors.text, color.hex) < 4.5)) {
    state.colors.text = getReadableTextColor(color.hex);
  }
  saveState();
  render();
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const n = parseInt(clean.length === 3 ? clean.split("").map(x => x+x).join("") : clean, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const vals = [r,g,b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return vals[0] * 0.2126 + vals[1] * 0.7152 + vals[2] * 0.0722;
}

function getContrastRatio(colorA, colorB) {
  const l1 = relativeLuminance(colorA);
  const l2 = relativeLuminance(colorB);
  const high = Math.max(l1, l2);
  const low = Math.min(l1, l2);
  return (high + 0.05) / (low + 0.05);
}

function getReadableTextColor(backgroundColor) {
  return getContrastRatio("#0F172A", backgroundColor) >= getContrastRatio("#F8FAFC", backgroundColor) ? "#0F172A" : "#F8FAFC";
}

function isDark(hex) { return relativeLuminance(hex) < .22; }
function isWarm(hex) {
  const {r,g,b} = hexToRgb(hex);
  return r > b && r > 120;
}

function renderFinalFlow(view) {
  const primary = getArchetype(state.primaryArchetype);
  const secondary = state.secondaryArchetype ? getArchetype(state.secondaryArchetype) : null;
  view.innerHTML = `
    <section class="screen node-screen final-screen">
      ${screenHead("Brand Board", "Edite o nome e o slogan diretamente no preview. Clique em uma cor para transformá-la na cor principal.")}
      <div class="final-layout final-layout-clean">
        <div class="final-nodes">
          <article class="flow-node archetype-strategy-card">
            <h3>Arquétipos</h3>
            <p><strong>Principal:</strong> ${primary?.name || "Não definido"}</p>
            <p>${shortenText(primary?.summary || "", 145)}</p>
            <p><strong>Secundário:</strong> ${secondary?.name || "Não definido"}</p>
            ${secondary ? `<p>${shortenText(secondary.summary, 120)}</p>` : `<p>Sem secundário, a marca mantém uma personalidade mais direta e focada no arquétipo principal.</p>`}
            <div class="strategy-blend">
              <strong>Combinação:</strong> ${archetypeBlendText(primary, secondary)}
            </div>
          </article>
          <article class="flow-node">
            <h3>Tipografia</h3>
            <p><strong>Título:</strong> ${state.selectedHeadingFont}</p>
            <p><strong>Texto:</strong> ${state.selectedBodyFont}</p>
            <div class="sample-text">
              <span class="sample-title" style="font-family:'${state.selectedHeadingFont}'">Direção visual</span>
              <span class="sample-body" style="font-family:'${state.selectedBodyFont}'">Combinação tipográfica aplicada ao preview.</span>
            </div>
          </article>
          <article class="flow-node colors-summary-card">
            <h3>Cores</h3>
            <p>Clique em qualquer cor no preview para usá-la como nova cor principal.</p>
            <div class="swatch-row">
              ${Object.entries(state.colors).map(([k,v]) => `<button class="swatch-pill swatch-click" data-preview-color="${v}" data-preview-role="${k}" title="Usar ${v} como principal" style="background:${v}"><span>${k}</span></button>`).join("")}
            </div>
            ${Object.entries(state.colors).map(([k,v]) => `<p><strong>${colorRoleLabel(k)}:</strong> <span class="hex">${v}</span></p>`).join("")}
          </article>
        </div>
        <aside class="preview-panel">
          ${brandPreview(primary, secondary)}
        </aside>
      </div>
    </section>
  `;

  view.querySelectorAll("[data-preview-edit]").forEach(el => {
    el.addEventListener("input", () => {
      const key = el.dataset.previewEdit;
      state[key] = el.textContent.trim();
      saveState();
    });
  });

  view.querySelectorAll("[data-preview-color]").forEach(btn => {
    btn.addEventListener("click", () => promotePreviewColor(btn.dataset.previewColor, btn.dataset.previewRole));
  });

  bindGlobal();
}


function brandPreview(primary, secondary) {
  return `
    <div class="brand-preview brand-board-preview">
      <div class="preview-hero">
        <span class="preview-badge">${primary?.name || "Arquétipo"}${secondary ? " + " + secondary.name : ""}</span>

        <div class="preview-edit-block">
          <span class="preview-field-label">Nome da marca</span>
          <h2 contenteditable="true" spellcheck="false" data-preview-edit="brandName">${escapeHtml(state.brandName)}</h2>
        </div>

        <div class="preview-edit-block">
          <span class="preview-field-label">Slogan</span>
          <p contenteditable="true" spellcheck="false" data-preview-edit="tagline">${escapeHtml(state.tagline)}</p>
        </div>

        <div class="preview-paragraph-test">
          <span>Teste de parágrafo</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere, justo vel direção visual, testa contraste, peso tipográfico e leitura em textos longos.</p>
        </div>

        <span class="preview-cta" contenteditable="true" spellcheck="false" data-preview-edit="ctaText">${escapeHtml(state.ctaText)}</span>
      </div>
      <div class="preview-social">
        <h3>Post de marca</h3>
        <p>Uma amostra rápida de como a identidade pode aparecer em uma peça digital.</p>
        <div class="swatch-row preview-palette" aria-label="Cores clicáveis do preview">
          ${Object.entries(state.colors).map(([role, value]) => `
            <button class="preview-color-chip" data-preview-color="${value}" data-preview-role="${role}" type="button" title="Usar ${value} como cor principal">
              <span class="swatch-pill" style="background:${value}"></span>
              <strong>${colorRoleLabel(role)}</strong>
              <em>${value}</em>
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function colorRoleLabel(role) {
  return { primary: "Principal", secondary: "Secundária", accent: "Destaque", background: "Fundo", text: "Texto" }[role] || role;
}

function shortenText(text, max = 120) {
  const clean = String(text || "").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).trim() + "...";
}

function archetypeBlendText(primary, secondary) {
  if (!primary && !secondary) return "A combinação ainda não foi definida.";
  if (!secondary) return `A marca tende a comunicar ${primary.name.toLowerCase()} de forma mais pura: ${primary.keywords.join(", ")}.`;
  return `Une ${primary.name} com ${secondary.name}: a base estratégica vem de ${primary.keywords[0]}, enquanto a nuance secundária adiciona ${secondary.keywords[0]}. O resultado é uma marca com personalidade mais rica, direção verbal mais clara e visual mais coerente.`;
}

function promotePreviewColor(hex, role) {
  const promoted = { name: `Cor ${colorRoleLabel(role)}`, hex, meaning: "cor promovida a principal pelo preview" };
  state.selectedPrimaryColor = promoted;
  state.colors.primary = hex;
  const groups = generateLinkedColorOptions(promoted, state.primaryArchetype, state.secondaryArchetype, state.selectedHeadingFont, state.selectedBodyFont);
  state.colors.secondary = chooseDifferentColor(groups.secondary, hex, state.colors.secondary);
  state.colors.accent = chooseDifferentColor(groups.accent, hex, state.colors.accent);
  state.colors.background = chooseBackgroundColor(groups.background, hex);
  state.colors.text = getReadableTextColor(state.colors.background);
  saveState();
  render();
}

function chooseDifferentColor(options, primaryHex, currentHex) {
  const current = options.find(c => c.hex === currentHex && c.hex !== primaryHex);
  if (current) return current.hex;
  return (options.find(c => c.hex !== primaryHex) || options[0]).hex;
}

function chooseBackgroundColor(options, primaryHex) {
  const readable = options.find(c => c.hex !== primaryHex && getContrastRatio(getReadableTextColor(c.hex), c.hex) >= 4.5);
  return (readable || options[0]).hex;
}


function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function escapeAttr(str) { return escapeHtml(str); }


function resetApp() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignora bloqueios de localStorage em execução local.
  }
  state = cloneData(defaultState);
  render();
}

function bindGlobal() {
  document.querySelectorAll("[data-reset]").forEach(btn => btn.onclick = resetApp);
  document.querySelectorAll("[data-go-back]").forEach(btn => btn.onclick = goBackStep);
}

function goBackStep() {
  const order = ["intro", "primary-archetype", "secondary-archetype", "heading-font", "body-font", "primary-color", "linked-colors", "brand-flow"];
  const index = order.indexOf(state.currentStep);
  if (index <= 0) return setStep("intro");
  setStep(order[index - 1]);
}

document.addEventListener("click", (event) => {
  const startButton = event.target.closest("[data-start]");
  if (startButton) {
    event.preventDefault();
    setStep("primary-archetype");
  }
});

render();

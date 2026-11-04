# LP Marmoraria Pedrarte

Landing page da Marmoraria Pedrarte (Santa Efigênia, Belo Horizonte/MG), cliente QH4 Growth.
Produto: Start Stones (LP + Google Ads + GMN Ouro). Contrato a partir de 15/10/2026.

## Estrutura

```
index.html            página principal
obrigado.html         página de obrigado (noindex), aberta depois do envio do formulário
404.html              página de erro personalizada (a Vercel usa automaticamente)
robots.txt
sitemap.xml
site.webmanifest
vercel.json           cache dos assets, headers de segurança e noindex no obrigado
assets/
  css/style.css
  js/tracking.js      eventos padrão QH4 no dataLayer (whatsapp_click, form_start)
  js/main.js          menu, abas de pedras, galeria, formulário, generate_lead
  img/                fotos em .webp, logo (normal e branca), favicons, og-pedrarte.jpg
```

## Como publicar na Vercel

1. Descompactar o zip.
2. Na Vercel: Add New > Project > subir a pasta (ou `vercel` pela CLI dentro dela).
3. Framework Preset: Other. Sem build command, output = raiz.
4. Apontar o domínio em Settings > Domains.

## Pendências antes de publicar

- [x] **GTM**: container `GTM-PGMKR49N` instalado no head e no body do `index.html`, `obrigado.html` e `404.html`.
- [ ] **Domínio / canonical**: o briefing informa `www.pedrarte.com.br`. Está usado no canonical, Open Graph, JSON-LD, robots e sitemap. Se a LP for para outro domínio ou subdomínio, trocar em todos (buscar `pedrarte.com.br`).
- [ ] **WhatsApp**: o número do briefing é **(31) 3461-4493, um fixo**. Confirmar com o Guilherme se esse fixo tem WhatsApp Business ativo. Se não tiver, trocar `553134614493` em `index.html`, `obrigado.html`, `404.html` e `assets/js/main.js` pelo celular correto.
- [ ] **Endereço completo**: o briefing não traz rua/número, só o bairro (Santa Efigênia, informado no resumo comercial). Quando confirmar, completar o `streetAddress` e `postalCode` no JSON-LD e o texto "Onde estamos"/rodapé.
- [ ] **Instagram da QH4** no rodapé: está `instagram.com/qh4growth` (marcado com comentário `CONFIRMAR O @ DO INSTAGRAM DA QH4`).
- [ ] **Fotos de materiais**: a foto da aba "Quartzitos" (`mesa-jantar-pedra-natural.webp`) veio do Instagram do cliente, mas parece imagem de fornecedor/inspiração, não obra da Pedrarte. Por isso ela só aparece ilustrando o material, nunca na galeria de trabalhos. Se o cliente mandar foto própria de quartzito, trocar. A aba "Ardósia" usa uma textura em CSS porque não havia foto.
- [ ] **Fotos novas**: no briefing o Guilherme disse que vai visitar obras entregues para fotografar. Quando chegar material, vale renovar a galeria.

## Fonte do conteúdo

Tudo veio do briefing (formulário respondido pelo Guilherme de Oliveira Ascenção) e do resumo comercial. Nada foi inventado:

- Desde 1985, empresa familiar passada de pai para filho (41 anos em 2026)
- Materiais: todos os granitos nacionais, mármores nacionais e importados, quartzo, quartzitos, ardósia; destaque para granitos nacionais e quartzitos
- Público: empreiteiras de reforma, arquitetas, decoradoras e consumidor final
- Assistência antes e depois da entrega; respeito ao prazo; acabamento sem pressa (resposta dele sobre clientes pedindo agilidade, usada no bloco "Por que a gente não corre com a sua pedra" e no FAQ)
- Mostruário com 30% a 50% de desconto
- Horário: seg a sex 7h30 às 17h30, sáb 9h às 12h
- Buscas citadas: "marmoraria perto de mim", região leste, região centro-sul, pia nova, soleira de porta (usadas em title, description, FAQ e opções do formulário)
- Avaliações: link do Google `g.page/r/CTZ-ctTq_ymwEAI/review`. Não há depoimentos escritos na página porque o briefing não trouxe nenhum; quando tiver avaliações reais transcritas, dá para incluir uma seção.
- Fundo **claro** escolhido no briefing; sem paleta e sem fonte definidas, então: Poppins (títulos) + Inter (texto), cores tiradas do logo (vermelho #C4161C, grafite #2A2C2F) com bege das cubas como apoio.
- Fotos: Instagram @marmorariapedrarte (pasta 03. Imagens). O vídeo .mp4 da pasta não foi usado.

## Ajustes do Guilherme Gomes (27/10/2026)

- Removida a linha de localização acima da headline (local entra em outra parte).
- Headline: "Marmoraria de qualidade perto de você, com acabamento de alto padrão".
- Subheadline: "Banheiros, cozinhas e bancadas. Transformamos seu ambiente! Atendemos toda a região de Belo Horizonte, Lagoa Santa, Nova Lima, Pampulha e arredores."
- Botão do topo virou "Entrar em contato" e vai direto pro WhatsApp com "Olá. Vim pelo Google e gostaria de mais informações."
- Botão do hero agora manda "Olá, vim pelo Google e gostaria de solicitar um orçamento."
- Removida a linha de fatos abaixo dos botões (41 anos / de pai para filho / antes e depois).
- Lagoa Santa e Nova Lima adicionadas como área atendida no JSON-LD.

## Ajustes do Guilherme Gomes (04/11/2026)

- Subheadline: "Transformamos seu ambiente! Pisos paginados, banheiros, cozinhas, mesas personalizadas, escadas e revestimentos externos. Atendemos BH e toda a região metropolitana."
- Depoimento do bloco "Por que a gente não corre com a sua pedra" trocado pelo texto enviado pelo cliente.

## Ajustes da análise QH4 (04/11/2026)

- Slots `[QH4 SLOT 1 a 8]` comentados em index, obrigado e 404 (GTM movido para o topo do head).
- Rodapé "Desenvolvido por QH4 Growth" corrigido (estava "pro") e adicionado em obrigado e 404.
- `assets/js/tracking.js` com os eventos padrão; `thank_you_view` no obrigado.
- Title no formato "[Nicho] em [Cidade] | [Cliente]" e meta description com 120 a 160 caracteres.

## Animações

- Hero: título entra palavra por palavra, veios de mármore desenhados em SVG atrás da foto, foto abre de cima pra baixo, inclinação da foto e do selo 1985 acompanhando o mouse (desktop), parallax leve, e brilho periódico no botão do WhatsApp.
- Topo some ao descer e volta ao subir; barra vermelha de progresso de leitura no topo.
- Faixa de público entra em sequência; faixa de materiais rolando entre Trabalhos e Pedras (pausa no hover).
- Títulos de seção sobem por trás de uma máscara; galeria abre em cortina, item por item.
- Pedras: troca de aba com cortina na foto e texto em cascata.
- Processo: linha do tempo vermelha preenche com o scroll e cada etapa acende quando chega nela; citação do Guilherme abre da esquerda pra direita.
- Mostruário: veios correndo no fundo e contador 30 a 50%.
- Formulário: campo em foco acende em vermelho e o botão "acorda" quando libera.
- FAQ abre e fecha com altura animada; WhatsApp flutuante entra com mola.
- Tudo é desligado com `prefers-reduced-motion`, e o conteúdo fica visível mesmo sem JS (a classe `anim` só é aplicada pelo script).

## Formulário

Sem Apps Script: o formulário monta a mensagem com todos os campos e abre o WhatsApp; em seguida a aba atual vai para `obrigado.html`, que tem botão de reenvio com a mensagem padrão. O botão de enviar nasce desabilitado e só libera quando todos os campos obrigatórios estão válidos (máscara no WhatsApp).

Campos: nome, WhatsApp, perfil (cliente final / arquiteta ou decoradora / empreiteira), pedra de interesse, ambientes (opcional, múltipla escolha), bairro e cidade da obra.

## Eventos de rastreamento (dataLayer)

| Evento | Quando | Parâmetros |
|---|---|---|
| `whatsapp_click` | clique em qualquer link de WhatsApp | `origem`: topo, hero, pedra-granito, pedra-quartzito, pedra-marmore, pedra-quartzo, pedra-ardosia, mostruario, rodape, flutuante |
| `form_start` | primeira interação com o formulário | |
| `generate_lead` | envio do formulário | `form`, `pedra`, `perfil` |
| `pedra_selecionada` | troca de aba na seção de pedras | `pedra` |
| `thank_you_view` | carregamento do obrigado.html (padrão QH4) | |
| `pagina_obrigado` | carregamento do obrigado.html (mantido por compatibilidade com tags antigas) | |

Sugestão para o Google Ads: conversão principal em `generate_lead` + `pagina_obrigado`, secundária em `whatsapp_click`.

## Checklist de SEO

- [x] Title e meta description com nicho + cidade ("Marmoraria perto de você em BH")
- [x] H1 com "Marmoraria" e "perto de você"
- [x] Canonical
- [x] Open Graph completo (imagem 1200x630) e Twitter Card
- [x] JSON-LD `HomeAndConstructionBusiness` (horários, telefone, fundação 1985, CNPJ, Instagram, materiais) + `FAQPage`
- [x] robots.txt, sitemap.xml, site.webmanifest
- [x] Favicon SVG + PNG + apple-touch-icon
- [x] width/height em todas as imagens, lazy load fora da primeira dobra, preload da imagem do hero
- [x] Imagens em WebP com alt descritivo
- [x] 404 personalizada e obrigado com noindex
- [x] Validado: sem erro de console, sem rolagem horizontal em 390px e 1440px, `prefers-reduced-motion` respeitado

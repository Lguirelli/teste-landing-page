# Landing Page Modular

Projeto preparado para deploy como site estático no Vercel.

## Estrutura

- `index.html` na raiz
- `blog.html` na raiz
- `css/` com estilos globais
- `js/` com scripts estáticos
- `sections/` com seções carregadas dinamicamente
- `assets/` com imagens e modelo 3D
- `servicos/` e `blog/artigos/` com páginas internas

## Ajustes aplicados

- Removida a dependência de build React/Vite.
- Removido o efeito sticker da seção Problema.
- Restaurado o pato 3D na seção Problema usando `assets/models/duck3d.glb`.
- Adicionado `vercel.json` para deploy estático.

## Vercel

Use:

- Framework Preset: Other
- Build Command: vazio
- Install Command: vazio
- Output Directory: .

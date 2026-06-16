# Deploy no Vercel

Este pacote foi ajustado para funcionar como site estático no Vercel.

Configuração recomendada no Vercel:

- Framework Preset: Other
- Build Command: deixar vazio
- Install Command: deixar vazio
- Output Directory: .

Importante: o `index.html` precisa estar na raiz do repositório junto das pastas `css/`, `js/`, `sections/`, `assets/`, `blog/` e `servicos/`.

A versão removeu a dependência de React/Vite e removeu o efeito sticker. O pato 3D voltou para a seção Problema usando `assets/models/duck3d.glb`.

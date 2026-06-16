# Landing page estática pronta para GitHub Pages

Este repositório foi limpo para funcionar como site estático no GitHub Pages, sem depender de React, Vite, npm ou build.

## Como publicar no GitHub Pages

1. Envie todos os arquivos deste repositório para o GitHub.
2. Acesse **Settings > Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/root`.
5. Salve.

## Observações técnicas

- Não carregue arquivos `.jsx` diretamente no HTML.
- Componentes interativos devem ficar em `js/` como JavaScript compatível com navegador.
- O antigo sticker em React foi substituído pelo carregamento estático em `js/problem-sticker-react.js`.
- As seções modulares continuam em `sections/` e são carregadas por `js/include-sections.js`.

## Estrutura principal

```txt
index.html
blog.html
blog/
servicos/
sections/
css/
js/
assets/
docs/
```

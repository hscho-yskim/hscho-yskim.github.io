# hscho-yskim.github.io

조현수 · 김용성 모바일 청첩장. [Docusaurus](https://docusaurus.io/) v3 기반 정적 사이트이며 GitHub Pages로 배포됩니다.

- 사이트: https://hscho-yskim.github.io/
- 예식: 2026년 9월 12일 토요일 오후 5시 · 더채플앳청담

## 개발

```bash
yarn install        # 의존성 설치
yarn start          # 로컬 개발 서버 (http://localhost:3000)
yarn build          # 프로덕션 빌드 → build/
yarn serve          # 빌드 결과 로컬 미리보기
```

## 갤러리 이미지 빌드

원본 사진은 용량이 커서 저장소에 포함하지 않습니다. `static/img/wedding/originals/`에
원본을 둔 뒤 아래 명령으로 썸네일 · 풀사이즈 webp와 매니페스트를 생성합니다.

```bash
yarn gallery
```

생성물: `static/img/wedding/thumbs/`, `static/img/wedding/full/`, `src/components/wedding/gallery.json`

## 배포

`main` 브랜치에 push하면 [GitHub Actions 워크플로](.github/workflows/deploy.yml)가
자동으로 빌드 후 GitHub Pages에 배포합니다.

```bash
git push origin main
```

- 워크플로: `yarn install --frozen-lockfile` → `yarn build` → `build/`를 Pages 아티팩트로 업로드 → `actions/deploy-pages`로 배포
- 수동 실행: GitHub의 Actions → Deploy to GitHub Pages → Run workflow (`workflow_dispatch`)
- 배포 상태 확인: `gh run list --repo hscho-yskim/hscho-yskim.github.io`

### Pages 소스 설정 (완료됨)

저장소 Settings → Pages → Build and deployment → Source는 GitHub Actions로
설정되어 있어야 이 워크플로의 빌드가 실제 사이트에 반영됩니다. (Deploy from a branch로
두면 `main` 루트의 `README.md`가 홈페이지로 렌더링되고, 중복된 legacy 빌드가 함께 실행됩니다.)

> 2026-06-12에 `GitHub Actions`로 설정 완료. 변경이 필요하면:
> `gh api -X PUT repos/hscho-yskim/hscho-yskim.github.io/pages -f build_type=workflow`

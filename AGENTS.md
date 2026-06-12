# AGENTS.md

조현수 · 김용성 모바일 청첩장. Docusaurus v3 기반 정적 사이트, GitHub Pages 배포.

## 프로젝트 구조

- `src/pages/index.tsx` — 단일 페이지 청첩장 (모든 섹션을 조립)
- `src/components/wedding/` — 섹션 컴포넌트 (`Cover`, `Greeting`, `Gallery`, `Lightbox`, `Venue`, `NaverMap`, `Gift`, `SectionHeading`)
- `src/components/wedding/gallery.json` — 갤러리 매니페스트 (`yarn gallery`로 생성, 직접 수정하지 말 것)
- `src/clientModules/gtagShim.js` — 애드블로커 대응 gtag no-op 폴백
- `static/img/wedding/` — `cover.*`, `thumbs/`, `full/` (원본 `originals/`는 gitignore)
- `scripts/build-gallery.mjs` — sharp 기반 갤러리 이미지 빌드 스크립트
- `docusaurus.config.js` — 사이트 설정 (url, baseUrl, i18n=ko, OG 메타)

## 명령어

```bash
yarn install        # 의존성 설치 (lockfile은 yarn.lock — npm 사용 금지)
yarn start          # 로컬 개발 서버
yarn build          # 프로덕션 빌드 → build/
yarn serve          # 빌드 결과 미리보기
yarn gallery        # 갤러리 이미지/매니페스트 재생성
yarn typecheck      # tsc 타입 체크
```

## 컨벤션

- 패키지 매니저는 yarn (저장소에 `yarn.lock`만 존재, `npm ci`는 CI에서 실패함)
- 스타일은 CSS Modules (`*.module.css`), 모바일 우선, max-width 440px 카드 레이아웃
- 폰트 사이즈는 `rem` 단위 (디바이스 폰트 설정 반영)
- 텍스트는 한국어

## 배포

`main` 브랜치 push 시 `.github/workflows/deploy.yml`가 자동 실행됩니다.

```bash
git push origin main
```

워크플로 단계: `yarn install --frozen-lockfile` → `yarn build` → `build/`를 Pages
아티팩트로 업로드 → `actions/deploy-pages@v4`로 배포.

- 수동 실행: GitHub Actions → Deploy to GitHub Pages → Run workflow (`workflow_dispatch`)
- 상태 확인: `gh run list --repo hscho-yskim/hscho-yskim.github.io`
- 실행 추적: `gh run watch <run-id> --repo hscho-yskim/hscho-yskim.github.io`

### Pages 소스 설정 (완료됨)

저장소 Settings → Pages → Source는 GitHub Actions로 설정되어 있어야 워크플로
배포가 실제 사이트에 반영됩니다. Deploy from a branch로 두면 `main` 루트의 `README.md`가
홈페이지로 렌더링되고, 중복 legacy 빌드가 함께 돕니다.

2026-06-12에 `GitHub Actions`로 설정 완료. 확인·변경 명령:

```bash
gh api repos/hscho-yskim/hscho-yskim.github.io/pages          # build_type 확인 ("workflow"여야 함)
gh api -X PUT repos/hscho-yskim/hscho-yskim.github.io/pages -f build_type=workflow  # 재설정
```

### 주의

- 배포 전 `yarn build`로 로컬 빌드가 성공하는지 먼저 확인할 것
- `onBrokenLinks: "throw"` 설정이라 깨진 링크가 있으면 빌드가 실패함
- 워크플로의 lockfile 명령은 `yarn`이어야 함 (`npm ci`로 되돌리지 말 것)

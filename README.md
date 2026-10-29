# 티츄! 사용설명서 — GitHub Pages 배포판

Next.js 15의 정적 내보내기를 사용합니다. Vercel이 필요하지 않습니다.

배포 사이트: https://kuchipatchi123.github.io/tichulearnbook/

## 가장 쉬운 업로드 방법 (Mac)

- ZIP 압축을 풀어 생성된 폴더의 `PUSH_TO_GITHUB.command`를 실행합니다. 최초 실행 시 macOS에서 보안 경고가 뜨면 우클릭 → 열기 또는 시스템 설정에서 허용 후 재실행합니다.
- GitHub 로그인이 이미 설정된 Git 환경이면 저장소를 복제하고 변경될 파일 목록을 보여줍니다. `y`를 입력하면 커밋과 푸시를 진행합니다. (권한이 없거나 인증이 필요하면 실패할 수 있습니다.)
- 또는 GitHub Desktop에서 해당 저장소를 Clone한 다음 압축을 푼 파일 전체를 복제된 저장소 폴더에 덮어쓰고 Commit → Push origin을 클릭하세요. **숨김 폴더 `.github`도 함께 복사**해야 합니다.

## 배포하기

1. 이 압축파일의 **내용물 전체**(상위 폴더가 아닌 `package.json`을 포함한 파일들)를 `kuchipatchi123/tichulearnbook` 저장소 **루트에 덮어쓰기** 합니다. 특히 숨겨진 `.github/workflows/deploy.yml`도 반드시 포함합니다.
2. GitHub 저장소의 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택합니다.
3. 수정 파일을 `main` 브랜치에 커밋/푸시하면 **Actions → Deploy Tichu guide to GitHub Pages**가 자동 실행됩니다. `master` 브랜치도 지원합니다.
4. 두 작업(`build`, `deploy`)이 초록색 체크로 끝나면 위 주소에서 확인합니다.

> 기존 저장소에 다른 배포 워크플로가 있으면 두 개가 동시에 실행되지 않도록 사용하지 않는 워크플로는 비활성화하거나 삭제하세요.
> `pages build and deployment` 자동 작업이 보인다면 Pages의 Source가 **Deploy from a branch**로 되어 있지 않은지 확인하세요.

## 로컬 개발

```bash
npm ci
npm run dev
```

GitHub Pages 경로(`/tichulearnbook/`)가 정적으로 설정되어 있으므로, 로컬에서도 http://localhost:3000/tichulearnbook/ 로 접속하세요.

```bash
npm run typecheck
npm run build
```

빌드 후 `out/index.html`과 `out/tichulearnbook`이 아닌 `out/cards`, `out/images`, `out/fonts`의 정적 자산이 생성됩니다. 실제 URL은 `https://kuchipatchi123.github.io/tichulearnbook/cards/...` 형태로 접근합니다.

## 구성과 변경사항

- `next.config.ts`: `output: 'export'`, `basePath`, `trailingSlash`, 이미지 서버 최적화 비활성화
- `src/lib/site-asset.ts`: 정적 이미지/폰트 등 `public/` 경로에 `/tichulearnbook` 접두사 적용
- `src/app/combined.css`: 웹폰트 경로 수정
- `.github/workflows/deploy.yml`: 의존성 설치 → 정적 빌드 → 검사 → GitHub Pages 게시
- `.gitignore`: 빌드 산출물, 의존성 및 로컬 환경 파일 제외

> GitHub Pages는 정적 호스팅입니다. 이 프로젝트는 서버 API 사용 없이 정적 내보내기로 게시하도록 구성되어 있습니다.

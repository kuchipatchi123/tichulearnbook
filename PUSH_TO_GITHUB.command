#!/bin/bash
# This script updates the user's own repository with the fixed GitHub Pages source.
set -euo pipefail
SOURCE_DIR="$(cd "$(dirname "$0")" && pwd)"
REPOSITORY="https://github.com/aladding/tichulearnbook.git"

printf '\n===========================================\n'
printf ' 티츄! — GitHub Pages 수정 파일 업로드\n'
printf '===========================================\n'
printf '대상: %s\n' "$REPOSITORY"
printf '파일: %s\n\n' "$SOURCE_DIR"

if ! command -v git >/dev/null 2>&1; then
  echo 'Git이 설치되어 있지 않습니다. GitHub Desktop으로 업로드해 주세요.'
  read -r -p 'Enter를 누르면 종료합니다... ' _
  exit 1
fi
if ! command -v rsync >/dev/null 2>&1; then
  echo 'rsync를 찾을 수 없습니다.'
  read -r -p 'Enter를 누르면 종료합니다... ' _
  exit 1
fi

TEMP_DIR="$(mktemp -d -t tichu-deploy)"
trap 'rm -rf "$TEMP_DIR"' EXIT
printf '1/4 GitHub 저장소 복제 중...\n'
git clone "$REPOSITORY" "$TEMP_DIR/repo"

printf '\n2/4 변경된 프로젝트 파일 적용 중...\n'
rsync -a \
  --exclude='.git/' \
  --exclude='node_modules/' \
  --exclude='.next/' \
  --exclude='out/' \
  --exclude='*.tsbuildinfo' \
  --exclude='.DS_Store' \
  --exclude='.env' \
  --exclude='.env.*' \
  --exclude='PUSH_TO_GITHUB.command' \
  "$SOURCE_DIR/" "$TEMP_DIR/repo/"

cd "$TEMP_DIR/repo"
git add --all
if git diff --cached --quiet; then
  printf '\n이미 동일한 파일이 GitHub에 있습니다. 변경할 파일이 없습니다.\n'
  read -r -p 'Enter를 누르면 종료합니다... ' _
  exit 0
fi
printf '\n3/4 적용할 변경 파일\n'
git diff --cached --stat
printf '\n이 변경사항을 GitHub에 커밋하고 푸시할까요? [y/N]: '
read -r ANSWER
if [[ "$ANSWER" != "y" && "$ANSWER" != "Y" ]]; then
  printf '취소했습니다. GitHub에는 아무것도 푸시하지 않았습니다.\n'
  exit 0
fi

git commit -m "Fix static export and GitHub Pages deployment"
printf '\n4/4 GitHub에 Push 중...\n'
if git push origin HEAD; then
  printf '\n완료! GitHub Actions에서 배포 상태를 확인하세요.\n'
  printf 'https://github.com/aladding/tichulearnbook/actions\n'
  printf 'https://aladding.github.io/tichulearnbook/\n'
else
  printf '\n푸시에 실패했습니다. GitHub 계정 인증/저장소 권한을 확인하세요.\n'
  exit 1
fi
read -r -p 'Enter를 누르면 창을 닫습니다... ' _

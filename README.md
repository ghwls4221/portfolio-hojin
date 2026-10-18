# 개인 포트폴리오 (Next.js + MongoDB)

웹서버보안프로그래밍 8주차 개인 포트폴리오입니다. 수업 템플릿(week07)과 같은 버전, 같은 구조를 씁니다.

- 홈(`/`): 자기소개 + MongoDB에 저장된 프로젝트 목록 (수업 실습 저장소/배포 링크 포함)
- 방명록(`/guestbook`): `<form action>` + Server Action으로 MongoDB에 저장

## 내용 고치기
| 바꿀 것 | 파일 |
|---|---|
| 이름, 소개, GitHub 주소, 기술 | `data/profile.ts` |
| 프로젝트 목록, 저장소/배포 주소 | `data/projects.json` → 수정 후 `npm run seed` |

`TODO_...`로 남아 있는 주소는 화면에서 버튼이 숨겨집니다. 진짜 주소(https://...)로 바꾸면 버튼이 나타납니다.

## 1. MongoDB Atlas 준비
6주차 과제 때 만든 클러스터를 그대로 써도 됩니다.
1. https://cloud.mongodb.com 로그인 → 클러스터의 **Connect → Drivers**에서 연결 문자열 복사
2. 연결 문자열의 `/?` 앞에 DB 이름을 넣습니다: `...mongodb.net/portfolio?retryWrites=...`
3. **Network Access**에 `0.0.0.0/0`이 있는지 확인합니다 (Vercel 서버 IP가 계속 바뀌기 때문)
4. `.env.local.example`을 `.env.local`로 복사하고 `MONGODB_URI=`에 붙여넣습니다

## 2. 로컬 실행
```bash
npm install
npm run dev
```
http://localhost:3000 접속 → 프로젝트 목록이 보이면 DB 연결 성공입니다.

## 3. GitHub에 올리기
GitHub에서 빈 저장소(`portfolio-학번`)를 만든 뒤:
```bash
git init
git add .
git commit -m "포트폴리오 초안"
git branch -M main
git remote add origin https://github.com/<아이디>/portfolio-<학번>.git
git push -u origin main
```
`.env.local`은 `.gitignore`에 들어 있어 올라가지 않습니다. `git status`로 한 번 더 확인하세요.

## 4. Vercel 배포
1. https://vercel.com → GitHub 계정으로 로그인 → **Add New → Project**
2. `portfolio-학번` 저장소 **Import**
3. **Environment Variables**에 `MONGODB_URI` = (`.env.local`과 같은 값) 추가
4. **Deploy** → 발급된 `https://....vercel.app` 주소가 배포 주소입니다

이후에는 `git push`만 하면 Vercel이 자동으로 다시 배포합니다.

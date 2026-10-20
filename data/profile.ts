// 자기소개 정보입니다. 이 파일만 고치면 홈 화면의 소개 부분이 바뀝니다.
export const profile = {
  name: "정호진",
  school: "중부대학교 정보보호학과",
  intro: "중부대학교 정보보호학과 2학년 정호진입니다. 웹서버보안프로그래밍 수업에서 Next.js와 MongoDB로 직접 만든 프로젝트들을 모아두었습니다.",
  githubUrl: "https://github.com/ghwls4221",
  email: "",
  skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB", "Auth.js", "Vercel"],

  // 자기소개 섹션 (홈 화면 "About")
  about: {
    headline: "정보보호를 공부하며 웹을 만드는 정호진입니다.",
    paragraphs: [
      "중부대학교 정보보호학과 2학년이고, 이번 학기 웹서버보안프로그래밍 수업에서 Next.js와 MongoDB로 풀스택 웹 서비스를 처음부터 만들고 배포했습니다.",
      "기능을 만드는 것에서 끝나지 않고, 비밀번호 해싱·시크릿 관리·에러 정보 숨기기처럼 안전하게 만드는 법을 함께 고민하고 있습니다.",
    ],
    thisSemester: [
      {
        label: "수업 실습",
        text: "공지사항 게시판에 카테고리·조회수, 상품 추가, 회원가입·로그인까지 과제 #1~#5 구현",
      },
      {
        label: "팀 프로젝트",
        text: "멋사CP · Secure Commerce Platform에서 인증·보안 담당. NextAuth 로그인, bcryptjs 비밀번호 암호화, JWT 세션 구현",
      },
      {
        label: "개인 포트폴리오",
        text: "지금 이 사이트. MongoDB에 프로젝트와 방명록 저장",
      },
    ],
    interests: ["웹 보안", "인증", "풀스택 개발"],
  },
};

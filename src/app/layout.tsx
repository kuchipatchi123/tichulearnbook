import { siteAsset } from "@/lib/site-asset";
import type { Metadata } from "next";
import "./combined.css";
import "./navigation.css";
export const metadata: Metadata = {
  title: "티츄 — 4인용 사용설명서",
  description:
    "4인 2:2 팀전을 위한 티츄 사용설명서. 카드, 조합, 규칙과 점수를 한눈에.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head><link rel="preload" href={siteAsset("/fonts/PretendardVariable.woff2")} as="font" type="font/woff2" crossOrigin="anonymous" /></head>
      <body>
        <a className="skip-link" href="#home">
          본문으로 건너뛰기
        </a>
        {children}
      </body>
    </html>
  );
}

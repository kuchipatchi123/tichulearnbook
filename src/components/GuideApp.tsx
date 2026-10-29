"use client";
import { siteAsset } from "@/lib/site-asset";
import {GuideSearch} from './GuideSearch';
import {useState} from 'react';
import {UsersRound,Database,Layers} from 'lucide-react';
import OriginalGuide from '@/original/components/GuideApp';
export default function GuideApp(){
const [view,setView]=useState<'home'|'read-first'|'prepare'|'original'>('home');
const [initialTab,setInitialTab]=useState<'cards'|'rules'|'score'|'home'>('home');
const [initialStep,setInitialStep]=useState<number|undefined>();
const [opened,setOpened]=useState(false);
const [requestId,setRequestId]=useState(0);
const openGuide=(tab:typeof initialTab)=>{setInitialTab(tab);setOpened(true);setRequestId(n=>n+1);setView('original');window.scrollTo(0,0)};
const navigate=(next:'home'|'read-first'|'prepare')=>{setView(next);window.scrollTo(0,0)};
return <>{opened&&<div className="original-flow" hidden={view!=='original'}><OriginalGuide initialTab={initialTab} requestId={requestId} initialStep={initialStep} onHome={()=>navigate('home')}/></div>}<div className="onboarding" hidden={view==='original'}><div className={`guide-shell merged-guide view-${view}`}>
 {view!=='home'&&<header className="top-navigation"><button className="brand-home" onClick={()=>navigate('home')} aria-label="티츄 홈"><span className="brand-wordmark">티츄!</span></button>{view!=='prepare'&&<GuideSearch onSelect={(section,index)=>{setInitialStep(index);openGuide(section)}}/>}{view!=='prepare'&&<nav aria-label="주 메뉴">{(['rules','cards','score'] as const).map(v=><button key={v}  onClick={()=>{openGuide(v)}}>{{cards:'카드',rules:'규칙',score:'점수'}[v]}</button>)}</nav>}</header>}
 {view==='home'&&<main id="home" className="merged-home"><h1 className="sr-only">티츄 4인용 사용설명서</h1><section className="home-facts" aria-label="게임 소개"><div><UsersRound aria-hidden="true"/><strong>4명 플레이</strong><span>2 대 2 팀전</span></div><div><Database aria-hidden="true"/><strong>1000점</strong><span>먼저 도달하면 승리</span></div><div><Layers aria-hidden="true"/><strong>카드로</strong><span>전략적으로 대결</span></div></section><figure className="home-product"><img src={siteAsset("/images/tichu-black-mockup.webp")} alt="티츄 게임 박스 정면" width="1086" height="1448" loading="eager" fetchPriority="high"/></figure><button className="primary-button" onClick={()=>navigate('prepare')}>게임 방법 알아보기 →</button></main>}
 {view==='read-first'&&<main id="home" className="read-first"><p className="read-first-label">게임 시작 전, 함께 읽어요</p><h1 tabIndex={-1} data-page-title>“저희 3분 동안 각자 웹사이트 설명서 읽고 게임 진행할까요?”</h1><p className="read-first-instruction">라고 말하고 읽어주세요.</p><p className="read-first-emphasis">뭘 알아야 게임을 하지 않겠습니까?!!!!!!</p><button className="primary-button" onClick={()=>navigate('prepare')}>설명서 읽기 →</button></main>}
 {view==='prepare'&&<main id="home" className="reader preparation"><h1 tabIndex={-1} data-page-title>시작하기 전, 잠깐!</h1><div className="deck-comparison" aria-label="회색 묶음과 검정색 묶음은 같은 구성"><figure><span className="deck-back grey"><img src={siteAsset("/cards/card-backs-original.png")} alt="회색 카드 뒷면"/></span><figcaption>회색 묶음</figcaption></figure><b>=</b><figure><span className="deck-back black"><img src={siteAsset("/cards/card-backs-original.png")} alt="검정색 카드 뒷면"/></span><figcaption>검정색 묶음</figcaption></figure></div><div className="deck-message"><p>회색과 검정색 묶음은 같은 구성입니다.</p><p>둘 중 하나만 사용해주세요.</p></div><button className="primary-button" onClick={()=>{setInitialStep(0);openGuide('rules')}}>확인! 게임 준비 시작하기 →</button></main>}

</div></div></>
}

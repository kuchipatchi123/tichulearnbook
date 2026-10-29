"use client";
import {useLayoutEffect,useRef,type ReactNode} from 'react';
/** Keep a complete lesson between the fixed navigation controls. */
export function FitContent({children,hidden}:{children:ReactNode;hidden?:boolean}){
 const outer=useRef<HTMLDivElement>(null),inner=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  const box=outer.current,content=inner.current;if(!box||!content||hidden)return;
  const fit=()=>{const height=content.offsetHeight;const scale=Math.min(1,box.clientHeight/Math.max(1,height));content.style.transform=`scale(${scale})`;};
  const observer=new ResizeObserver(fit);observer.observe(box);observer.observe(content);fit();
  return()=>observer.disconnect();
 },[hidden]);
 return <div className="fit-lesson" ref={outer} hidden={hidden}><div className="fit-lesson-content" ref={inner}>{children}</div></div>;
}

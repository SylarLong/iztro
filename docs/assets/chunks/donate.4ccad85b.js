import{_ as i,o as n,c as a,k as e,a as t,a5 as d,a6 as l,L as p}from"./framework.c0728865.js";import{_ as c,a as b}from"./wcpay.d0e1a780.js";const m={name:"Donate",data(){return{show:!1}}},u={style:{padding:"10px","border-radius":"5px","text-align":"center","margin-top":"35px","border-style":"double","border-color":"var(--vp-custom-block-danger-border)","border-top":"1px dashed var(--vp-custom-block-danger-border)","border-bottom":"1px dashed var(--vp-custom-block-danger-border)"}},_=e("p",null,"点击关闭",-1),x=e("div",null,[e("img",{src:c,alt:"alipay",width:"300",style:{display:"inline-block","border-radius":"20px"}}),t("  "),e("img",{src:b,alt:"wechat pay",width:"300",style:{display:"inline-block","border-radius":"20px"}})],-1),h=[_,x];function f(v,o,y,g,r,k){return n(),a(p,null,[e("div",u,[t(" 码字不易，如果觉得文档对你有帮助，请考虑 "),e("a",{style:{cursor:"pointer"},onClick:o[0]||(o[0]=s=>r.show=!0)},"点击此处打赏站长")]),d(e("div",{onClick:o[1]||(o[1]=s=>r.show=!r.show),style:{position:"fixed",top:"0",left:"0",right:"0",bottom:"0","z-index":"99","backdrop-filter":"blur(10px)",display:"flex","align-items":"center","justify-content":"center","flex-direction":"column",cursor:"pointer"}},h,512),[[l,r.show]])],64)}const B=i(m,[["render",f]]);export{B as D};
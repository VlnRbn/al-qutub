import{_ as i,G as c,o as u,b as l,a4 as r,V as s,a5 as f,a6 as d,a7 as m,a8 as _,a9 as h,aa as A,ab as g,ac as C,ad as v,ae as y,af as P,d as w,u as b,j as R,A as x,ag as D,ah as E,ai as T}from"./chunks/framework.75de9913.js";import{t as j}from"./chunks/theme.7edad8e3.js";const B={};function L(e,t){const a=c("Content");return u(),l(a)}const O=i(B,[["render",L]]);const S={extends:j,Layout:()=>r(O,null,{}),enhanceApp({app:e,router:t,siteData:a}){}};function p(e){if(e.extends){const t=p(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const o=p(S),V=w({name:"VitePressApp",setup(){const{site:e}=b();return R(()=>{x(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),D(),E(),T(),o.setup&&o.setup(),()=>r(o.Layout)}});async function F(){const e=k(),t=$();t.provide(d,e);const a=m(e.route);return t.provide(_,a),t.component("Content",h),t.component("ClientOnly",A),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:t,router:e,siteData:g}),{app:t,router:e,data:a}}function $(){return C(V)}function k(){let e=s,t;return v(a=>{let n=y(a);return n?(e&&(t=n),(e||t===n)&&(n=n.replace(/\.js$/,".lean.js")),s&&(e=!1),P(()=>import(n),[])):null},o.NotFound)}s&&F().then(({app:e,router:t,data:a})=>{t.go().then(()=>{f(t.route,a.site),e.mount("#app")})});export{F as createApp};

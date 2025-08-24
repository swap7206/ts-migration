import{j as e,a as t}from"./jsx-runtime-03b4ddbf.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";const D=({stats:l})=>{const f=l||[];return e("div",{className:"stat-card",children:[t("h4",{children:"Base Stats"}),t("div",{className:"stats-grid",children:f.length===0?t("div",{className:"no-stats",children:"No stats available"}):f.map((a,B)=>{if(!a||!a.stat||!a.stat.name)return e("div",{className:"stat-item",children:[e("div",{className:"stat-header",children:[t("span",{className:"stat-name",children:"UNKNOWN"}),t("span",{className:"stat-value",children:"0"})]}),t("div",{className:"stat-bar",children:t("div",{className:"stat-fill",style:{width:"0%",backgroundColor:h(0)}})})]},`invalid-${B}`);const m=a.base_stat!==null&&a.base_stat!==void 0?a.base_stat:0,u=a.stat.name||"unknown";return e("div",{className:"stat-item",children:[e("div",{className:"stat-header",children:[t("span",{className:"stat-name",children:u.toUpperCase()}),t("span",{className:"stat-value",children:m})]}),t("div",{className:"stat-bar",children:t("div",{className:"stat-fill",style:{width:`${Math.max(0,m/255*100)}%`,backgroundColor:h(m)}})})]},u)})})]})},h=l=>{const s=l/255*100;return s>=80?"#4CAF50":s>=60?"#8BC34A":s>=40?"#FFC107":s>=20?"#FF9800":"#F44336"},T={title:"Components/StatCard",component:D,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{stats:{control:"object",description:"Array of Pokemon stats"}}},d=[{base_stat:45,effort:0,stat:{name:"hp",url:"https://pokeapi.co/api/v2/stat/1/"}},{base_stat:49,effort:0,stat:{name:"attack",url:"https://pokeapi.co/api/v2/stat/2/"}},{base_stat:49,effort:0,stat:{name:"defense",url:"https://pokeapi.co/api/v2/stat/3/"}},{base_stat:65,effort:1,stat:{name:"special-attack",url:"https://pokeapi.co/api/v2/stat/4/"}},{base_stat:65,effort:0,stat:{name:"special-defense",url:"https://pokeapi.co/api/v2/stat/5/"}},{base_stat:45,effort:0,stat:{name:"speed",url:"https://pokeapi.co/api/v2/stat/6/"}}],L=[{base_stat:150,effort:0,stat:{name:"hp",url:"https://pokeapi.co/api/v2/stat/1/"}},{base_stat:180,effort:0,stat:{name:"attack",url:"https://pokeapi.co/api/v2/stat/2/"}},{base_stat:160,effort:0,stat:{name:"defense",url:"https://pokeapi.co/api/v2/stat/3/"}},{base_stat:200,effort:1,stat:{name:"special-attack",url:"https://pokeapi.co/api/v2/stat/4/"}},{base_stat:190,effort:0,stat:{name:"special-defense",url:"https://pokeapi.co/api/v2/stat/5/"}},{base_stat:170,effort:0,stat:{name:"speed",url:"https://pokeapi.co/api/v2/stat/6/"}}],U=[{base_stat:20,effort:0,stat:{name:"hp",url:"https://pokeapi.co/api/v2/stat/1/"}},{base_stat:15,effort:0,stat:{name:"attack",url:"https://pokeapi.co/api/v2/stat/2/"}},{base_stat:25,effort:0,stat:{name:"defense",url:"https://pokeapi.co/api/v2/stat/3/"}},{base_stat:30,effort:1,stat:{name:"special-attack",url:"https://pokeapi.co/api/v2/stat/4/"}},{base_stat:35,effort:0,stat:{name:"special-defense",url:"https://pokeapi.co/api/v2/stat/5/"}},{base_stat:40,effort:0,stat:{name:"speed",url:"https://pokeapi.co/api/v2/stat/6/"}}],r={args:{stats:d}},o={args:{stats:L}},c={args:{stats:U}},p={args:{stats:[d[0]]}},n={args:{stats:d.slice(0,3)}},i={args:{stats:[]}};var v,S,g;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    stats: mockStats
  }
}`,...(g=(S=r.parameters)==null?void 0:S.docs)==null?void 0:g.source}}};var k,b,_;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    stats: highStats
  }
}`,...(_=(b=o.parameters)==null?void 0:b.docs)==null?void 0:_.source}}};var N,C,y;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    stats: lowStats
  }
}`,...(y=(C=c.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};var w,x,F;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    stats: [mockStats[0]] // Only HP
  }
}`,...(F=(x=p.parameters)==null?void 0:x.docs)==null?void 0:F.source}}};var j,O,P;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    stats: mockStats.slice(0, 3) // Only first 3 stats
  }
}`,...(P=(O=n.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var A,E,H;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    stats: []
  }
}`,...(H=(E=i.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};const W=["Default","HighStats","LowStats","SingleStat","PartialStats","EmptyStats"];export{r as Default,i as EmptyStats,o as HighStats,c as LowStats,n as PartialStats,p as SingleStat,W as __namedExportsOrder,T as default};

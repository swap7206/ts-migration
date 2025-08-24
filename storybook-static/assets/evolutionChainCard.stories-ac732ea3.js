import{j as n,a}from"./jsx-runtime-03b4ddbf.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";const y=({evolutionChain:e,className:x})=>n("div",{className:`evolution-chain-card ${x||""}`,children:[a("h4",{className:"evolution-title",children:"Evolution Chain"}),n("div",{className:"evolution-info",children:[a("p",{children:"Evolution chain data would be displayed here."}),e&&n("div",{children:[n("p",{children:["Evolution Chain ID: ",e.id]}),e.chain&&a("p",{children:"Chain data available"})]}),!e&&a("p",{children:"No evolution chain data available"})]})]}),k={title:"Components/EvolutionChainCard",component:y,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{evolutionChain:{control:"object",description:"Evolution chain data"},className:{control:"text",description:"Additional CSS class name"}}},s={args:{evolutionChain:null,className:""}},o={args:{evolutionChain:{chain:{species:{name:"bulbasaur"},evolves_to:[{species:{name:"ivysaur"},evolves_to:[{species:{name:"venusaur"},evolves_to:[]}]}]}},className:""}},t={args:{evolutionChain:null,className:"custom-evolution-card"}},i={args:{evolutionChain:{chain:{species:{name:"eevee"},evolves_to:[{species:{name:"vaporeon"},evolves_to:[]},{species:{name:"jolteon"},evolves_to:[]},{species:{name:"flareon"},evolves_to:[]}]}},className:""}},r={args:{evolutionChain:{chain:{species:{name:"kangaskhan"},evolves_to:[]}},className:""}};var l,c,v;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    evolutionChain: null,
    className: ''
  }
}`,...(v=(c=s.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};var m,u,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    evolutionChain: {
      chain: {
        species: {
          name: 'bulbasaur'
        },
        evolves_to: [{
          species: {
            name: 'ivysaur'
          },
          evolves_to: [{
            species: {
              name: 'venusaur'
            },
            evolves_to: []
          }]
        }]
      }
    },
    className: ''
  }
}`,...(p=(u=o.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var d,h,C;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    evolutionChain: null,
    className: 'custom-evolution-card'
  }
}`,...(C=(h=t.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var g,_,E;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    evolutionChain: {
      chain: {
        species: {
          name: 'eevee'
        },
        evolves_to: [{
          species: {
            name: 'vaporeon'
          },
          evolves_to: []
        }, {
          species: {
            name: 'jolteon'
          },
          evolves_to: []
        }, {
          species: {
            name: 'flareon'
          },
          evolves_to: []
        }]
      }
    },
    className: ''
  }
}`,...(E=(_=i.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};var N,b,f;r.parameters={...r.parameters,docs:{...(N=r.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    evolutionChain: {
      chain: {
        species: {
          name: 'kangaskhan'
        },
        evolves_to: []
      }
    },
    className: ''
  }
}`,...(f=(b=r.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};const W=["Default","WithEvolutionData","WithCustomClass","ComplexEvolutionChain","EmptyEvolutionChain"];export{i as ComplexEvolutionChain,s as Default,r as EmptyEvolutionChain,t as WithCustomClass,o as WithEvolutionData,W as __namedExportsOrder,k as default};

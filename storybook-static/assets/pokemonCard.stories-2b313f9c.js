import{P as W}from"./pokemonCard-20734ddb.js";import"./jsx-runtime-03b4ddbf.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./pokemon.types-a57c28e1.js";const E={title:"Components/PokemonCard",component:W,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{onClick:{action:"clicked"},className:{control:"text",description:"Additional CSS class name"}}},e={id:1,name:"bulbasaur",base_experience:64,height:7,weight:69,sprites:{front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",front_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",front_female:null,front_shiny_female:null,back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",back_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",back_female:null,back_shiny_female:null,other:{dream_world:{front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",front_female:null},home:{front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",front_female:null,front_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png",front_shiny_female:null},"official-artwork":{front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",front_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png"}}},types:[{slot:1,type:{name:"grass",url:"https://pokeapi.co/api/v2/type/12/"}},{slot:2,type:{name:"poison",url:"https://pokeapi.co/api/v2/type/4/"}}],stats:[],abilities:[],moves:[],species:{name:"bulbasaur",url:"https://pokeapi.co/api/v2/pokemon-species/1/"},forms:[],game_indices:[],held_items:[],location_area_encounters:"",order:1,past_types:[]},T={...e,id:4,name:"charmander",sprites:{...e.sprites,front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",other:{...e.sprites.other,dream_world:{front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg",front_female:null}}},types:[{slot:1,type:{name:"fire",url:"https://pokeapi.co/api/v2/type/10/"}}]},x={...e,id:7,name:"squirtle",sprites:{...e.sprites,front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",other:{...e.sprites.other,dream_world:{front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg",front_female:null}}},types:[{slot:1,type:{name:"water",url:"https://pokeapi.co/api/v2/type/11/"}}]},s={args:{data:e,className:""}},t={args:{data:T,className:""}},r={args:{data:x,className:""}},o={args:{data:e,className:"custom-pokemon-card"}},a={args:{data:e,className:"",onClick:()=>console.log("Pokemon card clicked!")}},n={args:{data:e,className:"disabled-click"}},m={args:{data:{...e,sprites:{...e.sprites,front_default:null,other:{...e.sprites.other,dream_world:{front_default:null,front_female:null}}}},className:""}};var p,c,i;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    data: mockPokemon,
    className: ''
  }
}`,...(i=(c=s.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var l,d,u;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    data: firePokemon,
    className: ''
  }
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var k,h,f;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    data: waterPokemon,
    className: ''
  }
}`,...(f=(h=r.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var g,_,P;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    data: mockPokemon,
    className: 'custom-pokemon-card'
  }
}`,...(P=(_=o.parameters)==null?void 0:_.docs)==null?void 0:P.source}}};var b,y,w;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    data: mockPokemon,
    className: '',
    onClick: () => console.log('Pokemon card clicked!')
  }
}`,...(w=(y=a.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var C,I,N;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    data: mockPokemon,
    className: 'disabled-click'
  }
}`,...(N=(I=n.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var A,v,S;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    data: {
      ...mockPokemon,
      sprites: {
        ...mockPokemon.sprites,
        front_default: null,
        other: {
          ...mockPokemon.sprites.other,
          dream_world: {
            front_default: null,
            front_female: null
          }
        }
      }
    },
    className: ''
  }
}`,...(S=(v=m.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};const O=["Default","FireType","WaterType","WithCustomClass","WithClickHandler","DisabledClick","MissingImage"];export{s as Default,n as DisabledClick,t as FireType,m as MissingImage,r as WaterType,a as WithClickHandler,o as WithCustomClass,O as __namedExportsOrder,E as default};

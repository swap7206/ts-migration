import{a as e,F as B,j as a}from"./jsx-runtime-03b4ddbf.js";import{P as W,n as j}from"./pokemonCard-20734ddb.js";import{A as q}from"./tooltip-963725ad.js";import{b as A}from"./pokemon.types-a57c28e1.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./mergeRefs-709181ea.js";import"./useClassNames-cd544c9d.js";import"./_WeakMap-8d3a4593.js";import"./_arrayIncludes-226f8c26.js";import"./toNumber-70080845.js";import"./inheritsLoose-790729cc.js";import"./_getPrototype-c13c412d.js";import"./index-9d475cdf.js";import"./isPlainObject-ecdc5d07.js";import"./index-d3ea75b5.js";import"./useUpdateEffect-57780d03.js";import"./_baseIteratee-9034c0e6.js";const L=""+new URL("back-icon-cad3ac12.png",import.meta.url).href,z=""+new URL("close-icon-80d4d7ea.png",import.meta.url).href,I=""+new URL("right-icon-3c3f44d5.png",import.meta.url).href;const E=({data:c,speciesData:m,backClick:x,closeClick:F,forwordClick:S,className:T})=>{const o=()=>m&&m.flavor_text_entries?A(m.flavor_text_entries):"";return e(B,{children:e("div",{className:`details-header-container ${T||""}`,children:a("div",{className:"header-wrap",children:[e("div",{children:e(W,{className:"disabled-click",data:c},c.id)}),a("div",{className:"header-sub-wrap pl-3",children:[a("div",{className:"title-wrap",children:[e("div",{children:e("h3",{className:"text-caps",children:c.name})}),e("div",{className:"horizontal-line"}),e("div",{children:e("h3",{children:j(c.id)})}),e("div",{className:"horizontal-line"}),e("div",{children:a("div",{className:"icon-wrap",children:[e("img",{src:L,alt:"back icon to go backword",onClick:x,onKeyDown:()=>{},role:"presentation"}),e("img",{src:z,alt:"close icon to go backword",onClick:F,onKeyDown:()=>{},role:"presentation"}),e("img",{src:I,alt:"forword icon to go backword",onClick:S,onKeyDown:()=>{},role:"presentation"})]})})]}),a("div",{className:"text-description",children:[e("div",{className:"text-dot",children:e("span",{children:o()?o().substring(0,363):""})}),e("div",{className:"text-dot",children:"..."}),o()&&o().length>363&&e(q,{placement:"bottom",className:"load-more",tooltipClass:"tooltip-popover",name:"read more",data:o()})]})]})]})})})},ce={title:"Components/DetailsHeader",component:E,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{data:{control:"object",description:"Pokemon data"},speciesData:{control:"object",description:"Pokemon species data"},backClick:{action:"back clicked"},closeClick:{action:"close clicked"},forwordClick:{action:"forward clicked"},className:{control:"text",description:"Additional CSS class name"}}},n={id:1,name:"bulbasaur",base_experience:64,height:7,weight:69,sprites:{front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",front_shiny:null,front_female:null,front_shiny_female:null,back_default:null,back_shiny:null,back_female:null,back_shiny_female:null,other:{dream_world:{front_default:null,front_female:null},home:{front_default:null,front_female:null,front_shiny:null,front_shiny_female:null},"official-artwork":{front_default:null,front_shiny:null}}},types:[{slot:1,type:{name:"grass",url:"https://pokeapi.co/api/v2/type/12/"}},{slot:2,type:{name:"poison",url:"https://pokeapi.co/api/v2/type/4/"}}],stats:[],abilities:[],moves:[],species:{name:"bulbasaur",url:"https://pokeapi.co/api/v2/pokemon-species/1/"},forms:[],game_indices:[],held_items:[],location_area_encounters:"",order:1,past_types:[]},p={id:1,name:"bulbasaur",order:1,gender_rate:1,capture_rate:45,base_happiness:50,is_baby:!1,is_legendary:!1,is_mythical:!1,hatch_counter:20,has_gender_differences:!1,forms_switchable:!1,growth_rate:{name:"medium-slow",url:"https://pokeapi.co/api/v2/growth-rate/4/"},pokedex_numbers:[],egg_groups:[{name:"monster",url:"https://pokeapi.co/api/v2/egg-group/1/"},{name:"plant",url:"https://pokeapi.co/api/v2/egg-group/7/"}],color:{name:"green",url:"https://pokeapi.co/api/v2/pokemon-color/5/"},shape:{name:"quadruped",url:"https://pokeapi.co/api/v2/pokemon-shape/8/"},evolves_from_species:null,evolution_chain:{url:"https://pokeapi.co/api/v2/evolution-chain/1/"},habitat:{name:"grassland",url:"https://pokeapi.co/api/v2/pokemon-habitat/3/"},generation:{name:"generation-i",url:"https://pokeapi.co/api/v2/generation/1/"},names:[],flavor_text_entries:[{flavor_text:"A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",language:{name:"en",url:"https://pokeapi.co/api/v2/language/9/"},version:{name:"red",url:"https://pokeapi.co/api/v2/version/1/"}}],form_descriptions:[],genera:[{genus:"Seed Pokémon",language:{name:"en",url:"https://pokeapi.co/api/v2/language/9/"}}],varieties:[]},s={args:{data:n,speciesData:p,backClick:()=>console.log("Back clicked"),closeClick:()=>console.log("Close clicked"),forwordClick:()=>console.log("Forward clicked"),className:""}},l={args:{data:n,backClick:()=>console.log("Back clicked"),closeClick:()=>console.log("Close clicked"),forwordClick:()=>console.log("Forward clicked"),className:""}},r={args:{data:n,speciesData:p,backClick:()=>console.log("Back clicked"),closeClick:()=>console.log("Close clicked"),forwordClick:()=>console.log("Forward clicked"),className:"custom-details-header"}},t={args:{data:{...n,id:4,name:"charmander",types:[{slot:1,type:{name:"fire",url:"https://pokeapi.co/api/v2/type/10/"}}]},speciesData:{...p,id:4,name:"charmander",color:{name:"red",url:"https://pokeapi.co/api/v2/pokemon-color/8/"},genera:[{genus:"Lizard Pokémon",language:{name:"en",url:"https://pokeapi.co/api/v2/language/9/"}}]},backClick:()=>console.log("Back clicked"),closeClick:()=>console.log("Close clicked"),forwordClick:()=>console.log("Forward clicked"),className:""}},i={args:{data:{...n,id:7,name:"squirtle",types:[{slot:1,type:{name:"water",url:"https://pokeapi.co/api/v2/type/11/"}}]},speciesData:{...p,id:7,name:"squirtle",color:{name:"blue",url:"https://pokeapi.co/api/v2/pokemon-color/2/"},genera:[{genus:"Tiny Turtle Pokémon",language:{name:"en",url:"https://pokeapi.co/api/v2/language/9/"}}]},backClick:()=>console.log("Back clicked"),closeClick:()=>console.log("Close clicked"),forwordClick:()=>console.log("Forward clicked"),className:""}};var d,k,u;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    data: mockPokemon,
    speciesData: mockSpeciesData,
    backClick: () => console.log('Back clicked'),
    closeClick: () => console.log('Close clicked'),
    forwordClick: () => console.log('Forward clicked'),
    className: ''
  }
}`,...(u=(k=s.parameters)==null?void 0:k.docs)==null?void 0:u.source}}};var g,h,f;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    data: mockPokemon,
    backClick: () => console.log('Back clicked'),
    closeClick: () => console.log('Close clicked'),
    forwordClick: () => console.log('Forward clicked'),
    className: ''
  }
}`,...(f=(h=l.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var C,v,_;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    data: mockPokemon,
    speciesData: mockSpeciesData,
    backClick: () => console.log('Back clicked'),
    closeClick: () => console.log('Close clicked'),
    forwordClick: () => console.log('Forward clicked'),
    className: 'custom-details-header'
  }
}`,...(_=(v=r.parameters)==null?void 0:v.docs)==null?void 0:_.source}}};var b,w,y;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    data: {
      ...mockPokemon,
      id: 4,
      name: 'charmander',
      types: [{
        slot: 1,
        type: {
          name: 'fire',
          url: 'https://pokeapi.co/api/v2/type/10/'
        }
      }]
    },
    speciesData: {
      ...mockSpeciesData,
      id: 4,
      name: 'charmander',
      color: {
        name: 'red',
        url: 'https://pokeapi.co/api/v2/pokemon-color/8/'
      },
      genera: [{
        genus: 'Lizard Pokémon',
        language: {
          name: 'en',
          url: 'https://pokeapi.co/api/v2/language/9/'
        }
      }]
    },
    backClick: () => console.log('Back clicked'),
    closeClick: () => console.log('Close clicked'),
    forwordClick: () => console.log('Forward clicked'),
    className: ''
  }
}`,...(y=(w=t.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var N,P,D;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    data: {
      ...mockPokemon,
      id: 7,
      name: 'squirtle',
      types: [{
        slot: 1,
        type: {
          name: 'water',
          url: 'https://pokeapi.co/api/v2/type/11/'
        }
      }]
    },
    speciesData: {
      ...mockSpeciesData,
      id: 7,
      name: 'squirtle',
      color: {
        name: 'blue',
        url: 'https://pokeapi.co/api/v2/pokemon-color/2/'
      },
      genera: [{
        genus: 'Tiny Turtle Pokémon',
        language: {
          name: 'en',
          url: 'https://pokeapi.co/api/v2/language/9/'
        }
      }]
    },
    backClick: () => console.log('Back clicked'),
    closeClick: () => console.log('Close clicked'),
    forwordClick: () => console.log('Forward clicked'),
    className: ''
  }
}`,...(D=(P=i.parameters)==null?void 0:P.docs)==null?void 0:D.source}}};const se=["Default","WithoutSpeciesData","WithCustomClass","FireTypePokemon","WaterTypePokemon"];export{s as Default,t as FireTypePokemon,i as WaterTypePokemon,r as WithCustomClass,l as WithoutSpeciesData,se as __namedExportsOrder,ce as default};

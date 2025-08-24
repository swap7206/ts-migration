import{j as p,a as e,F as M}from"./jsx-runtime-03b4ddbf.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";const $=({speciesData:r,data:E,pokemonTypeData:h,className:H="property-container"})=>{var g,y,k,_,v;const t=E||{height:0,weight:0,base_experience:null,abilities:[],types:[]},B=a=>{if(a===-1)return"Genderless";if(a===0)return"Male only";if(a===8)return"Female only";const f=a/8*100;return`Male ${100-f}%, Female ${f}%`},n=a=>a.charAt(0).toUpperCase()+a.slice(1);return p("div",{className:H,children:[e("h4",{children:"Properties"}),p("div",{className:"properties-grid",children:[p("div",{className:"property-item",children:[e("span",{className:"property-label",children:"Height:"}),p("span",{className:"property-value",children:[(t.height/10).toFixed(1)," m"]})]}),p("div",{className:"property-item",children:[e("span",{className:"property-label",children:"Weight:"}),p("span",{className:"property-value",children:[(t.weight/10).toFixed(1)," kg"]})]}),p("div",{className:"property-item",children:[e("span",{className:"property-label",children:"Base Experience:"}),e("span",{className:"property-value",children:t.base_experience!==null&&t.base_experience!==void 0?t.base_experience:"N/A"})]}),r&&p(M,{children:[p("div",{className:"property-item",children:[e("span",{className:"property-label",children:"Gender(s):"}),e("span",{className:"property-value",children:B(r.gender_rate)})]}),p("div",{className:"property-item",children:[e("span",{className:"property-label",children:"Egg Groups:"}),e("span",{className:"property-value",children:((g=r.egg_groups)==null?void 0:g.map(a=>n(a.name)).join(", "))||"N/A"})]}),p("div",{className:"property-item",children:[e("span",{className:"property-label",children:"Capture Rate:"}),e("span",{className:"property-value",children:r.capture_rate||"N/A"})]}),p("div",{className:"property-item",children:[e("span",{className:"property-label",children:"Base Happiness:"}),e("span",{className:"property-value",children:r.base_happiness||"N/A"})]})]}),p("div",{className:"property-item",children:[e("span",{className:"property-label",children:"Abilities:"}),e("span",{className:"property-value",children:((y=t.abilities)==null?void 0:y.map(a=>n(a.ability.name)+(a.is_hidden?" (Hidden)":"")).join(", "))||"N/A"})]}),p("div",{className:"property-item",children:[e("span",{className:"property-label",children:"Types:"}),e("span",{className:"property-value",children:((k=t.types)==null?void 0:k.map(a=>n(a.type.name)).join(", "))||"N/A"})]}),p("div",{className:"property-item",children:[e("span",{className:"property-label",children:"Weak Against:"}),e("span",{className:"property-value",children:((v=(_=h==null?void 0:h.damage_relations)==null?void 0:_.double_damage_from)==null?void 0:v.map(a=>n(a.name)).join(", "))||"N/A"})]})]})]})},q={title:"Components/PropertyCard",component:$,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{speciesData:{control:"object",description:"Pokemon species data"},data:{control:"object",description:"Pokemon data"},pokemonTypeData:{control:"object",description:"Pokemon type data"}}},s={id:1,name:"bulbasaur",base_experience:64,height:7,weight:69,sprites:{front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",front_shiny:null,front_female:null,front_shiny_female:null,back_default:null,back_shiny:null,back_female:null,back_shiny_female:null,other:{dream_world:{front_default:null,front_female:null},home:{front_default:null,front_female:null,front_shiny:null,front_shiny_female:null},"official-artwork":{front_default:null,front_shiny:null}}},types:[{slot:1,type:{name:"grass",url:"https://pokeapi.co/api/v2/type/12/"}},{slot:2,type:{name:"poison",url:"https://pokeapi.co/api/v2/type/4/"}}],stats:[],abilities:[],moves:[],species:{name:"bulbasaur",url:"https://pokeapi.co/api/v2/pokemon-species/1/"},forms:[],game_indices:[],held_items:[],location_area_encounters:"",order:1,past_types:[]},u={id:1,name:"bulbasaur",order:1,gender_rate:1,capture_rate:45,base_happiness:50,is_baby:!1,is_legendary:!1,is_mythical:!1,hatch_counter:20,has_gender_differences:!1,forms_switchable:!1,growth_rate:{name:"medium-slow",url:"https://pokeapi.co/api/v2/growth-rate/4/"},pokedex_numbers:[{entry_number:1,pokedex:{name:"national",url:"https://pokeapi.co/api/v2/pokedex/1/"}}],form_descriptions:[],genera:[{genus:"Seed Pokémon",language:{name:"en",url:"https://pokeapi.co/api/v2/language/9/"}}],varieties:[{is_default:!0,pokemon:{name:"bulbasaur",url:"https://pokeapi.co/api/v2/pokemon/1/"}}],flavor_text_entries:[{flavor_text:"A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",language:{name:"en",url:"https://pokeapi.co/api/v2/language/9/"},version:{name:"red",url:"https://pokeapi.co/api/v2/version/1/"}}]},o={id:12,name:"grass",damage_relations:{double_damage_from:[{name:"fire",url:"https://pokeapi.co/api/v2/type/10/"},{name:"ice",url:"https://pokeapi.co/api/v2/type/15/"},{name:"poison",url:"https://pokeapi.co/api/v2/type/4/"},{name:"flying",url:"https://pokeapi.co/api/v2/type/3/"},{name:"bug",url:"https://pokeapi.co/api/v2/type/7/"}],double_damage_to:[{name:"water",url:"https://pokeapi.co/api/v2/type/11/"},{name:"ground",url:"https://pokeapi.co/api/v2/type/5/"},{name:"rock",url:"https://pokeapi.co/api/v2/type/6/"}],half_damage_from:[{name:"water",url:"https://pokeapi.co/api/v2/type/11/"},{name:"electric",url:"https://pokeapi.co/api/v2/type/13/"},{name:"grass",url:"https://pokeapi.co/api/v2/type/12/"},{name:"ground",url:"https://pokeapi.co/api/v2/type/5/"}],half_damage_to:[{name:"fire",url:"https://pokeapi.co/api/v2/type/10/"},{name:"grass",url:"https://pokeapi.co/api/v2/type/12/"},{name:"poison",url:"https://pokeapi.co/api/v2/type/4/"},{name:"flying",url:"https://pokeapi.co/api/v2/type/3/"},{name:"dragon",url:"https://pokeapi.co/api/v2/type/16/"},{name:"bug",url:"https://pokeapi.co/api/v2/type/7/"},{name:"steel",url:"https://pokeapi.co/api/v2/type/9/"}],no_damage_from:[],no_damage_to:[]},game_indices:[],generation:{name:"generation-i",url:"https://pokeapi.co/api/v2/generation/1/"},move_damage_class:{name:"special",url:"https://pokeapi.co/api/v2/move-damage-class/3/"},names:[{name:"Grass",language:{name:"en",url:"https://pokeapi.co/api/v2/language/9/"}}],pokemon:[{slot:1,pokemon:{name:"bulbasaur",url:"https://pokeapi.co/api/v2/pokemon/1/"}}],moves:[]},i={args:{speciesData:u,data:s,pokemonTypeData:o}},l={args:{speciesData:void 0,data:s,pokemonTypeData:o}},c={args:{speciesData:u,data:{...s,height:20,weight:1e3,base_experience:300},pokemonTypeData:o}},m={args:{speciesData:u,data:{...s,height:3,weight:5,base_experience:20},pokemonTypeData:o}},d={args:{speciesData:{...u,is_legendary:!0,capture_rate:3,base_happiness:0},data:s,pokemonTypeData:o}};var b,N,D;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    speciesData: mockSpeciesData,
    data: mockPokemon,
    pokemonTypeData: mockTypeData
  }
}`,...(D=(N=i.parameters)==null?void 0:N.docs)==null?void 0:D.source}}};var P,x,w;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    speciesData: undefined,
    data: mockPokemon,
    pokemonTypeData: mockTypeData
  }
}`,...(w=(x=l.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var T,S,A;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    speciesData: mockSpeciesData,
    data: {
      ...mockPokemon,
      height: 20,
      weight: 1000,
      base_experience: 300
    },
    pokemonTypeData: mockTypeData
  }
}`,...(A=(S=c.parameters)==null?void 0:S.docs)==null?void 0:A.source}}};var j,C,F;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    speciesData: mockSpeciesData,
    data: {
      ...mockPokemon,
      height: 3,
      weight: 5,
      base_experience: 20
    },
    pokemonTypeData: mockTypeData
  }
}`,...(F=(C=m.parameters)==null?void 0:C.docs)==null?void 0:F.source}}};var G,L,W;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    speciesData: {
      ...mockSpeciesData,
      is_legendary: true,
      capture_rate: 3,
      base_happiness: 0
    },
    data: mockPokemon,
    pokemonTypeData: mockTypeData
  }
}`,...(W=(L=d.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};const J=["Default","WithoutSpeciesData","LargePokemon","SmallPokemon","LegendaryPokemon"];export{i as Default,c as LargePokemon,d as LegendaryPokemon,m as SmallPokemon,l as WithoutSpeciesData,J as __namedExportsOrder,q as default};

import{a,F as V}from"./jsx-runtime-03b4ddbf.js";import{_ as X}from"./_arrayIncludes-226f8c26.js";import{_ as Y,u as Z}from"./useClassNames-cd544c9d.js";import{R as s}from"./index-76fb7be0.js";import{P as r}from"./index-9d475cdf.js";import"./_WeakMap-8d3a4593.js";import"./_commonjsHelpers-de833af9.js";import"./toNumber-70080845.js";var p=s.forwardRef(function(e,$){var u=e.as,O=u===void 0?"div":u,g=e.classPrefix,W=g===void 0?"loader":g,D=e.className,M=e.inverse,f=e.backdrop,v=e.speed,q=v===void 0?"normal":v,B=e.center,G=e.vertical,x=e.content,H=e.size,J=Y(e,["as","classPrefix","className","inverse","backdrop","speed","center","vertical","content","size"]),N=!!x,m=Z(W),K=m.merge,Q=m.withClassPrefix,o=m.prefix,U=K(D,o("wrapper","speed-"+q,H,{"backdrop-wrapper":f,"has-content":N,vertical:G,inverse:M,center:B}));return s.createElement(O,X({role:"progressbar"},J,{ref:$,className:U}),f&&s.createElement("div",{className:o("backdrop")}),s.createElement("div",{className:Q()},s.createElement("span",{className:o("spin")}),N&&s.createElement("span",{className:o("content")},x)))});p.displayName="Loader";p.propTypes={as:r.elementType,className:r.string,classPrefix:r.string,center:r.bool,backdrop:r.bool,inverse:r.bool,vertical:r.bool,content:r.node,size:r.oneOf(["lg","md","sm","xs"]),speed:r.oneOf(["normal","fast","slow"])};const ee=p,re=({className:e})=>a(V,{children:a("div",{className:e,children:a(ee,{size:"md",content:"Loading..."})})}),ie={title:"Components/Loader",component:re,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{className:{control:"text",description:"Additional CSS class name"}}},t={args:{className:""}},n={args:{className:"custom-loader"}},c={args:{className:"app-loader-wrapper"}},d={args:{className:"loadmore-loader"}},l={args:{className:"centered-loader"},decorators:[e=>a("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"200px",border:"1px solid #ccc",borderRadius:"8px"},children:a(e,{})})]},i={args:{className:"fullscreen-loader"},decorators:[e=>a("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0, 0, 0, 0.5)",zIndex:9999},children:a(e,{})})]};var h,y,b;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    className: ''
  }
}`,...(b=(y=t.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var C,L,S;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    className: 'custom-loader'
  }
}`,...(S=(L=n.parameters)==null?void 0:L.docs)==null?void 0:S.source}}};var w,P,_;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    className: 'app-loader-wrapper'
  }
}`,...(_=(P=c.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};var k,z,j;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    className: 'loadmore-loader'
  }
}`,...(j=(z=d.parameters)==null?void 0:z.docs)==null?void 0:j.source}}};var E,I,R;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    className: 'centered-loader'
  },
  decorators: [Story => <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    border: '1px solid #ccc',
    borderRadius: '8px'
  }}>
        <Story />
      </div>]
}`,...(R=(I=l.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var A,F,T;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    className: 'fullscreen-loader'
  },
  decorators: [Story => <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999
  }}>
        <Story />
      </div>]
}`,...(T=(F=i.parameters)==null?void 0:F.docs)==null?void 0:T.source}}};const me=["Default","WithCustomClass","AppLoader","LoadMoreLoader","CenteredLoader","FullScreenLoader"];export{c as AppLoader,l as CenteredLoader,t as Default,i as FullScreenLoader,d as LoadMoreLoader,n as WithCustomClass,me as __namedExportsOrder,ie as default};

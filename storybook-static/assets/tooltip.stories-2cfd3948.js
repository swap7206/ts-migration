import{j as o,a as t}from"./jsx-runtime-03b4ddbf.js";import{A as e}from"./tooltip-963725ad.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./mergeRefs-709181ea.js";import"./useClassNames-cd544c9d.js";import"./_WeakMap-8d3a4593.js";import"./_arrayIncludes-226f8c26.js";import"./toNumber-70080845.js";import"./inheritsLoose-790729cc.js";import"./_getPrototype-c13c412d.js";import"./index-9d475cdf.js";import"./isPlainObject-ecdc5d07.js";import"./index-d3ea75b5.js";import"./useUpdateEffect-57780d03.js";import"./_baseIteratee-9034c0e6.js";const et={title:"Components/Tooltip",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{placement:{control:"select",options:["top","bottom","left","right","topStart","topEnd","bottomStart","bottomEnd","leftStart","leftEnd","rightStart","rightEnd"],description:"Position of the tooltip"},data:{control:"text",description:"Content to display in the tooltip"},className:{control:"text",description:"CSS class for the trigger element"},name:{control:"text",description:"Text to display as the trigger"},tooltipClass:{control:"text",description:"CSS class for the tooltip popover"}}},a={args:{placement:"bottom",data:"This is a default tooltip with some helpful information.",className:"tooltip-trigger",name:"Hover me",tooltipClass:"custom-tooltip"}},r={args:{placement:"top",data:"Tooltip appears above the trigger element.",className:"tooltip-trigger",name:"Top Tooltip",tooltipClass:"custom-tooltip"}},s={args:{placement:"left",data:"Tooltip appears to the left of the trigger element.",className:"tooltip-trigger",name:"Left Tooltip",tooltipClass:"custom-tooltip"}},n={args:{placement:"right",data:"Tooltip appears to the right of the trigger element.",className:"tooltip-trigger",name:"Right Tooltip",tooltipClass:"custom-tooltip"}},p={args:{placement:"bottom",data:"This is a very long tooltip content that might wrap to multiple lines. It contains a lot of information that the user might need to understand the context of the element they are hovering over.",className:"tooltip-trigger",name:"Long Tooltip",tooltipClass:"custom-tooltip"}},i={args:{placement:"bottom",data:"Short",className:"tooltip-trigger",name:"Short Tooltip",tooltipClass:"custom-tooltip"}},l={args:{placement:"bottom",data:o("div",{children:[t("h4",{children:"Pokemon Information"}),o("p",{children:[t("strong",{children:"Name:"})," Bulbasaur"]}),o("p",{children:[t("strong",{children:"Type:"})," Grass/Poison"]}),o("p",{children:[t("strong",{children:"Height:"})," 0.7m"]}),o("p",{children:[t("strong",{children:"Weight:"})," 6.9kg"]})]}),className:"tooltip-trigger",name:"Pokemon Info",tooltipClass:"custom-tooltip"}},m={args:{placement:"bottom",data:"This tooltip has custom styling applied.",className:"custom-trigger",name:"Custom Styled",tooltipClass:"custom-tooltip-popover"},decorators:[G=>o("div",{children:[t("style",{children:`
            .custom-trigger {
              background-color: #007bff;
              color: white;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
              border: none;
            }
            .custom-trigger:hover {
              background-color: #0056b3;
            }
            .custom-tooltip-popover {
              background-color: #333;
              color: white;
              border-radius: 8px;
              padding: 12px;
              max-width: 300px;
            }
          `}),t(G,{})]})]},c={render:()=>o("div",{style:{display:"flex",gap:"20px",flexWrap:"wrap"},children:[t(e,{placement:"top",data:"This tooltip appears on top",className:"tooltip-trigger",name:"Top",tooltipClass:"custom-tooltip"}),t(e,{placement:"bottom",data:"This tooltip appears below",className:"tooltip-trigger",name:"Bottom",tooltipClass:"custom-tooltip"}),t(e,{placement:"left",data:"This tooltip appears on the left",className:"tooltip-trigger",name:"Left",tooltipClass:"custom-tooltip"}),t(e,{placement:"right",data:"This tooltip appears on the right",className:"tooltip-trigger",name:"Right",tooltipClass:"custom-tooltip"})]})};var g,d,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    placement: 'bottom',
    data: 'This is a default tooltip with some helpful information.',
    className: 'tooltip-trigger',
    name: 'Hover me',
    tooltipClass: 'custom-tooltip'
  }
}`,...(h=(d=a.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};var u,f,T;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    placement: 'top',
    data: 'Tooltip appears above the trigger element.',
    className: 'tooltip-trigger',
    name: 'Top Tooltip',
    tooltipClass: 'custom-tooltip'
  }
}`,...(T=(f=r.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var C,b,x;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    placement: 'left',
    data: 'Tooltip appears to the left of the trigger element.',
    className: 'tooltip-trigger',
    name: 'Left Tooltip',
    tooltipClass: 'custom-tooltip'
  }
}`,...(x=(b=s.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var S,N,v;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    placement: 'right',
    data: 'Tooltip appears to the right of the trigger element.',
    className: 'tooltip-trigger',
    name: 'Right Tooltip',
    tooltipClass: 'custom-tooltip'
  }
}`,...(v=(N=n.parameters)==null?void 0:N.docs)==null?void 0:v.source}}};var y,w,P;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    placement: 'bottom',
    data: 'This is a very long tooltip content that might wrap to multiple lines. It contains a lot of information that the user might need to understand the context of the element they are hovering over.',
    className: 'tooltip-trigger',
    name: 'Long Tooltip',
    tooltipClass: 'custom-tooltip'
  }
}`,...(P=(w=p.parameters)==null?void 0:w.docs)==null?void 0:P.source}}};var k,L,A;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    placement: 'bottom',
    data: 'Short',
    className: 'tooltip-trigger',
    name: 'Short Tooltip',
    tooltipClass: 'custom-tooltip'
  }
}`,...(A=(L=i.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};var H,I,R;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    placement: 'bottom',
    data: <div>
        <h4>Pokemon Information</h4>
        <p><strong>Name:</strong> Bulbasaur</p>
        <p><strong>Type:</strong> Grass/Poison</p>
        <p><strong>Height:</strong> 0.7m</p>
        <p><strong>Weight:</strong> 6.9kg</p>
      </div>,
    className: 'tooltip-trigger',
    name: 'Pokemon Info',
    tooltipClass: 'custom-tooltip'
  }
}`,...(R=(I=l.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var W,E,B;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    placement: 'bottom',
    data: 'This tooltip has custom styling applied.',
    className: 'custom-trigger',
    name: 'Custom Styled',
    tooltipClass: 'custom-tooltip-popover'
  },
  decorators: [Story => <div>
        <style>
          {\`
            .custom-trigger {
              background-color: #007bff;
              color: white;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
              border: none;
            }
            .custom-trigger:hover {
              background-color: #0056b3;
            }
            .custom-tooltip-popover {
              background-color: #333;
              color: white;
              border-radius: 8px;
              padding: 12px;
              max-width: 300px;
            }
          \`}
        </style>
        <Story />
      </div>]
}`,...(B=(E=m.parameters)==null?void 0:E.docs)==null?void 0:B.source}}};var M,j,D;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  }}>
      <AppTooltip placement="top" data="This tooltip appears on top" className="tooltip-trigger" name="Top" tooltipClass="custom-tooltip" />
      <AppTooltip placement="bottom" data="This tooltip appears below" className="tooltip-trigger" name="Bottom" tooltipClass="custom-tooltip" />
      <AppTooltip placement="left" data="This tooltip appears on the left" className="tooltip-trigger" name="Left" tooltipClass="custom-tooltip" />
      <AppTooltip placement="right" data="This tooltip appears on the right" className="tooltip-trigger" name="Right" tooltipClass="custom-tooltip" />
    </div>
}`,...(D=(j=c.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};const at=["Default","TopPlacement","LeftPlacement","RightPlacement","LongContent","ShortContent","WithHTMLContent","CustomStyling","MultipleTooltips"];export{m as CustomStyling,a as Default,s as LeftPlacement,p as LongContent,c as MultipleTooltips,n as RightPlacement,i as ShortContent,r as TopPlacement,l as WithHTMLContent,at as __namedExportsOrder,et as default};

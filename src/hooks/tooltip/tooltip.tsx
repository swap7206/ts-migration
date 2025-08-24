import React, { forwardRef } from 'react';
import { Whisper, Popover } from 'rsuite';

interface DefaultPopoverProps {
  content: string;
  className?: string;
}

interface AppTooltipProps {
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'topStart' | 'topEnd' | 'bottomStart' | 'bottomEnd' | 'leftStart' | 'leftEnd' | 'rightStart' | 'rightEnd';
  data: string;
  className?: string;
  tooltipClass?: string;
  name?: string;
}

const DefaultPopover = forwardRef<HTMLDivElement, DefaultPopoverProps>(({ content, className }, ref) => (
  <Popover ref={ref} className={className}>
    <p>{content}</p>
  </Popover>
));

DefaultPopover.displayName = 'DefaultPopover';

const AppTooltip: React.FC<AppTooltipProps> = ({ 
  placement = 'top', 
  data, 
  className, 
  tooltipClass, 
  name 
}) => {
  return (
    <Whisper
      trigger="click"
      placement={placement}
      controlId={`control-id-${placement}`}
      speaker={
        <DefaultPopover content={data} className={tooltipClass} />
      }
    >
      <span className={className}>{name || 'Click for more info'}</span>
    </Whisper>
  );
};

export default AppTooltip;

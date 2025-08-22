import React, { forwardRef } from 'react';
import { Whisper, Popover } from 'rsuite';

interface DefaultPopoverProps {
  content: React.ReactNode;
  className?: string;
  [key: string]: any;
}

const DefaultPopover = forwardRef<HTMLDivElement, DefaultPopoverProps>(
  ({ content, className, ...props }, ref) => {
    return (
      <Popover ref={ref} {...props} className={className} arrow={false}>
        <p>{content}</p>
      </Popover>
    );
  }
);

DefaultPopover.displayName = 'DefaultPopover';

interface AppTooltipProps {
  placement?: string;
  data: React.ReactNode;
  className?: string;
  name: string;
  tooltipClass?: string;
}

const AppTooltip: React.FC<AppTooltipProps> = ({ 
  placement, 
  data, 
  className, 
  name, 
  tooltipClass 
}) => (
  <Whisper
    trigger="click"
    placement={placement}
    controlId={`control-id-${placement}`}
    speaker={
      <DefaultPopover content={data} className={tooltipClass} />
    }
  >
    <div className={className}>{name}</div>
  </Whisper>
);

export default AppTooltip;

import React from 'react';
import { CheckPicker } from 'rsuite';
import "./multiSelectdropDown.scss";

interface MultiSelectOption {
  label: string;
  value: string;
}

interface AppMultiSelectDropDownProps {
  label?: React.ReactNode;
  onChangeHandler?: (value: string[]) => void;
  onChange?: (value: string[]) => void; // Alias for onChangeHandler
  data: MultiSelectOption[];
  placeholder?: string;
  isOpen?: boolean;
  onOpenHandler?: () => void;
  onCloseHandler?: () => void;
  onCleanHandler?: () => void;
  className?: string;
}

const AppMultiSelectDropDown: React.FC<AppMultiSelectDropDownProps> = ({ 
  label, 
  onChangeHandler, 
  onChange,
  data, 
  placeholder,
  isOpen,
  onOpenHandler,
  onCloseHandler,
  onCleanHandler,
  className
}) => (
  <>
    <div className="multiselect-dropdown-wrapper">
      <div className='dropdown-label'><span>{label}</span></div>
      <div className={`${isOpen ? "is-dropdown-open" : ""} check-picker-wrap`}>
        <CheckPicker 
          block 
          placeholder={placeholder} 
          onChange={onChange || onChangeHandler} 
          size="lg" 
          onOpen={onOpenHandler} 
          onClose={onCloseHandler} 
          onClean={onCleanHandler} 
          data={data} 
          searchable={false} 
          style={{ width: 224 }} 
          className={className}
        />
      </div>
    </div>
  </>
);

export default AppMultiSelectDropDown;

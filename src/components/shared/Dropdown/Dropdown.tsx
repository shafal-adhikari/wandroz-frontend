import React, {
  useState,
  useEffect,
  useRef,
  ReactElement,
  ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
interface DropdownProps {
  children: ReactNode;
  open?: boolean;
  className?: string;
}

interface DropdownButtonProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  className,
  open,
}) => {
  const [isOpen, setIsOpen] = useState(open ?? false);
  useEffect(() => {
    setIsOpen(open ?? false);
  }, [open]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname) {
      setIsOpen(false);
    }
  }, [location.pathname]);
  return (
    <div ref={dropdownRef} className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DropdownButton) {
          const dropdownButton = child as ReactElement<DropdownButtonProps>;
          return React.cloneElement(dropdownButton, {
            onClick: () => setIsOpen(!isOpen),
          });
        }
        if (React.isValidElement(child) && child.type !== DropdownContent) {
          return child;
        }
      })}
      {isOpen && (
        <>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type == DropdownContent) {
              return child;
            }
          })}
        </>
      )}
    </div>
  );
};
interface DropdownContentProps {
  className?: string;
  children: ReactNode;
}
export const DropdownButton: React.FC<DropdownButtonProps> = ({
  onClick,
  className,
  children,
}) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export const DropdownContent: React.FC<DropdownContentProps> = ({
  className,
  children,
}) => {
  return <div className={className}>{children}</div>;
};

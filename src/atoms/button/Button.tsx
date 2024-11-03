import "./Button.css";

interface ButtonProps {
  children?: React.ReactNode;
  buttonText?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  classText?: string;
}

export default function Button({
  children,
  buttonText,
  variant = "primary",
  size = "medium",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  classText,
}: ButtonProps) {
  // Support both old and new implementations
  const content = buttonText || children;
  const finalClassName = classText
    ? `btn-submit ${classText}`
    : `button button-${variant} button-${size} ${className}`;

  return (
    <button
      type={type}
      className={finalClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

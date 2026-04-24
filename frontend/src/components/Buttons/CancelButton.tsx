import { Button } from "@chakra-ui/react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  value: string;
  className?: string;
  bg?: string;
  _hover?: {
    bg?: string;
  };
  onClick?: () => void;
}

export const CancelButton: React.FC<ButtonProps> = ({
  type = "button",
  value,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <Button
      type={type}
      variant="outline"
      className={`px-4 py-2 rounded  ${className}`}
      bg="gray.200"
      _hover={{ bg: "gray.300" }}
      onClick={onClick}
      color="black"
      {...props}
    >
      {value}
    </Button>
  );
};

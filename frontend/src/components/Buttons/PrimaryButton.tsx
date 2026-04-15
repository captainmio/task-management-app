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

export const PrimaryButton = ({
  type = "button",
  value,
  className = "",
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <Button
      type={type}
      variant="outline"
      className={`text-white px-4 py-2 rounded  ${className}`}
      bg="blue.600"
      _hover={{ bg: "blue.400" }}
      onClick={onClick}
      color="white"
      {...props}
    >
      {value}
    </Button>
  );
};

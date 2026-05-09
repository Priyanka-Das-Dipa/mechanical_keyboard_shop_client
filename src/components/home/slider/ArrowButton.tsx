type ArrowButtonProps = {
  onClick: () => void;
  direction: "prev" | "next";
  disabled: boolean;
};
export const ArrowButton: React.FC<ArrowButtonProps> = ({
  onClick,
  direction,
  disabled,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    className={`
      absolute top-1/2 -translate-y-1/2 z-50
      flex items-center justify-center
      bg-white/90 hover:bg-white
      rounded-full shadow-md
      w-8 h-8 md:w-10 md:h-10
      transition-all duration-200
      disabled:opacity-30 disabled:cursor-not-allowed
      ${direction === "prev" ? "left-3 md:left-5" : "right-3 md:right-5"}
    `}
  >
    <svg
      className="w-4 h-4 md:w-5 md:h-5 fill-black/70"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === "next" ? "rotate(180deg)" : undefined }}
    >
      <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" />
    </svg>
  </button>
);

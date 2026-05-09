type DotButtonProps = {
  selected: boolean;
  onClick: () => void;
};
 
export const DotButton: React.FC<DotButtonProps> = ({ selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={selected ? "Current slide" : "Go to slide"}
    className={`h-2 rounded-full transition-all duration-500 bg-white ${
      selected ? "w-8 opacity-100" : "w-2 opacity-50"
    }`}
  />
);
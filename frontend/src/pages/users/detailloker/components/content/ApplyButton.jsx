export default function ApplyButton({ text = "Daftar Sekarang", onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        mt-10 inline-flex
        rounded-full
        bg-red-500
        px-10 py-3
        text-[13px] font-semibold text-white
        shadow-sm
        transition
        hover:bg-red-600
        active:scale-95
      "
        >
            {text}
        </button>
    );
}
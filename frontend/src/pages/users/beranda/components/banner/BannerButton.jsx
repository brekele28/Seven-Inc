export default function BannerButton({ onClick, disabled = false }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="
        w-fit
        rounded-full
        bg-white
        px-4 py-2.5 md:px-8 md:py-3.5
        text-[10px] md:text-[16px]
        font-bold text-neutral-900
        shadow-md
        cursor-pointer
        transition-transform hover:scale-105 active:scale-95
      "
        >
            Daftar Sekarang
        </button>
    );
}
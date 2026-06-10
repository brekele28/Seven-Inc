export default function AboutAction({ onClick }) {
    return (
        <button
            className="mt-8 inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50 transition-colors cursor-pointer"
            type="button"
            onClick={onClick}
        >
            Baca Selengkapnya
        </button>
    );
}
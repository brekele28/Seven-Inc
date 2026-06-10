export default function Submit({ isSubmitting }) {
    return (
        <div className="md:col-span-2">
            <button
                type="submit"
                disabled={isSubmitting}
                className={[
                    "mt-12 w-full rounded-full border border-neutral-200 bg-white py-4 text-[14px] font-semibold text-neutral-900",
                    "shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition hover:bg-neutral-50 active:scale-[0.99]",
                    "focus:outline-none focus:ring-2 focus:ring-neutral-200",
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
                ].join(" ")}
            >
                {isSubmitting ? "Memproses..." : "Kirim Pesan"}
            </button>
        </div>
    );
}
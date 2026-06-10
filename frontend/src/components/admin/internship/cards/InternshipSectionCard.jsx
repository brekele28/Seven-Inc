export default function InternshipSectionCard({ children }) {
    return (
        <section className="overflow-hidden rounded-[34px] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:shadow-xl hover:shadow-red-100/40">
            {children}
        </section>
    );
}
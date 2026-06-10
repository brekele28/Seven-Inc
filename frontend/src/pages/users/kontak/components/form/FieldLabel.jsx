export default function FieldLabel({ children, required }) {
    return (
        <label className="text-[14px] font-semibold text-neutral-900">
            {children} {required ? <span className="text-red-600">*</span> : null}
        </label>
    );
}
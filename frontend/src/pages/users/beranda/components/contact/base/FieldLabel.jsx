export default function FieldLabel({ htmlFor, children, required }) {
    return (
        <label htmlFor={htmlFor} className="text-[14px] font-bold text-neutral-900">
            {children} {required ? <span className="text-red-500">*</span> : null}
        </label>
    );
}
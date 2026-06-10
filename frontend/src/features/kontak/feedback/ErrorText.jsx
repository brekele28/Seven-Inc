export default function ErrorText({ children }) {
    if (!children) return null;
    return <p className="mt-2 text-[12px] text-red-600">{children}</p>;
}
import FormSection from "../form/Section";

export default function Layout(props) {
    return (
        <div className="mx-auto w-full max-w-[1180px]">
            <FormSection {...props} />
        </div>
    );
}
import TextField from "../fields/TextField";
import SelectField from "../fields/SelectField";
import DateField from "../fields/DateField";
import TextAreaField from "../fields/TextAreaField";
import FileUploadField from "../fields/FileUploadField";

function FieldRenderer({ field, value, error, onChange }) {
    const common = { field, value, error, onChange };

    switch (field.type) {
        case "select":
            return <SelectField {...common} />;
        case "date":
            return <DateField {...common} />;
        case "textarea":
            return <TextAreaField {...common} />;
        case "file":
            return <FileUploadField {...common} />;
        default:
            return <TextField {...common} />;
    }
}

export default function ApplyFormSection({ section, values, errors, onChange }) {
    const fields = Array.isArray(section?.fields) ? section.fields : [];

    const isDocs = section?.id === "documents";
    const gridClass = isDocs
        ? "grid grid-cols-1 gap-5"
        : "grid grid-cols-1 md:grid-cols-2 gap-5";

    return (
        <section className="rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.05)]">
            <div className="px-5 pt-5 pb-4 md:px-6">
                <h3 className="text-[14px] font-extrabold text-neutral-900">
                    {section?.title}
                </h3>

                {section?.description ? (
                    <p className="mt-1 text-[12px] leading-[1.8] text-neutral-600">
                        {section.description}
                    </p>
                ) : null}
            </div>

            <div className="px-5 pb-5 md:px-6">
                <div className={gridClass}>
                    {fields.map((field) => (
                        <FieldRenderer
                            key={field.name}
                            field={field}
                            value={values?.[field.name]}
                            error={errors?.[field.name]}
                            onChange={onChange}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
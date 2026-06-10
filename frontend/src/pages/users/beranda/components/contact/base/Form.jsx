import Fields from "../fields/Fields";
import Submit from "./Submit";

export default function Form({ kontak }) {
    return (
        <div className="lg:col-span-8">
            <form className="w-full" onSubmit={kontak.submit}>
                <Fields kontak={kontak} />
                <Submit isSubmitting={kontak.isSubmitting} />
            </form>
        </div>
    );
}
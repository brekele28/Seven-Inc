import Name from "./Name";
import Email from "./Email";
import Phone from "./Phone";
import Subject from "./Subject";
import Message from "./Message";

export default function Fields({ kontak }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <Name kontak={kontak} />
            <Email kontak={kontak} />
            <Phone kontak={kontak} />
            <Subject kontak={kontak} />
            <Message kontak={kontak} />
        </div>
    );
}
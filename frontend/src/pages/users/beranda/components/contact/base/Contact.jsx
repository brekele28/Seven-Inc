import useKontak from "../../../../../../hooks/user/kontak/useKontak";
import Sukses from "../../../../../../features/kontak/feedback/sukses/Sukses";
import Gagal from "../../../../../../features/kontak/feedback/gagal/Gagal";

import Header from "./Header";
import Form from "./Form";

export default function Contact() {
    const kontak = useKontak({ targetWaNumber: "081258612071" });

    const isSuccessOpen = kontak.dialog.open && kontak.dialog.variant === "success";
    const isErrorOpen = kontak.dialog.open && kontak.dialog.variant === "error";

    return (
        <section className="bg-white py-16 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                <Header />
                <Form kontak={kontak} />
            </div>

            {/* Modal reusable (premium) */}
            <Sukses
                open={isSuccessOpen}
                title={kontak.dialog.title}
                message={kontak.dialog.message}
                onConfirm={kontak.confirmSend}
                onCancel={kontak.cancelSend}
                confirmText="Ya, Kirim"
                cancelText="Tidak"
            />

            <Gagal
                open={isErrorOpen}
                title={kontak.dialog.title}
                message={kontak.dialog.message}
                onClose={kontak.closeDialog}
                closeText="Tutup"
            />
        </section>
    );
}
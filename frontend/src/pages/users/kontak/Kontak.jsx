import useKontak from "../../../hooks/user/kontak/useKontak";
import Header from "./components/hero/Header";
import Form from "./components/form/Form";
import InfoBox from "./components/info/InfoBox";
import Map from "./components/map/Map";

import Sukses from "../../../features/kontak/feedback/sukses/Sukses";
import Gagal from "../../../features/kontak/feedback/gagal/Gagal";

export default function Kontak() {
    const kontak = useKontak();

    const isSuccessOpen = kontak.dialog.open && kontak.dialog.variant === "success";
    const isErrorOpen = kontak.dialog.open && kontak.dialog.variant === "error";

    return (
        <div className="w-full">
            <Header />

            {/* Card: Form (white) + Info (red) */}
            <section className="mt-8">
                <div
                    className={[
                        "relative overflow-hidden",
                        "rounded-[26px]",
                        "border border-neutral-200",
                        "bg-white",
                        "shadow-[0_18px_50px_rgba(0,0,0,0.08)]",
                    ].join(" ")}
                >
                    <div className="grid md:grid-cols-[1.25fr_0.75fr]">
                        <div className="p-6 sm:p-8 md:p-10">
                            <Form
                                values={kontak.values}
                                errors={kontak.errors}
                                isSubmitting={kontak.isSubmitting}
                                subjectOptions={kontak.subjectOptions}
                                onChange={kontak.setField}
                                onSubmit={kontak.submit}
                            />
                        </div>

                        <InfoBox />
                    </div>
                </div>
            </section>

            {/* Map full width (keluar dari batas Container layout) */}
            <Map className="mt-10" />

            {/* Premium Modals */}
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
        </div>
    );
}
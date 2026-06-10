import { useNavigate } from "react-router-dom";

import useStatusLamaran from "../../../hooks/user/statuslamaran/useStatusLamaran";
import { STATUS_UI } from "../../../services/user/statuslamaran/data/statuslamaran.ui.dummy";

import Header from "./components/header/Header";
import BackButton from "./components/header/BackButton";
import NotFoundAlert from "./components/state/NotFoundAlert";
import MultipleList from "./components/multiple/MultipleList";
import SummaryCard from "./components/single/SummaryCard";
import TrackerCard from "./components/single/TrackerCard";

export default function StatusLamaran() {
    const navigate = useNavigate();

    const {
        phone,
        mode,
        showNotFound,
        singleApp,
        listByPhone,
        isLoading,
        error,
    } = useStatusLamaran();

    return (
        <section className="bg-white">
            <div className="max-w-245 mx-auto px-0">
                <div className="flex items-start justify-between gap-4">
                    <Header />

                    <BackButton
                        label={STATUS_UI.header.back}
                        onClick={() => {
                            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                            navigate("/cek-lamaran");
                        }}
                    />
                </div>

                {isLoading ? (
                    <div className="mt-8 rounded-2xl border border-neutral-200 bg-white px-5 py-8 text-center text-[13px] font-semibold text-neutral-600">
                        Memuat status lamaran...
                    </div>
                ) : null}

                {!isLoading && error ? (
                    <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-[13px] font-semibold text-red-700">
                        {error}
                    </div>
                ) : null}

                {!isLoading ? <NotFoundAlert show={showNotFound} /> : null}

                {!isLoading && mode === "multi-by-phone" ? (
                    <MultipleList phone={phone} list={listByPhone} />
                ) : null}

                {!isLoading && singleApp ? (
                    <>
                        <SummaryCard app={singleApp} />
                        <TrackerCard app={singleApp} />
                    </>
                ) : null}
            </div>
        </section>
    );
}
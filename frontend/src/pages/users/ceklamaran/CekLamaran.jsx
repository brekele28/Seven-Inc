import useCekLamaran from "../../../hooks/user/ceklamaran/useCekLamaran";

import SearchCard from "./components/search/SearchCard";

export default function CekLamaran() {
    const {
        mode,
        handleChangeMode,
        placeholder,
        activeValue,
        setActiveValue,
        errorMsg,
        onSubmit,
        suggestedPhone,
        isLoading,
    } = useCekLamaran();

    return (
        <section className="relative overflow-hidden bg-white">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-red-100/60 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

            <div className="relative mx-auto max-w-245 px-0">
                <SearchCard
                    mode={mode}
                    onChangeMode={handleChangeMode}
                    value={activeValue}
                    placeholder={placeholder}
                    onChangeValue={setActiveValue}
                    errorMsg={errorMsg}
                    onSubmit={onSubmit}
                    suggestedPhone={suggestedPhone}
                    loading={isLoading}
                    isLoading={isLoading}
                />
            </div>
        </section>
    );
}
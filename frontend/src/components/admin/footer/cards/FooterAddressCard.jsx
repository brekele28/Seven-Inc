import { MapPin } from "lucide-react";

import TextareaField from "../fields/TextareaField";

import EditActionButton from "../actions/EditActionButton";
import DeleteActionButton from "../actions/DeleteActionButton";

export default function FooterAddressCard({
    item,
    openEdit,
    openDelete,
}) {
    return (
        <div className="rounded-[30px] border border-neutral-200 bg-gradient-to-br from-white to-red-50/30 p-5 transition duration-300 hover:shadow-lg hover:shadow-red-100">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-100 bg-white shadow-sm">
                        <MapPin className="h-6 w-6 text-red-500" />
                    </div>

                    <div>
                        <h3 className="text-[18px] font-black text-neutral-950">
                            Kantor Pusat
                        </h3>

                        <p className="mt-1 text-[13px] text-neutral-500">
                            Alamat utama perusahaan Seven INC.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <EditActionButton
                        onClick={() =>
                            openEdit("address", item)
                        }
                    />

                    <DeleteActionButton
                        onClick={() =>
                            openDelete("address", item.id)
                        }
                    />
                </div>
            </div>

            <div className="mt-5">
                <TextareaField
                    label="Alamat Kantor"
                    value={item.value}
                />
            </div>
        </div>
    );
}
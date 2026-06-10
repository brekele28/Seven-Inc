import {
    Instagram,
    Linkedin,
    Facebook,
    Twitter,
} from "lucide-react";

import InputField from "../fields/InputField";

import EditActionButton from "../actions/EditActionButton";
import DeleteActionButton from "../actions/DeleteActionButton";

const icons = {
    Instagram,
    LinkedIn: Linkedin,
    Facebook,
    "Twitter/X": Twitter,
};

export default function FooterSocialCard({
    item,
    openEdit,
    openDelete,
}) {
    const Icon = icons[item.platform];

    return (
        <div className="rounded-[28px] border border-neutral-200 bg-gradient-to-br from-white to-red-50/40 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-100">
            <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-100 bg-white shadow-sm">
                    <Icon className="h-6 w-6 text-red-500" />
                </div>

                <div className="flex items-center gap-2">
                    <EditActionButton
                        onClick={() =>
                            openEdit("social", item)
                        }
                    />

                    <DeleteActionButton
                        onClick={() =>
                            openDelete("social", item.id)
                        }
                    />
                </div>
            </div>

            <div className="mt-5">
                <InputField
                    label={item.platform}
                    value={item.url}
                />
            </div>
        </div>
    );
}
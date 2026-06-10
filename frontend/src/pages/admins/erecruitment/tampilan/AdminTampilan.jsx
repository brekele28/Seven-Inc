import useTampilan from "../../../../hooks/admin/tampilan/useTampilan";

import Layout from "./ui/layout/Layout";

export default function AdminTampilan() {
    const tampilan = useTampilan();

    return (
        <div className="space-y-6">
            <Layout {...tampilan} />
        </div>
    );
}
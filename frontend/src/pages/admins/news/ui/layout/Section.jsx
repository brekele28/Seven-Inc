import Hero from "../form/Hero";
import Stats from "../form/Stats";
import Toolbar from "../form/Toolbar";
import Table from "../form/Table";
import Actions from "../form/Actions";

export default function Section({
    onCreate,
    onDetail,
    onEdit,
    onCopy,
}) {
    return (
        <div className="space-y-6">
            <Stats />

            <Toolbar onCreate={onCreate} />

            <Table
                onDetail={onDetail}
                onEdit={onEdit}
                onCopy={onCopy}
            />

            <Hero />

            <Actions />
        </div>
    );
}
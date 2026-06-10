import { CheckCircle2, Clock, XCircle, AlertTriangle } from "lucide-react";
import StepIcon from "./StepIcon";

function DecisionBranchIcon({ status }) {
    if (status === "done") {
        return <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />;
    }

    if (status === "failed") {
        return <XCircle className="h-4 w-4 text-red-600" aria-hidden="true" />;
    }

    if (status === "expired") {
        return <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden="true" />;
    }

    return <Clock className="h-4 w-4 text-neutral-500" aria-hidden="true" />;
}

function getDecisionBranchClass(status) {
    if (status === "done") {
        return "border-emerald-200 bg-emerald-50 text-emerald-800";
    }

    if (status === "failed") {
        return "border-red-200 bg-red-50 text-red-800";
    }

    if (status === "expired") {
        return "border-amber-200 bg-amber-50 text-amber-800";
    }

    return "border-neutral-200 bg-neutral-50/70 text-neutral-700";
}

function DecisionBranch({ branch }) {
    return (
        <div
            className={[
                "rounded-2xl border px-4 py-3",
                "transition",
                getDecisionBranchClass(branch.status),
            ].join(" ")}
        >
            <div className="flex items-start gap-2">
                <DecisionBranchIcon status={branch.status} />

                <div>
                    <p className="text-[12px] font-extrabold leading-relaxed">
                        {branch.title}
                    </p>

                    {branch.description ? (
                        <p className="mt-1 text-[11px] leading-[1.7] opacity-80">
                            {branch.description}
                        </p>
                    ) : null}

                    {branch.dateLabel ? (
                        <p className="mt-2 text-[10px] font-semibold opacity-70">
                            {branch.dateLabel}
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

function DecisionBranches({ branches = [] }) {
    if (!Array.isArray(branches) || !branches.length) return null;

    return (
        <div className="mt-4">
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.25em] text-neutral-500">
                Cabang Keputusan
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {branches.map((branch) => (
                    <DecisionBranch key={branch.key} branch={branch} />
                ))}
            </div>
        </div>
    );
}

export default function TrackerStep({ step, isLast }) {
    const branches = Array.isArray(step?.branches) ? step.branches : [];

    return (
        <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
                <StepIcon status={step.status} />
                {!isLast ? (
                    <div className="mt-1 w-px flex-1 min-h-[40px] bg-neutral-200" />
                ) : null}
            </div>

            <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-[12px] font-extrabold text-neutral-900">
                            {step.title}
                        </p>
                        <p className="mt-1 text-[12px] leading-[1.75] text-neutral-600">
                            {step.description}
                        </p>
                    </div>

                    <p className="text-[11px] font-semibold text-neutral-500 whitespace-nowrap">
                        {step.dateLabel}
                    </p>
                </div>

                {step.note ? (
                    <div className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50/70 px-4 py-3">
                        <p className="text-[12px] text-neutral-700 leading-[1.75]">
                            {step.note}
                        </p>
                    </div>
                ) : null}

                <DecisionBranches branches={branches} />
            </div>
        </div>
    );
}
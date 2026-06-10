import JobCard from "./JobCard";

export default function JobList({ jobs = [], onJobClick }) {
    return (
        <>
            {Array.isArray(jobs)
                ? jobs.map((job) => (
                    <JobCard key={job.id} job={job} onClick={() => onJobClick?.(job)} />
                ))
                : null}
        </>
    );
}
import StatCard from "../components/StatCard";
import CertificateCard from "../components/CertificateCard";
const stats = [
    {
        title: "Active Certificates",
        value: "12",
        description: "Currently valid",
    },
    {
        title: "Expiring Soon",
        value: "3",
        description: "Within the next 30 days",
    },
    {
        title: "Compliance Score",
        value: "87%",
        description: "Overall compliance health",
    },
];

interface Certificate {
    id: number;
    name: string;
    authority: string;
    expiryDate: string;
    status: "Active" | "Expiring Soon" | "Expired";
}

const certificates: Certificate[] = [
    {
        id: 1,
        name: "Factory License",
        authority: "Punjab Pollution Control Board",
        expiryDate: "Aug 18, 2026",
        status: "Expiring Soon",
    },
    {
        id: 2,
        name: "Fire Safety Certificate",
        authority: "Fire Department",
        expiryDate: "Sep 12, 2026",
        status: "Active",
    },
    {
        id: 3,
        name: "GST Registration",
        authority: "GST Department",
        expiryDate: "Dec 20, 2026",
        status: "Active",
    },
];







const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white p-6">
                <h1 className="text-2xl font-bold text-blue-600">
                    ComplyEasy
                </h1>

                <nav className="mt-10 space-y-2">
                    <button className="w-full rounded-lg bg-blue-50 px-4 py-3 text-left font-medium text-blue-600">
                        Dashboard
                    </button>

                    <button className="w-full rounded-lg px-4 py-3 text-left text-gray-600 hover:bg-gray-100">
                        Certificates
                    </button>

                    <button className="w-full rounded-lg px-4 py-3 text-left text-gray-600 hover:bg-gray-100">
                        AI Assistant
                    </button>
                </nav>

                <button className="absolute bottom-6 left-6 text-gray-600 hover:text-red-600">
                    Logout
                </button>
            </aside>

            {/* Main content */}
            <main className="ml-64 p-10">
                <h2 className="text-3xl font-bold text-gray-900">
                    Welcome back!
                </h2>

                <p className="mt-2 text-gray-600">
                    Here's an overview of your compliance status.
                </p>

                {/* Stats */}
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {stats.map(stat=>
                        <StatCard key={stat.title} title={stat.title} value={stat.value} description={stat.description}></StatCard>
                    )}
                </div>
                <section className="mt-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Your Certificates
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Keep track of your compliance documents.
                            </p>
                        </div>

                        <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                            + Add Certificate
                        </button>
                    </div>

                    <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {certificates.map((certificate) => (
                            <CertificateCard
                                key={certificate.id}
                                certificate={certificate}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
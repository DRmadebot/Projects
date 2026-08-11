interface CertificateCardProps {
    certificate: {
        id: number;
        name: string;
        authority: string;
        expiryDate: string;
        status: "Active" | "Expiring Soon" | "Expired";
    };
}

const CertificateCard = ({ certificate }: CertificateCardProps) => {
    const { name, authority, expiryDate, status } = certificate;

    return (
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900">
                        {name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        {authority}
                    </p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                        status === "Active"
                            ? "bg-green-100 text-green-700"
                            : status === "Expiring Soon"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {status}
                </span>
            </div>

            <div className="mt-5">
                <p className="text-xs text-gray-500">
                    Expiry date
                </p>

                <p className="mt-1 font-medium text-gray-900">
                    {expiryDate}
                </p>
            </div>
        </div>
    );
};

export default CertificateCard;
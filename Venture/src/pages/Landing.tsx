import FeatureCard from "../components/FeatureCard";
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom";


const Landing = ()=>{

    const features = [
    {
        title: "Smart Expiry Tracking",
        description:
        "Track all your compliance certificates and never miss an important renewal.",
    },
    {
        title: "Intelligent Reminders",
        description:
        "Receive timely notifications before your certificates expire.",
    },
    {
        title: "AI Compliance Assistant",
        description:
        "Ask questions in plain English and get instant compliance insights.",
    },
    {
        title: "Audit-Ready Dashboard",
        description:
        "Monitor the health of your compliance system from one place.",
    },
    ];
    return(
        <div>
            <Navbar/>
            
            <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
            <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl">
                Never Miss a{" "}
                <span className="text-blue-600">Compliance Deadline</span> Again
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                Track licenses, certificates, and regulatory deadlines in one place.
                Receive intelligent reminders and stay audit-ready without spreadsheets or
                sticky notes.
            </p>

            <div className="mt-10 flex gap-4">
                <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                Get Started
                </Link>

                <a
                href="#features"
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                Learn More
                </a>
            </div>
            </section>

            <section id="features" className="bg-gray-50 px-6 py-24">
                <div className="mx-auto max-w-6xl">
                    <h2 className="text-center text-4xl font-bold text-gray-900">
                    Why Choose ComplyEasy?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">
                    Everything you need to manage compliance, avoid missed renewals,
                    and stay audit-ready.
                    </p>

                    <div className="mt-14 grid gap-8 md:grid-cols-2">
                    {features.map((feature) => (
                        <FeatureCard
                        key={feature.title}
                        {...feature}
                        />
                    ))}
                    </div>
                </div>
            </section>
        </div>

    )
}
export default Landing
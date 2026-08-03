import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData,
            [event.target.name]:event.target.value,
        })
    }
    const handleSubmit=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        console.log(formData);
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
            <h1 className="text-center text-3xl font-bold text-gray-900">
            Create your account
            </h1>

            <p className="mt-2 text-center text-gray-600">
            Start managing your compliance in minutes.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
                <label className="mb-2 block font-medium text-gray-700">
                Full Name
                </label>
                <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="John Doe"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
            </div>

            <div>
                <label className="mb-2 block font-medium text-gray-700">
                Email
                </label>
                <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="john@example.com"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
            </div>

            <div>
                <label className="mb-2 block font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
            </div>

            <div>
                <label className="mb-2 block font-medium text-gray-700">
                Confirm Password
                </label>
                <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
                Create Account
            </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
            >
                Login
            </Link>
            </p>
        </div>
        </div>
    );
};

export default Register;
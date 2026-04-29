import { useState } from "react";

export default function SearchCity() {
    const [query, setQuery] = useState("");

    return (
        <div>
            <input value={query} onChange={(e) => setQuery(e.target.value)}
                type="text" placeholder="Search city"
                className="border border-gray-300 rounded-md px-4 py-2 mt-3 w-full" />
        </div>
    )
}

import { useEffect, useState } from "react";

function VaccinationCentres() {
    const [centres, setCentres] = useState([]);
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [centreType, setCentreType] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchCentres() {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                "http://localhost:8080/api/vaccination-centres"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch vaccination centres");
            }

            const data = await response.json();
            setCentres(data);
        } catch (error) {
            console.error(error);
            setError("Unable to load vaccination centres.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCentres();
    }, []);

    async function handleSearch(event) {
        event.preventDefault();

        setLoading(true);
        setError("");

        try {
            let url = "http://localhost:8080/api/vaccination-centres";

            if (pinCode.trim() !== "") {
                url += `/search/pincode?pinCode=${encodeURIComponent(pinCode)}`;
            } else if (city.trim() !== "") {
                url += `/search/city?city=${encodeURIComponent(city)}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Search failed");
            }

            const data = await response.json();
            setCentres(data);
        } catch (error) {
            console.error(error);
            setError("Unable to search vaccination centres.");
        } finally {
            setLoading(false);
        }
    }

    const filteredCentres = centres.filter((centre) => {
        if (centreType === "") return true;

        return centre.centreType.toLowerCase() === centreType.toLowerCase();
    });

    return (
        <div>
            <h2>Find Vaccination Centres</h2>

            <form onSubmit={handleSearch}>
                <div>
                    <label>Search by City:</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            setPinCode("");
                        }}
                        placeholder="Enter city"
                    />
                </div>

                <br />

                <div>
                    <label>Search by PIN Code:</label>
                    <input
                        type="text"
                        value={pinCode}
                        onChange={(e) => {
                            setPinCode(e.target.value);
                            setCity("");
                        }}
                        placeholder="Enter PIN code"
                    />
                </div>

                <br />

                <div>
                    <label>Centre Type:</label>
                    <select
                        value={centreType}
                        onChange={(e) => setCentreType(e.target.value)}
                    >
                        <option value="">All Centres</option>
                        <option value="Government">Government</option>
                        <option value="Private">Private</option>
                    </select>
                </div>

                <br />

                <button type="submit">Search</button>

                <button
                    type="button"
                    onClick={() => {
                        setCity("");
                        setPinCode("");
                        setCentreType("");
                        fetchCentres();
                    }}
                >
                    Reset
                </button>
            </form>

            <hr />

            {loading ? (
                <p>Loading vaccination centres...</p>
            ) : error ? (
                <p>{error}</p>
            ) : filteredCentres.length === 0 ? (
                <p>No vaccination centres found.</p>
            ) : (
                filteredCentres.map((centre) => (
                    <div key={centre.id}>
                        <h3>{centre.name}</h3>

                        <p>
                            <strong>Type:</strong> {centre.centreType}
                        </p>

                        <p>
                            <strong>Address:</strong> {centre.address},
                            {" "}{centre.city}, {centre.state} - {centre.pinCode}
                        </p>

                        <p>
                            <strong>Contact:</strong> {centre.contactNumber}
                        </p>

                        <p>
                            <strong>Available Vaccines:</strong> {centre.availableVaccines}
                        </p>

                        <p>
                            <strong>Vaccination Days:</strong> {centre.vaccinationDays}
                        </p>

                        <p>
                            <strong>Timings:</strong> {centre.vaccinationTimings}
                        </p>

                        <p>
                            <strong>Fees:</strong> {centre.fees}
                        </p>

                        {centre.mapLink && (
                            <a
                                href={centre.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Map
                            </a>
                        )}

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default VaccinationCentres;

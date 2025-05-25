/**
 * VisitorLocation Component
 *
 * This component fetches and displays the visitor's location.
 * It uses the BigDataCloud API to determine the city and country.
 */

"use client"

import { useState, useEffect } from "react"

export default function VisitorLocation() {
  // State to store the location text
  const [location, setLocation] = useState<string>("loading...")

  // State to store any error that occurs
  const [error, setError] = useState<string | null>(null)

  // Effect to fetch the location when the component mounts
  useEffect(() => {
    // Async function to fetch location data
    async function fetchLocation() {
      try {
        // Using BigDataCloud's free client-side API which doesn't require an API key
        // This service has IP geolocation fallback if no coordinates are provided
        const response = await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en")

        // Check if the request was successful
        if (!response.ok) {
          throw new Error("Failed to fetch location")
        }

        // Parse the JSON response
        const data = await response.json()

        // Extract location from the response
        if (data.city || data.locality) {
          const city = data.city || data.locality || ""
          const country = data.countryName || ""
          const principalSubdivisionCode = data.principalSubdivisionCode || ""

          // Check if the visitor is from the US
          if (country === "United States" || data.countryCode === "US") {
            // Extract the state abbreviation from principalSubdivisionCode (typically format: "US-CA")
            let stateCode = ""
            if (principalSubdivisionCode && principalSubdivisionCode.includes("-")) {
              stateCode = principalSubdivisionCode.split("-")[1]
            }

            // Display US city with state abbreviation
            const locationString = stateCode ? `${city}, ${stateCode}` : city
            setLocation(locationString)
          } else {
            // For non-US locations, show city and country
            const locationString = country ? `${city}, ${country}` : city
            setLocation(locationString)
          }
        } else {
          setLocation("somewhere mysterious")
        }
      } catch (err) {
        console.error("Error fetching location:", err)
        // Provide a fallback location
        setLocation("Malmö, Sweden")
        setError("Failed to retrieve location")
      }
    }

    // Call the fetch function
    fetchLocation()
  }, []) // Empty dependency array means this runs once when component mounts

  // Return the location text
  return <span>{location}</span>
}

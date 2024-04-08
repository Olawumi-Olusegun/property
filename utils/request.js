
import { API_URL } from "./../constants/index";

// Fecth all properties
export const fetchProperties = async () => {

  // Handle case where the domain is not available yet
  if(!API_URL) {
    return [];
  }

    try {

      const response = await fetch(`${API_URL}/properties`, { cache: "no-store" });
  
      const { properties, } =  await response.json();
  
      if(!response.ok) {
        throw new Error("Failed to fetch data")
      }
  
      return properties;
    } catch (error) {
      return [];
    }
  }

  
// Fecth single property
export const fetchSingleProperty = async (propertyId) => {

  // Handle case where the domain is not available yet
  if(!API_URL) {
    return null;
  }

    try {

      const response = await fetch(`${API_URL}/properties/${propertyId}`, { cache: "no-store" });
  
      const { property, } =  await response.json();
  
      if(!response.ok) {
        throw new Error("Failed to fetch data")
      }
  
      return property;
    } catch (error) {
      return null;
    }
  }
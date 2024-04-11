
import { API_URL } from "./../constants/index";

// Fecth all properties
export const fetchProperties = async ({ showFeatured = false } = {}) => {

  // Handle case where the domain is not available yet
  if(!API_URL) {
    return [];
  }

    try {

      const response = await fetch(`${API_URL}/properties${showFeatured ? "/featured" : ""}`, { cache: "no-store" });
  
      if(!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const data =  await response.json();
  
      return showFeatured ? data?.featured : data?.result?.properties;
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


  // Fetch single property
export const fetchProperty =  async (propertyId) => {
  try {
    // Handle the case where the domain is not available yet
    if(!API_URL) {
      return null;
    }

    const response = await fetch(`${API_URL}/properties/${propertyId}`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    if(!data || !data?.property) {
      return null;
    }

    return data?.property;
  } catch (error) {
    console.log(error);
    return null;
  }
}
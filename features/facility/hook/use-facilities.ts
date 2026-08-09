import { PageQuery } from "@/features/types/api-query";
import { useQuery } from "@tanstack/react-query";
import { facilityService } from "../api/facility.service";
import { FACILITY_KEYS } from "../api/facility.keys";


//Fetch Facilities Hook
export function useFacilities(query: PageQuery) {
  return useQuery({
    queryKey: FACILITY_KEYS.list(query),  // ["facilities", "list", {page:0, size:10}]
    queryFn: async () => facilityService.getFacilities(query),
    placeholderData: (previous) => previous, // Keeps old data while loading
    // onError: (error) =>{
    //   console.log("Failed to fetch facilities:",error);
    // }
  });
}


// What it does:

// Makes the API call with pagination/search/sort parameters

// Caches the result using the query key

// Automatically refetches when parameters change

// Returns { data, isLoading, error }
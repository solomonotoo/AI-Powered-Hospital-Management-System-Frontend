const facility = [
  {
    country: "Ghana",
    year: 2026,
    summary: {
      totalFacilities: 25,
      activeFacilities: 22,
      inactiveFacilities: 3,
    },
    facilities: [
      {
        id: 1,
        facilityName: "Korle Bu Teaching Hospital",
        category: "Teaching Hospital",
        region: "Greater Accra",
        status: "Active",
      },
      {
        id: 2,
        facilityName: "Komfo Anokye Teaching Hospital",
        category: "Teaching Hospital",
        region: "Ashanti",
        status: "Active",
      },
      {
        id: 3,
        facilityName: "Tamale Teaching Hospital",
        category: "Teaching Hospital",
        region: "Northern",
        status: "Active",
      },
      {
        id: 4,
        facilityName: "Cape Coast Teaching Hospital",
        category: "Teaching Hospital",
        region: "Central",
        status: "Active",
      },
      {
        id: 5,
        facilityName: "Ho Teaching Hospital",
        category: "Teaching Hospital",
        region: "Volta",
        status: "Inactive",
      },
      {
        id: 6,
        facilityName: "Greater Accra Regional Hospital",
        category: "Regional Hospital",
        region: "Greater Accra",
        status: "Active",
      },
      {
        id: 7,
        facilityName: "Sunyani Regional Hospital",
        category: "Regional Hospital",
        region: "Bono",
        status: "Active",
      },
      {
        id: 8,
        facilityName: "Koforidua Regional Hospital",
        category: "Regional Hospital",
        region: "Eastern",
        status: "Active",
      },
      {
        id: 9,
        facilityName: "Wa Regional Hospital",
        category: "Regional Hospital",
        region: "Upper West",
        status: "Active",
      },
      {
        id: 10,
        facilityName: "Bolgatanga Regional Hospital",
        category: "Regional Hospital",
        region: "Upper East",
        status: "Active",
      },
      {
        id: 11,
        facilityName: "Tema General Hospital",
        category: "District Hospital",
        region: "Greater Accra",
        status: "Active",
      },
      {
        id: 12,
        facilityName: "Effia Nkwanta Hospital",
        category: "District Hospital",
        region: "Western",
        status: "Active",
      },
      {
        id: 13,
        facilityName: "Keta Municipal Hospital",
        category: "District Hospital",
        region: "Volta",
        status: "Inactive",
      },
      {
        id: 14,
        facilityName: "Axim Government Hospital",
        category: "District Hospital",
        region: "Western",
        status: "Active",
      },
      {
        id: 15,
        facilityName: "Madina Polyclinic",
        category: "Polyclinic",
        region: "Greater Accra",
        status: "Active",
      },
      {
        id: 16,
        facilityName: "Dansoman Polyclinic",
        category: "Polyclinic",
        region: "Greater Accra",
        status: "Active",
      },
      {
        id: 17,
        facilityName: "Kasoa Polyclinic",
        category: "Polyclinic",
        region: "Central",
        status: "Active",
      },
      {
        id: 18,
        facilityName: "Aburi Health Centre",
        category: "Health Centre",
        region: "Eastern",
        status: "Active",
      },
      {
        id: 19,
        facilityName: "Ejisu Health Centre",
        category: "Health Centre",
        region: "Ashanti",
        status: "Active",
      },
      {
        id: 20,
        facilityName: "Navrongo Health Centre",
        category: "Health Centre",
        region: "Upper East",
        status: "Inactive",
      },
      {
        id: 21,
        facilityName: "CHPS Compound - Dodowa",
        category: "CHPS",
        region: "Greater Accra",
        status: "Active",
      },
      {
        id: 22,
        facilityName: "CHPS Compound - Savelugu",
        category: "CHPS",
        region: "Northern",
        status: "Active",
      },
      {
        id: 23,
        facilityName: "CHPS Compound - Bongo",
        category: "CHPS",
        region: "Upper East",
        status: "Active",
      },
      {
        id: 24,
        facilityName: "Hope Maternity Home",
        category: "Maternity Home",
        region: "Eastern",
        status: "Active",
      },
      {
        id: 25,
        facilityName: "Grace Maternity Clinic",
        category: "Maternity Home",
        region: "Ashanti",
        status: "Active",
      },
    ],
    categoryStatistics: [
      {
        category: "Teaching Hospital",
        totalFacilities: 5,
        activeFacilities: 4,
        inactiveFacilities: 1,
      },
      {
        category: "Regional Hospital",
        totalFacilities: 5,
        activeFacilities: 5,
        inactiveFacilities: 0,
      },
      {
        category: "District Hospital",
        totalFacilities: 4,
        activeFacilities: 3,
        inactiveFacilities: 1,
      },
      {
        category: "Polyclinic",
        totalFacilities: 3,
        activeFacilities: 3,
        inactiveFacilities: 0,
      },
      {
        category: "Health Centre",
        totalFacilities: 3,
        activeFacilities: 2,
        inactiveFacilities: 1,
      },
      {
        category: "CHPS",
        totalFacilities: 3,
        activeFacilities: 3,
        inactiveFacilities: 0,
      },
      {
        category: "Maternity Home",
        totalFacilities: 2,
        activeFacilities: 2,
        inactiveFacilities: 0,
      },
    ],
  },
];

export const FacilitySummaryMock = {
  totalFacilities: 25,
  activeFacilities: 22,
  inActiveFacilities: 3,
  referralPipeline: 5,
};

export const facilities = [
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "code": "FAC-001",
    "name": "Korle-Bu Teaching Hospital",
    "type": "TEACHING_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Guggisberg Avenue",
      "line2": "",
      "city": "Accra",
      "state": "Greater Accra",
      "postalCode": "GA-123-4567",
      "country": "Ghana"
    },
    "contactPhone": "+233302674441",
    "contactEmail": "info@korlebu.com"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "code": "FAC-002",
    "name": "Komfo Anokye Teaching Hospital",
    "type": "TEACHING_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Okomfo Anokye Road",
      "line2": "",
      "city": "Kumasi",
      "state": "Ashanti",
      "postalCode": "AK-201-6789",
      "country": "Ghana"
    },
    "contactPhone": "+233322023301",
    "contactEmail": "info@kath.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "code": "FAC-003",
    "name": "Tamale Teaching Hospital",
    "type": "TEACHING_HOSPITAL",
    "status": "PENDING",
    "location": {
      "line1": "Hospital Road",
      "line2": "",
      "city": "Tamale",
      "state": "Northern",
      "postalCode": "NR-101-2233",
      "country": "Ghana"
    },
    "contactPhone": "+233372093311",
    "contactEmail": "info@tth.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "code": "FAC-004",
    "name": "Greater Accra Regional Hospital",
    "type": "REGIONAL_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Castle Road",
      "line2": "Ridge",
      "city": "Accra",
      "state": "Greater Accra",
      "postalCode": "GA-456-7890",
      "country": "Ghana"
    },
    "contactPhone": "+233302221111",
    "contactEmail": "contact@ridgehospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440004",
    "code": "FAC-005",
    "name": "Cape Coast Teaching Hospital",
    "type": "TEACHING_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Beulah Road",
      "line2": "",
      "city": "Cape Coast",
      "state": "Central",
      "postalCode": "CR-567-8901",
      "country": "Ghana"
    },
    "contactPhone": "+233332132233",
    "contactEmail": "info@ccth.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440005",
    "code": "FAC-006",
    "name": "Ho Teaching Hospital",
    "type": "TEACHING_HOSPITAL",
    "status": "INACTIVE",
    "location": {
      "line1": "Hospital Road",
      "line2": "",
      "city": "Ho",
      "state": "Volta",
      "postalCode": "VR-345-1122",
      "country": "Ghana"
    },
    "contactPhone": "+233362022233",
    "contactEmail": "info@hth.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440006",
    "code": "FAC-007",
    "name": "Sunyani Regional Hospital",
    "type": "REGIONAL_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Hospital Road",
      "line2": "",
      "city": "Sunyani",
      "state": "Bono",
      "postalCode": "BN-889-1122",
      "country": "Ghana"
    },
    "contactPhone": "+233352022111",
    "contactEmail": "info@sunyanihospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440007",
    "code": "FAC-008",
    "name": "Madina Polyclinic",
    "type": "POLYCLINIC",
    "status": "ACTIVE",
    "location": {
      "line1": "Madina Zongo Junction",
      "line2": "",
      "city": "Accra",
      "state": "Greater Accra",
      "postalCode": "GA-778-2233",
      "country": "Ghana"
    },
    "contactPhone": "+233302555444",
    "contactEmail": "info@madinapolyclinic.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440008",
    "code": "FAC-009",
    "name": "Tema General Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Hospital Road",
      "line2": "Community 11",
      "city": "Tema",
      "state": "Greater Accra",
      "postalCode": "TM-123-8877",
      "country": "Ghana"
    },
    "contactPhone": "+233303202222",
    "contactEmail": "info@temahospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440009",
    "code": "FAC-010",
    "name": "East Legon Family Clinic",
    "type": "CLINIC",
    "status": "PENDING",
    "location": {
      "line1": "Boundary Road",
      "line2": "",
      "city": "Accra",
      "state": "Greater Accra",
      "postalCode": "GA-110-2233",
      "country": "Ghana"
    },
    "contactPhone": "+233244123456",
    "contactEmail": "info@eastlegonclinic.com"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "code": "FAC-011",
    "name": "Sogakope District Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Accra-Aflao Road",
      "line2": "",
      "city": "Sogakope",
      "state": "Volta",
      "postalCode": "VR-567-3344",
      "country": "Ghana"
    },
    "contactPhone": "+233362442233",
    "contactEmail": "info@sogakopehospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440011",
    "code": "FAC-012",
    "name": "Koforidua Regional Hospital",
    "type": "REGIONAL_HOSPITAL",
    "status": "INACTIVE",
    "location": {
      "line1": "Hospital Road",
      "line2": "",
      "city": "Koforidua",
      "state": "Eastern",
      "postalCode": "ER-123-4567",
      "country": "Ghana"
    },
    "contactPhone": "+233342022333",
    "contactEmail": "info@koforiduahospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440012",
    "code": "FAC-013",
    "name": "Tarkwa Municipal Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Tarkwa-Abosso Road",
      "line2": "",
      "city": "Tarkwa",
      "state": "Western",
      "postalCode": "WR-789-0011",
      "country": "Ghana"
    },
    "contactPhone": "+233312022444",
    "contactEmail": "info@tarkwahospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440013",
    "code": "FAC-014",
    "name": "Wa Municipal Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Wa-Tumu Road",
      "line2": "",
      "city": "Wa",
      "state": "Upper West",
      "postalCode": "UW-345-8877",
      "country": "Ghana"
    },
    "contactPhone": "+233392022555",
    "contactEmail": "info@wahospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440014",
    "code": "FAC-015",
    "name": "Asante Mampong Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Kumasi-Mampong Road",
      "line2": "",
      "city": "Mampong",
      "state": "Ashanti",
      "postalCode": "AK-567-9988",
      "country": "Ghana"
    },
    "contactPhone": "+233322044566",
    "contactEmail": "info@mamponghospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440015",
    "code": "FAC-016",
    "name": "Techiman Holy Family Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Techiman-Nkoranza Road",
      "line2": "",
      "city": "Techiman",
      "state": "Bono East",
      "postalCode": "BE-234-5567",
      "country": "Ghana"
    },
    "contactPhone": "+233352044777",
    "contactEmail": "info@holyfamilyhospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440016",
    "code": "FAC-017",
    "name": "Obuasi Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Obuasi-Kumasi Road",
      "line2": "",
      "city": "Obuasi",
      "state": "Ashanti",
      "postalCode": "AK-890-6677",
      "country": "Ghana"
    },
    "contactPhone": "+233322066788",
    "contactEmail": "info@obuasihospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440017",
    "code": "FAC-018",
    "name": "Dormaa Presbyterian Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Dormaa-Ahenkro Road",
      "line2": "",
      "city": "Dormaa Ahenkro",
      "state": "Bono",
      "postalCode": "BN-123-8899",
      "country": "Ghana"
    },
    "contactPhone": "+233352088999",
    "contactEmail": "info@dormaapresbyhospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440018",
    "code": "FAC-019",
    "name": "Nkwanta District Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "INACTIVE",
    "location": {
      "line1": "Nkwanta-Dambai Road",
      "line2": "",
      "city": "Nkwanta",
      "state": "Oti",
      "postalCode": "OT-567-3344",
      "country": "Ghana"
    },
    "contactPhone": "+233362055666",
    "contactEmail": "info@nkwantahospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440019",
    "code": "FAC-020",
    "name": "Sefwi-Wiawso Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Sefwi-Wiawso Road",
      "line2": "",
      "city": "Sefwi-Wiawso",
      "state": "Western North",
      "postalCode": "WN-345-7766",
      "country": "Ghana"
    },
    "contactPhone": "+233312077788",
    "contactEmail": "info@wiawsohospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440020",
    "code": "FAC-021",
    "name": "Akim Oda Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Akim Oda-Asamankese Road",
      "line2": "",
      "city": "Akim Oda",
      "state": "Eastern",
      "postalCode": "ER-789-6655",
      "country": "Ghana"
    },
    "contactPhone": "+233342099000",
    "contactEmail": "info@akimodahospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440021",
    "code": "FAC-022",
    "name": "Bolgatanga Regional Hospital",
    "type": "REGIONAL_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Bolgatanga-Navrongo Road",
      "line2": "",
      "city": "Bolgatanga",
      "state": "Upper East",
      "postalCode": "UE-456-8877",
      "country": "Ghana"
    },
    "contactPhone": "+233382022111",
    "contactEmail": "info@bolgatangahospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440022",
    "code": "FAC-023",
    "name": "Winneba Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Winneba Road",
      "line2": "",
      "city": "Winneba",
      "state": "Central",
      "postalCode": "CR-234-5566",
      "country": "Ghana"
    },
    "contactPhone": "+233332044433",
    "contactEmail": "info@winnebhospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440023",
    "code": "FAC-024",
    "name": "Kintampo Municipal Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "INACTIVE",
    "location": {
      "line1": "Kintampo-Tamale Road",
      "line2": "",
      "city": "Kintampo",
      "state": "Bono East",
      "postalCode": "BE-678-9900",
      "country": "Ghana"
    },
    "contactPhone": "+233352066544",
    "contactEmail": "info@kintampohospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440024",
    "code": "FAC-025",
    "name": "Konongo Odumasi Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Konongo-Kumasi Road",
      "line2": "",
      "city": "Konongo",
      "state": "Ashanti",
      "postalCode": "AK-901-2233",
      "country": "Ghana"
    },
    "contactPhone": "+233322077822",
    "contactEmail": "info@konongohospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440025",
    "code": "FAC-026",
    "name": "Shama Health Centre",
    "type": "CLINIC",
    "status": "ACTIVE",
    "location": {
      "line1": "Shama Junction",
      "line2": "",
      "city": "Shama",
      "state": "Western",
      "postalCode": "WR-456-7788",
      "country": "Ghana"
    },
    "contactPhone": "+233244567890",
    "contactEmail": "info@shamahealth.com"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440026",
    "code": "FAC-027",
    "name": "Ankaful Psychiatric Hospital",
    "type": "SPECIALIST_HOSPITAL",
    "status": "PENDING",
    "location": {
      "line1": "Ankaful Road",
      "line2": "",
      "city": "Cape Coast",
      "state": "Central",
      "postalCode": "CR-789-0012",
      "country": "Ghana"
    },
    "contactPhone": "+233332155555",
    "contactEmail": "info@ankafulhospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440027",
    "code": "FAC-028",
    "name": "Pantang Psychiatric Hospital",
    "type": "SPECIALIST_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Pantang Road",
      "line2": "",
      "city": "Accra",
      "state": "Greater Accra",
      "postalCode": "GA-567-3344",
      "country": "Ghana"
    },
    "contactPhone": "+233302666777",
    "contactEmail": "info@pantanghospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440028",
    "code": "FAC-029",
    "name": "Nkawkaw Holy Family Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "INACTIVE",
    "location": {
      "line1": "Nkawkaw-Koforidua Road",
      "line2": "",
      "city": "Nkawkaw",
      "state": "Eastern",
      "postalCode": "ER-345-6677",
      "country": "Ghana"
    },
    "contactPhone": "+233342088999",
    "contactEmail": "info@holyfamilynkawkaw.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440029",
    "code": "FAC-030",
    "name": "Dunkwa-on-Offin Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Dunkwa-Cape Coast Road",
      "line2": "",
      "city": "Dunkwa-on-Offin",
      "state": "Central",
      "postalCode": "CR-567-8877",
      "country": "Ghana"
    },
    "contactPhone": "+233332099000",
    "contactEmail": "info@dunkwahospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440030",
    "code": "FAC-031",
    "name": "Salaga District Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Salaga-Tamale Road",
      "line2": "",
      "city": "Salaga",
      "state": "Savannah",
      "postalCode": "SV-234-5567",
      "country": "Ghana"
    },
    "contactPhone": "+233372055666",
    "contactEmail": "info@salagahospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440031",
    "code": "FAC-032",
    "name": "Berekum Holy Family Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Berekum-Sunyani Road",
      "line2": "",
      "city": "Berekum",
      "state": "Bono",
      "postalCode": "BN-678-9900",
      "country": "Ghana"
    },
    "contactPhone": "+233352011122",
    "contactEmail": "info@holyfamilyberekum.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440032",
    "code": "FAC-033",
    "name": "Akatsi District Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "INACTIVE",
    "location": {
      "line1": "Akatsi-Sogakope Road",
      "line2": "",
      "city": "Akatsi",
      "state": "Volta",
      "postalCode": "VR-789-0011",
      "country": "Ghana"
    },
    "contactPhone": "+233362077788",
    "contactEmail": "info@akatsihospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440033",
    "code": "FAC-034",
    "name": "Akwatia Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Akwatia-Koforidua Road",
      "line2": "",
      "city": "Akwatia",
      "state": "Eastern",
      "postalCode": "ER-901-2233",
      "country": "Ghana"
    },
    "contactPhone": "+233342066544",
    "contactEmail": "info@akwatialhospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440034",
    "code": "FAC-035",
    "name": "Keta Municipal Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Keta-Accra Road",
      "line2": "",
      "city": "Keta",
      "state": "Volta",
      "postalCode": "VR-123-4567",
      "country": "Ghana"
    },
    "contactPhone": "+233362088999",
    "contactEmail": "info@ketahospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440035",
    "code": "FAC-036",
    "name": "Navrongo War Memorial Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "INACTIVE",
    "location": {
      "line1": "Navrongo-Bolgatanga Road",
      "line2": "",
      "city": "Navrongo",
      "state": "Upper East",
      "postalCode": "UE-567-3344",
      "country": "Ghana"
    },
    "contactPhone": "+233382044566",
    "contactEmail": "info@navrongohospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440036",
    "code": "FAC-037",
    "name": "Wenchi Methodist Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Wenchi-Techiman Road",
      "line2": "",
      "city": "Wenchi",
      "state": "Bono",
      "postalCode": "BN-456-7788",
      "country": "Ghana"
    },
    "contactPhone": "+233352099000",
    "contactEmail": "info@wenchimethodist.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440037",
    "code": "FAC-038",
    "name": "Aburi Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Aburi-Accra Road",
      "line2": "",
      "city": "Aburi",
      "state": "Eastern",
      "postalCode": "ER-234-5566",
      "country": "Ghana"
    },
    "contactPhone": "+233342077822",
    "contactEmail": "info@aburihospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440038",
    "code": "FAC-039",
    "name": "Aflao District Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Aflao-Accra Road",
      "line2": "",
      "city": "Aflao",
      "state": "Volta",
      "postalCode": "VR-890-6677",
      "country": "Ghana"
    },
    "contactPhone": "+233362011122",
    "contactEmail": "info@aflaohospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440039",
    "code": "FAC-040",
    "name": "Tepa Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "INACTIVE",
    "location": {
      "line1": "Tepa-Kumasi Road",
      "line2": "",
      "city": "Tepa",
      "state": "Ashanti",
      "postalCode": "AK-345-6677",
      "country": "Ghana"
    },
    "contactPhone": "+233322099000",
    "contactEmail": "info@tepahospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440040",
    "code": "FAC-041",
    "name": "Axim Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Axim-Takoradi Road",
      "line2": "",
      "city": "Axim",
      "state": "Western",
      "postalCode": "WR-567-3344",
      "country": "Ghana"
    },
    "contactPhone": "+233312088999",
    "contactEmail": "info@aximhospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440041",
    "code": "FAC-042",
    "name": "Ghana Red Cross Clinic - Makola",
    "type": "CLINIC",
    "status": "ACTIVE",
    "location": {
      "line1": "Makola Shopping Mall",
      "line2": "High Street",
      "city": "Accra",
      "state": "Greater Accra",
      "postalCode": "GA-123-8877",
      "country": "Ghana"
    },
    "contactPhone": "+233244678901",
    "contactEmail": "info@redcrossmakola.com"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440042",
    "code": "FAC-043",
    "name": "Ayensuano District Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Ayensuano-Koforidua Road",
      "line2": "",
      "city": "Ayensuano",
      "state": "Eastern",
      "postalCode": "ER-678-9900",
      "country": "Ghana"
    },
    "contactPhone": "+233342011122",
    "contactEmail": "info@ayensuanohospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440043",
    "code": "FAC-044",
    "name": "Bibiani Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Bibiani-Kumasi Road",
      "line2": "",
      "city": "Bibiani",
      "state": "Western North",
      "postalCode": "WN-234-5566",
      "country": "Ghana"
    },
    "contactPhone": "+233312099000",
    "contactEmail": "info@bibianihospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440044",
    "code": "FAC-045",
    "name": "Asesewa Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Asesewa-Accra Road",
      "line2": "",
      "city": "Asesewa",
      "state": "Eastern",
      "postalCode": "ER-456-7788",
      "country": "Ghana"
    },
    "contactPhone": "+233342022444",
    "contactEmail": "info@asesewahospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440045",
    "code": "FAC-046",
    "name": "New-Tafo Government Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "New-Tafo-Kumasi Road",
      "line2": "",
      "city": "New-Tafo",
      "state": "Ashanti",
      "postalCode": "AK-789-0011",
      "country": "Ghana"
    },
    "contactPhone": "+233322044566",
    "contactEmail": "info@newtafohospital.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440046",
    "code": "FAC-047",
    "name": "Prampram Polyclinic",
    "type": "POLYCLINIC",
    "status": "ACTIVE",
    "location": {
      "line1": "Prampram-Tema Road",
      "line2": "",
      "city": "Prampram",
      "state": "Greater Accra",
      "postalCode": "GA-890-6677",
      "country": "Ghana"
    },
    "contactPhone": "+233303088999",
    "contactEmail": "info@pramprampolyclinic.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440047",
    "code": "FAC-048",
    "name": "Bawku Presbyterian Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Bawku-Bolgatanga Road",
      "line2": "",
      "city": "Bawku",
      "state": "Upper East",
      "postalCode": "UE-123-4567",
      "country": "Ghana"
    },
    "contactPhone": "+233382066544",
    "contactEmail": "info@bawkupresby.gov.gh"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440048",
    "code": "FAC-049",
    "name": "Tolon Health Centre",
    "type": "CLINIC",
    "status": "ACTIVE",
    "location": {
      "line1": "Tolon-Tamale Road",
      "line2": "",
      "city": "Tolon",
      "state": "Northern",
      "postalCode": "NR-567-3344",
      "country": "Ghana"
    },
    "contactPhone": "+233244789012",
    "contactEmail": "info@tolonhealth.com"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440049",
    "code": "FAC-050",
    "name": "Agona Swedru Municipal Hospital",
    "type": "DISTRICT_HOSPITAL",
    "status": "ACTIVE",
    "location": {
      "line1": "Agona Swedru-Cape Coast Road",
      "line2": "",
      "city": "Agona Swedru",
      "state": "Central",
      "postalCode": "CR-345-6677",
      "country": "Ghana"
    },
    "contactPhone": "+233332077788",
    "contactEmail": "info@swedruhospital.gov.gh"
  }
]

const categoryStatistics = [
  {
    category: "Teaching Hospital",
    totalFacilities: 5,
    activeFacilities: 4,
    inactiveFacilities: 1,
  },
  {
    category: "Regional Hospital",
    totalFacilities: 5,
    activeFacilities: 5,
    inactiveFacilities: 0,
  },
  {
    category: "District Hospital",
    totalFacilities: 4,
    activeFacilities: 3,
    inactiveFacilities: 1,
  },
  {
    category: "Polyclinic",
    totalFacilities: 3,
    activeFacilities: 3,
    inactiveFacilities: 0,
  },
  {
    category: "Health Centre",
    totalFacilities: 3,
    activeFacilities: 2,
    inactiveFacilities: 1,
  },
  {
    category: "CHPS",
    totalFacilities: 3,
    activeFacilities: 3,
    inactiveFacilities: 0,
  },
  {
    category: "Maternity Home",
    totalFacilities: 2,
    activeFacilities: 2,
    inactiveFacilities: 0,
  },
];

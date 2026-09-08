export interface LegacyMockUser {
  id: string;
  firstName: string;
  lastName: string;
  loginEmail: string;
  passwordHash: string;
  mfaEnabled: boolean;
  mustChangePassword: boolean;
  lastLoginAt: string;
  role: string;
  status: string;
  audit: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
  };
}

export const usersMockData = [
  {
    "id": "STAFF-001",
    "firstName": "John",
    "lastName": "Doe",
    "loginEmail": "john.doe@hospital.com",
    "passwordHash": "$2a$10$X5t7Y9kL2mN4pQ6rS8uV1wY3zA5bC7dE9fG0hJ2kL4mN6pQ8rS0tU",
    "mfaEnabled": true,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-20T08:15:30",
    "role": "DOCTOR",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2024-01-15T09:30:00",
      "updatedAt": "2026-08-20T08:15:30",
      "createdBy": "550e8400-e29b-41d4-a716-446655440000",
      "updatedBy": "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
    }
  },
  {
    "id": "STAFF-002",
    "firstName": "Jane",
    "lastName": "Smith",
    "loginEmail": "jane.smith@hospital.com",
    "passwordHash": "$2a$10$A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A",
    "mfaEnabled": false,
    "mustChangePassword": true,
    "lastLoginAt": "2026-08-19T14:20:45",
    "role": "NURSE",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2024-03-20T11:00:00",
      "updatedAt": "2026-08-19T14:20:45",
      "createdBy": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "updatedBy": "550e8400-e29b-41d4-a716-446655440000"
    }
  },
  {
    "id": "STAFF-003",
    "firstName": "Robert",
    "lastName": "Wilson",
    "loginEmail": "robert.wilson@hospital.com",
    "passwordHash": "$2a$10$B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1v2W3x4Y5z6A7B",
    "mfaEnabled": true,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-21T07:00:00",
    "role": "ADMIN",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2023-11-01T08:30:00",
      "updatedAt": "2026-08-21T07:00:00",
      "createdBy": "c3b5d6e7-f8a9-4b0c-8d1e-2f3a4b5c6d7e",
      "updatedBy": "c3b5d6e7-f8a9-4b0c-8d1e-2f3a4b5c6d7e"
    }
  },
  {
    "id": "STAFF-004",
    "firstName": "Emily",
    "lastName": "Johnson",
    "loginEmail": "emily.johnson@hospital.com",
    "passwordHash": "$2a$10$C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7B8C",
    "mfaEnabled": false,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-18T16:45:12",
    "role": "RECEPTIONIST",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2024-06-10T10:15:00",
      "updatedAt": "2026-08-18T16:45:12",
      "createdBy": "d4e5f6a7-b8c9-4d0e-9f1a-2b3c4d5e6f7a",
      "updatedBy": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"
    }
  },
  {
    "id": "STAFF-005",
    "firstName": "Michael",
    "lastName": "Brown",
    "loginEmail": "michael.brown@hospital.com",
    "passwordHash": "$2a$10$D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1v2W3x4Y5z6A7B8C9D",
    "mfaEnabled": true,
    "mustChangePassword": true,
    "lastLoginAt": "2026-08-17T09:30:00",
    "role": "PHARMACIST",
    "status": "LOCKED",
    "audit": {
      "createdAt": "2024-08-05T13:45:00",
      "updatedAt": "2026-08-17T09:30:00",
      "createdBy": "e5f6a7b8-c9d0-4e1f-9a2b-3c4d5e6f7a8b",
      "updatedBy": "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e"
    }
  },
  {
    "id": "STAFF-006",
    "firstName": "Sarah",
    "lastName": "Davis",
    "loginEmail": "sarah.davis@hospital.com",
    "passwordHash": "$2a$10$E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7B8C9D0E",
    "mfaEnabled": false,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-20T11:20:33",
    "role": "LAB_TECH",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2024-09-12T09:00:00",
      "updatedAt": "2026-08-20T11:20:33",
      "createdBy": "f6a7b8c9-d0e1-4f2a-9b3c-4d5e6f7a8b9c",
      "updatedBy": "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f"
    }
  },
  {
    "id": "STAFF-007",
    "firstName": "David",
    "lastName": "Miller",
    "loginEmail": "david.miller@hospital.com",
    "passwordHash": "$2a$10$F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1v2W3x4Y5z6A7B8C9D0E1F",
    "mfaEnabled": true,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-19T13:10:22",
    "role": "WARD_MANAGER",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2023-12-01T14:30:00",
      "updatedAt": "2026-08-19T13:10:22",
      "createdBy": "a7b8c9d0-e1f2-4a3b-9c4d-5e6f7a8b9c0d",
      "updatedBy": "d4e5f6a7-b8c9-4d0e-9f1a-2b3c4d5e6f7a"
    }
  },
  {
    "id": "STAFF-008",
    "firstName": "Lisa",
    "lastName": "Garcia",
    "loginEmail": "lisa.garcia@hospital.com",
    "passwordHash": "$2a$10$G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7B8C9D0E1F2G",
    "mfaEnabled": false,
    "mustChangePassword": true,
    "lastLoginAt": "2026-08-16T08:00:00",
    "role": "BILLING_STAFF",
    "status": "INACTIVE",
    "audit": {
      "createdAt": "2024-04-18T10:45:00",
      "updatedAt": "2026-08-16T08:00:00",
      "createdBy": "b8c9d0e1-f2a3-4b4c-9d5e-6f7a8b9c0d1e",
      "updatedBy": "e5f6a7b8-c9d0-4e1f-9a2b-3c4d5e6f7a8b"
    }
  },
  {
    "id": "STAFF-009",
    "firstName": "James",
    "lastName": "Rodriguez",
    "loginEmail": "james.rodriguez@hospital.com",
    "passwordHash": "$2a$10$H8i9J0k1L2m3N4o5P6q7R8s9T0u1v2W3x4Y5z6A7B8C9D0E1F2G3H",
    "mfaEnabled": true,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-21T06:45:00",
    "role": "RADIOLOGIST",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2024-02-28T16:20:00",
      "updatedAt": "2026-08-21T06:45:00",
      "createdBy": "c9d0e1f2-a3b4-4c5d-9e6f-7a8b9c0d1e2f",
      "updatedBy": "f6a7b8c9-d0e1-4f2a-9b3c-4d5e6f7a8b9c"
    }
  },
  {
    "id": "STAFF-010",
    "firstName": "Patricia",
    "lastName": "Martinez",
    "loginEmail": "patricia.martinez@hospital.com",
    "passwordHash": "$2a$10$I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7B8C9D0E1F2G3H4I",
    "mfaEnabled": false,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-18T10:30:15",
    "role": "SUPER_ADMIN",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2023-09-10T08:00:00",
      "updatedAt": "2026-08-18T10:30:15",
      "createdBy": "d0e1f2a3-b4c5-4d6e-9f7a-8b9c0d1e2f3a",
      "updatedBy": "a7b8c9d0-e1f2-4a3b-9c4d-5e6f7a8b9c0d"
    }
  },
  {
    "id": "STAFF-011",
    "firstName": "Robert",
    "lastName": "Anderson",
    "loginEmail": "robert.anderson@hospital.com",
    "passwordHash": "$2a$10$J0k1L2m3N4o5P6q7R8s9T0u1v2W3x4Y5z6A7B8C9D0E1F2G3H4I5J",
    "mfaEnabled": true,
    "mustChangePassword": true,
    "lastLoginAt": "2026-08-15T12:00:00",
    "role": "DOCTOR",
    "status": "LOCKED",
    "audit": {
      "createdAt": "2024-05-22T13:30:00",
      "updatedAt": "2026-08-15T12:00:00",
      "createdBy": "e1f2a3b4-c5d6-4e7f-9a8b-0c1d2e3f4a5b",
      "updatedBy": "b8c9d0e1-f2a3-4b4c-9d5e-6f7a8b9c0d1e"
    }
  },
  {
    "id": "STAFF-012",
    "firstName": "Jennifer",
    "lastName": "Taylor",
    "loginEmail": "jennifer.taylor@hospital.com",
    "passwordHash": "$2a$10$K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7B8C9D0E1F2G3H4I5J6K",
    "mfaEnabled": false,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-20T15:40:00",
    "role": "NURSE",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2024-07-15T11:00:00",
      "updatedAt": "2026-08-20T15:40:00",
      "createdBy": "f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c",
      "updatedBy": "c9d0e1f2-a3b4-4c5d-9e6f-7a8b9c0d1e2f"
    }
  },
  {
    "id": "STAFF-013",
    "firstName": "William",
    "lastName": "Thomas",
    "loginEmail": "william.thomas@hospital.com",
    "passwordHash": "$2a$10$L2m3N4o5P6q7R8s9T0u1v2W3x4Y5z6A7B8C9D0E1F2G3H4I5J6K7L",
    "mfaEnabled": true,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-19T09:15:00",
    "role": "PHARMACIST",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2024-10-03T15:00:00",
      "updatedAt": "2026-08-19T09:15:00",
      "createdBy": "a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d",
      "updatedBy": "d0e1f2a3-b4c5-4d6e-9f7a-8b9c0d1e2f3a"
    }
  },
  {
    "id": "STAFF-014",
    "firstName": "Linda",
    "lastName": "Moore",
    "loginEmail": "linda.moore@hospital.com",
    "passwordHash": "$2a$10$M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7B8C9D0E1F2G3H4I5J6K7L8M",
    "mfaEnabled": false,
    "mustChangePassword": true,
    "lastLoginAt": "2026-08-16T13:20:00",
    "role": "RECEPTIONIST",
    "status": "INACTIVE",
    "audit": {
      "createdAt": "2024-11-08T09:45:00",
      "updatedAt": "2026-08-16T13:20:00",
      "createdBy": "b4c5d6e7-f8a9-4b0c-8d1e-2f3a4b5c6d7e",
      "updatedBy": "e1f2a3b4-c5d6-4e7f-9a8b-0c1d2e3f4a5b"
    }
  },
  {
    "id": "STAFF-015",
    "firstName": "Richard",
    "lastName": "Jackson",
    "loginEmail": "richard.jackson@hospital.com",
    "passwordHash": "$2a$10$N4o5P6q7R8s9T0u1v2W3x4Y5z6A7B8C9D0E1F2G3H4I5J6K7L8M9N",
    "mfaEnabled": true,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-21T08:30:00",
    "role": "LAB_TECH",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2025-01-20T10:00:00",
      "updatedAt": "2026-08-21T08:30:00",
      "createdBy": "c5d6e7f8-a9b0-4c1d-8e2f-3a4b5c6d7e8f",
      "updatedBy": "f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c"
    }
  },
  {
    "id": "STAFF-016",
    "firstName": "Barbara",
    "lastName": "Martin",
    "loginEmail": "barbara.martin@hospital.com",
    "passwordHash": "$2a$10$O5p6Q7r8S9t0U1v2W3x4Y5z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O",
    "mfaEnabled": false,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-18T11:50:00",
    "role": "BILLING_STAFF",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2025-03-14T14:15:00",
      "updatedAt": "2026-08-18T11:50:00",
      "createdBy": "d6e7f8a9-b0c1-4d2e-8f3a-4b5c6d7e8f9a",
      "updatedBy": "a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d"
    }
  },
  {
    "id": "STAFF-017",
    "firstName": "Joseph",
    "lastName": "Lee",
    "loginEmail": "joseph.lee@hospital.com",
    "passwordHash": "$2a$10$P6q7R8s9T0u1v2W3x4Y5z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P",
    "mfaEnabled": true,
    "mustChangePassword": true,
    "lastLoginAt": "2026-08-14T07:45:00",
    "role": "WARD_MANAGER",
    "status": "LOCKED",
    "audit": {
      "createdAt": "2025-04-25T08:30:00",
      "updatedAt": "2026-08-14T07:45:00",
      "createdBy": "e7f8a9b0-c1d2-4e3f-8a4b-5c6d7e8f9a0b",
      "updatedBy": "b4c5d6e7-f8a9-4b0c-8d1e-2f3a4b5c6d7e"
    }
  },
  {
    "id": "STAFF-018",
    "firstName": "Susan",
    "lastName": "Perez",
    "loginEmail": "susan.perez@hospital.com",
    "passwordHash": "$2a$10$Q7r8S9t0U1v2W3x4Y5z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q",
    "mfaEnabled": false,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-20T14:10:00",
    "role": "RADIOLOGIST",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2025-06-01T09:00:00",
      "updatedAt": "2026-08-20T14:10:00",
      "createdBy": "f8a9b0c1-d2e3-4f4a-8b5c-6d7e8f9a0b1c",
      "updatedBy": "c5d6e7f8-a9b0-4c1d-8e2f-3a4b5c6d7e8f"
    }
  },
  {
    "id": "STAFF-019",
    "firstName": "Thomas",
    "lastName": "White",
    "loginEmail": "thomas.white@hospital.com",
    "passwordHash": "$2a$10$R8s9T0u1v2W3x4Y5z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R",
    "mfaEnabled": true,
    "mustChangePassword": false,
    "lastLoginAt": "2026-08-19T16:25:00",
    "role": "DOCTOR",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2025-07-19T11:45:00",
      "updatedAt": "2026-08-19T16:25:00",
      "createdBy": "a9b0c1d2-e3f4-4a5b-8c6d-7e8f9a0b1c2d",
      "updatedBy": "d6e7f8a9-b0c1-4d2e-8f3a-4b5c6d7e8f9a"
    }
  },
  {
    "id": "STAFF-020",
    "firstName": "Karen",
    "lastName": "Harris",
    "loginEmail": "karen.harris@hospital.com",
    "passwordHash": "$2a$10$S9t0U1v2W3x4Y5z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S",
    "mfaEnabled": false,
    "mustChangePassword": true,
    "lastLoginAt": "2026-08-17T12:30:00",
    "role": "NURSE",
    "status": "ACTIVE",
    "audit": {
      "createdAt": "2025-08-30T13:00:00",
      "updatedAt": "2026-08-17T12:30:00",
      "createdBy": "b0c1d2e3-f4a5-4b6c-8d7e-8f9a0b1c2d3e",
      "updatedBy": "e7f8a9b0-c1d2-4e3f-8a4b-5c6d7e8f9a0b"
    }
  }
] satisfies LegacyMockUser[];

export const usersSummaryMockData = {
  totalUsers: 20,
  activeUsers: 16,
  mfaEnabledUsers: 14,
  lockedUsers: 6,
};

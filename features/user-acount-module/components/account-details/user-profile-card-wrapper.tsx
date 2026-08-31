// "use client";

// import { UserProfileCard } from "./user-profile-card";



// interface UserProfileCardWrapperProps {
//   userData: {
//     name: string;
//     email: string;
//     userId: string;
//     role: string;
//     status: string;
//     lastActive: string;
//     memberSince: string;
//   };
// }

// export function UserProfileCardWrapper({ userData }: UserProfileCardWrapperProps) {
//   // All event handlers and interactive logic here
//   const handleImageUpload = async (file: File) => {
//     const formData = new FormData();
//     formData.append('profileImage', file);
    
//     const response = await fetch('/api/user/profile-image', {
//       method: 'POST',
//       body: formData,
//     });
    
//     if (!response.ok) {
//       throw new Error('Upload failed');
//     }
    
//     return response.json();
//   };

//   const handleImageRemove = async () => {
//     const response = await fetch('/api/user/profile-image', {
//       method: 'DELETE',
//     });
    
//     if (!response.ok) {
//       throw new Error('Removal failed');
//     }
//   };

//   return (
//     <UserProfileCard 
//       userData={userData}
//       onImageUpload={handleImageUpload}
//       onImageRemove={handleImageRemove}
//     />
//   );
// }
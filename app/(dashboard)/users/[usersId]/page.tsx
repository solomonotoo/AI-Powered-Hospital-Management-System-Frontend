// Unified user account details component
import { AccountDetails } from "@/features/user-acount-module/components/account-details/account-details";

interface AccountDetailsPageProps {
  // Support both usersId (Next.js dynamic route folder name) and userId
  params: Promise<{
    usersId?: string;
    userId?: string;
  }>;
  // Support initial tab selection from query string (e.g. ?tab=access)
  searchParams?: Promise<{
    tab?: string;
  }>;
}

export default async function AccountDetailsPage({
  params,
  searchParams,
}: AccountDetailsPageProps) {
  // Await Next.js dynamic route parameters
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  // Resolve user ID correctly from route segment
  const userId = resolvedParams.usersId || resolvedParams.userId || "";
  const initialTab = resolvedSearchParams?.tab || "overview";

  return <AccountDetails userId={userId} initialTab={initialTab} />;
}

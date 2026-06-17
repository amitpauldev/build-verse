import { clerkClient, clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// this creates a new organization for each user that doesn't have one, and adds them to it. This is necessary because our app requires users to belong to an organization in order to submit products. This middleware runs on every request, but it only performs the organization check and creation logic if the user is authenticated and doesn't already belong to an organization. For users who already belong to an organization, or for unauthenticated users, it simply allows the request to proceed without any additional processing.
// Note: this is not best practice to create an organization from middleware, but it's a simple solution for this demo. In a real application, you would want to handle organization creation in a more robust way, such as during user registration or through a dedicated API route.
// Avoid creating an organization from middleware in the future.
export default clerkMiddleware(async (auth, req) => {
	// Redirect /about to /
	// if (req.nextUrl.pathname === "/about") {
	// 	return NextResponse.redirect(new URL("/", req.url));
	// }
	// If you want to match all nested routes:
	// if (req.nextUrl.pathname.startsWith("/about")) {
	// 	return NextResponse.json({
	// 		message: "This route is deprecated. Please use the home page instead.",
	// 	});
	// }

	const { userId, orgId } = await auth();

	if (userId && !orgId) {
		try {
			const client = await clerkClient();
			//check if user has any organizations

			const { data: organizations } =
				await client.users.getOrganizationMembershipList({ userId: userId });

			if (organizations && organizations.length > 0) {
				// Continue normally for all
				return NextResponse.next();
			}

			const user = await client.users.getUser(userId);

			const orgName = user.fullName
				? `${user.fullName}'s Organization`
				: user.firstName
					? `${user.firstName}'s Organization`
					: user.username
						? `${user.username}'s Organization`
						: user.primaryEmailAddress?.emailAddress
							? `${user.primaryEmailAddress?.emailAddress?.split("@")[0]}'s Organization`
							: "My Organization";

			await client.organizations.createOrganization({
				name: orgName,
				createdBy: userId,
			});

			console.log("Auto-created organization:", orgName);
		} catch (error) {
			console.error("Error auto-creating organization:", error);
		}
	}

	// Continue normally for all other routes
	return NextResponse.next();
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for Clerk's auto-proxy path
		"/__clerk/(.*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
